# Smart Orchestration: Multi-Agent Systems and Workflows

Create a new post using the video transcript and the session agenda below.

The post should follow the flow of the conversation for every area/chapter we covered and add the transition points like we do in the presentation to move to the next section.

The goal is to enable the user to understand the content without having to watch the video.

## Agenda

As organizations adopt generative AI, engineering teams often fall into two critical anti-patterns:

- The Monolithic Agent Trap: Packing dozens of tools and sprawling system prompts into a single agent, triggering prompt bloat, tool selection failure, and hallucinations.
- The Spaghetti Code Trap: Stitching agents together with brittle if/else ladders or unconstrained, chatty agent loops that cause latency spikes and unpredictable drift.

Smart Orchestration resolves both traps by pairing focused, single-purpose Worker Agents with structured Workflow Graphs—anchoring autonomous AI execution within deterministic enterprise controls.

> 👉 Join us and learn how to implement worker agents and orchestration workflows with production-proven design patterns, and walk away with the fundamental concepts you need to build resilient, production-ready AI systems!

![Smart Orchestration: Multi-Agent Systems and Workflows](https://www.ozkary.dev/assets/2026/ozkary-smart-orchestration-multi-agent-systems-workflows.jfif "Smart Orchestration: Multi-Agent Systems and Workflows")


📋 Presentation Agenda

- Agent Anatomy: The Single-Purpose Worker

Applying the Single Responsibility Principle: scoping one focused agent to one bounded task, lean context, and specific toolset.

- The Multi-Worker Advantage: Why Decouple?

Eliminating monolithic bottlenecks through cognitive division of labor, isolated database permissions, and zero-trust security boundaries.

- Workflow Orchestration: Moving Beyond Agent Chat

Replacing open-ended conversational loops with deterministic state graphs that guarantee execution order, typed state handoffs, and circuit-breaker fault handling.

- Core Enterprise Workflow Patterns

Architectural breakdown of four production graph topologies: Sequential chains, Parallel fan-out/fan-in, Evaluator-Optimizer loops, and Dynamic intent routing.

- Live Walkthrough: Agent workflows in Action

End-to-end execution of a multi-agent workflow querying a data warehouse and delivering analytical results

- Key Takeaways

Create a summary of the points discuss in the video.

---
title: "Smart Orchestration: Multi-Agent Systems and Workflows"

event_date: 2026-11-04 12:00:00 
header:
  teaser: "../assets/2026/ozkary-smart-orchestration-multi-agent-systems-workflows-sm.jpg"
  teaserAlt: "Smart Orchestration: Multi-Agent Systems and Workflows"
image: "https://www.ozkary.dev/assets/2026/ozkary-smart-orchestration-multi-agent-systems-workflows-sm.jpg"
excerpt: "Join us for our next session to see how to pair focused, single-purpose Worker Agents with structured Workflows , bridging deterministic enterprise control with autonomous domain execution."
toc: true
---


## Video Transcript
1:021 minute, 2 Our focus today is on smart orchestration multi- aent systems and workflows.
1:121 minute, 12 secondsReally glad to have you here today. Um, and I enjoy sharing this type of uh information uh with the community. Uh,
1:211 minute, 21 secondsmy name is Oscar Garcia and I'll be talking uh showing you some of these concepts and do a live presentation
1:291 minute, 29 secondsusing a GitHub repo. Uh, but let's start with a question of what is smart orchestration, right? We understand the
1:381 minute, 38 secondsconcept of orchestration. Um if you build um data flows, data pipelines, uh orchestration is the purpose to
1:461 minute, 46 secondsexecute a series of steps um and to actually have some kind of gates or signals to be able to continue or to
1:541 minute, 54 secondsquit the process, right? So, so how do we work on a smart orchestration? What does that mean and how how can we do it?
2:032 minutes, 3 secondsSo let's take a look at that. Before we review some of these concepts of using AI for orchestration purposes, let's
2:112 minutes, 11 secondsreview some of the current problems we have in today's industry.
2:162 minutes, 16 secondsAs companies adopted some of these new technologies, right? Um they started just basically jumping on solutions
2:232 minutes, 23 secondswithout really having any kind of process definition or any kind of architectural uh concepts. So some some
2:312 minutes, 31 secondssome companies are actually falling into what we call the monolithic trap. Right?
2:372 minutes, 37 secondsSo the problem with that really is is that everything is in one single agent or one single tool. So when it comes to
2:452 minutes, 45 secondsagents right I'm going to draw some parallels uh with uh things like um normal concept design pattern and some
2:542 minutes, 54 secondssoftware engineering concepts that are applicable to the to this day.
2:592 minutes, 59 secondsRight. Um so basically what we have here is that uh when we build an agent we have the
3:083 minutes, 8 secondsoption of basically provide some of the instructions and provide some of the tooling for that agent right and but the
3:153 minutes, 15 secondsproblem is just like any software um uh project that you do you can't really put everything in one function or in one
3:243 minutes, 24 secondsclass depending on how you your design approach is right so the same mistakes are being done with agents, right? Where we actually do um a prompt overload.
3:343 minutes, 34 secondsWhat that means is the the instructions that are given to the agent are just a mix of everything, right? As opposed to
3:423 minutes, 42 secondssort of a one single concept, the agent is basically doing all kinds of activities and tasks which basically
3:503 minutes, 50 secondsthat creates hallucinations, right? Um because we also uh instrument the agent
3:583 minutes, 58 secondswith with a lot of tools and tools basically what it means here is for an agent it could be a function right a function called to do something like to
4:064 minutes, 6 secondscall a database to call an API and so on right or to actually do some custom logic.
4:134 minutes, 13 secondsSo because that agent has a bunch of tools associated with it, uh there may be some confusion and um hallucinations based on using the wrong tool, right?
4:244 minutes, 24 secondsAnd in addition to that, we have the problem with governance and auditing, right? The auditing is very difficult
4:314 minutes, 31 secondsbecause um the agent is covering so many things and this again this draws back to
4:384 minutes, 38 secondsany kind of project right implementation that you are doing. Uh and basically um you can't just put it all in one in
4:474 minutes, 47 secondsone class, right? Because then it's difficult to to debug. It's difficult to audit what's going on, right? Um so
4:564 minutes, 56 secondshaving those principles are really really um important in any kind of development effort and because there are
5:035 minutes, 3 secondsso many things, so many instructions, so many tools um there's a high cost and the process is slow, right? Right. So
5:115 minutes, 11 secondsthe high cost is basically agents use uh large language models and to be able to
5:175 minutes, 17 secondsuse them and to actually uh be able to process some information there's going to have to be some kind of uh usage uh
5:265 minutes, 26 secondsin the in the form of tokens to those large language models and that is actually that translate into cost. So you want to minimize that right? You
5:345 minutes, 34 secondswant to minimize that and not have a lot of overhead. So that's one of the uh um problems with today's agent that a lot
5:415 minutes, 41 secondsof companies are facing right now. The other one is the espaghetti code trap,
5:485 minutes, 48 secondsright? What does that mean? So uh some companies realize that they need to build agents, multiple agents so we
5:565 minutes, 56 secondshave we don't have that problem of the monolithic design where one agent is doing all the work. But instead what
6:036 minutes, 3 secondsthey do is uh they build uh multiple agents right so they start refining the
6:106 minutes, 10 secondsdesign there's they start improving on it which is great um and they create multiple agents which is really the goal here but the problem is now that
6:196 minutes, 19 secondsdepending on the approach the architecture you may end up doing some kind of um
6:266 minutes, 26 secondsuh brittle logic right so what that means really is for example you're starting implementing some of these workflows with uh conditional logic like
6:356 minutes, 35 secondsif statements and so on, right? So what you end up doing is you end up creating uh uncontrolled chat loops, right?
6:436 minutes, 43 secondsBecause you really you're trying to kind of uh direct the logic of what to do, what agent to call and so on, right? And
6:526 minutes, 52 secondsbasically you kind of build a a kind of deterministic flow. And what I mean by that is is a one that is coded to say if
7:017 minutes, 1 secondthis happens do that which is really um shifting away from the concepts of um of agents right because the agents have the
7:107 minutes, 10 secondspower to reason and react right which that means is based on the conversation they have power to be able to execute
7:177 minutes, 17 secondssome commands uh to talk to other agents and so on right so they can reason and be able to take action as opposed to you
7:257 minutes, 25 secondsask hard coding the logic. Right? So, so basically um if we don't structure
7:337 minutes, 33 secondsthe orchestration then properly then we don't we just don't have a deterministic execution right which that means is it can be out of place. So we want to be
7:427 minutes, 42 secondsable to use AI right this smart orchestration concept concepts to do that but how do we do that how do we
7:507 minutes, 50 secondsstart thinking uh which is the right way right so let's see that let's see how we do this
7:587 minutes, 58 secondsokay so let's first talk about the how the agent works right um so there is the concept of an agent worker and basically
8:078 minutes, 7 secondswhat this is um in software development this concept is very popular, right? You create certain tools, certain classes
8:148 minutes, 14 secondsand so on, and you create worker um tasks that are focused on one thing.
8:218 minutes, 21 secondsSame applies here, right? We want to be able to create a worker agent that has a single responsibility.
8:278 minutes, 27 secondsSingle responsibility, it's just doing one thing, right? That's a very popular foundational concept on software development. And what that does, it
8:358 minutes, 35 secondsactually basically provides a clear instructions. So instructions are the prompts, right? Be able to tell the
8:428 minutes, 42 secondsagent you are an agent that does this and you have capabilities to do this and
8:488 minutes, 48 secondsthat and right and be concise, be exact, give me the right, don't hallucinate, right? And so on. So the instructions
8:578 minutes, 57 secondsnow become very compact and that's very important now for cost management. cost management you when we pass instructions
9:059 minutes, 5 secondsthe agent has to read it has to pass it to the large language model which is going to process this it's going to try
9:129 minutes, 12 secondsto understand what's going on and follow the instructions right so now this is this is kind of good because now you can manage that single worker agent
9:209 minutes, 20 secondsunderstand um the instructions how much is it costing where is it fail failing and so on so that becomes more of a uh agent
9:299 minutes, 29 secondsthat can be audited and tested very uh easy. Uh it also isolates it session
9:369 minutes, 36 secondsstate so it knows it knows what memory to hold based on what it needs to do not knowing everything that's being done
9:449 minutes, 44 secondsthroughout the workflow but just exactly what the responsibilities uh what the data that is using the instructions and so on. Session state is
9:539 minutes, 53 secondsbasically the memory. Memory to be able to understand what is happening and recall uh the previous uh uh task or sessions that have been executed, right?
10:0410 minutes, 4 secondsAnd of course the session stays just for the one-time session. Once you run it and the session stops and that memory is
10:1110 minutes, 11 secondsflushed out, but it also has dedicated tools. And so instead of having an agent that has like 10 tools to do all kinds
10:1810 minutes, 18 secondsof stuff, calling APIs, calling databases, calling um uh data links and so on, you have a dedicated tool, just that one tool, right? That does this.
10:2810 minutes, 28 secondsYou you use this tool to do this particular activity. And what that does, it keeps your worker concept very
10:3610 minutes, 36 secondsisolated and very focused, right? And the goal here is to kind of be able to have traceability,
10:4310 minutes, 43 secondsgovernance, cost management and control any type of hallucination.
10:4910 minutes, 49 secondsSo that is the foundation of uh of workflows. Right? So um now that we understand what an agent worker is,
10:5810 minutes, 58 secondslet's talk about what is the advantage, right? So we talked about monolithics agents and and they do all this work.
11:0611 minutes, 6 secondsWhat really is the advantage of having multiple agents?
11:1111 minutes, 11 secondsAll right, so let's talk about why do we need to decouple the monolithic agent and create multi-worker advantage or um
11:2011 minutes, 20 secondsagent orchestration or agent workflows, right? So the goal is that by decoupling the the problems and we create a
11:2811 minutes, 28 secondsspecialized workers, we can basically isolate the domain the domain knowledge, right? And we can do things uh context
11:3711 minutes, 37 secondsis isolation which basically what that means is focused just on that. If the focus is to call that API based on some kind of a reasoning then that's all he
11:4611 minutes, 46 secondsknows. It's not really doing Google searches. It's not doing database queries. It's just calling that API right so because he has that domain
11:5411 minutes, 54 secondsknowledge and focus and he has that tool that specialized to do the work. He knows right? he knows that he needs to call the API or he know he knows that
12:0212 minutes, 2 secondshis job is to do a database write access and and be able to query something right query a table or query a view do
12:1112 minutes, 11 secondssomething with that database it is focused just on that so it's not going to go and tell you all of a sudden oh because I Google search this this is
12:1912 minutes, 19 secondswhat what I found right it's not going to do that so it keeps you isolated from those kinds of problems
12:2712 minutes, 27 secondsuh mod uh it is modular and it's easy to test right by just creating a smaller units of work then we can actually just
12:3712 minutes, 37 secondsum be able to isolate that module inject some of the activities like instructions
12:4312 minutes, 43 secondsand tools and be able to easily test it which is the end goal of this uh type of uh activities
12:5212 minutes, 52 secondsokay so how do we do that how what does that look like right so we talked about now that we have multiple workers How does that really look like? So if
13:0013 minutesyou look at that flow here, the orchestration graph, right? We can see that basically the way this this looks
13:0713 minutes, 7 secondsis that we have an orchestration agent and that agent has I can call a an ingestion agent and then an aggregation
13:1613 minutes, 16 secondsagent and so on. Right? So what that means is that uh there's an orchestration agent that builds out the workflow. Right? That's that's what it
13:2513 minutes, 25 secondsdoes and it actually is the one that's responsible for saying based on this information I need to call this workflow
13:3413 minutes, 34 secondsand it will load those those workflow that basically are a bunch of agents that are connected uh and they're able
13:4013 minutes, 40 secondsto go and execute it. Right? So every every node that you see in this graph is basically an agent that is doing a
13:4813 minutes, 48 secondsspecific single responsibility action or task and that's it. Right? So
13:5613 minutes, 56 secondsso now that we know how to build um a orch a workflow based on using a bunch
14:0414 minutes, 4 secondsof agents, how does that look like when it comes to uh building it out, right? Using a using
14:1114 minutes, 11 secondscode, right? using an a an SDK, how do we build that? Right?
14:1714 minutes, 17 secondsSo, and how does it and what makes it different than just hard coding or or implementing if statements, right? And be able to say if this do that, right?
14:2514 minutes, 25 secondsSo, the advantage of creating this this workflows really is that um you can have a deterministic handle, right? So
14:3414 minutes, 34 secondsbasically you can have gates meaning for example in code we do stuff like if this is true that the result is true call
14:4214 minutes, 42 secondsthis other function and so on right um but we want to stay away from kind of hard coding that those conditions and
14:4914 minutes, 49 secondsinstead create an orchestration engine right and be able to put together a series of age worker agents that can
14:5614 minutes, 56 secondsthat can work and react bait on based on previous results right so there's going to be a deterministic handoff. So when
15:0515 minutes, 5 secondsone agent executes depending on the type of workflow which we're going to cover in a little bit um it can read the
15:1315 minutes, 13 secondsoutput and then can say yes I execute or I stop immediately because there wasn't
15:2015 minutes, 20 secondsa failure. Right? So the way we do this is really by creating um by using composition. Right? composition is a key
15:2815 minutes, 28 secondshere where we actually just define define the the the workflow, the way it connects, the way that it flows, and
15:3715 minutes, 37 secondswe're able to kind of now be very um deterministic on the execution of those agents. Right? So, and to kind of take a
15:4615 minutes, 46 secondslook at how that works, uh you can look at this Python example right here.
15:5415 minutes, 54 secondsWhat this is doing um basically um declaring um instantiating a worker agent. The
16:0316 minutes, 3 secondsworker agent has instructions and it has a tool right queries on computers is a tool that it will use which is just a
16:1016 minutes, 10 secondsfunction that it's going to do and it's got an output key which is going to be used for the other agent uh
16:1816 minutes, 18 secondsthat's going to follow or that is waiting on on that output to be able to determine if it should continue or not.
16:2616 minutes, 26 secondsAnd the way we define the uh workflows uh and this is part of the SDK right this is part of the uh ADK to create
16:3516 minutes, 35 secondssignature graph basically is what we're showing here. Um we can see that we define a workflow uh and we define the
16:4316 minutes, 43 secondsedges of it. So the edges is really is the orchestration. So if you see that that's a graph that's actually saying
16:5016 minutes, 50 secondsthis is starting point call this agent and from this agent call the next one and so on and if you see that's basically we're building a graph that
16:5916 minutes, 59 secondsenables us to to execute to orchestrate the workflow basically. Right.
17:0617 minutes, 6 secondsSo now that we we understand right we understand how to create a workflow how do we um what what can we do right what
17:1317 minutes, 13 secondstypes of workflows exist um and what are they for right what's the purpose of that uh so let's take a
17:2217 minutes, 22 secondslook now at the types of workflows and these are basically enterprise patterns right this this apply to anything that
17:2917 minutes, 29 secondsyou do uh of course that they apply to Asian development as well so these are four architectural patterns for building
17:3817 minutes, 38 secondsuh composing agents, right? Um and to execute a business requirement type flow. So we looked at the sequential, right?
17:4717 minutes, 47 secondsWell, what is sequential? Just like you, you know, the word tells us is really a series of steps. So you go A B C D.
17:5617 minutes, 56 secondsThat's the graph, right? If A runs if true, then B runs if true, and so on. So you have an execution that's linear and
18:0518 minutes, 5 secondsevery node executes and they all continue if everything is well then you have parallel execution. So parallel
18:1218 minutes, 12 secondsexecution now means uh they're they're not um in series right meaning they can each can run independently and
18:2018 minutes, 20 secondssimultaneously to basically execute a task like for example aggregating results and you use this for example
18:2818 minutes, 28 secondswhen you just need to call out multiple agents to be able to get data from different sources. Maybe you want to get
18:3618 minutes, 36 secondsdata from a from an inter internal database, call an API or do a Google search. So all those three agents
18:4418 minutes, 44 secondsbasically will execute in parallel, bring back the information and the aggregator will put it all together for the final output.
18:5218 minutes, 52 secondsAnd then you have loops, right? So loops is uh is uh it repeats the worker activities until a threshold is met or a
19:0019 minutescondition is met. Basically you loop until you hit c a mark a marker. The marker would tell you yes you reach do
19:0819 minutes, 8 secondsyour maximum number of repeti uh rep repetitions or basically you um you got
19:1519 minutes, 15 secondsthe value you were looking for right and it could be like a calibration type task where you're actually calibrating some
19:2219 minutes, 22 secondsprocess to be able to get to a stable condition and so on. So and then we have custom router. This is a little more
19:2919 minutes, 29 secondsadvanced and basically what this uses it uses user intent to dispatch queries to a spec specific target. So what that
19:3719 minutes, 37 secondsmeans is uh here the agent is actually going to be able to understand based on the user intent to call go do a Google
19:4619 minutes, 46 secondsquery for example because the user intent can be hey can you search this for on the internet and it will do that
19:5319 minutes, 53 secondsor it can say oh can you search for my products that we have on inventory and so it will know to go call the um the
20:0320 minutes, 3 secondsagent worker that knows how to go in internally to your systems and fetch that information. So as a custom router and all of these combinations can all
20:1120 minutes, 11 secondsalso be orchestrated. So you will have a master orchestrator that calls a parallel process which uh subsequently can call a sequential process and so on.
20:2420 minutes, 24 secondsOkay. So now that we we understand right we understand the process we understand how they work um let's talk about um
20:3420 minutes, 34 secondslet's let's take a look at this live right let's let's see how this works live and use um a use case. So right now
20:4220 minutes, 42 secondswhat we're doing is we're looking at a multi- aent workflow that's going to do it's going to actually do some analytics
20:4920 minutes, 49 secondsfrom a data warehouse. The diagram that you see in front of us really is kind of showing the workflow patterns and it's
20:5720 minutes, 57 secondsactually showing a orchestration kernel, right? Which that that all that means is really is that central um agent, a
21:0621 minutes, 6 secondscentralized agent that actually knows which uh workflow to to execute based on certain condition. But the goal here in
21:1421 minutes, 14 secondsour example, so you have some background on this, is that we're going to uh execute a series of uh queries that are going to give us some analytical data.
21:2321 minutes, 23 secondsSo we're able to do some analysis, be able to do some uh BI, business intelligence, and be able to do some kind of output to the to the user to
21:3321 minutes, 33 secondssignal something, right? whatever if there's something trending um analyze the u the uh the the amount of traffic
21:4221 minutes, 42 secondswhichever is the use case that you're using in our case what we're using is we're using a system
21:4921 minutes, 49 secondsum that I use for the book I wrote on data engineering process fundamentals and I'll show you that uh because it's important to have a little background on
21:5721 minutes, 57 secondswhat we're trying to build and I'll show you that just now Um
22:0422 minutes, 4 secondsso so here um what's important here is the a couple of things. So first of all
22:1022 minutes, 10 secondsis um foundational uh information here is that when you go the stuff I do right
22:1722 minutes, 17 secondsso is about data warehousing and using AI to be able to leverage that. So here what you're gonna see if you go to this
22:2522 minutes, 25 secondsrepo here um and you can just click on the QR codes on the presentation it will take you to my site and then you have
22:3222 minutes, 32 secondsaccess to these things but but the goal here is to kind of create a geo fencing type technology and basically we can do the oldfashioned way right we can do
22:4122 minutes, 41 secondsdashboards like this and I can show you that here uh this is a powerbi type uh
22:4822 minutes, 48 secondssystem this is lucer uh and basically this gives you the analytics, right? It gives you the traffic, the total
22:5522 minutes, 55 secondsinterest and so this is domain knowledge for a particular business, right? Uh you don't have to sort of understand the the
23:0323 minutes, 3 secondsdomain uh business rules and so on. Just understand that this is just simple analytics. This is how we do it. Uh this is how we display it on a chart. But if
23:1223 minutes, 12 secondsyou want to go deeper deeper into this and kind of say, "Hey, I want for the the Lexi Lexington station to be able to
23:2123 minutes, 21 secondsunderstand more, you can actually use a AI agents to dig in deeper into the data and do the analysis for you as opposed
23:2723 minutes, 27 secondsto you digging into the data, doing queries, Python scripts, and so on." And that's the goal. That's what we're going to kind of mirror right now in our
23:3623 minutes, 36 secondssystem. Right? So you have this take a screenshot if you want data engineering MTA I I'll put the link in chat also
23:4623 minutes, 46 secondsum uh right so that's that so what I wanted to share with you now here is this is
23:5423 minutes, 54 secondsthe repo you want for the uh for what we're going to cover right now the code right and you can read about it this
24:0224 minutes, 2 secondsrepo it's all about building agents building AI and for the different use cases so this on here is going to show
24:0824 minutes, 8 secondsyou um we have articles and videos that can you can relate to to get more understanding. So I want you to know that this is there's a lot of coverage
24:1724 minutes, 17 secondson this repo. Um and you can use this to be able to follow the code at your own time and be able to see some of the
24:2524 minutes, 25 secondsstuff that we built. Um and you you can actually um because this is so fast, right? This is short and fast and there's a lot of
24:3324 minutes, 33 secondsinformation. So what you're looking for is you're looking for the ADK folder and the ADK folder. There's a lot of use
24:4024 minutes, 40 secondscases here, right? Uh for security, memory, and so on. But here we're looking at the workflow agent. So you're
24:4824 minutes, 48 secondslooking at this workflow agent folder, right? And this is where the code resides for this type of stuff. And basically you can read some of the
24:5624 minutes, 56 secondsbackground and some of the information that is relevant. So you have more understanding of how this works and how we do this. Okay. So this is important.
25:0525 minutes, 5 secondsSo I'm just giving you this so you can kind of um follow this and and and and you'll be able to read it and get more
25:1425 minutes, 14 secondsinformation. I'll show you how the code looks in a minute. Also, I wanted to add that you can actually go to my website here also and what you're going to get
25:2225 minutes, 22 secondshere is you're going to have get articles and stuff about AI, data engineering, uh, web development and so
25:2925 minutes, 29 secondson. Okay. Okay. Okay. So, let's take a look at the code now.
25:3625 minutes, 36 secondsAll right. So, so this is just Visual Studio. We're talking about um this is the file that I was kind of showing you the readme file for that.
25:4625 minutes, 46 secondsAnd we're looking at the ADK folder here. Um, right. And you you have all this information as a guidance of how this
25:5525 minutes, 55 secondsworks and how to run kind of understand the architecture behind it. Right. So let's let's kind of look at the code right now because this is really the the part that we want to be able to cover.
26:0526 minutes, 5 secondsUm, and what we have is we have um the uh worker agent, right? So now the worker agent, if you notice there's a
26:1326 minutes, 13 secondsworker agent on top of it, right? So we talked about worker agents and worker agents really what that is is is
26:2126 minutes, 21 secondsbasically um is using the base agent. It inherits from our base agent definition which handles some of the internals for
26:2826 minutes, 28 secondsit like for example what model to use and what special re rules are centralized for the platform.
26:3526 minutes, 35 secondsSo we use a object object- oriented type concept with inheritance to be able to give it the uh the base uh information
26:4526 minutes, 45 secondsto the agent. Right? So this is the worker agent. So this is what we're going to use uh because it uses some of
26:5126 minutes, 51 secondsthe special concepts or uh isolation. So we can pass single instructions, single context and so on. So that's so that is
27:0027 minutesour foundational uh um basically building block. But if you go to now to the workflow agent,
27:1027 minutes, 10 secondsyou go to the workflow agent, you can actually go and look at the uh uh agent uh file here. And this is really our
27:1827 minutes, 18 secondsorchestrator, right? You can read all the information here. Um and and we see the workflow agent and this one inherits
27:2727 minutes, 27 secondsfrom the secure tool agent which is also following the concept of inheritance and secure tool agent is responsible for
27:3427 minutes, 34 secondsreading instructions and applying some security and cryptography to make sure there are no exploits in the system.
27:4127 minutes, 41 secondsRight? The workflow agent is job is to basically orchestrate the workflow based on uh business roles. Right? So what it
27:5027 minutes, 50 secondsdoes it actually calls a workflow factory um to get the strategy right so and the strategy basically is are we
27:5827 minutes, 58 secondsrunning a sequential flow parallel flow or and so on right that's that's how we orchestrate this so as if we pass the
28:0528 minutes, 5 secondsmetadata then it knows what to call what to load and then you you don't have hardcoded uh logic right like if conditions and so
28:1328 minutes, 13 secondson so this is kind of fundamental and when it comes to uh um
28:2028 minutes, 20 secondswhen it comes to uh um building software, right? So, and we'll address some of the questions. Okay? Um bear
28:2828 minutes, 28 secondswith me. I just going and um be able to show you some and discuss some of the the questions in detail, but
28:3628 minutes, 36 secondsI just want to guide you through the code and we'll won't spend too many time too much time build running all of them because it takes time. So but but the
28:4328 minutes, 43 secondsthe key here is that for example let's say this agent is going to build it's going to call the factory and the factory is going to say um build me the
28:5128 minutes, 51 secondssequential workflow right so what you will look here is that you will have workflows there's a workflow folder here and you
29:0029 minuteswill look at the sequential file sequential file now is purpose is to create just to create the the workflow that
29:0929 minutes, 9 secondsthat we're kind of orchestrating right uh in orchestration basically uh is really not federation. This
29:1729 minutes, 17 secondsfederation is a is a different concept that I'll talk to you about. Federation is mostly anything that governs everything, right? Like for example,
29:2529 minutes, 25 secondssecurity uses federation. So you loging only one possible way for multiple apps.
29:3129 minutes, 31 secondsOrchestration is really just a way to coordinate workflows really, right? And execute them. That's all that that really means. Uh but okay, so this one says build sequential agent, right?
29:4229 minutes, 42 secondsThat's what it does. Um and then how do you build them? We saw that a little bit on the slides. We have the worker agent.
29:5029 minutes, 50 secondsNow we instantiate the work worker agent with some instructions, some other tools, right? And output key. So here
29:5729 minutes, 57 secondswe're really just building out the instantiating the multiple agents, right? Because we need to we need to be
30:0430 minutes, 4 secondsable to create that those agents and be able to when we when we start the process to have those instances right
30:1230 minutes, 12 secondslike classes think about like it's just a class right it's just really we have the the instance of that class in memory so it's able to execute it so we have
30:2130 minutes, 21 secondsall these agents that are executing and the way we basically build the workflow as we saw on the slides is that we
30:2930 minutes, 29 secondsdefine this sequential process and this is you can See it's just saying uh start with this agent and then chain them
30:3730 minutes, 37 secondstogether. So this is a graph. This is a sequential graph. Now if you wanted to see a parallel graph, so we look at the
30:4530 minutes, 45 secondsparallel file. Same concept, right? It builds a uh agent workers, multiple agent workers.
30:5430 minutes, 54 secondsAnd then when we orchestrate them, we basically um create another workflow.
30:5930 minutes, 59 secondsAnd then we're giving it we're giving it like a condition of different nodes, right? So we're saying a star, but we see we're saying just you do this
31:0831 minutes, 8 secondsparallel flow midtown analyst, queen analyst and so on. Also Midtown Queen analyst to downtown analyst and join
31:1631 minutes, 16 secondsthose nodes. So we kind of join them those activities right in parallel. And you can just read the ADK for more information because the structure is
31:2431 minutes, 24 secondsreally just designed to be able to say this is not a process that's really going to run in series. It's just really going to be able to join the nodes and run in.
31:3631 minutes, 36 secondsSo that's really what it's saying. It's saying from this flow and that flow join them, right? And then do the the merge of those. And what that does basically
31:4531 minutes, 45 secondsjust runs them in parallel and promises are spin-off and you're just waiting on the promises to come back.
31:5331 minutes, 53 secondsSo that is and then you have the loop agent and the custom agent. And the loop agent is another one that just basically
32:0032 minutesuh has the concept of a loop, right? Uh you design the workflow, you pass the agents you want, uh you evaluate the quality of that, the conditions, right?
32:1032 minutes, 10 secondsThe exit conditions. um and based on the exit condition uh then you quit or you continue until you reach that particular
32:1832 minutes, 18 secondscondition. There's a lot of stuff to be able to kind of just read the details here and how that works, what condition we're looking for and so on. And that's
32:2732 minutes, 27 secondsreally important, right? To be able to kind of read um how this is put together. And I'm just giving you a very an overview how that works and why you
32:3632 minutes, 36 secondswould do this. But let's just kind of now take a look at how we we can run this, right? So basically you can run
32:4432 minutes, 44 secondsthis using the ADK, right? You can use the web tools or you can use the CLI and basically what you will see is you'll be
32:5232 minutes, 52 secondsable to read this from the it will be able to query run the the workflows, be able to query or do the analysis that
33:0033 minutesyou need and you'll be able to do anything uh that the agents are supposed to do. what I'm doing right now and this is in the instructions. You can read all
33:0933 minutes, 9 secondsthe stuff in the instructions how to run it and so on the multiple ways. I'm just running running the interactive using Google Anti-gravity.
33:1733 minutes, 17 secondsThat's really what I'm doing. So, what I'm saying is, hey, anti-gravity um just go ahead and run this workflow for me.
33:2433 minutes, 24 secondsAll right? And load it into memory. Run it for me and I'm just going to send you a query to be able to do the analysis.
33:3233 minutes, 32 secondsSo basically what happens at this point once this is loaded the agent is loaded it's going to go into like a prompt mode right and that's just for evaluation in
33:4033 minutes, 40 secondsreal life you when you execute the workflow you executing a particular command to say hey give me the pig flow
33:4733 minutes, 47 secondsfor this region right and that's part of your triggering uh logic to be able to trigger that and you'll be able to go
33:5533 minutes, 55 secondsahead and run your workloads here we're doing it interactive because it makes sense that way. Otherwise, it
34:0334 minutes, 3 secondsjust gets a little confusing, right? But here, basically, anti-gravity, if you're not familiar with with it, is just really a CLI
34:1134 minutes, 11 secondsum code assistant um that you can actually use to be able to run commands, CLI commands, and so on and generate
34:1934 minutes, 19 secondscode and and do things like that. But you don't need to use that, right? You can use just the CLI straightforward
34:2634 minutes, 26 secondsand and be able to run it. But I use this one because it formats the output a little nicer and it's easier easier to
34:3434 minutes, 34 secondsfollow. So what is what the output is saying is that um it actually is able to run the agent and you can see at the
34:4134 minutes, 41 secondsbottom it says my workflow agent is running and I'm running the sequential agent right it's running and it's saying hey you got you know this is what it can
34:5034 minutes, 50 secondsdo uh and now I'm ready for the for the for the command what is that you want right what is the user intent so what
34:5834 minutes, 58 secondswe're going to do here is we're going to say analyze the the peak commuter flow for Midtown Manhattan And what we're just saying here and this
35:0635 minutes, 6 secondsis what gets injected like if you run it as a task you inject that uh you inject
35:1435 minutes, 14 secondsthat uh basically prone to be able to say what you want to do and what this does right it understand it has uses
35:2235 minutes, 22 secondsskills to understand what the business concept is right and then what it does it goes and it says okay for this I need
35:3035 minutes, 30 secondsto query this and look for that and it starts doing that work and putting all the data together. Right? So, as you can see here, it's showing us that it's
35:3835 minutes, 38 secondsdoing ingestion. It's it's doing a slot aggregation uh big window analysis. In each one of those steps is an agent, an agent that's
35:4735 minutes, 47 secondscoming up, doing its work, returning the output, uh and the next agent is basically engaging, right? And the output is here, right?
35:5735 minutes, 57 secondsSo, star is just telling us, right? So it's saying, okay, so here's the the output of the the agents. Um, and it's telling us downtown um, Midtown Manhattan was fetched for these areas.
36:1036 minutes, 10 secondsUh, we have an afternoon and midday.
36:1236 minutes, 12 secondsThese are the observations evening rush, morning rush, right? And we get more analysis based on our domain
36:2036 minutes, 20 secondsknowledge, right? So, so don't try to understand what this is telling you in the sense that because you know you probably don't understand the business
36:2736 minutes, 27 secondsconcepts for this. Just try to understand the principle and the uh the concept of what we're trying to do because when your job and whatever you
36:3636 minutes, 36 secondsdo, you probably have the domain expertise to be able to do this and get the data that or the analysis that you're looking for. And the idea here is
36:4336 minutes, 43 secondsthat instead of looking at at a tool like looker, PowerBI, we're using the power of AI to be able to say, "Hey,
36:5136 minutes, 51 secondsthis is the type of analysis I need. Can you help me?" Right? So you can see the the the geocomuter mobility bulletin the
37:0037 minutesbulletin here and you can see all the results um and operational insights, right? Operational insights is really now saying, "Hey, how do we manage our
37:1037 minutes, 10 secondsresources? What do we need? I mean, are we having bottlenecks? What's going on?
37:1437 minutes, 14 secondsRight? That's really how you use this in life in in real businesses, right? Um, so you have now an interactive agent that's doing the analysis for you. And that's the really the the goal here.
37:2537 minutes, 25 secondsOkay? You, like I said, you don't have to use uh anti-gravity, you can use the CLI.
37:3237 minutes, 32 secondsUh, this file tells tells us how to do all that. and just think about that this is more of a how do we do this in a
37:4137 minutes, 41 secondsdevelopment type platform but if we were to do this in production of course we pushes to the production environments
37:4837 minutes, 48 secondsand we have triggers that are actually calling this uh command so for example here this is a CLI command uv run ADK
37:5637 minutes, 56 secondsrun workflow agent right and then you can pass the run to the agent so review the code review the repo give us a start
38:0638 minutes, 6 secondsthat helps As a bonus, when you're analyzing your files and you want to look at the class structure and all that, you can use this plugin here. It's
38:1438 minutes, 14 secondscalled co- lineage. I highly recommend it. It gives you a view of what the code reads and how that looks like. So, you
38:2138 minutes, 21 secondscan find this as part of the plugins for Visual Studio.
38:2638 minutes, 26 secondsUm, and download it, install it. It's called code uh lineage and I wrote that.
38:3238 minutes, 32 secondsSo I deployed I pushed that to the to Visual St Visual Studio Code repos.
38:3838 minutes, 38 secondsOkay. All right. So now that we looked at that, let's try to recap and answer some questions. So to
38:4738 minutes, 47 secondsrecap um think about worker uh agents to isolate the the context, the tooling, the instructions to be able to easily
38:5638 minutes, 56 secondsmanage them, easy test them, easy audit them, right? uh a monitor and continuously refactor.
39:0439 minutes, 4 secondsSo as you build your agents, your worker agents, your orchestration, then you're going to start noticing that things are growing. Maybe you overbuild your worker agent is doing more than it needs to do.
39:1539 minutes, 15 secondsSo refactor that, re break it down into another worker agent to keep the footprint of that agent small. Maybe
39:2239 minutes, 22 secondsyour workflow is not correct and in the sense of maybe you need to create two workflows or maybe the flow should be
39:2939 minutes, 29 secondsdifferent and so on. kind of notice that type of stuff and and refactor, monitor and so on. And this is really a
39:3739 minutes, 37 secondsbook I wrote that focuses on that data set domain knowledge and you can join the community following that QR code.
39:4539 minutes, 45 secondsBut let's take a look.
39:4939 minutes, 49 secondsOkay. So let's take a look at any questions we have here. All right. So,
39:5739 minutes, 57 secondsso how you control the process of the worker agents via loop. So, basically is think about uh foundational is just
40:0640 minutes, 6 secondsreally a a loop and think about of a loop when you do a code right there's a condition a matching condition either
40:1340 minutes, 13 secondsyou say from 1 to 10 and then quit or maybe from 1 to 10 unless this condition
40:2040 minutes, 20 secondsis true and then you quit. Same way as I kind of show you briefly on the code there is a function that the workflow
40:2740 minutes, 27 secondscalls and it has those exit conditions so it knows how to avail.
40:3240 minutes, 32 secondsUh no orchestration and federation are different. Federation is really more of a enterprise type concept where for
40:3940 minutes, 39 secondsexample when you log to Google Gmail uh and tools like that that login is a federated security single sign on login.
40:4840 minutes, 48 secondsSo it's it's an enterprisewide directive. Orchestration is really a way to run code uh in a way that you can
40:5640 minutes, 56 secondsthat you understand deterministically how it's going to execute. Right?
41:0841 minutes, 8 secondsAgents on my are agents on my system talking and collaborating with independent agents.
41:1641 minutes, 16 secondsWhen you build your workflow uh and you build your worker agents and your orchestration agents, those are the only agents that are going to talk to, right?
41:2441 minutes, 24 secondsIf you build an agent whose job, a worker agent whose job is to go call a tool and that tool is doing an agent to
41:3241 minutes, 32 secondsagent integration, yes, it's going to work with agents outside of of your workflow. If that tool if that tool just
41:4241 minutes, 42 secondscalls an MCP server, right? MCP server for discovery and be able to do agent integration then it's using that tool.
41:5041 minutes, 50 secondsSo the answer for that is uh your orchestration agent only loss your worker but if you if the tool is calling some other external agents that's
41:5841 minutes, 58 secondssomething you should know right because you're building that tool. So uh so and if it is part of the business rule then you do that but what you cannot do is
42:0642 minutes, 6 secondsallow the agent to sell to say go research on Google anything and call anything you find because that's going to generate hallucinations and other problems.
42:2342 minutes, 23 secondsWhat is a workflow basically uh is the workflow script. Uh so think about building workflows and different technologies like maybe databases or
42:3242 minutes, 32 secondsjavascript python code applies the same for agents right is it's a way to basically create um a series of steps
42:4042 minutes, 40 secondsthat are connected and execute based on conditions. So in the case I show you on the code um is in u it's a workflow
42:4942 minutes, 49 secondsdefinition where we're actually saying for this workflow use this agents and use this design flow right and that the flow is sequential parallel and so on.
43:0043 minutesSo in a way is it a script it's really a orchestration um design right or metadata that is used.
43:1043 minutes, 10 secondsSo if you use tools that are no code tools, what you will you see in the no code tools are interfaces like this one
43:2043 minutes, 20 secondshere on the graph and you will be able to drag and drop agent nodes and that's how you connect them, right? And that's
43:2743 minutes, 27 secondsbasically what that does. It just generates a metadata YAML type script.
43:3243 minutes, 32 secondsSo when the when that definition is loaded it will run that sequence and through code we basically do the same right. So
43:4143 minutes, 41 secondsthose tools that are just no code tools in reality what they do is they kind of just build this behind the scenes and they know how to read the metadata the YAML file and be able to execute them.
43:5243 minutes, 52 secondsBut in this example, in the repo that I show you, this is how you do the workflow, right?
43:5943 minutes, 59 secondsYou define the workflow and you tell it all the agents that you need to execute.
44:0744 minutes, 7 secondsUh all right guys, uh thank you. I think we reach our uh our time here. Um
44:1744 minutes, 17 secondsthank you for attending guys. Uh please follow the repo, start the repo. That helps a lot to helps keep growing this.
44:2544 minutes, 25 secondsUm join the community, join uh scan that QR code, please join my uh website. I publish a lot of articles. I just published one last week about prompting.
44:3644 minutes, 36 secondsUh read it's pretty good. Uh gives you um basically patterns to be able to use prompting and engineering in uh AI.
44:4644 minutes, 46 secondsUh so basically it's very very good and then you get notifications of new events and new articles that are posted. So
44:5244 minutes, 52 secondsplease do that. Just follow me on on on uh follow the website, follow me on
44:5944 minutes, 59 secondsTwitter, please join the newsletter also. It's right there. Take a screenshot or just do the QR code and it will take you there and you'll have all the links for that. Right? Follow me on
45:0845 minutes, 8 secondsGitHub too. Follow all the repos. So we have data engineering, AI engineering, machine learning, uh and web
45:1545 minutes, 15 secondsdevelopment. So thank you guys. Thank you for the time. I really enjoy doing this and please follow me so we can grow
45:2445 minutes, 24 secondsthis community. Okay. Thanks a lot, guys. And also um the YouTube channel, right? Just support the YouTube channel.
45:3245 minutes, 32 secondsUm, so by I'm once this is finished, I'll send emails for the recording uh the links to the article that's going to be published that goes with this video.
45:4245 minutes, 42 secondsUh, and please uh follow the YouTube channel if because if you don't get the email, the YouTube channel will send you a notification that we're going to have a live session. Okay. All right,
45:5245 minutes, 52 secondseveryone. Thank you. Thank you and have a wonderful day. Thanks a lot.