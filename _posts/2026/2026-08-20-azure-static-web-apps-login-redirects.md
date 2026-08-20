---
title: "Azure Static Web Apps Login Redirects: How to Stop It"
excerpt: "Fix the Azure Static Web Apps Entra ID infinite redirect loop and null clientPrincipal issue. Learn how to properly configure routes, and OpenID settings on the SWA Standard tier."
last_modified_at: 2026-08-20T20:00:00
header:
  teaser: "../assets/2026/ozkary-azure-static-web-apps-login-redirects-sm.png"
  teaserAlt: "Azure Static Web Apps Login Redirects: How to Stop It"
tags: 
  - web
  - azure
  - Static Web Apps
  - cloud
  - github
  - vscode  
toc: true

---
# Overview

Integrating custom Microsoft Entra ID (Azure AD) authentication with an Azure Static Web App (SWA) on the Standard tier should be straightforward, but subtle misconfigurations can lead to a frustrating infinite redirect loop. 

Typically, you log in, complete MFA, and watch the browser bounce repeatedly between Entra ID and your application until Microsoft halts the flow with **Error 50074** (*"We couldn't sign you in"*). When you check `/.auth/me`, you find that `clientPrincipal` is `null`.

![Azure Static Web Apps Login Redirects: How to Stop It](../../assets/2026/ozkary-azure-static-web-apps-login-redirects.png "Azure Static Web Apps Login Redirects: How to Stop It")

Here is a breakdown of why this happens and the exact checklist to fix it.

---

### The Problem: Why Does the App Loop?

The infinite loop occurs when the interactive user login succeeds in Entra ID, but SWA's backend proxy fails the subsequent **token exchange**. 

When the token exchange fails:
1. SWA cannot establish the `StaticWebAppsAuthCookie`.
2. The user lands back on the app unauthenticated (`clientPrincipal: null`).
3. SWA evaluates the catch-all route guard (`/*`), issues a `401`, and `responseOverrides` immediately redirects the user back to `/.auth/login/aad`.
4. The cycle repeats until Entra ID detects the loop and blocks access.

Two common triggers for this failure are explicitly passing OAuth parameters (like `response_type=code` or `scope`) inside `login.loginParameters`—which breaks SWA's built-in token negotiation—and using internal `rewrite` rules instead of explicit `redirect` routes.

---

### What to Check

* **SWA Hosting Plan:** Ensure your Azure Static Web App is running on the **Standard SKU**. Custom OpenID Connect / Entra ID identity providers are ignored on the Free tier.
* **Platform Type:** Configured strictly as **Web** (not Single-page application) under **App registrations** > **Authentication**.
* **Redirect URI:** Registered under the Web platform as `https://<your-domain>/.auth/login/aad/callback`.
* **ID Tokens Enabled:** In Entra ID > **Authentication** > **Platform configurations** > **Web** > **Implicit grant and hybrid flows**, ensure the checkbox for **ID tokens (used for implicit and hybrid flows)** is enabled.
* **OpenID Issuer Tenant ID:** The `openIdIssuer` URL must use your actual **Directory (Tenant) ID** (not an Azure Subscription ID), ending with `/v2.0` and no trailing slash.
* **Client ID Setting:** The Application (Client) ID matches the exact environment variable name referenced in `clientIdSettingName`.
* **Client Secret Value:** The SWA configuration setting referenced by `clientSecretSettingName` must hold the **Secret Value** (the plaintext string generated on creation), not the Secret ID GUID.
* **API Permissions:** Ensure `Microsoft Graph` > `User.Read` (Delegated) is added and granted **Admin Consent**.
* **Enterprise App Assignment:** If **Assignment required?** is set to `Yes` under Enterprise applications > Properties, confirm the test user or security group is explicitly added under **Users and groups**.
* **No `loginParameters` Overrides:** Omit `login.loginParameters` entirely from your JSON config. Do not manually pass `response_type` or `scope`, as SWA handles Authorization Code negotiation out of the box.
* **Route Actions:** Set the `/login` route to an explicit `redirect` with `post_login_redirect_uri=/` rather than an internal `rewrite` to `/.auth/login/aad`.
* **Clean System Endpoints:** Do not define custom route rules in `routes` for SWA system paths like `/.auth/login/aad/callback` or `/.auth/complete`.

---

### Working `staticwebapp.config.json` Baseline

Use this base configuration to validate that the login process works properly. You can then make additional changes for your configuration.

```json
{
  "auth": {
    "identityProviders": {
      "azureActiveDirectory": {
        "registration": {
          "openIdIssuer": "[https://login.microsoftonline.com/](https://login.microsoftonline.com/)<TENANT_ID>/v2.0",
          "clientIdSettingName": "AZURE_CLIENT_ID",
          "clientSecretSettingName": "AZURE_CLIENT_SECRET"
        }
      }
    }
  },
  "routes": [
    {
      "route": "/login",
      "redirect": "/.auth/login/aad?post_login_redirect_uri=/",
      "statusCode": 302
    },
    {
      "route": "/logout",
      "redirect": "/.auth/logout?post_logout_redirect_uri=/",
      "statusCode": 302
    },
    {
      "route": "/*",
      "allowedRoles": ["authenticated"]
    }
  ],
  "responseOverrides": {
    "401": {
      "redirect": "/.auth/login/aad?post_login_redirect_uri=/",
      "statusCode": 302
    }
  }
}
```

---

## 🌟 Let's Connect & Build Together

Thanks for reading! 😊 If you enjoyed these resources, let's stay in touch! I share deep-dives into AI/ML patterns and host community events here:

* **[GDG Broward](https://gdg.community.dev/gdg-broward-county-fl/)**: Join our local dev community for meetups and workshops.
* **[Global AI Events](https://globalai.community/chapters/jacksonville/)**: Join Global AI Events.
* **[LinkedIn](https://www.linkedin.com/in/oscardgarcia)**: Let's connect professionally! I share insights on engineering.
* **[GitHub](https://github.com/ozkary)**: Follow my open-source journey and star the repos you find useful.
* **[YouTube](https://www.youtube.com/@ozkary)**: Watch step-by-step tutorials on the projects listed above.
* **[BlueSky](https://bsky.app/profile/ozkary.bsky.social)** / **[X / Twitter](https://x.com/ozkary)**: Daily tech updates and quick engineering tips.

👉 *Originally published at [ozkary.com](https://www.ozkary.com)*