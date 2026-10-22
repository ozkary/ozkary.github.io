# Google Slides Generation Protocol

This directory contains the markdown slide specifications and the Google Apps Script generator to automatically convert markdown specs into production-ready Google Slides presentations.

---

## Files

1. **Slide Specification:**
   - [`beyond-the-prompt-building-enterprise-solutions-with-ai-specification-driven-design.md`](beyond-the-prompt-building-enterprise-solutions-with-ai-specification-driven-design.md)
   - Extracted from `_posts/2026/2026-07-23-beyond-the-prompt-building-enterprise-solutions-with-ai-specification-driven-design.md`
   - Contains 11 slides partitioned into minimalist visible faces and ElevenLabs narration scripts in speaker notes.

2. **Google Apps Script Generator:**
   - [`create_presentation.gs`](create_presentation.gs)
   - Natively connects Google Drive and Google Slides using `DriveApp` and `SlidesApp`.
   - Requires zero GCP projects or CLI credentials.

---

## Step-by-Step Instructions

1. **Upload Markdown to Google Drive:**
   - Upload `beyond-the-prompt-building-enterprise-solutions-with-ai-specification-driven-design.md` to your Google Drive (`ozkary@gmail.com`).
   - Right-click the file in Google Drive, select **Share** or **Copy link** (or copy its file ID from the browser URL).

2. **Open Google Apps Script:**
   - In your browser, open **[script.new](https://script.new)** (logged in as `ozkary@gmail.com`).
   - Replace any template code with the code from [`create_presentation.gs`](create_presentation.gs).

3. **Configure the File ID:**
   - At the top of `create_presentation.gs`, replace `PASTE_YOUR_MARKDOWN_DRIVE_FILE_ID_OR_URL_HERE` with the copied link or file ID:
     ```javascript
     const MARKDOWN_FILE_ID_OR_URL = "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing";
     ```

4. **Run the Script:**
   - Click the **Run** button at the top of the Google Apps Script editor.
   - Accept the one-time Google Workspace authorization prompt.
   - The script will read the markdown file directly from your Drive, build all 11 slides with dark-theme styling, inject the speaker notes, and output the direct URL to your new Google Slides deck in the Execution Log:
     ```
     ============================================================
     ✅ SUCCESS! Your Google Slides deck is ready:
     👉 https://docs.google.com/presentation/d/.../edit
     ============================================================
     ```
