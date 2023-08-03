---
title: "Data Engineering Process Fundamentals - Data Warehouse Model and Transformation Exercise"
excerpt: "During this exercise, we delve into the Data Warehouse design and implementation step, crafting robust data models, and designing transformation tasks. We explore how to efficiently load, cleanse, and merge data, ultimately creating dimension and fact tables. Additionally, we discuss areas like query performance, testability, and source control of our code, ensuring a reliable and scalable data solution."
last_modified_at: 2023-06-17T13:00:00
header:
  teaser: "../assets/2023/ozkary-data-engineering-process-pipeline-orchestration.png"
  teaserAlt: "Ozkary Data Engineering Process Data Warehouse Model and Transformation Exercise"
tags: 
  - pipelines  
  - cloud-engineering
  - data-warehouse
  - 
  - data-lake
toc: true
---

In this hands-on lab, we build upon our data engineering process where we previously focused on defining a data pipeline orchestration process. Now, we should focus on storing and making the data accessible for visualization and analysis. So far, our data is stored in a Data Lake, while Data Lakes excel at handling vast volumes of data, they are not optimized for query performance, so our step is to enable the bulk data processing and analytics by working on our Data Warehouse (DW).

During this exercise, we delve into the data warehouse design and implementation step, crafting robust data models, and designing transformation tasks. We explore how to efficiently load, cleanse, and merge data, ultimately creating dimension and fact tables. Additionally, we discuss areas like query performance, testability, and source control of our code, ensuring a reliable and scalable data solution. By leveraging incremental models, we continuously update our data warehouse with only the deltas (new updates), optimizing query performance and enhancing the overall data pipeline. By the end, we have a complete data pipeline, taking data from CSV to our data warehouse, equipped for seamless visualization and analysis.

## Data Warehouse Design

A data warehouse is an OLAP system, which serves as the central data repository for historical and aggregated data. In contrast to the ETL process employed by data lakes with Python code, a data warehouse relies on the ETL process. This fundamental distinction emphasizes the need for well-defined and optimized models within the database, enabling efficient data access and exceptional performance. 

> 👍 For the ETL process, the data is transformed before adding it to storage. For the ELT process, the data is first loaded in storage in its raw format, the transformation is then done before inserting into the dimension and fact tables.

Before building the concrete tables, our initial focus is on creating precise data models based on thorough analysis and specific requirements. To achieve this, we leverage SQL (Structured Query Language) and tools that facilitate model development in an automated, testable, and repeatable manner. By incorporating such tools into our project, we build the data services area in which we manage the data modeling and transformation to expand our architecture into the following:

![ozkary-data-engineering-data-warehouse-architecture](../../assets/2023/ozkary-data-engineering-process-data-warehouse-architecture.png "Data Engineering Process Fundamentals - Data Warehouse and Transformation Architecture")

