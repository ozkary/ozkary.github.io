---
title: "Data Engineering Process Fundamentals - Pipeline and Orchestration"
excerpt: "A data pipeline is a workflow of tasks that can be executed in Docker containers. The execution, scheduling, managing and monitoring of the pipeline is refer as orchestration. In order to support the operations of the pipeline and its orchestration, we need to build a VM and data lake cloud resources. By selecting the appropriate programming language and orchestration tools, we can construct resilient pipelines capable of scaling and meeting evolving data demands effectively."
last_modified_at: 2023-05-20T13:00:00
header:
  teaser: "../assets/2023/ozkary-data-engineering-process-pipeline-orchestration.png"
  teaserAlt: "Ozkary Data Engineering Process Pipeline and Orchestration"
tags: 
  - pipelines  
  - cloud-engineering
  - data-warehouse
  - data-lake
toc: true
---
# Data Pipeline and Orchestration

After completing the Design and Planning phase in the data engineering process, we can transition into the implementation and orchestration of our data pipeline. For this step, it is important to have a clear understanding on what is the implementation and orchestration effort as well as what are the programming languages and tooling that are available to enable us to complete those efforts. 

It is also important to understand some of the operational requirements, so we can choose the correct platform that should help us deliver on those requirements. Additionally, this is the time to leverage the cloud resources we have provisioned to support an operational pipeline, but before we get deep into those concepts, let's review some background information about what is exactly a pipeline, how can it be implemented and executed with orchestration? 

![ozkary-data-engineering-design-planning](images/ozkary-data-engineering-process-pipeline-orchestration.png "Data Engineering Process Fundamentals - Pipeline and Orchestration")

## Data Pipelines 

A data pipeline refers to a series of connected tasks that handles the extract, transform and load (ETL) as well as the extract, load and transform (ELT)  operations and integration from a source to a target storage like a data lake or data warehouse. Properly designed pipelines ensure data integrity, quality, and consistency throughout the system.

The use of ETL or ELT depends on the design. For some solutions, a flow task may transform the data prior to loading it into storage. This approach tends to increase the amount of python code and hardware resources used by the hosting environment. For the ELT process, the transformation may be done using SQL code and the data warehouse resources, which often tend to perform great for big data scenarios.

### Pipeline Implementation

The implementation of a pipeline refers to the building and/or coding of each task in the pipeline. A task can be implemented using a programming languages like Python or SQL. It can also be implemented using a no-code or low-code tool, which provides a visual interface that allows the engineer to connect to Web services, databases, data lakes and other sources that provide access via API. The use of which technology to use depends on the skill set of the engineering team and cost analysis of the tools that should be used. Let's compare some of these options in more detail:

- Python is a versatile programming language widely used in data engineering. It offers robust libraries and frameworks like Apache Airflow, Apache Beam, and Pandas that provide powerful capabilities for building and managing data pipelines. With Python, we have granular control over pipeline logic, allowing for complex transformations and custom data processing. It is ideal for handling diverse data sources and implementing advanced data integration scenarios. Even in some low-code scenarios, Python is used to build components which do special transformation or logic that may not be available right out of the box of the low-code tool.

- SQL (Structured Query Language) is a standard language for interacting with relational databases. Many data pipeline frameworks, such as Apache NiFi and Azure Data Factory, offer SQL-based transformation capabilities. SQL allows for declarative and set-based operations, making it efficient for querying and transforming structured data. It is well-suited for scenarios where the data transformations align closely with SQL operations and can be expressed concisely.
  
- Low-code tools, such as Azure Logic Apps, Power Platform Automate, provide a visual interface for designing and orchestrating data pipelines. They offer a no-code or low-code approach, making it easier for non-technical users to build pipelines with drag-and-drop functionality. These tools abstract the underlying complexity, enabling faster development and easier maintenance. Low-code tools are beneficial when simplicity, speed, and ease of use are prioritized over fine-grained control and advanced data processing capabilities.

The choice between Python, SQL, or low-code tools depends on specific project requirements, team skills, and the complexity of the data processing tasks. Python offers flexibility and control, SQL excels in structured data scenarios, while low-code tools provide rapid development and simplicity.

### Pipeline Orchestration

Pipeline orchestration refers to the automation, management and coordination of the data pipeline tasks. It involves the scheduling, workflows, monitoring and recovery of those tasks. The orchestration ensures the execution of those tasks, and it takes care of error handling, retry and the alerting of problems in the pipeline.

Similar to the implementation effort, there are several options for the orchestration approach. There are code-centric, low-code and no-code platforms. Let's take a look at some of those options.

