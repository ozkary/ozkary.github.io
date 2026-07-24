# Beyond the Prompt: Building Enterprise Solutions with AI & Specification-Driven Design

**Date:**  7/22/2026 1:00pm EST
**Video reference:** https://www.youtube.com/live/Bk9y4nS4RL8?si=jmExYD_PsmxBw_sL


## Presentation details

Relying on raw prompt engineering or conversational text interfaces alone will not deliver a production-ready, enterprise-grade AI solution. To build resilient, secure, and compliant software in the age of AI assistants, developers must move past chaotic "vibe coding" and adopt a structured, process-oriented architectural workflow.

This session delivers a blueprint for Specification-Driven Design (SDD), demonstrating how disciplined discovery and modular markdown specifications enable a "project assistant" to successfully manage and execute multiple phases of the software development lifecycle. By treating AI as an execution engine governed by rigorous technical guardrails, rather than a black-box chatbot, engineers can drastically accelerate velocity while maintaining absolute system integrity. We will walk through a real-world case study of a decoupled, zero-trust enterprise quality healthcare risk-assessment engine to show this methodology in action.

**Agenda:**

The Purpose: Understanding the Toolchain & Vibe Coding – Defining the real-world roles of code assistants (like GitHub Copilot and Google Antigravity, and what "vibe coding" actually means for an enterprise workflow.

The Chaos: The Pitfalls of Planless Execution – The fallout when launching straight into terminal commands without a design baseline: the immediate creation of monolithic files, bypassed architectural patterns, and completely untracked requirements.

The Discovery & Specification Process: System Decomposition – How to properly break down a complex problem before writing code—identifying distinct system areas, modular boundaries, UI/UX input definitions, core system requirements, and downstream DevOps needs.

The Blueprint: Establishing Governance & Guardrails – Putting your specifications and governance rules together into a structured, unified layout that forces the AI assistant to strictly follow your target design patterns (such as layered component-to-service structures).

The Iterative SDLC: Continuous Gap Analysis & Adaptive Specifications – Embracing an Agile approach to handle missing requirements by starting small with a baseline spec, continuously feeding refinements to the assistant, and leveraging it to run live gap analyses and solution summaries.


## Video Transcript

Hi, good afternoon. Uh, so I'm sure all of you have been are
0:066 secondsfamiliar with the concept of um AI code assistance, right? And um and this whole
0:1414 secondsconcept of coding and and if you're not using it,
0:2121 secondsyou probably wonder um you know what are the details about it? Is it really something that you can rely on? and can
0:2929 secondsyou really build enterprise quality solutions with those tools? Right?
0:3434 secondsSo with today's presentation, we um we're going to take a spin at that and we're going to get um deep into the
0:4141 secondsprocess of V by coding and how we can leverage some of these AI tools uh for the development process for the
0:5050 secondsdevelopment life cycle process and that's the key here that um it is not the tool those tools are not here to
0:5757 secondskind of build everything for you but instead be able to help you help you
1:031 minute, 3 secondsbuild um solutions, enter solutions. So let's see how how do we go about to do that. So so welcome. Uh my name is Oscar. I'm really glad to have you here.
1:151 minute, 15 secondsUh my background is enterprise uh solutions architect. Um I build AI
1:221 minute, 22 secondswebbased and cloudnative solutions. I'm also the author of data engineering process fundamentals. Uh please take a
1:291 minute, 29 secondslook at that. uh you can just scan that QR code and that takes you to a hub where I have links on for GitHub repos and my contact information.
1:381 minute, 38 secondsAll right. So okay at a very high level uh just to talk about a snapshot of
1:461 minute, 46 secondstoday's topic
1:481 minute, 48 seconds[cough and clears throat]
1:491 minute, 49 secondswe want to actually talk about what is chaos versus the concept of AI storming right and what and what do we mean by
1:581 minute, 58 secondsthat? So with this whole uh process of AI right and by coding which is one of those hot but buzzwords now being thrown
2:062 minutes, 6 secondsout there um there is this notion right that you can actually as a developer you can just go ahead and sit in front of
2:142 minutes, 14 secondsone of those uh code assistants AI tools and be able to just whip out a a solution. I'm sure you often heard this
2:222 minutes, 22 secondscomment from someone that says, "Hey, it took me three hours to build a whole website or whatever, right? Whatever
2:292 minutes, 29 secondsthey needed to do and they don't give you enough context on what that means, right? It only shows maybe that something is running on a web browser
2:382 minutes, 38 secondsand it looks great. But um for enterprise quality equality, we need to kind of we need to understand what's
2:452 minutes, 45 secondsbehind it. How does it really work? uh is it really to maintain, what is the security like and so on, right? So those
2:532 minutes, 53 secondsconcerns, enterprise level concerns are really important and how do we pro how do we follow this process and use those
3:003 minutestools to set up and you and be able to build something that has governance, security and is really following your um
3:103 minutes, 10 secondsdevelopment um uh the standards and and and guidelines, right? So, so let's
3:173 minutes, 17 secondscompare this, right? When you hear this, oh, it took me 30 minutes to build something or two hours to build something. In reality, this is what we call chaos, right? So, it is effective.
3:283 minutes, 28 secondsIt is effective for what you want to do.
3:303 minutes, 30 secondsUh, if it is just a oneoff, but it's really not maybe the product is really not there 100%. But let's talk about the
3:373 minutes, 37 secondsprocess. The process is really you use one of those tools. You probably use Copilot, Microsoft Copilot.
3:443 minutes, 44 secondsum uh or any other uh AI assistant tool and you start going, hey, I want to build an app and I want the app. I want
3:523 minutes, 52 secondsto build a React application that can show uh product information and that I can do the following things, right? And
4:004 minutesthe AI will pick up on what you're saying and the way you're saying it, right? You you're writing your pronouns.
4:074 minutes, 7 secondsI should be clear about that. you're passing your prompts, you're typing it and the AI based on what it knows
4:144 minutes, 14 secondsbecause it has trained on so much code, it's gonna go out there, right, and find um do I have uh in memory, do I recall
4:224 minutes, 22 secondshaving react applications? Did I learn about this? Did I learn about bu building forms and doing this? And it knows it's
4:294 minutes, 29 secondsvery good at knowing that information and it will just based on what it knows, it will build something. However, if we
4:364 minutes, 36 secondsstart comparing that information with um how do I
4:434 minutes, 43 secondsyou know how do how does it follow my my coding standards right how how does it it is actually using our design patterns
4:524 minutes, 52 secondsand our requirements and so once you start cross-checking with that information then you see that there's probably a gap on that
5:035 minutes, 3 secondsexcuse So how do we address that right? How do we deal with that and how do we actually leverage that tool those tools and those
5:125 minutes, 12 secondsconcepts to be able to build something that is very high quality. Right? So the the short answer for that is that the
5:195 minutes, 19 secondssame principles apply and the same principles of software development of discovery
5:265 minutes, 26 secondsum um requirement gatherings and specifications are applicable with this concepts. So in the um traditional
5:345 minutes, 34 secondsprocess we always work as a team and we understand the this the problem statement of what we're trying to achieve. So we start doing some
5:435 minutes, 43 secondsdiscovery right. So the discovery process is really where you start doing brainstorming right about what you're
5:505 minutes, 50 secondstrying to build. What are you trying to answer to solve and what are you trying what is the ultimately the product or
5:585 minutes, 58 secondsthe solution that you're putting together? because this works not just for products but for data engineering solutions and and so on, right?
6:076 minutes, 7 secondsSo you start working with the team and you have product owners and things like that and you start building uh what we call specifications, right? You draft
6:156 minutes, 15 secondsthe the the discovery documentation, the requirements, you start writing the documentation. So the output of that process just like we do just like we
6:246 minutes, 24 secondshave always done is to write those specifications. So now once we have those specifications this is actually
6:316 minutes, 31 secondswhat we can use for the concept of a a specificationdriven design for spec a specificationdriven design.
6:406 minutes, 40 secondsNow uh basically what what that means is that you can feed that information into your AI and the AI can follow some of
6:476 minutes, 47 secondsthose guidelines right so governance requirements security requirements and so on and as as much as you document
6:566 minutes, 56 secondsthat then you keep that AI um um within your guard rails right within the limits and the domain knowledge that you
7:047 minutes, 4 secondsprovide so it will follow and execute what you're telling it with the specs based on the specs and this is still is
7:127 minutes, 12 secondsan agile interactive process, right? And what I mean by that is really not that you write the spec and you're done and
7:197 minutes, 19 secondsAI builds something and and and it builds the deployments and and so on and the cloud resources. Uh it's not like
7:277 minutes, 27 secondsthat. It's really usually as we do normally in any traditional process. we write the specs uh but we may find and
7:367 minutes, 36 secondsidentify during the process identify gaps right so that's important that's why is very deterative to be able to
7:447 minutes, 44 secondsactually now go back and say okay uh what what are gaps right and that's what we call gap analysis so we use the
7:517 minutes, 51 secondsprocess of gap analysis to be able to work with the AI and say look based on what you know um how what do you see
8:018 minutes, 1 secondright and it will give you some feedback based on what it thinks is a gap, right?
8:068 minutes, 6 secondsBut it's really ultimately our job to be able to say, "Oh, I'm noticing that as as we are building this out, I did not
8:138 minutes, 13 secondsaccount for certain things, right? I'm missing this type of stuff." Like for example, if I'm deploying to Cloud Runner for an application, oh, how do I do my authentication?
8:238 minutes, 23 secondsWhat are the requirements for that? Oh, I forgot to do that. let me go ahead and and build out the specs for that and feed that back to to the to the AI.
8:328 minutes, 32 secondsRight? So that's really at a very high level the intent. How do we do that in a very uh detailed level is what we're
8:408 minutes, 40 secondsgoing to discuss now. So we're going to start first with what is really what are the tools right what are we talking about when when you hear the terms of v
8:488 minutes, 48 secondscoding and things like copilot anti-gravity what are we talking about when it comes
8:568 minutes, 56 secondsto those tools right all right so um I'll share a link for you u github repo where you can actually
9:059 minutes, 5 secondssee um the project right and you can just basically browse the code and do whatever you need to do to kind of become familiar with that.
9:159 minutes, 15 secondsBut let me if you see my screen right now uh basically I'm sharing uh Visual Studio Code and in Visual Studio Code
9:239 minutes, 23 secondsbasically what we have is in front of you is two to two AI tools that we know of. So we have uh on the right hand side
9:329 minutes, 32 secondswe have GitHub copilot in a chat session mode and we also have anti-gravity right which is also in a
9:409 minutes, 40 secondschat session mode and what we're looking at at this is for the purpose of what is
9:469 minutes, 46 secondsthis process of using this tools and how uh how do you usually do it interactively in a in a in a development
9:559 minutes, 55 secondsprocess. So, the first thing we want to be able to take a look is what if I just sit in front of these tools and I just
10:0210 minutes, 2 secondsstart um writing prompts to say, "Hey, look um I want to build a React
10:0910 minutes, 9 secondsapplication or a React component or what have you and and I I want it to be a form that takes three, four fields,
10:1810 minutes, 18 secondsright?" And the AI is probably going to build that pretty well, right? But it's just gonna if you don't give it enough information, it's gonna build um it's
10:2710 minutes, 27 secondsgoing to build stuff based on what it thinks is good, right? And usually what that means is kind of a a procedural coding where everything is in one single
10:3510 minutes, 35 secondsfile and so on. So So here what you see here is anti-gravity. I won't bother you with how to install anti-gravity. This is the CLI. There's also a web browser,
10:4410 minutes, 44 secondsa web uh studio uh version of it that you can download. I find it much better to integrate within the within Visual
10:5310 minutes, 53 secondsStudio Code um and be able to work with it as a peer programmer kind of kind of
11:0111 minutes, 1 secondu so to speak. So here what we we are saying is hey um basically I'm just telling it we're working on this folder
11:0811 minutes, 8 secondsright um and without any specifications just describe the process to build a a react component
11:1611 minutes, 16 secondsyou know describe to us basically because this is really the process to be able to say hey I want to build a component that is going to do this and
11:2511 minutes, 25 secondsit's going to do that and anti-gravity just picks up on that it just scans your files and you got to be careful also you have to set up your guard rails. You
11:3311 minutes, 33 secondsdon't want, for example, for anti-gravity to go and start scanning everything and be able to uh to build
11:4111 minutes, 41 secondseverything that it thinks it should be reading, right? So, you may want to keep the scope of that analysis short so it's
11:4811 minutes, 48 secondsable to scan just what you're looking for. So, here I what I did is I asked, right? Hey, look, I
11:5511 minutes, 55 secondsI have this uh I want to build this React component, but don't build anything yet, right? And that's key here. You don't want to just say and build this for me. You want to be able
12:0412 minutes, 4 secondsto kind of analyze and see what is what it's proposing. So you can basically ask, hey, can you propose an idea? Can
12:1212 minutes, 12 secondsyou propose a design? All right. And it will give you uh a definition of what it needs. Now what you would notice here is
12:1912 minutes, 19 secondsthat I'm actually saying to it, hey, and can you just describe the process and put it into this
12:2612 minutes, 26 secondsmarkdown file? Right? And that's key for a um later later on in the conversation today. I'll show you the whole purpose
12:3512 minutes, 35 secondsof that. But I wanted to show you here because the problems we have right off the bat with this approach is that um if
12:4212 minutes, 42 secondsI didn't say the write it in the in the file, it would just display it on the here on the on the terminal, right? It
12:5012 minutes, 50 secondswill just display everything. and and I I I start the problem because I'm actually saying to it, "Hey, I want you to build this, but I'm going to lose
12:5812 minutes, 58 secondsthat context, right? As we start exchanging conversations and prompts and what have you, I'm going to lose track of what I did." And that's that's that's
13:0813 minutes, 8 secondsso that's an easy path to start just creating chaos, right? So, what you want to do is kind of have a real good
13:1413 minutes, 14 secondspattern of h how to interact with the AI to be able to manage your project. So in this case, I just typed it and I say
13:2213 minutes, 22 secondsbuild this. I could have just not even asked the AI to build the the file and it will just put everything here on the
13:3013 minutes, 30 secondswindow which then it will be very easy to lose the context of this conversation. But let's look at the quality, right? What did it do for us?
13:3813 minutes, 38 secondsSo we asked to use the app demo component. [snorts] So we built this for us. So let's take a look at that. I I
13:4613 minutes, 46 secondsmaximize my window so you can see. All right.
13:5013 minutes, 50 secondsSo it says the document is going to do this right. It's going to use use state use effect. So we see that it's using uh
13:5813 minutes, 58 secondsuh hooks for for react which is what we want. And it's just give us you know hey I'm using components component name and
14:0514 minutes, 5 secondsand it's just given given us um some design and architecture decisions
14:1314 minutes, 13 secondslike writing components. So it's really building out something for us that that makes sense, right? And this is kind of
14:2014 minutes, 20 secondsuh if you start seeing the boiler plate starts looking at the code, right? But it doesn't really there doesn't really have a lot of context on for example
14:2914 minutes, 29 secondsum it's it's looking at the project and it's using the global sources, the CSS files and so on, right? And it's doing some of the patterns that he sees,
14:3714 minutes, 37 secondsright? Components, component name, and so on. So it's following something, right? But but but it's not enough,
14:4414 minutes, 44 secondsright? What is this component name action trigger? We're not giving it component names. We're not giving it uh what is really going to trigger what is
14:5314 minutes, 53 secondsthis action? What is really what what is really doing? And if you notice here, it's actually picking up this component
15:0015 minutesfolders to do that because it's it already has context just because it's on that folder. It already has context of
15:0715 minutes, 7 secondssomething we already built uh before, right? So it knows those patterns. But imagine if you're completely starting completely in an empty folder, it won't
15:1715 minutes, 17 secondsknow where to put this. It won't even create a component. It's just going to put it everything in one file. So, but if you look at at the directory structure, you'll see then um that we
15:2615 minutes, 26 secondshave an app and we have an API project and the app is a react application and then we have uh we have uh components
15:3515 minutes, 35 secondsand we have assets and we have agents and so on, right? So we have a nice layout and architecture approach on this
15:4215 minutes, 42 secondsand more on that later but right now we're just showing if we don't give enough information then it's just going to do whatever right so this is just to
15:5015 minutes, 50 secondsdemonstrate that right and the same with copilot I can go to copilot and start chatting here um and just start giving
15:5815 minutes, 58 secondsit instructions and it's just going to attempt to do something right so it's important to kind of uh drive the the AI
16:0616 minutes, 6 secondsso it gives you it follows your pattern currency follows your your governance uh and requirements, right? So, we'll touch
16:1316 minutes, 13 secondson that more in detail, but let's take a look at at an example of something that I built using this approach and this
16:2116 minutes, 21 secondsrepo actually use that has that code for um that I'm about to show you right now.
16:2716 minutes, 27 secondsSo, okay. So, all right. So, we have this application here, right? So let's blow this up a little.
16:3816 minutes, 38 secondsAnd this application um so I I do have some experience on writing software solutions for the medical field. So this
16:4616 minutes, 46 secondsis just a heart disease risk assessment tool, right? And what it does is basically goes out there and and tries to understand if a person is in risk for
16:5516 minutes, 55 secondsa heart condition. And I'm showing you just this because if you hear me, I'm giving you some background. I have some
17:0217 minutes, 2 secondsdomain knowledge of what I'm trying to do. And that's key because that domain knowledge is important
17:0917 minutes, 9 secondsfor us to be able to feed that information into the AI, right? Like I'm not a doctor or anything like that, but
17:1617 minutes, 16 secondsI have some background on what we have done in the past and I have some knowledge on what we're trying to build.
17:2217 minutes, 22 secondsSo I I I talk with domain knowledge, right? Or what we're trying to build. So this this application but what I want us
17:2917 minutes, 29 secondsto understand that this is a cloud native application.
17:3517 minutes, 35 secondsIt is hosted on Google cloud. Um is is the deployment is fully automated. The security is implemented using Google authentication.
17:4417 minutes, 44 secondsUh and it has all the security guidelines and accessibility requirements to support this use case right and all this is built with this
17:5317 minutes, 53 secondsapproach. So this is just basically if you take a look at the app you know it has the light dark mode which is an accessibility requirements and it has
18:0118 minutes, 1 secondthe concept of hot keys uh voice to text commands. I'm not going to turn this on right now
18:0918 minutes, 9 secondsbecause it's going to get confused as I'm speaking to you. But the idea is that some people can uh use a mouse for
18:1618 minutes, 16 secondsexample so they speak to it right or they they may not see. So they just kind of get feedback uh voice feedback and they can talk and so on. But the the
18:2418 minutes, 24 secondsidea here is of the app without spending too much time is you can use hot keys as well as as key strokes and that gives
18:3218 minutes, 32 secondsyou the speed to be able to and the accessibility to be able to use it right and and so on or you can just basically
18:3918 minutes, 39 secondstalk uh and provide the input. Um so I'm just going to go quickly go through here.
18:4618 minutes, 46 secondsUm and just understand the concept here is we're taking basically demographics and we uh some social factors
18:5418 minutes, 54 secondsuh to be able to give to the to the uh AI some information
19:0119 minutes, 1 seconduh about what we're trying to do. Right? So we're just giving it some data here and
19:0919 minutes, 9 secondsand the idea here is that I'm just showing you this this is a normal application in the medical industry to be able to gather this kind of
19:1819 minutes, 18 secondsinformation. Okay. So what's happening also here behind the scenes is that this is um using an agent to conduct the
19:2619 minutes, 26 secondsinterview. So this is an AI agent, right?
19:3019 minutes, 30 secondsAnd as as we submit this profile, it's going to go and use an MCP tool to be able to
19:3719 minutes, 37 secondsum send the data to uh a machine language model that is going to basically analyze the information and
19:4519 minutes, 45 secondsit's going to give you score, right? a risk score based on what it thinks, you know, based on all the studies, machine language models, you know, they study
19:5319 minutes, 53 secondsbased on a lot of data, people that have suffered heart disease and they study all the results and do that. So, so we
20:0120 minutes, 1 secondcome back and it says, okay, you have a 4.8 which your risk the risk is low, right? So, it's kind of giving us some
20:0820 minutes, 8 secondsclinical analysis and this is a server agent also. So, it's in the back end. So in the front end we have an agent for
20:1520 minutes, 15 secondsthe interview back end we have an agent for the analysis and we have a MCP tool with a machine language model to do the
20:2320 minutes, 23 secondsanalysis and so on right so so if you if you look at this one right the the everything that's built out that I just
20:3120 minutes, 31 secondstalked to you in a few minutes is really starts going into that enterprise quality level right there is there's security there's accessibility there's
20:4020 minutes, 40 secondsis is um deploy into the cloud how uh so everything is kind of enterprise quality
20:4720 minutes, 47 secondsbut how do we build this right is this really is this really something that we can do with this by coding and with the
20:5520 minutes, 55 secondsand with the AI assistance right and the answer to that is yes if you follow a um what I call AI storming
21:0421 minutes, 4 secondsprocess which in which includes the so the the concept of a AI storming
21:1121 minutes, 11 secondsas you can see here and I don't I think I covered that well enough. AI storming, it's really just a a word meaning this
21:2021 minutes, 20 secondslike brainstorming, right? When you go into the process to understand, do discovery and kind of understand what's going on. But instead of just doing the
21:2821 minutes, 28 secondsbrain storming, we're doing AI storming, right? We're using AI as our brain to be able to build this out um and be able to
21:3621 minutes, 36 secondsput something like this together. But of course, domain knowledge is really key.
21:4021 minutes, 40 secondsSo, let's move on back to do that. So I show you this here now
21:4721 minutes, 47 secondswith anti-gravity. And now we're going to take a look at our how do we do this?
21:5221 minutes, 52 secondsHow how do we go about to build something like this, right? This is this is very important. So [snorts] if you look at the documentation, let me just really quick go back to the GitHub repo.
22:0122 minutes, 1 secondSo this is the GitHub repo where you want to be and I'll put this on the chat. Um
22:0922 minutes, 9 secondsright uh please start the repo and start the repo means just kind of click on uh start
22:1722 minutes, 17 secondsuh which is in the homepage and and that will help us you know uh have more traction on the project but let me blow
22:2422 minutes, 24 secondsthis up a little bit. So what's going to happen is h how did we build this right?
22:2922 minutes, 29 secondsSo that's important. um we build these specifications. We basically go into we
22:3622 minutes, 36 secondshave domain knowledge or or if you don't have domain knowledge, you can go into this AI storming process of gaining that domain knowledge, right? Because you're going to have a problem statement.
22:4522 minutes, 45 secondsSomebody's going to say, "We need to build this out." And you're going to go into that AI storming process to to do
22:5322 minutes, 53 secondsthis, right? So, we gather that information.
22:5822 minutes, 58 secondswe start doing a specifications based on areas right so let's say database devops UI
23:0623 minutes, 6 secondsuh APIs and so on so it is important to kind of build out this specifications this gives the AI the um the enough
23:1623 minutes, 16 secondsinformation and the process here is really is that don't you don't have to do a big bang right this is an agile process as well so you go into the
23:2523 minutes, 25 secondsprocess and you start saying I'm going to start for example example with domain knowledge discovery and you start collecting discovery data. You start
23:3323 minutes, 33 secondschatting sending maybe the AI can help you with some of that domain knowledge so you can gain some of that expertise.
23:3923 minutes, 39 secondsOnce you start building out specifications for the to build out these solutions then you start building out based on the area. Okay, I want to do the security. How do I do security?
23:5023 minutes, 50 secondsHow do I do deployments? You may not even know perhaps that you how how to deploy that on Azure cloud or Google cloud and you may
23:5923 minutes, 59 secondswant to understand securityurities uh the tools that you're using and do I use firebase do I use angular react and so
24:0724 minutes, 7 secondson right and you can have that AI storming process if you don't have enough of the domain knowledge for that but the point is break it down in
24:1624 minutes, 16 secondsmodules right understand the different areas of the application uh is not a big bang where you build everything in one shot because that is hard to do, right?
24:2624 minutes, 26 secondsSo, you start with the small what we usually call uh the MVP, the minimum um uh requirements that are needed for for
24:3524 minutes, 35 secondsfor a project, right? So, it's minimum viable uh product which is just a minimum requirements. You don't have to build the whole thing in one shot. But
24:4324 minutes, 43 secondswhat's important here is the process and the process is just basically saying follow these specifications just like
24:5024 minutes, 50 secondsyou do now in any other projects way before we had AI uh available to us right so with this project you'll see
24:5924 minutes, 59 secondsall of this you'll see the the the you'll see um specifications based on area and what I do also is I kind of
25:0625 minutes, 6 secondsbuild out what I call solution blueprint which we all call solution blueprint but I break it down by project right an API
25:1425 minutes, 14 secondswhich is this API is the MCP uh tool that we use for the AI to be able to do the score and we got the application
25:2125 minutes, 21 secondswhich is a react application but what's important here is the specs right so if you look at the specs and you look at the solution blueprint
25:3025 minutes, 30 secondsright and that's basically is the master driver um this is how we tell AI look this is your responsibility please take a look
25:3825 minutes, 38 secondsat this specifications you know dive into the uh different specs X and we start breaking down how
25:4625 minutes, 46 secondswe want to do this, right? Uh and then what happens is each one of these is actually going to break down into uh
25:5325 minutes, 53 secondsdata collection process, right? Here we can may be able to do some of the UI governance design, what um CSS
26:0226 minutes, 2 secondslibraries to use, uh if there is any kind of PII um uh requirements and so on. This is where you collect all of
26:1126 minutes, 11 secondsthis, right? So, and I will go through all these files, but this is basically the process. And then DevOps, how are we going to deploy this? Are we going to
26:1826 minutes, 18 secondsuse GitHub actions? Are we going to use bash deployment files and so on. You you document all of that and you have you
26:2726 minutes, 27 secondsyou give the ability to the AI to then read this and it'll be able to um create some of the code for you to do that. So,
26:3426 minutes, 34 secondsso the whole idea is to kind of go through all of this and be able to now start generating some of the code. And this is you're going to iterate through
26:4226 minutes, 42 secondsthis. So when for example as you pick up and you understand um you know that's not what I really meant to build on that
26:4826 minutes, 48 secondscomponent or in that API then you go back to your specifications. You don't change the code right because changing
26:5726 minutes, 57 secondsthe code you may lose track of what you really meant to do for your specs. You want to be able to document, right?
27:0327 minutes, 3 secondsWhich is always always been the bad habit for for for us developers that we don't we tend to not document. But if
27:1127 minutes, 11 secondsyou do that, then you have traceability on what you you are doing and the AI can help you. So, so yes, so you can change
27:1927 minutes, 19 secondsmake the changes yourself, but it'll be a good idea to if it is something valuable, right? Add it to the specs and
27:2727 minutes, 27 secondsat the AI tell the AI, hey, can you rerun this, right? Um, and sometimes you're going to be able you're going to have to do some changes and tell the AI,
27:3627 minutes, 36 secondshey, no, no, don't do that. I want you to use this. For example, I come across often a problem where it thinks it's it's a real it's behind some updates.
27:4527 minutes, 45 secondsSo, it tries to use an older version of some library and I actually pass the documentation. So, I find the link of
27:5227 minutes, 52 secondsthat library and I set set it to the AI and I say read this is the latest documentation and then it knows how to how to follow that. But but going back
28:0228 minutes, 2 secondsto the code really so so we are so we have anti-gravity here and we have uh
28:0828 minutes, 8 secondscopilot so which one to use right a lot of people are going to ask that question so I can say to you is really just kind
28:1628 minutes, 16 secondsof play with them and identify how how good they are what I noticed is that GitHub copilot is really good at setting
28:2328 minutes, 23 secondsup standards governance uh and basically for that whole development process to build one component and be able to
28:3228 minutes, 32 secondsestablish some of your design rules um and be able to kind of do a pre-review, right? So, you know how the processes,
28:4028 minutes, 40 secondsyou make changes, you send it to to a peer and the peer is going to do a code review and so on. So,
28:4828 minutes, 48 secondsso what's going to happen here is the um copilot really is I asked Copilot a
28:5628 minutes, 56 secondsquestion. I don't know if you can see it right but I asked copilot is look we have specifications for our development process right can
29:0529 minutes, 5 secondsyou review those specs right and we're targeting a typescript project what is the process to build a typescript uh uh
29:1429 minutes, 14 secondscomponent right um give us the steps right and if what I do is let me see if I can blow it up a little bit what I do
29:2329 minutes, 23 secondshere is I tell it hey look uh go into the github compile compile instructions and and take a look at that. So,
29:3129 minutes, 31 secondsso this basically is specifications to be able to do some of the development process and I basically tell it to um
29:4029 minutes, 40 secondsyou know I give instructions look these are uh our governance instructions this is what we need to do if it's a
29:4729 minutes, 47 secondstypescript project follow these rules if it's not if it's python follow these rules so I asked it right to I want to build a typescript project component
29:5629 minutes, 56 secondswhat do you do and and b look at what it's doing if you can read this right is giving me the governance that are defined on the copilot instructions and
30:0430 minutes, 4 secondsthe specific files for typescript we're using tailwind for style we're using component container services and API
30:1230 minutes, 12 secondswe're using Pascal case for UI features camel case for files and services so it gives you the entire governance
30:2030 minutes, 20 secondsinformation based on what you do based on what your uh uh company does right and that's all in this files right
30:2830 minutes, 28 secondsThat's all on these files and this specifications are mostly for the development process governance right how
30:3630 minutes, 36 secondsto build a new component how to build a new API you know how to build you know what how is it that we build it just
30:4330 minutes, 43 secondsgives you those guide those guardrails to allow the AI to follow that so compiler is great for those things and
30:5030 minutes, 50 secondsalso anti-gravity but this is kind of like how you interact with both of them right and I can definitely go here and
30:5830 minutes, 58 secondsask copilot hey a now that you know that you have the the standards and the governance please build this component
31:0631 minutes, 6 secondsto do this with this name and so on but the moment I start typing those details I lose the tracing of my specification
31:1431 minutes, 14 secondsso what I in fact I want to do so I want to go back to the app that I'm using so let's say we're doing the UI and I want
31:2131 minutes, 21 secondsto go to the UI specs files and start writing something that is more into my
31:2831 minutes, 28 secondsum my UI requirements, right? So I start just writing it here and
31:3531 minutes, 35 secondsspelling out everything that I need to do. So and then that is where
31:4231 minutes, 42 secondsGitHub copilot becomes more effective and that's where I can now tell uh anti-gravity I can say please review
31:5131 minutes, 51 secondsthe app specs right uh folder and tell me about
32:0132 minutes, 1 secondour solution right and what it's going to do is it's going to target uh the application what we what I show you the
32:0832 minutes, 8 secondsthe the UI that I was running, right? If I wanted to target the API, I do that, too. And it's important to do this
32:1532 minutes, 15 secondsbecause um there's a lot of information, right? What I show you actually is it's is a lot of work, right? And you want to
32:2532 minutes, 25 secondskind of make uh components, modules, and break it down, make it granular so it's easy for you to track. So when you're chatting with the AI
32:3432 minutes, 34 secondsum tool, you're not loading everything, right? You're just kind of saying, for example, hey, I want to focus on this,
32:4132 minutes, 41 secondsright? Maybe the voice recognition process is not working that good. Hey, you know what? In my voice uh uh
32:4832 minutes, 48 secondsaccessibility voice uh tool, I I'm having a problem. It's not reacting to certain commands like continue and can
32:5632 minutes, 56 secondswhat's going on, right? And then uh the AI may do analysis also. It can help you to do analysis. It may say look, I find
33:0433 minutes, 4 secondsa bug in it. and you can [clears throat] review the bug and you can say, "Okay, let's fix that." Right? So, it's interactive, right? You're kind of
33:1133 minutes, 11 seconds[clears throat] going back and forth and and and doing these changes. But let's go back to the specs. So, I told
33:1733 minutes, 17 secondsanti-gravity, hey, um review the specs for the app, right? Not for the API. API, we'll take a look at
33:2633 minutes, 26 secondsthat, too. Um and you know, and it just says, okay, it's a web application for health metrics. It uses [clears throat]
33:3433 minutes, 34 secondsReact um with TypeScript. It collects health metrics [clears throat] and and look how it knows, right? That it
33:4133 minutes, 41 secondscollects 16 CDC UCI health metrics, right? Um, and it has a wizard like feature and
33:4933 minutes, 49 secondsaccessibility. All that is because it's studying all the specs, right? And because we are telling it this is what we're doing. This is how we're doing it.
33:5633 minutes, 56 secondsThis is the process we want to follow and execute. So, we're giving it that level of information. It's not just
34:0334 minutes, 3 secondstyping and forgetting. If you do that, that's chaos. But but anyways, it just goes and it says, I want to do a
34:1134 minutes, 11 secondstimeline. And so we're specifying the the the components, right? So we're saying, hey, specify the components and do this. Um,
34:2034 minutes, 20 secondsand what's important here is as as you go and you start working and you run the UI, um, you start thinking about how do
34:2734 minutes, 27 secondsI deploy this, how do I test this, and so on, right? Um, so so it shows you something that's very key here. Number
34:3534 minutes, 35 secondstwo, right? It's actually telling you that uh the way we're doing this is we're creating an NCP server to be able
34:4234 minutes, 42 secondsto use a machine language classification model to do the analysis. So that's some insights
34:5034 minutes, 50 secondsthat if you're new to the project and you don't know about it, it's just giving you all this type of information
34:5734 minutes, 57 secondsbecause we have been building it step by by step like the zero PII compliance, right? So mean is we're not putting data
35:0535 minutes, 5 secondsat risk and medical guard rail protocols for be able to put medical disclaimers
35:1235 minutes, 12 secondsand so on. Basically saying we're not really doctors. We're just doing a clinical analysis based on data and so on. So if you think about it as more of
35:2135 minutes, 21 secondsa governance issue, right? And you need to be able to think about those requirements as well.
35:2835 minutes, 28 secondsOkay. So basically this is how we guide the AI and now you can actually start saying hey I want to build let's say you want to build a new component the
35:3635 minutes, 36 secondsapproach is hey you create the spec for that component if you want to use anti-gravity for example and basically establish what you're doing your
35:4335 minutes, 43 secondsguidelines your you're right hey as I do this uh review this documentation review
35:5035 minutes, 50 secondsthis and tell me if I'm going in the right way and I want to do this and you will just build out that based following your standards following your architecture ure guidelines and so on.
36:0136 minutes, 1 secondAnd the same applies for APIs, right? We can do the same thing. We create an API and you know um and this API basically
36:0936 minutes, 9 secondsis a Python API and what it does really is just creates a prediction um uh
36:1636 minutes, 16 secondsfunction that enables us to kind of load uh a machine language model and be able to use it. Right? And this is something that I built, right? the machine
36:2436 minutes, 24 secondslanguage model. I built that. I have um I have a g a GitHub repo that talks about that. But this basically uh what
36:3336 minutes, 33 secondsyou what I could do here is if I want to made this more enterprise is I could just push that model into
36:4236 minutes, 42 secondsthe cloud like for example like um what is the name of that service? I forgot uh ah I can't remember. Uh but
36:5136 minutes, 51 secondsanyways, I could put it into a into a ser cloud service that hosts models, right? And then basically I could just make the API call to the Vertex AI to
37:0137 minutes, 1 secondVert.Ex AI as an example and say use this model, right? Just like we do use Gemini whatever or use u what have you,
37:0937 minutes, 9 secondsright? Um use my model because it's registered in the catalog and I want to do this, right? So I could do that too.
37:1737 minutes, 17 secondsSo but it's it's there to be able to do these capabilities. [snorts] What's really important in here is also the discussion of how do we do security? How
37:2537 minutes, 25 secondsdo we do DevOps, right? So it's important to kind of take a look at DevOps requirements, understand the uh
37:3337 minutes, 33 secondsthe the cloud provider requirements to be able to build something like for example service accounts,
37:4037 minutes, 40 secondsuh um projects, securities, uh how you going to log in, right? and how do we build this? How do we automate the
37:4837 minutes, 48 secondsprocess? So, we kind of, you know, for this project, we're saying let's do bash scripting, right? Let's do this uh let's build this type of bash script to be
37:5637 minutes, 56 secondsable to deploy this. Let's configure this project ID, service accounts, and we give all the information, right? We
38:0438 minutes, 4 secondswant to be able to create make files to be able to do mpm runs and so on and so on. So, we detail all of this, right?
38:1238 minutes, 12 secondsAnd we're basically uh uh enable the we we enable the AI now to build this. So for example, let's take a look at a um
38:2038 minutes, 20 secondsdeploy script, right? So the deploy script bash script really just looks like this, right? We're saying this is the service name, right? This is the
38:2938 minutes, 29 secondsregion, the distribution and so on. And we go through the entire process of building this out. And that's where AI is good at, right? If you give it the
38:3638 minutes, 36 secondsright information, it understand clearly is that you're targeting Google cloud, Azure cloud, AWS and it understands
38:4438 minutes, 44 secondstheir requirements and it will give you if you don't have the the expertise it can help you hey by the way use service accounts for this and so on right and
38:5238 minutes, 52 secondsbut the point is that it can build all of this and this is your devops area this is where you actually do the deployments of this product right uh and
39:0239 minutes, 2 secondswe use the CLI that are embedded here and and basically that's just CLI commands that you can run and you can
39:0939 minutes, 9 secondsjust enable the the um the code assistant also to say hey can you just run that file for me and it would do
39:1639 minutes, 16 secondsthat right but you can also go to the terminal and run it manually in a real production environment then that's probably going to be hooked into like
39:2439 minutes, 24 secondsgithub actions and be automated right and as you check in a branch it will just run those processes and deploy it
39:3339 minutes, 33 secondsSo um to finish this basically that what's important here is that as we iterate through this we do a gap
39:4139 minutes, 41 secondsanalysis right and as you start understanding more and more how to do this you can go to back to anti-gravity
39:4839 minutes, 48 secondsand say for example hey can you do analysis based on what we have built and create and create some kind of solution
39:5539 minutes, 55 secondssummaries and gap analysis and see what what are we missing or you can start writing yourself if you have identified
40:0240 minutes, 2 secondssomething gap analysis and and feed that specifications to kind of finish something, right? But you go into that
40:1040 minutes, 10 secondsAI storming mode or analyzing what you're trying to achieve next, right?
40:1440 minutes, 14 secondsSo, for example, I quickly just create a solution summary here for the application, right? And that mean I actually told AI, hey, based on our
40:2340 minutes, 23 secondsspecs, based on what we have built, uh give me a solution summary of what what was it that we did, right? Uh and it
40:3140 minutes, 31 secondsjust basically starts giving us okay we built a hard risk uh heart disease risk u um agent and we did this right we
40:3940 minutes, 39 secondsbuilt a react app we use tailwind typescript uh you know we used uh metadata driven
40:4740 minutes, 47 secondsinformation for the agent and then we build this components then we build the devops automation we make we use make
40:5440 minutes, 54 secondsfiles for the build process configuration files linting building right all that stuff that is enterprise,
41:0241 minutes, 2 secondsright? It's a whole DevOps team of that that works uh just to kind of do the build process. Uh we do agent
41:0941 minutes, 9 secondsgovernance, right? And and starts breaking down everything that we did, right? And the same thing is going to happen if you have a gap or next steps.
41:1741 minutes, 17 secondsSo if part of the process is you may have pending activities and you may say look uh let's let's keep let's document our next steps. want to catch up on this
41:2641 minutes, 26 secondsthis and that and you build next steps and those are kind of like new require new specifications to iterate in the
41:3341 minutes, 33 secondsnext process right as we start building out and building out so that's really in a nutshell how you use this kind of
41:4141 minutes, 41 secondstools right I like to use the CLI because I think it's effective way to kind of just be able to quickly test
41:4941 minutes, 49 secondsstuff uh feed files and so on but you can use the studio tools as Well, uh it's just really is a it's a preference,
41:5741 minutes, 57 secondsright? But the point here is is the approach the the mechanism the way of using these tools to be able to uh
42:0742 minutes, 7 secondsto get to your solution. Right? So that's basically um let me see if we have any okay so so that's my book but
42:1742 minutes, 17 secondsuh that's basically how we we take this approach of building this solutions and I don't know if you have any questions
42:2442 minutes, 24 secondsright now let me see it's really quick here um
42:3242 minutes, 32 secondsokay but essentially guys so the to answer the question is how do we use AI how do we vibe coding. Um are they
42:4142 minutes, 41 secondseffective? Do they really build enterprise quality solutions? The and the answer to that is as you can see is if you build the specifications properly
42:4942 minutes, 49 seconds[snorts] you take a processoriented approach in the sense of how to it iterate feed the information to the agent definitely it's going to help you
42:5742 minutes, 57 secondsbuild that out properly. Right? So it does have a lot of value. uh leverage those tools, learn uh you know, learn
43:0443 minutes, 4 secondshow to use them properly as opposed to just a chat interface where you back you go back and forth on them. Okay, so anyways, I want to thank you again.
43:1243 minutes, 12 secondsThank you for joining me today. Any questions? Let me see. Um all right, guys. Thank you. If you're
43:2043 minutes, 20 secondsnot, well, thank you again. Uh follow the repo, please. Just start the repo.
43:2543 minutes, 25 secondsUh follow the channel. I'll send an email also with uh with the information.
43:3143 minutes, 31 secondsUm uh so you can just go and take a look at the materials. I I I'll do a write up on this. Um also take a look at the
43:3943 minutes, 39 secondsvideo and follow the YouTube channel, the GitHub repos. And I thank you again. Okay. Thanks a lot.
43:4643 minutes, 46 secondsAll right, guys.

