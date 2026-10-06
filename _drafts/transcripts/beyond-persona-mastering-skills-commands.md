---
title: "Beyond the Persona: Mastering Agent Skills and Commands"
date: 2026-09-12 12:00:00 -0400
event_date: 2026-09-30 12:00:00 -0400
last_modified_at: 2026-09-12 12:00:00 -0400
location: "Online / Live Stream"
rsvp_url: "https://www.ozkary.dev/events/2026/beyond-the-persona-master-skills-and-commands/"
header:
  teaser: "../assets/2026/ozkary-beyond-the-persona-master-skills-and-commands-sm.jfif"
  teaserAlt: "Beyond the Persona: Mastering Agent Skills and Commands"
image: "https://www.ozkary.dev/assets/2026/ozkary-beyond-the-persona-master-skills-and-commands-sm.jfif"
excerpt: "Use skills and commands to bring AI Agents into real data engineering workflows—handling shifting ingestion feeds, inferring schemas, and standardizing lakehouse partitions."
toc: true
---

# This is the youtube video script. Create a post with this information.


Hi, welcome uh welcome everyone to today's presentation.
0:06
Today we are talking about beyond the persona mastering agents
0:13
skills and commands. So I'm pretty sure you have you are familiar with agents now is the big thing going on right now.
0:20
Um but uh some of us may not be aware of what do they mean by skills and commands
0:27
but um basically um to simplify the concept really what's
0:32
going on as we build more agents and we start um leveraging AI technology
0:38
um we actually realize that um just like any other technology right we need to
0:44
enhance it we need to improve it and use it much better so so what's going on what's happening is that a lot of the
0:51
new development that is taking place um they just forgot to follow some of the
0:57
old-fashioned design patterns that are established for us to be able to do high
1:03
quality software. Right? So, and so skills and commands is uh basically as a
1:09
feature that provides us with the ability to use design patterns and we'll talk more in detail as we get deeper
1:15
into the presentation uh on how to use them. Right? So the whole idea of this
1:21
uh presentation is to kind of look at um how we are building out some of these agents and how basically get what not to
1:29
do and how to improve improve them. So we're building out on previous concepts
1:34
that we talked about and you can see some of those on uh on the YouTube uh
1:40
podcast. But uh basically here we're taking a monolithic agent, right? So, it's heavy,
1:47
it's loaded, and we're going to enhance it, and we're going to use some of our design patterns to do that, and also
1:53
address some of the concepts about AI agents and so forth. So, welcome to today's today's presentation. My name is
2:00
Oscar Garcia. I'm really glad to have you here. I hope you enjoy this presentation. Um, I'm basically I'm a
2:06
principal software engineer and I focus on AI data engineering projects uh for
2:12
cloud platforms. uh and I'm also the author of the book data engineering
2:17
process fundamentals uh please take a look uh you can find it
2:22
in Amazon um but glad to have you now you can see me in real time uh thank you
2:28
to be here um all right so session the agenda right so we're going to briefly
2:35
talk about this monolithic agent and what are the problems associated with it and as we get deeper through the process
2:41
then we're going to start talking about the skills the commands and we're going to you know use a real real uh use case
2:48
right because uh to make the to drive the concepts better um it's always is
2:54
good to just use something realistic right so something that all of us uh are working on and we can actually relate to
3:01
so okay so let's start with this monolithic agent right um and it's basically an anti-attern why why is it
3:10
what's going on so what happens is u we tend to build our agents and we tend to build the prompts, right? You're
3:16
familiar with with the prompts and and loading them into the agent and the agent connects to uh large language
3:23
models um and is able to do the work that you're asking it. So this is fine
3:29
conceptually, right? That's how it works. But in enterprise or a real
3:35
production quality is really it it can create problems, right? Because what happens is um as we provide all these
3:42
prompts to the agent right uh we can provide too too much too much information that may not be relevant and
3:49
what I mean by that is so for example think about when you we're building software right we don't go and create
3:55
one class to to do everything right so let's say let's let's think about the
4:00
domain um driven design pattern right so the domain driven design pattern we
4:05
focus on a particular domain and we create classes for that whether it's customers you know whether it's um
4:13
stations or whatever those domains are for your product then we go into that so
4:19
we build it in that concept right domain driven concept or object-oriented
4:24
concept and so it's actually single responsibility and very small so that's
4:29
the approach really that we want to take uh for this type of uh uh development so
4:34
the same applies for AI those concepts are not lost um as a matter of fact they're actually
4:40
something that we should leverage. So we try to eliminate this context bloat right by actually now creating um this
4:48
prompts uh in a in a better way as opposed to all of it in one file which is just really becomes very messed up
4:56
right and what that causes too is the more context you give it it actually generates more talking burn. So
5:03
basically you know everything that you do with large language models is going to spend it's going to burn some tokens.
5:09
So you try to minimize it. So for example why load so many instructions or something that you're not doing right
5:16
something that's not relevant to your process. So um also we have the concept of in this instructions we may have uh
5:24
the concept of uh type vendor coupling and what with that what we mean is so
5:29
for example you may have a distributed system and your system may use SQL server bigquery snowflake right you're
5:37
not going to dump all those instructions in how to connect to them and how to work with them and so on in a single
5:43
instructions it's just too much and it may not be relevant because in your particular workflow, you may be just
5:49
dealing with a SQL server, right? As a wide low BigQuery or Snowflake type um
5:57
prompts, right? It just doesn't make sense. So, that is how we need to fine-tune this, right? Um we need to be
6:02
able to use the right tools, the right MCP tools to be able to connect to the right uh resources um just for when the
6:11
use case actually needs it. Okay. So, how do we deal with this, right? How do
6:16
we deal with this? We move on from one single massive instructions. Uh it has
6:22
everything in it like uh domain um driven design specifications and
6:28
governance and tooling and and and whatever and what have you, right? All
6:33
of it loaded. How do we break this down? So we move on to the concept of skills.
6:40
That is really what the skill really helps you create this concept of um
6:47
domain driven development in a way, right? Because what it does, it really tells you create a skill that just
6:54
covers that specific domain, right? That specific knowledge. So this
7:00
is really where the knowledge is for your business specifications, your requirements for that one single single
7:08
responsibility area as opposed to a massive blow of information. So knowledge really, but
7:15
what does it look like, right? What does what is it? Is it a class? What what do we use? What are the artifacts for that?
7:23
So really in reality, it's just a manifest file, right? is is just really a markdown file that has the
7:29
specifications that are relevant excuse me for that specific area.
7:37
It gives us a modular uh boundary knowledge which is the domain driven
7:42
specification right domain domain driven design and it's really gives the
7:47
semantic judgment. So really what that uh basically tells us is that we we tell
7:53
it what it needs to do right we tell it hey uh when you are processing this type
7:59
of information you need to execute the following you need to do this that's where you really are building out some
8:04
of the business uh requirements in there but um so you actually define what the
8:11
output should be um what is it that is what you expect from it right so here
8:16
usually skill is something that you use to be able to say um for you to is for
8:22
the agent to understand that domain detail be able to say when you face this type of um data for example build this
8:30
out right so in in our case we're going to be looking at a data pipeline and
8:35
we're going to be able to say that if there is uh a new schema that the system
8:41
does is not aware of the agent will be able to use a skill to be able to understand it and be able to propose ose
8:49
uh the DDL uh to build the tables or the external
8:55
tables in the data warehouse. Okay. And you'll see more of that as we move forward. And the beautiful uh area here
9:02
is because nanosclls are broken down to into single responsibilities right
9:09
areas. So we don't have to be loading everything. We just need to load the skills that are needed. So and how do we
9:16
do that? How do we do dynamic loading and agnostic dynamic loading? So, so the agent is really just your kernels, your
9:23
engine, right? And it just needs to know the skills and it needs to know some of the um things that it needs to
9:29
understand and create. So, what we do is we can use for example uh dependency
9:35
injection. If you remember that other design pattern, we can use dependency injection to inject the skills that are
9:42
needed for that particular area. So when we define the agent and we create the
9:47
agent instance, we can inject some of the skills that are for a particular business process and now your agent
9:54
kernel is lighter. Doesn't have to load all this information, right? So think about those principles that we already
10:01
know and they're applicable here the same way. All right. So we understand a skill. So
10:08
so what about commands? So let's move forward with commands, right? So what are they? So commands represent what the
10:15
agent can do. Okay. So what do you mean by that? Okay. So the one of the biggest
10:20
problems with AI and agents is that they can hallucinate, right? So basically if
10:26
you go and just tell uh an agent or or use a large language model and you tell
10:31
it, hey, I have this schema. Can you just go and run this query? um if you run that query if you run that
10:38
prompt um five times you you may end up with five different queries right it's
10:44
really not deterministic the pro if you just go straight like that into a large language model it may
10:50
it may not be deterministic it may change the field names the data types right the the execution is not the same
10:57
so that's where you know where and that's just wi with smaller h variance
11:04
of the the the the queries for example or anything else that is building. But
11:10
imagine if he just completely goes off his rockets and he goes and he does something completely different, right?
11:15
That's that's the problem with hallucination. So commands gives you gives you those guards, right? It gives
11:21
you a predictability on what the agent is going to do and you give that as a tool to the agent. So well so it is en
11:30
it's able to really create something deterministic like the way you want external tables to be created views to
11:36
be created store procedures and so on and this is the pattern to use to be able to control the uh the agent from
11:44
hallucination and also from burning a lot of tokens right that's a big issue as well so this way you're deterministic
11:50
you save your tokens and you can swap your strategy so which is another design
11:55
pattern right so one of the design pattern patterns is that [snorts] you want to create like u uh factories,
12:04
right? Uh data factories and and and strategies to be able to connect to
12:09
different resources. So for example, instead of connecting to SQL server, you connect to uh uh maybe BigQuery or uh uh
12:19
snow you know snowflake or whatever the engine the data warehouse engine that you're using or database then you have
12:26
that ability. So that is great. So that way you don't need to load the agent with all these tools if you're just
12:31
working on a BigQuery environment, right? So um and it also helps you now
12:39
have this channel instead of you connecting directly to these resources, you use the MCP,
12:46
the model context protocol to be able to run those commands, right? So the tool the commands really are a way for you to
12:53
control the execution of your actions and connect directly to the MCP tools to
13:01
be able to e to um um connect to those resources. So if you if you kind of
13:07
follow what I'm saying is the skill never does that right skill only defines certain metadata for what we need to do
13:14
but the commands actually do the execution. But how do they work together right? How
13:19
do we do this? Um and what kind of examples can we use to
13:25
s to really drive the concept uh right
13:30
clearly. So let's take a look at a real world example. Um my book I talk about
13:37
data engineering process fundamentals talks about the process of data engineering and I use a data set from
13:42
the MTA transit fee which is the New York subway system. Uh so so the example
13:49
that we're going to take here is that we do have a schema that works at um that's
13:55
predefined and it's working and you know we can load new data as the data arrives but what happens when there isn't a map
14:02
schema that comes in right so we have a pipeline and it's loading new schema
14:08
definition new files everything goes into the data warehouse and it's ingested properly no no problem but
14:13
there is a version two right there's a variation on the schema [snorts] that basically threatens to break the process
14:21
because of course it has changed. So, how do we deal with that? And how do we deal with that using using AI, which is
14:28
the key here? That's what we're trying to figure out. How do how to really leverage AI for our purposes
14:36
or for real use cases, right? Um, so we right we design our agents so they
14:44
can detect that there is a schema drift u on our files, right? And and the idea
14:50
is that now we can use a scale that is relevant to this MTA data set to be able
14:55
to understand clearly what happens why did it drift why is it different or what is different right what fields have
15:01
changed and so on because it has that expertise it has that skill to be able
15:07
to manage MTA data then we're going to leverage that to do that but remember
15:13
this is agnostic right so it could be right now it could be that but also it could a a telemetry system from a from a
15:20
factory or something else from sales. The idea is that because it's going to be agnostic to the process. Um that's
15:28
where we leverage skills, right? To be able to now we're using this use case use this for for that purpose. So and as
15:36
always we have security in mind. So we need to use pre hooks um to be able to
15:42
get the process approved by a human. So remember the whole um security one of
15:47
the biggest problems is that agents are going rogue and doing whatever they need whatever they want to do. But here we
15:54
need to um intercept anything that is any operation that goes into a data warehouse. we use what's called a
16:00
preview hook that basically raises a a warning and it says hey um you're trying
16:07
to create a new table or you're trying to drop a table uh and this is a higher
16:13
um priority type request you need to approve it by a human. So this triggers
16:18
the concept of human in the loop that sends this request to the person and
16:23
does that work. Okay. So uh so and the idea is that now we can
16:29
use this command strategies to be able to determine what is the technology we're using and let's use that tool.
16:36
Let's use uh MCP tool to be able to connect and do the work. So the idea is that that is really what we're trying to
16:43
achieve. So let's look at it from a very high level and see how the system actually is going to be moving. Right?
16:49
So this is a decouple AI agent architecture because um it's really
16:54
there's no hard-coded domain knowledge or expertise. Everything is driven by skills and commands. That's the beauty
17:00
of it, right? That you can use those uh that that information and those tools to
17:05
be able to do what we need, right? So the example here is if you see we have
17:11
uh we have a data lake and it has data sources has the MTA raw data and has
17:17
sensor payloads, right? which is another type of data set completely different than MTA but this is to illustrate the
17:22
example and usually our agent can detect schema drift based on that. So we have a
17:29
data lake that's fitting the data. Our skills are looking at this schema definition and and identifying that
17:35
there is a drift that there is a difference. So we have a telemetry skill, we have an MTA skill and so on,
17:42
right? So we have the different skills for the different um do domain driven design context, right? That's the that's
17:49
the beauty of that. So our our agent kernel is agnostic because based on what
17:54
we inject uh skills that we inject it knows how to operate right. Um and then
18:00
it knows how to erase the concept of uh human in the loop because the skills are
18:05
saying hey if you need to drop a table create a table you got to do some of this stuff and it has that expertise
18:11
that governance around it. So it does the the preuse tool governance uh gate
18:18
right and also then it if that's approved it goes into the um the
18:24
commands right the commands for for example if it is a bigquery command or snowflake command it goes into that
18:31
command to call to to use it to execute uh the actual query or the changes right
18:37
and this is applicable to everything right not just databases but or data warehouses but al also other systems.
18:44
Um, and those commands connect through the MCP tool set layer. And within that, you have those pre-use tool hooks to be
18:50
able to say, hey, uh, you're trying to, for some reason, you're trying to delete a table which is not approved. You need
18:57
to approve it as well. So you have that human in the loop uh, concept as well.
19:02
Okay. So this very high level uh, and our demo basically our code looks at
19:08
this. Um so uh um so let's take a look at that and then we go just basically and uh come
19:15
back here and look at the orchestration loop. But in a nutshell this is what's going to happen. We're going to load
19:21
load the the skills and the commands. Uh we a command will help us do what's
19:27
called fingerprint check which is hey are skills uh safe? Have they been altered? Have
19:33
they been changed by someone? So we have that security uh blanket there or gate
19:40
and we load the skills. Um we do the the artifact handoff which is a skills
19:46
generate this metadata to be able to execute into to the target data warehouse. uh we have the approval
19:53
process with the human in the loop and then the deterministic provisioning using the commands that are going to
19:59
actually run those queries into your target um u data warehouse. So let's
20:06
let's take a look at this one. So first of all uh all of this is in the um
20:12
all of this is in the repo. So this is the repo. Uh I added the URL on the comments if you want to copy that. Uh
20:20
but essentially what we have here is a GitHub repo. Uh and we're looking at the ADK
20:27
uh folder and the ADK folder has all these use cases and examples on how to run the different agents. For today's
20:34
presentation, we're looking at the folder uh Scala agent right here. And this is really where you want to look
20:40
at, right? That's that's where what we're going to be running is going to be off of that. But please start the
20:45
project. Uh just give us a start here. um
20:51
on the repo so we can continue to grow this uh and please continue to follow
20:56
the then you get updates on the on the repo. But going back to what we're trying to do, okay, so we talked about
21:03
schema drift from a data lake, right? So, so [clears throat] in this scenario, we have two um buckets, right? We have a
21:11
bucket that has two t two folders. A bucket has the turn style folder. That's
21:18
where we actually have all these files and they have a particular schema definition,
21:24
right? All of a sudden the system detects that there is
21:30
the need for a new feed because there are schema changes uh and we need to now create a new
21:36
folder uh and we need to detect and understand what the schema is, right? So we need to analyze the schema and create
21:43
the resources required to be able to do that. And the way we're doing this uh to simplify it, we're using a zero ETL
21:50
approach. So zero ETL approach what that means is we're creating the concept of
21:55
external tables and external tables. What what that does, it enables us to basically from a
22:03
data warehouse look at this buckets and files and be able to basically parse
22:08
this data and load them um as if they are in a table like if there are there
22:14
is actual storage. That's why why it's called CL because there's really no storage. We're not doing insert
22:20
statements or anything like that. we're just really basically um pointing to
22:26
these buckets. So in this [clears throat] case we're going to be using uh our BigQuery data
22:33
warehouse and in [cough and clears throat] this data set what you see here so this is by
22:39
the way BigQuery this is on Google cloud if you're not familiar with that but this is applicable to everything right
22:44
whether you're doing snowflake red shift uh SQL server uh synapse
22:51
I meant to say synapse uh then then this is how this works right so in this case we do have
22:58
uh an external table definition uh and we can take a look at that and this is the schema right this is the table the
23:05
fields the columns and so on and we know okay so everything everything looks good this is our uh our data set right so so
23:13
we're good so our data set is that is like that everything is normal so you can actually do and do select from as a
23:20
table and and and you're good to go so this is a table that you can query
23:26
basically right so all right so now we have the stage, right? So, we got our
23:31
data lake, we have our data warehouse. [clears throat] What happens next? Okay, so let's let's look at the actual code
23:37
now, right? So, okay. So, let's move on to the code now and and let's take a look at what do we
23:44
mean by um skills and commands and and all that.
23:50
So basically to when you go to this folder right take a look at the skills
23:55
folder and basically you'll see different folders for the different skills right uh so for example we have a
24:02
factory telemetry folder we have MTA uh we have bigquery so if you think
24:08
about it all of this builds out right depending on what you're doing this is you're going to have more and more and
24:13
more skills that's going to give you other functionalities to be able to to
24:19
do what you need to do and what does that look like? So, let's take a look at the MTA.
24:25
Let's look at the MTA folder. Um,
24:31
all right. Hopefully, you can see that. Okay. So, basically, we're just giving it the information, the domain
24:37
expertise, right? the domain understanding of what it needs to do, how it needs to secure the files, what
24:44
the schema definition is, what is the purpose, the scope, the governance. You
24:50
give it exactly what you need to do for this uh specific uh domain, right?
24:58
because this is it's is the domain knowledge that it needs and how to detect um
25:04
uh schema drift understand what the schema looks like and how to build the different things right so this is really
25:11
your sort of business requirement right this is where you are actually uh defining for that domain to be able to
25:19
to basically um for the agent to be able to understand what it needs to do
25:26
okay so that's really how we do this, right? And and now at this point he knows about NTA, he knows about
25:33
telemetry or other other domain expertise, right? And also you have the
25:39
tool skills for the specific tool. So now every tool is going to have certain
25:45
requirements, a certain understanding or how do you want that tool to behave,
25:51
right? And by tool I mean now the actual target data warehouse. For example, in
25:56
this case, this is BigQuery. [snorts] And what we want from BigQuery or any
26:01
other platform you want to use is we want to define the governance rules, right? We want to define the naming
26:08
conventions. We want to define how to build certain things, how to use the column naming, the partitioning,
26:15
all those requirements that usually design requirements that you cannot always do. thing and is geared towards
26:23
how that particular technology works, right? So, this gives you that agnostic mechanism to be able to say this is how
26:30
you work with with BigQuery or how do you work with Snowflake or whatever the
26:36
data warehouse is or whatever that resource technical resources. This is how you break that down and this is what
26:43
you change as you see problems with the some [clears throat]
26:48
behavioral problems that are um is not what you expect. This is the area that
26:53
you need to improve. You iterate, you improve it and you close the gaps. Then the agent will continue to perform. The
27:00
end goal here is for the agent not to hallucinate and for the agent not to burn out a lot
27:06
of tokens, right? That's really the goal here and to control. So you now you you're setting up your boundaries. So
27:13
those are the skills, right? And to simplify, right? It's just a markdown file where we actually write all of our
27:21
specifications in there. So this still follows the specificationdriven design approach, right? It's the same thing.
27:27
It's just really making a more domain driven design type concept. Um okay, so
27:33
we look at let's take a look now commands. What are commands, right? So commands now are actually files uh
27:40
executable code, right? Because you need to be deterministic. If you just tell a large
27:46
language model to run this query uh run this code and build it on the
27:52
fly, then it will probably always mutate. It always change it, right? Change behavior. So you need to kind of
27:58
box in your commands. So in this case, for example, we have um BigQuery commands. Let me
28:06
blow this up a little bit. If we look at this commands folder, BigQuery commands, right? And one command that we
28:13
specialize is this create external table. So we create this command to create
28:19
external table and it's really following the semantics for that target data
28:24
warehouse engine, right? It's basically saying this is how we build this. This
28:29
is how we basically use this um command to build the things we need to do. So,
28:36
so for example, here we're using a class definition that uses our table strategy, right? Warehouse table strategy. And
28:42
that's where this other design pattern comes in because we now can say [snorts] we, you know, we inject that that
28:48
particular strategy uh to be able to make it more agnostic. We inherit from that particular strategy
28:55
to make it more agnostic. So then down when uh when the agent is working then
29:01
the agent knows what uh tool to what tool to use in an agnostic way. It
29:07
doesn't know. It only knows that this is a warehouse table strategy. Doesn't know it's BigQuery. Doesn't know is
29:14
um SQL uh table or SQL server or
29:19
snowflake, right? Your only knows is a warehouse table strategy. So, and that's what it that's what it understand.
29:24
That's what makes it agnostic. [cough] And this is where we actually type in
29:30
the code um and we tell it what it is that we need for it to to create for us.
29:37
And this is what controls it, right? This is really, you know, it it goes to
29:43
go back it goes back to basically what we always do, which is we define the code that we need, right? And this code
29:50
you can build it with AI as well, but you just need to fine-tune it and predefine it, right? So you predefine it
29:56
in a way that now it's a signature. It's really a tool that is well defined and deterministic. So the agent does not
30:04
hallucinate and you always use it for running the commands. So you can take a
30:09
look at the code and understand everything that we're doing here. But this is even though it sounds like hey
30:14
but that's uh counterproductive to to agents it [clears throat] is not because
30:19
um agents build can build this code for you and as long as you now say this
30:25
[clears throat] is really my um uh my production quality tool or
30:31
command. This is what we're going to use every time we need to do this. This is how we do it. then you control how the
30:37
agent does his work 100%. And it's very deterministic which is the biggest problem we have. But
30:44
um but you look at the rest of the commands we can have commands for also
30:51
for um cloud storage, right? So we process file
30:58
uh get file sample all those tools are very determin deterministic to be able
31:04
to for us to be able to get a sample of the file. So these tools are really get
31:09
file sample is a very specific tool to be able to go and say hey go get me the
31:14
new file so let's analyze it right get the file sample let's analyze it and
31:20
let's detect schema schema drift for example right so these are the type of tools that you're going to use
31:28
uh we have a snowflake uh bigquery and so on so the commands are really specific right specific to that area
31:35
that you want how you want control it. Uh and that makes it really important.
31:41
So that way um you always build it with this approach and then the so the agent
31:47
is is agnostic. It only knows again that is a data warehouse table strategy
31:52
doesn't know that it's snowflake in this case, right? And that's how we make it more agn we make it agnostic and we use
31:59
the strategy [clears throat] design pattern. Right? So this is how we
32:05
basically execute this. So how does the agent how can the agent use this? Okay, so
32:11
let's take a look at the skill agent skill agent here. Open the agent file.
32:19
So all these folders here have different agents and always look at the agent file that contains the actual agent
32:26
definition. Right? All right. So let's take a look at this how this works.
32:32
[clears throat] So the same u so we're using also design patterns to build our agent right so
32:39
here in this case we are enhancing we're extending the skill agent by inheritant
32:45
from by using inheritance and taking what the secure tool agent class has and
32:51
basically uh what this the secure tool agent class provides the tooling to to
32:57
connect to MCP uh servers like bigquery or cloud storage and it gives us that
33:05
ability. So what we want is we want for the agent to be able to support those
33:10
tools out of the box, right? So just inherit from that and and we're done with that. But we need to enhance it
33:16
now. And how do we do that? We basically then um inject the the skills and and
33:23
and we set the tools. We register the commands for the uh for the agent. So
33:29
the agent already knows about for example instructions right how to governance and so on and it knows about
33:36
NCP tools but it doesn't know anything about skills doesn't know anything about command so now we're trying to enhance
33:43
that right so when we do register skills what we do basically
33:48
we use the concept of a skill loader right skill loader really is the ability to go and say go load the different
33:55
skills how what skills how how does it know we'll show you the basically the
34:00
the concrete instantiation of that agent. So you see how those those those skills are loaded. But this is the the
34:07
agent itself, right? It register the skills based on what it knows. So basically it's going to mount them as
34:13
knowledge, right? So as the instructions for for that, right? Um so it's going to
34:19
it's going to load them into into the Asian definition, the Asian uh uh
34:24
persona. That's what makes up the persona of the agent. Now it knows about all the skills that all the things that
34:30
it can do. And the same applies for the commands. It can actually go and say okay let me go ahead and get all these
34:36
commands and I know I need to use this particular commands to do the different
34:41
actions that I need to do. Right? And this is a very simple example but this is really a building block. This is
34:47
really how you do production quality and enterprise quality uh agents. Right? All
34:52
right. So how do we build a concrete agent that has the definition we need? So in our case, we need to process an
34:58
MTA uh file, right? So we need to process that with those skills and those
35:04
commands that are relevant to that file. So uh we build a basically we build a um
35:10
concrete agent. We instantiate the skill by injecting both the skills and the
35:16
command. So if you look at these lines here, we instantiating that agent and we're saying use the MTA and the
35:23
BigQuery skills and get me and use this get sample command and inest command to
35:29
be able to um to call, right? To be really specific
35:36
about how to do this, right? So this is really how we're building out now and passing the commands and the scales in a
35:43
in a way that is agnostic. Right? So imagine if I have another domain
35:48
um sales or factory telemetry then the scales are different the commands are
35:54
different and so on right this gives us that ability to be agnostic and be able
35:59
to do this right um and so essentially this is what we're doing here we uh if
36:06
you look at forgot to the inest command so the ingest command has the strategies right it has the bigquery the snowflake
36:13
strategy because maybe in In our in our concept, we want to be able to push to
36:20
those two target databases. So, we depending on what we're doing is we routing to those, right? So, how do we
36:26
do the routing? Is the agent making those decisions? And that's really where you also want to be very deterministic.
36:32
You don't want the agent to make those decisions, right? You want to control that and you want to be very specific in
36:40
how you do your routing. So you create a concept of a routing configuration where you actually tell the agent in the event
36:47
that you're using this um domain like MTA then I want you to
36:53
point to this target data warehouse. So if you look at really quick let's look
36:58
at the configuration files right routing YAML and you see so these
37:04
are domains NTA telemetry and we're saying targets bigquery targets
37:09
snowflake target could be something else right so this is how you now do the routing and if you see this this is very
37:16
deterministic very deterministic you're not going to be um it's not going to be guessing it's
37:22
not going to be doing anything that uh right that
37:28
that it's going to hallucinate that's going to do whatever some random so the whole idea is to very control this very
37:34
very well right so all right let's see if we can run this really quick I think I still have some tokens uh but let's
37:42
let's do this interactive so we're going to run this interactive playbook so we're going to just run this and this is
37:48
really going to just run execute that agent for us um
37:54
so we're going Um,
38:00
we're going to run this instructions
38:06
in the wrong book.
38:12
So, here what we're just basically saying is we're going to load these instructions and we're going to tell um
38:20
we're going to tell anti-gravity to go ahead and execute our agent. So we can run it also v uh the CLI manually but we
38:28
can orchestrate it with the with anti-gravity. Let anti-gravity do be our
38:33
um [clears throat] our assistance and just do the work. So what's going to do if you notice really quick? Let me see if I can blow this up a little. It's
38:41
going to run the commands, right? It's going to run using the ADK
38:46
CLI. It's going to say run this command and simulate basically that a new file arrives. So this is that trigger, right?
38:52
that storage trigger and it's going to raise that agent with those parameters and it's going to load this and
38:59
basically what the agent is going to do is follow the instructions right if a new file arrives
39:05
um analyze it for schema drift and if you detect schema drift
39:10
um you know tell us about it right so right now it's saying awaiting inspection results and drift analysis
39:17
because the agent is working on that right it's calling all the commands to load the temple data uh analyze the data
39:24
using the skill MTA skill to say do I have a drift is this matching my data uh
39:31
and so on. So, so basically this is really what it how it runs on on on a cloud environment,
39:39
right? It runs based on events. It's an event- driven uh system and basically
39:45
saying so look at all the stuff that is saying it's saying hey I detected a drift right I detected version v2 coming
39:53
in we do not have anything on the data warehouse to read version v2. So if you
39:58
remember briefly I show you the data warehouse and we have an we had an external table but not right the the
40:05
only a single one. So it's saying hey this is what I see do you approve it yes or no and then let's say yes. So that's
40:12
the human in the loop, right? And it's saying yes, yes. Okay. So what's going
40:17
to do next? It's going to say, okay, let me go follow the next step in the in the pipeline, which is I'm going to go
40:24
create this um and it's going to use the commands to create it. It's going to use
40:31
the NCP tools to connect to the data warehouse. is going to take from the scale the metadata which is the
40:39
[clears throat] uh the DDL that it needs to execute to be able to create a new and and it
40:46
returns with this. Okay, we approved it. It created the DDL which is create this
40:52
new table with this schema definition and with this pattern right so if you notice that pattern that's what that
40:59
pattern is saying look at this bucket and give me all these files with this with this structure with this uh uh uh
41:07
extension right uh wild card and load them right and it's really loading and
41:13
it's actually saying to us that it succeeded it created it created the
41:19
table and it's deployed. Right? So, it's actually now telling us that everything
41:24
should be good. So, let's take a look now at our
41:30
uh let's take a look at our data warehouse. So, if you remember our data warehouse here only had um only had that
41:38
ext uh ext. So, let's refresh it. So, now let's see what happens. Oh, so now
41:45
we got V2. So V2 got just created at 12:42 which is almost time for us to
41:51
complete our presentation and we have the the new schema definition as it
41:56
showed us on the output. Okay. So here we just really quickly we
42:03
went through the process, excuse me. We loaded all of our commands, all of our skills. We detected
42:11
via events new file load and new schema drift. The agent was able to understand
42:18
it, process and create new table definitions. It asked us to approve it. We did and it
42:25
used the commands and the MCP tools to deploy the code.
42:31
All right. So this is uh basically a live demonstration on how to do build a
42:36
pipeline using uh agents with skills and commands. And as you can see, um it's
42:41
not that um out of the um this the the information
42:47
you already know, right? Out of your expertise. It's just really using the new tools. But all the domain uh
42:53
concepts um and expertise that we have for design patterns are really applicable to this. Right? So what we
43:01
can learn from here is that we we can build a agnostic system with a very
43:07
lightweight kernel a AI agent right and move away from a monolithic uh type
43:12
agent heavy that loads everything. So if we follow the particular patterns like
43:18
domain driven design uh strategy and so on right and this can
43:23
help you run agents against any platform in any cloud um platform um like
43:31
bigquery, SQL server um um snowflake and so on. Okay, so I hope this is helpful.
43:37
I hope you were able to um basically follow up with this. I know
43:43
it's is it's a lot of information, short time, but the goal here is to basically
43:48
help you um uh to to give you an idea. So, take a look at the repo, okay? Share
43:54
it. Um um give me give us a start, please. Uh also take a look at our book here if you
44:02
want to uh learn more about data engineering process fundamentals. um you can leverage that and I hope you
44:09
can follow us follow me on my website oscari.com
44:14
um and thank you for being here and I hope to see you in the next presentation. Thanks a lot everyone.
44:21
Have a great day.