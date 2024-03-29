---
title: "Data Engineering Process Fundamentals"
excerpt: "Data Engineering is changing constantly. From cloud data platforms and pipeline automation to data streaming and visualizations tools, new innovations are impacting that way we build today’s data and analytical solutions. This is an overview of Data Engineering Process with hands-on code samples."
last_modified_at: 2023-03-25T13:00:00
header:
  teaser: "../assets/2023/ozkary-data-engineering-process.png"
  teaserAlt: "Ozkary Data Engineering Process"
tags: 
  - pipelines  
  - cloud-engineering
  - data-warehouse
  - data-lake
toc: true
---
# Introduction to Data Engineering Process Fundamentals {#sec-intro}

---

Data Engineering is changing constantly. From cloud data platforms and pipeline automation to data streaming and visualizations tools, new innovations are impacting that way we build today’s data and analytical solutions. 

In this book of Data Engineering Process Fundamentals, we explore the Data Engineering Process (DEP) with key concepts, principles and relevant technologies, and explain how they are being used to help us deliver the solution. We discuss concepts and take on a real use case where we execute an end-to-end process from downloading data to visualizing the results. 

The end-goal of this book is to take us thru a process in which we deliver an architecture, which facilitates the ongoing analysis of big data via analytical and visualization tools. In the following images, we can get a preview of what we will be delivering as we move forward with process. 

## Solution Architecture and Flow Diagrams
 
#### Data Engineering Process Flow

We follow this process flow to gain a thorough understanding of each phase, focusing on building a strong foundation for the subsequent phases.

![Data Engineering Process Fundamentals - Overview](images/ozkary-data-engineering-process.png "Data Engineering Process - Overview"){height=80%}

#### Solutions Architecture

We focus on design, planning, and architecture to establish a robust solutions architecture, laying a solid foundation for our upcoming tasks.

![Data Engineering Process Fundamentals - Architecture](images/ozkary-data-engineering-process-architecture.png "ozkary-data-engineering-process-architecture")  

#### Data Pipeline and Orchestration

We implement a Python code-centric data pipeline, instrumenting the code for monitoring and orchestration. Additionally, we conduct a comparison between low-code solution data pipelines.

![Data Engineering Process Fundamentals - Data Pipeline and Orchestration](images/ozkary-data-engineering-process-pipeline-orchestration-architecture.png "ozkary-data-engineering-process-data-pipeline-orchestration"){height=80%}  

 
#### Data Warehouse Architecture

We advance by focusing on data and implementing a cloud-based data warehouse system. Our efforts involve efficiently ingesting data from our data lake into the data warehouse.

![Data Engineering Process Fundamentals - Data Warehouse](images/ozkary-data-engineering-process-data-warehouse-design.png "ozkary-data-engineering-process-data-warehouse")

#### Analysis Dashboard

We harness the capabilities of our data warehouse for thorough data analysis and visualization using a cloud-based tool like Looker Studio. Throughout this process, we analyze the data using Python and Jupyter Notebook. Subsequently, we compare this approach with using Looker directly for a low-code alternative.

![Data Engineering Process Fundamentals - Dashboard](images/ozkary-data-engineering-process-data-analysis-visualization-dashboard.png "ozkary-data-engineering-process-dashboard")

#### Data Stream Flow

We contrast our batch data pipeline approach with a real-time data streaming use case involving Apache Kafka and Apache Spark. By utilizing the data stream channel, we aggregate the data into our data lake. This enables the data warehouse data processing to ingest the information, leveraging the data pipeline we've previously constructed.

![Data Engineering Process Fundamentals - Data Stream Flow](images/ozkary-data-engineering-process-data-streaming-design.png "ozkary-data-engineering-process-data-stream-flow")

## Process Phases

A Data Engineering Process follows a series of steps that should be executed to properly understand the problem statement, scope of work, design and architecture that should be used to create the solution. Some of these steps include the following:
 

#### [Discovery Process](#sec-discovery)
- Problem Statement
- Data Analysis
- Define the Requirements and Scope of Work
- Discovery Exercise

#### [Design and Planning](#sec-design)
- Design Approach
- System Architecture
- Cloud Engineering and Automation
- Design Exercise

#### [Data Pipeline and Orchestration](#sec-pipeline)
- Pipeline Orchestration
  - Batch Processing
- Workflow Automation
- Deployment, Schedules and Monitoring

#### [Data Warehouse and Modeling](#sec-dw)
- Data modeling
- Data Warehouse Design
- Continuous Integration

#### [Data Analysis and Visualization](#sec-analysis)
- Analyze the data
- Visualization Concepts
- Create a Dashboard
  - Provide answers to the problem statement

#### [Streaming Data](#sec-streaming)
- Real-time Data Pipeline
- Data Warehouse Integration  

## Concepts 

### What is Data Engineering?

Data Engineering is the practice of designing and building solutions by integrating, transforming and consolidating various data sources into a centralized and structured system, Data Warehouse, at scale, so the data becomes available for building analytics solutions.

### What is a Data Engineering Process?

A Data Engineering Process (DEP) is the sequence of steps that engineers should follow in order to build a testable, robust and scalable solution. This process starts really early on with a problem statement to understand what the team is trying to solve. It is then followed with data analysis and requirements discovery, which leads to a design and architecture approach, in which the different applicable technologies are identified.

### Operational and Analytical data

Operational data is often generated by applications, and it is stored in transactional databases like SQL Server, CosmosDB, Firebase and others. This is the data that is created after an application saves a user transaction like contact information, a purchase or other activities that are available from the application. This system is not design to support Big Data query scenarios, so the reporting system should not be overloading its resources with large queries.

Analytical data is the transaction data that has been processed and optimized for analytical and visualization purposes. This data is often processed via Data Lakes and stored on Data Warehouse.

### Data Pipelines and Orchestration

Data Pipelines are used to orchestrate and automate workflows to move and process the transactional into Data Lakes and Data Warehouse. The pipelines execute repeatable Extract Transform and Load (ETL) or Extract Load and Transform (ELT) processes that can be triggered by a schedule or a data event. 

### Data Lakes

A Data Lake is an optimized storage system for Big Data scenarios. The primary function is to store the data in its raw format without any transformation. This can include structure data like CSV files, unstructured data like JSON and XML documents, or column-base data like parquet files.

### Data Warehouse

A Data Warehouse is a centralized storage system that stores integrated data from multiple sources. This system stores historical data in relational tables with an optimized schema, which enables the data analysis process. This system can also integrate external resources like CSV and parquet files that are stored on Data Lakes as external tables. The system is designed to host and serve Big Data scenarios. It is not meant to be used as a transactional system. 

### Data Batch Processing

Batch Processing is a method often used to run high-volume, repetitive data jobs. It is usually scheduled during certain time windows that do not impact the application operations, as these processes are often used to export the data from transactional systems.  A batch job is an automated software task that may include one or more workflows. These workflows can often run without supervision, and they are monitored by other tools to ensure that the process is not failing. 

### Streaming Data

Streaming Data is a data source that sends messages with small content but with high volume of messages in real-time. This data often comes from Internet-of-things (IoT) devices, manufacturing equipment or social media sources, often producing a high volume of information per second. This information is often captured in aggregated time windows and then store in a Data Warehouse, so it can be combined with other analytical data. It can also be sent to monitoring and/or real-time systems to show the current system KPI or any type of variance in the system.

## Next Step

Now that we're familiar with the high-level process, let's delve into the details of the discovery phase. This crucial step in our data engineering process empowers us to define the problem statement, establish requirements, and make insightful observations about the data.

---