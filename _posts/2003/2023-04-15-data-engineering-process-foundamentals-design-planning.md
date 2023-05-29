---
title: "Data Engineering Process Fundamentals - Design and Planning"
excerpt: "During the discovery step of a Data Engineering Process, we look to identify and clearly document a problem statement, which helps us have an understanding of what we are trying to solve. We also look at our analytical approach to make observations about at the data, its structure and source. This leads us into defining the requirements for the project, so we can define the scope, design and architecture of the solution. "
last_modified_at: 2023-04-15T13:00:00
header:
  teaser: "../assets/2023/ozkary-data-engineering-process-design-planning.png"
  teaserAlt: "Ozkary Data Engineering Process Design and Planning"
tags: 
  - pipelines  
  - cloud-engineering
  - data-warehouse
  - data-lake
toc: true
---

### Design

A data engineering design is the actual plan to build the technical solution. It includes the system architecture, data integration, flow and pipeline orchestration, the data storage platform, transformation and management, data processing and analytics tooling. This is the area where we need to clearly define the different technologies that should be used for each area. 

![ozkary-data-engineering-design-planning](https://github.com/ozkary/data-engineering-mta-turnstile/raw/main/images/mta-geo-fencing.png "Data Engineering Process Fundamentals- Design and Planning")


#### System Architecture

The system architecture is a high-level design of the solution, its components and how they integrate with each other. This often includes the data sources, data ingestion resources, workflow and data orchestration resources, frameworks, visualization tooling, storage resources, data services for data transformation and continuous data ingestion and validation.

#### Data Pipelines 

A data pipeline refers to a series of connected tasks that handles the extract, transform and load (ETL) as well as the extract, load and transform (ELT)  operations and integration from a source to a target storage like a data lake or data warehouse. 

The use of ETL or ELT depends on the design. For some solutions, a flow task may transform the data prior to loading it into storage. This approach tends to increase the amount of python code and hardware resources used by the hosting environment. For the ELT process, the transformation may be done using SQL code and the data warehouse resources, which often tend to perform great for big data scenarios.

#### Data Orchestration

Data orchestration refers to the automation, management and coordination of the data pipeline tasks. It involves the scheduling, workflows, monitoring and recovery of those tasks. The orchestration ensures the execution of those tasks, and it takes care of error handling, retry and the alerting of problems in the pipeline.

## Exercise - Hands-on Use Case

Since we now understand the discovery step, we should be able to put that into practice. Let’s move on to a hands-on use case and see how we apply those concepts.

> 👉 [Data Engineering Process Fundamentals - Design and Planning Exercise](//wwww.ozkary.dev/data-engineering-process-fundamentals-design-planning-exercise)


Thanks for reading.

Send question or comment at Twitter @ozkary
Originally published by [ozkary.com](https://www.ozkary.com)