#### Orchestration Tooling

When it comes to orchestrating data pipelines, there are several options available. 

- One popular choice is [Apache Airflow](https://airflow.apache.org/), an open-source platform that provides workflow automation, task scheduling, and monitoring capabilities. With Airflow, engineers can define complex workflows using Python code, allowing for flexibility and customization. Apache Airflow requires an active service or process to be running. It operates as a centralized service that manages and schedules workflows. 

- [Apache Spark](https://spark.apache.org/) can be a good choice for batch processing tasks that involve calling APIs and downloading files using Python. Spark provides a distributed processing framework that can handle large-scale data processing and analysis efficiently. Spark provides a Python API (PySpark) that allows you to write Spark applications using Python. Spark runs as a distributed processing engine that provides high-performance data processing capabilities. To use Spark for data pipeline processing, we need to set up and run a Spark cluster or Spark standalone server.

- For those who prefer a code-centric approach, frameworks like [Prefect](https://www.prefect.io/) can be a good choice. Prefect is an open-source workflow management system that allows us to define and manage data pipelines as code. It provides a Python-native API for building workflows, allowing for version control, testing, and collaboration in addition to the monitoring and reporting capabilities. Prefect requires an agent to be running in order to execute scheduled jobs. The agent acts as the workflow engine that coordinates the execution of tasks and manages the scheduling and orchestration of workflows.

- For low-code and no-code efforts, [Azure Data Factory](https://azure.microsoft.com/en-us/products/data-factory/) is a cloud-based data integration service provided by Microsoft. It offers a visual interface for building and orchestrating data pipelines, making it suitable for users with less coding experience. Data Factory supports a wide range of data sources and provides features like data movement, transformation, and scheduling. It also integrates well with other Azure services, enabling seamless data integration within the Microsoft ecosystem.

When comparing these options, it's essential to consider factors like ease of use, scalability, extensibility, integration with other tools and systems. 

#### Orchestration Operations

In addition to the technical skill set requirements, there is an operational requirement that should be highly considered. Important aspects include automation and monitoring:

- Automation allows us to streamline and automate repetitive tasks, ensures consistent execution of tasks and workflows, thus eliminating the human factor, and enables us to scale up or down the data workflows based on demand. 

- Monitoring plays a critical role in identifying issues, errors, or bottlenecks in data pipelines. We can also gather insights into the performance of the data pipelines. This information helps identify areas for improvement, optimize resource utilization, and enhance overall pipeline efficiency. 

Automation and monitoring contribute to compliance and governance requirements. By tracking and documenting data lineage, monitoring data quality, and implementing data governance policies, engineers can ensure regulatory compliance and maintain data integrity and security.

## Cloud Resources

When it comes to cloud resources, there are often two components that play a significant role in this process: a Virtual Machine (VM) and the Data Lake.

![ozkary-data-engineering-design-planning](images/ozkary-data-engineering-process-orchestration-flow.png "Data Engineering Process Fundamentals - Orchestration Flow")

- A Virtual Machine (VM) serves as the compute power for the pipelines. It is responsible for executing the pipeline workflows and managing the overall orchestration. It provides the computational resources needed to process and transform data, ensuring the smooth execution of data pipeline tasks. The code executed on this resource is often running on Docker containers, which enables the use of automated deployments when code changes become available. In addition, containers can be deployed on Kubernetes clusters to support high availability and automated management use cases.

- A Data Lake acts as a central repository for storing vast amounts of raw and unprocessed data. It offers a scalable and cost-effective solution for capturing and storing data from various sources. The Data Lake allows for easy integration and flexibility to support evolving data requirements. There are also data retention policies that can be implemented to manage old files.

Together, a VM and Data Lake form the backbone of the data pipeline infrastructure. They enable efficient data processing, facilitate data integration, and lay the foundation for seamless data analysis and visualization. By leveraging these components, we can stage the data flow into other resources like a data warehouse, which in turn enables the analytical process.

## Summary

A data pipeline is basically a workflow of tasks that can be executed in Docker containers. The execution, scheduling, managing and monitoring of the pipeline is referred as orchestration. In order to support the operations of the pipeline and its orchestration, we need to provision a VM and data lake cloud resources, which we can also automate with Terraform. By selecting the appropriate programming language and orchestration tools, we can construct resilient pipelines capable of scaling and meeting evolving data demands effectively.

## Exercise - Data Pipeline and Orchestration

With a firm grasp of pipeline concepts and orchestration, let's let's tackle a hands-on exercise. We'll navigate the practical world of implementing a pipeline to seamlessly extract CSV data from a source and deliver it in our data lake.