> 👉 For our use case, we are using [Google BigQuery](https://cloud.google.com/bigquery/) as our data warehouse system. Make sure to review the Data Engineering Process - Design and Planning section and run the Terraform script to provision this resource.

### External Tables

An external table is not physically hosted within the data warehouse database. Since our raw data is stored on a data lake, we can reference that location and load those files as an external table. we can create an external table using the data lake files as the source by providing a file pattern to select all the compressed files. 

The following SQL can be executed as a query on the data warehouse. Access to the data lake should already be configured when the service accounts where assigned to the resources during the design and planning phase.

```sql
CREATE OR REPLACE EXTERNAL TABLE mta_data.ext_turnstile
OPTIONS (
  format = 'CSV',
  uris = ['gs://ozkary_data_lake_ozkary-de-101/turnstile/*.csv.gz']  
);

```

When this SQL script is executed, and the external table is created, the data warehouse retrieves the metadata about the external data, such as the schema, column names, and data types, without actually moving the data into the data warehouse storage. Once the external table is created, we can query the data using SQL as if it were a regular table. 

## Design and Architecture

During the design and architecture stage of our data warehouse project, our primary objective is to transition from conceptual ideas to concrete designs. Here, we make pivotal technical choices that pave the way for building the essential resources and defining our data warehouse approach. 

### Star Schema

We start by selecting the Star Schema model. This model consist of a central fact table that is connected to multiple dimension tables via foreign key relationships. The fact table contains the measures or metrics, while the dimension tables hold descriptive attributes. 

### Infrastructure

For the infrastructure, we are using a cloud hosted OLAP system, Google BigQuery. This is a system that can handle petabytes of data. It also provides MPP (Massive Parallel Processing), built-in indexing and caching, which improves query performance and reduce compute by caching query results. The serverless architecture of these systems help us on reducing cost. Because the system is managed by the cloud provider, we can focus on the data analysis instead of infrastructure management.

### Technology Stack

For the technology stack, we are using a SQL-centric approach. We want to be able to manage our models and transformation tasks within the memory context and processing power of the database, which tends to work best for large datasets and faster processing. In addition, this approach works well with a batch processing approach.

[dbt](https://www.getdbt.com/) (data build tool) is a SQL-centric framework which at its core is primarily focused on transforming data using SQL-based queries. It allows us to define data models and transformation logic using SQL and Jinja, a templating language with data transformation capabilities, such as loops, conditionals, and macros, within our SQL code. This framework enables us to build the actual data models as views, tables and SQL based transformation that are hosted on the data warehouse. 

As we build code for our data model and transformation tasks, we need to track it, manage the different versions and automate the deployments to our database. To manage this, we use [GitHub](https://github.com/), which is a web-based platform that provides version control and collaborative features for software development and management. It also provides CI/CD capabilities to help us execute test plans, build releases and deploy them. dbt connects with GitHub to manage deployments. This enables the dbt orchestration features to run the latest code as part of the pipeline. 

> 👍 A deployment consists of getting the latest model metadata, build it on the database, and run the incremental data tasks when new data is available in the data lake.

## Data Warehouse Implementation

The data warehouse implementation is the stage where the conceptual data model and design plans are transformed into a functional system by implementing the data models and writing the code for our transformation tasks.

### Data Modeling

Data modeling is the implementation of the structure of the data warehouse, creating models (views) and entities (tables), defining attributes (columns), and establishing data relationships to ensure efficient querying and reporting. It is also important to identify the primary keys, foreign keys, and indexes to improve data retrieval performance. 

To build our models, we should follow these specifications:

- Create an external table using the Data Lake folder and *.csv.gz file pattern as a source
  - ext_turnstile
- Create the staging models
  - Create the station view (stg_station) from the external table as source
    - Get the unique stations 
    - Create a surrogate key using the station name    
  - Create the booth view (stg_booth) from the external table as source    
    - Create a surrogate key using the booth UNIT and CA fields  
  - Create the fact view (stg_turnstile) from the external table as source
    - Create a surrogate key using CA, UNIT, SCP, DATE, time

Our physical data model should look like this:

![ozkary-data-engineering-data-warehouse-star-schema](../../assets/2023/ozkary-data-engineering-process-data-warehouse-star-schema.png "Data Engineering Process Fundamentals - Data Warehouse and Transformation Star Schema")

#### Why do we use partitions and cluster

> 👍 We should always review the technical specifications of the database system to find out what other best practices are recommended to improve performance.

- Partitioning is the process of dividing a large table into smaller, more manageable parts based on the specified column. Each partition contains rows that share a common value like a specific date. A partition improves performance and query cost.

- When we run a query in BigQuery, it gets executed by a distributed computing infrastructure that spans multiple machines. Clustering is an optional feature in BigQuery that allows us to organize the data within each partition. The purpose of clustering is to physically arrange data within a partition in a way that is conducive to efficient query processing.

#### SQL Server and Big Query Concept Comparison

- In SQL Server, a clustered index defines the physical order of data in a table. In BigQuery, clustering refers to the organization of data within partitions based on one or more columns. Clustering in BigQuery does not impact the physical storage order like a clustered index in SQL Server.

- Both SQL Server and BigQuery support table partitioning. The purpose is similar, allowing for better data management and performance optimization. 

### Data Transformation

The data transformation phase is a critical stage in a data warehouse project. This phase involves several key steps, including data extraction, cleaning, loading, data type casting, use naming conventions, and implementing incremental loads to continuously insert the new information since the last update via batch processes.

For our transformation services, we follow these specifications:

- Use the staging models to build the physical models
  - Map all the columns to our naming conventions, lowercase and underline between words
  - Create the station dimension table (dim_station) from the stg_station model 
    - Add incremental strategy for ongoing new data       
  - Create the booth dimension table (dim_booth) from the stg_booth model    
    - Add incremental strategy for ongoing new data    
    - Use the station_name to get the foreign key, station_id
    - Cluster the table by station_id      
  - Create the fact table (fact_turnstile) from the stg_turnstile model
    - Add incremental strategy for ongoing new data    
    - Partition the table by created_dt and use day granularity
    - Cluster the table by station_id
    - Join on dimension tables to use id references instead of text
- Remove rows with null values for the required fields
  - Station, CA, UNIT, SCP, DATE, TIME
- Cast columns to the correct data types
  - created
- Continuously run all the model with an incremental strategy to append new records

#### Database Tuning

Database tuning involves making adjustments to the database system itself to optimize query execution and overall system performance. It includes actions like creating appropriate indexes on key columns, setting up partitioning for large tables, optimizing the database cache, and fine-tuning query plans generated by the query optimizer. The aim is to make the database engine run queries efficiently and reduce the query execution time.

#### Incremental Models

In dbt, an incremental model is a technique used to update a data warehouse's tables incrementally rather than performing a full reload of the data each time. This approach is particularly useful when dealing with large datasets and when the source data has frequent updates or inserts. Incremental models help optimize data processing and reduce the amount of data that needs to be processed during each run, resulting in faster data updates.

## Review the Code

With clear specifications about how to build the models and our transformation, we can now look at the code and see how that is done. Use Visual Studio code or a similar tool to edit this project.

<p>👉 <a href="https://github.com/ozkary/data-engineering-mta-turnstile/tree/main/Step4-Data-Warehouse" target="_datawarehouse">Clone this repo or copy the files from this folder, dbt and sql
</a></p>




### 

## How to Run It

<!--END-->

#### Incremental Models


## Data Quality and Governance:

Implement data quality checks to identify and resolve data issues during the ETL process.
Establish data governance policies to ensure data consistency, security, and compliance.
Define data access controls and permissions to restrict unauthorized data access.
Optimizing Data Access for Visualization Tools:

Identify the key performance indicators (KPIs) and metrics required for visualization.
Design aggregated tables or materialized views to improve query performance for commonly accessed data.
Implement caching mechanisms to store and serve frequently accessed query results.
Tune and optimize database configurations, indexing, and query plans for efficient query execution.

## Metadata Management:

Establish a metadata repository to document data definitions, data lineage, and transformation processes.
Maintain documentation for data dictionary, schema changes, and ETL workflows.

In summary, metadata management is crucial in a data warehouse project because it enhances data understanding, enables data governance, supports data integration, facilitates query optimization, and promotes collaboration among stakeholders. Proper metadata management ensures that the data warehouse remains a reliable and trusted source of information for decision-making and analysis.

## Monitoring and Performance Tuning:

Implement monitoring and logging mechanisms to track data pipeline performance and identify bottlenecks.
Continuously optimize the data warehouse for improved query performance as data volume grows.
<!--
## how is a data warehouse project improve by using tools like dbt and keep all the source code in source control. what are the compliance requirements?

Using tools like dbt (data build tool) and keeping all the source code in source control can significantly improve a data warehouse project in several ways:

Version Control and Collaboration: By keeping all the source code in source control (e.g., Git), the entire development team can collaborate effectively. Version control ensures that changes to the data models, transformations, and SQL queries are tracked, making it easier to roll back changes if needed. It also facilitates code reviews and provides a history of development activities.

Reproducibility and Auditing: With dbt and source control, you can achieve reproducibility in your data pipelines and transformations. Every step of the data modeling and ETL process is documented and can be precisely recreated. This is crucial for auditing and compliance purposes, allowing you to demonstrate the lineage and transformation logic applied to the data.

Modularity and Reusability: dbt allows you to create modular and reusable data models and transformations. By breaking down the data models into smaller pieces, you can ensure that changes in one model don't impact others. This modularity also makes it easier to maintain and scale the data warehouse as it grows.

Data Documentation: dbt provides a way to document the data models and transformations directly in the code using comments and descriptions. This documentation stays with the code in source control, ensuring that it remains up-to-date and easily accessible to the team.

Testing and Validation: dbt supports automated testing of data models and transformations. You can define tests to validate the data quality, integrity, and accuracy of the output. This helps identify issues early in the development process, improving data quality and reducing the risk of errors in production.

Deployment and CI/CD: Source control integration allows for seamless deployment and continuous integration/continuous deployment (CI/CD) processes. Changes can be automatically tested and deployed to different environments, promoting a smooth and controlled release cycle.

As for compliance requirements, they can vary depending on the industry and region. However, a data warehouse project using tools like dbt and source control can help meet several compliance requirements:

Data Lineage and Traceability: The version-controlled code and dbt's documentation capabilities provide clear data lineage and traceability, making it easier to comply with regulatory requirements for data auditing and governance.

Data Quality Management: Automated testing and validation in dbt help maintain data quality, which is essential for compliance with data regulations and quality standards.

Access Controls and Security: Source control tools usually offer access control mechanisms, allowing organizations to restrict access to sensitive data models and transformations. This helps meet security and privacy compliance requirements.

Change Management: By enforcing version control and CI/CD processes, data warehouse projects can ensure that all changes go through proper approvals and are documented, satisfying change management compliance requirements.

Documentation and Reporting: The documentation capabilities of dbt, along with version-controlled code, support compliance reporting and documentation, which may be necessary for audits and regulatory reviews.

Remember that compliance requirements can be specific to your organization and industry, so it's essential to consult with compliance experts to ensure that your data warehouse project meets all relevant standards and regulations.



Dbt (data build tool) is an open-source data transformation tool that is used for the transformation step in the data pipeline. It allows data engineers and analysts to define data transformations using SQL and Jinja, a templating language, and to manage those transformations as part of version-controlled projects.

Within dbt, the incremental model is a specific type of data transformation technique used to update a data warehouse table incrementally instead of performing a full reload of the data each time. The incremental model is designed to identify changes or new data in the source and apply those changes to the destination table in the data warehouse. It is particularly useful when dealing with large datasets and data sources with frequent updates.

dbt (data build tool) is a framework, not a platform, used for data transformation and modeling. It is an open-source tool that helps data engineers and analysts build data pipelines, transform data, and create data models for analytics.

At its core, dbt is primarily focused on transforming data using SQL-based queries. It allows you to define data transformation logic using SQL and Jinja, a templating language. Jinja enables powerful data transformation capabilities, such as loops, conditionals, and macros, within your SQL code.

While dbt is SQL-centric, it is important to note that dbt does not replace the underlying database or data storage. Instead, dbt works with your existing data warehouse or database, integrating seamlessly with various data sources.

The main features and capabilities of dbt include:

Data Transformation: Transform data using SQL and Jinja, allowing you to create new tables, aggregate data, and perform other SQL-based transformations.

Data Modeling: Define data models and relationships using dbt's modeling features. These models serve as the foundation for analytics and reporting.

Testing: dbt allows you to write tests to validate the quality and accuracy of your data transformations and models.

Documentation Generation: dbt automatically generates documentation for your data models, making it easier to understand and collaborate on data projects.

Version Control: dbt projects can be version-controlled, enabling collaborative development and change management.

Dependency Management: dbt automatically manages the dependencies between data models, ensuring the correct order of data transformations.

Incremental Processing: dbt supports incremental processing to efficiently update data models, reducing processing time and resource usage.

Overall, dbt acts as a powerful framework for data engineers and analysts to build and manage their data transformations, data models, and data pipelines. It complements the data warehouse or database by providing advanced data transformation capabilities and facilitating best practices in data engineering.
-->

## Summary

????

## Next Step

??

> 👉 [Data Engineering Process Fundamentals - Data Analysis and Visualization]

Thanks for reading.

Send question or comment at Twitter @ozkary

👍 Originally published by [ozkary.com](https://www.ozkary.com)