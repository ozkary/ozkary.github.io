---
title: "Data Engineering Process Fundamentals - Data Warehouse Model and Transformation"
excerpt: "Design and implementation are two pivotal phases for our data warehouse solution. In the design phase, we lay the groundwork by defining the database system, schema model, and technology stack required to support the data warehouse's implementation and operations. This stage ensures a solid infrastructure for data storage and management."
last_modified_at: 2023-06-10T13:00:00
header:
  teaser: "../assets/2023/ozkary-data-engineering-process-data-warehouse-design.png"
  teaserAlt: "Ozkary Data Engineering Process Data Warehouse Model and Transformation"
tags: 
  - pipelines  
  - cloud-engineering
  - data-warehouse
  - data-lake
  - Python
  - Spark
toc: true
---

# Data Warehouse and Modeling {#sec-dw}

---

After completing the pipeline and orchestration phase in the data engineering process, our pipeline should be fully operational and loading data into our data lake. The compressed CSV files in our data lake, even though is optimized for storage, are not designed for easy access for analysis and visualization tools. Therefore, we should transition into  moving the data from the files into a data warehouse, so we can facilitate the access for the analysis process.

The process to send the data into a data warehouse requires a few essential design activities before we can migrate the data into tables. Like any process before any implementation is done, we need to first work on defining the database system and schema, identifying the programming language, frameworks, tools to use for CI/CD requirements, and supporting requirements to keep our data warehouse operational.

Once the data warehouse design is in place, we can then transition into the implementation stage of the process where we can transition from concepts into concrete structures, including dimension and fact tables, while also defining the data transformation tasks to process the data into the data warehouse. 

To get a better understanding about the data warehouse process, let's first do a refresh on some important concepts related to data warehouse systems. As we cover these concepts, we can then relate them to some of the necessary activities that we need to take on to deliver a solution that can scale according to our data demands.

![Data Engineering Process Fundamentals - Data Warehouse and Transformation](images/ozkary-data-engineering-process-data-warehouse-steps.png "Data Engineering Process Fundamentals - Data Warehouse and Transformation")

## OLAP vs OLTP Database Systems

An Online Analytical Processing (OLAP) and an Online Transaction Processing (OLTP) are two different types of database systems with distinct purposes and characteristics:

### OLAP 
- It is designed for complex analytical queries and data analysis
- It is optimized for read-heavy workloads and aggregates large volumes of data to support business intelligence (BI), reporting, and data analysis.
- These databases store historical data and facilitate data exploration, trend analysis, and decision-making
- Data is typically denormalized and organized in a multidimensional structure like a star schema or snowflake schema to enable efficient querying and aggregation.
- Some examples include data warehouses and analytical databases like Amazon Redshift, Google BigQuery, and Microsoft Azure Synapse Analytics.
  
### OLTP
- It is designed for transactional processing and handling frequent, real-time, and high-throughput transactions
- It focuses on transactional operations like inserting, updating, and deleting individual records
- Databases are typically normalized to minimize redundancy and ensure data integrity during frequent transactions
- The data is organized in a relational structure and optimized for read and write operations
- Some examples include traditional relational databases like MySQL, PostgreSQL, Microsoft SQL Server, and Oracle

> 👍 OLAP databases  (e.g., BigQuery) are used for analytical processing. OLTP databases (e.g., SQL Server) are used for transaction processing

In summary, OLAP and OLTP serve different purposes in the database world. OLAP databases are used for analytical processing, supporting complex queries and data analysis, while OLTP databases are used for transaction processing, managing high-frequency and real-time transactional operations. Depending on the needs of the solution, we would choose the appropriate type of database system to achieve the desired performance and functionality. In our case, an OLAP system aligns what the requirements for our solution.

## What is a Data Warehouse

A Data Warehouse is an OLAP system, which serves as the central data repository for historical and aggregated data. A data warehouse is designed to support complex analytical queries, reporting, and data analysis for Big Data use cases. It typically adopts a denormalized entity structure, such as a star schema or snowflake schema, to facilitate efficient querying and aggregations. Data from various OLTP sources is extracted, loaded and transformed (ELT) into the data warehouse to enable analytics and business intelligence. The data warehouse acts as a single source of truth for business users to obtain insights from historical data.

![Data Engineering Process Fundamentals - Data Warehouse and Transformation Design](images/ozkary-data-engineering-process-data-warehouse-design.png "Data Engineering Process Fundamentals - Data Warehouse and Transformation Design"){height=80%}

### ELT vs ETL

An extract, load and transform (ELT) process differs from the extract, transform and load (ETL) process on the data transformation approach. For some solutions, a flow task may transform (ETL) the data prior to loading it into storage, so it can then be inserted into the data warehouse directly. This approach increases the amount of python code and hardware resources used by the VM environments. 

For the ELT process, the transformation may be done using SQL (Structured Query Language) code and the data warehouse resources, which often tends to perform great for Big Data scenarios. This is usually done by defining the data model with views over some external tables and running the transformation using SQL for bulk data processing. In our case, we can use the data lake as external tables and use the power of the data warehouse to read and transform the data, which aligns with the ELT approach as the data is first loaded in the data lake.

> 👍 For the ETL process, the data is transformed before adding to storage. For the ELT process, the data is first loaded in storage in raw format, the transformation is then done before inserting into the dimension and fact tables.

### External Tables

An external table in the context of a data warehouse refers to a table that is not physically stored within the data warehouse's database but instead references data residing in an external storage location. The data in an external table can be located in cloud storage (e.g., Azure Blob Storage, AWS S3) or on-premises storage. When querying an external table, the data warehouse's query engine accesses the data in the external location on-the-fly without physically moving or copying it into the data warehouse's database. 

Advantages of using external tables in a data warehouse include:

- Cost Savings: External tables allow us to store data in cost-effective storage solutions like cloud object storage
- Data Separation: By keeping the data external to the data warehouse, we can maintain a clear separation between compute and storage. We can scale them independently, optimizing costs and performance
- Data Freshness: External tables provide real-time access to data, as changes made to the external data source are immediately reflected when queried. There's no need for **raw data ingestion** processes to load the data into the data warehouse.
- Data Variety and Integration: You can have external tables referencing data in various formats (e.g., CSV, Parquet, JSON), enabling seamless integration of diverse data sources without the need for complex data transformations
- Data Archiving and Historical Analysis: External tables allow you to store historical data in an external location, reducing the data warehouse's storage requirements. You can keep archived data accessible without impacting the performance of the main data warehouse.
- Rapid Onboarding: Setting up external tables is often quicker and more straightforward than traditional data ingestion processes. This allows for faster onboarding of new data sources into the data warehouse.
- Reduced ETL Complexity: External tables can reduce the need for complex ETL (Extract, Transform, Load) processes as the data doesn't need to be physically moved or transformed before querying.

### Data Mart

Depending on the use case, the analytical tools can connect directly to the data warehouse for data analysis and reporting. In other scenarios, it may be better to create a data mart, which is a smaller, focused subset of a data warehouse that is designed to serve the needs of a specific business unit within an organization. The data mart stores its data in separate storage.

There are two main types of data marts:

- Dependent Data Mart: This type of data mart is derived directly from the data warehouse. It extracts and transforms data from the centralized data warehouse and optimizes it for a specific business unit. 
- Independent Data Mart: An independent data mart is created separately from the data warehouse, often using its own ELT processes to extract and transform data from the source systems. It is not directly connected to the data warehouse

By providing a more focused view of the data, data marts enable faster and more efficient decision-making within targeted business areas. 

## Data Warehouse Design and Architecture

During the design and architecture stage of our data warehouse project, our primary objective is to transition from conceptual ideas to concrete designs. With a clear understanding of the business requirements, data sources and their update frequencies, we can move forward with the design of the data warehouse architecture. To start, we need to define the data warehouse models such as star schema, snowflake schema, or hybrid models based on data relationships and query patterns. We should also determine the infrastructure and technology stack for the data warehouse, considering factors like data volume, frequency of updates, and query performance requirements, source control, and CI/CD activities.

### Schema Design

The Star and Snowflake Schemas are two common data warehouse modeling techniques. The Star Schema consist of a central fact table is connected to multiple dimension tables via foreign key relationships. The fact table contains the measures or metrics, while the dimension tables hold descriptive attributes. The Snowflake Schema is a variation of the Star Schema, but with normalized dimension tables. This means that dimension tables are further divided into multiple related tables, reducing data redundancy, but increasing SQL joins.

#### Star Schema Pros and Cons

- Simplicity: The Star Schema is straightforward and easy to understand, making it user-friendly for both data engineers and business analysts
- Performance: Star Schema typically delivers faster query performance because it denormalizes data, reducing the number of joins required to retrieve data
- Data Redundancy: Due to denormalization, there might be some data redundancy in dimension tables, which can lead to increased storage requirements
- Maintenance: The Star Schema is relatively easier to maintain and modify since changes in dimension tables don't affect the fact table

#### Snowflake Schema Pros and Cons

- Normalization: The Snowflake Schema reduces data redundancy and optimizes storage by normalizing dimension data
- Complexity: Compared to the Star Schema, the Snowflake Schema is more complex due to the presence of multiple normalized dimension tables
- Performance: Snowflake Schema require more joins, which can impact query performance compared to the Star Schema. However, modern data warehouses are optimized for handling Snowflake Schema efficiently
- Maintenance: The Snowflake Schema might be slightly more challenging to maintain and modify due to the normalized structure and the need for more joins

In summary. we can use the Star Schema when query performance is a primary concern, and data model simplicity is essential. Use the Snowflake Schema when storage optimization is crucial, and the data model involves high-cardinality dimension attributes with potential data redundancy.

### Infrastructure 

Cloud based OLAP systems like Amazon Redshift, Google BigQuery, and Microsoft Azure Synapse Analytics are built to scale with growing data volumes. They can handle petabytes of data, making them a great fit for Big Data scenarios. These systems also support MPP (Massive Parallel Processing), built-in indexing and caching, which improves query performance and reduce compute by caching query results. The serverless architecture of these systems help us on reducing cost. Because the system is managed by the cloud provider, we can focus on the data analysis instead of infrastructure management.

OLAP systems also provides data governance by providing a structured and controlled environment for managing data, ensuring data quality, enforcing security, access controls, and promoting consistency and trust in the data across the organization. These systems also implement robust security measures to protect the data, auditing capabilities for tracking data lineage and changes, which are crucial for compliance requirements.

In all, OLAP systems are well-equipped to handle big data scenarios, offering scalability, high-performance querying, cost-effectiveness, and data governance, which is a critical business requirement.

### Technology Stack

When it comes to the technology stack, we have to decide on what programming language, frameworks and platforms to use for our solution. For example, Python is a suitable functional programming language with an extensive ecosystem of libraries for data modeling and transformation. But when using Python, we need to parse the CSV files, models and transform the data in memory, so it can be sent to the database. This tends to increase the amount of Python code, Docker containers, VM resources, and overall DevOps activities. 

Within the memory context and processing power of the data warehouse, we could use SQL to create the models and run the transformation, which tends to work best for large datasets and faster processing. Due to the nature of the data lake, the CSV files can be modeled as external tables within the data warehouse. SQL can then be used to create models using views to enforce the data types. In addition, the transformation can be done right in the database using SQL statements with batch queries, which tends to perform a lot better than using Python.

#### Frameworks 

Frameworks provide libraries to handle specific technical concerns. In the case of a Python-centric solution, we can use the [Pandas](https://pandas.pydata.org/) library, which is an open-source data manipulation, cleaning, transformation and analysis library widely use by data engineers and scientists. Pandas supports a DataFrame-based modeling and transformation. A DataFrame is a two-dimensional table-like data structure. It can hold data with different data types and allows us to perform various operations like filtering, grouping, joining, and aggregating. Pandas offers functions for handling missing data, removing duplicates, and converting data types, making data cleaning tasks easier.

There are also frameworks that consist of generating SQL code to build the models and process the transformation. [dbt](https://www.getdbt.com/) (data build tool) is a SQL-centric framework which at its core is primarily focused on transforming data using SQL-based queries. It allows us to define data transformation logic using SQL and Jinja, a templating language with data transformation capabilities, such as loops, conditionals, and macros, within our SQL code. dbt enables us to build the actual data models as views, entities (tables) and SQL based transformation that are hosted on the data warehouse. 

#### Apache Spark Platform

[Apache Spark](https://spark.apache.org/) is a widely used open-source distributed computing system designed for big data processing and analytics. It provides a fast, scalable, and versatile platform for handling large-scale data workloads. While it can be used for data modeling and transformation, it serves a broader range of use cases, including batch processing, real-time processing and machine learning. There are many popular cloud platforms that use Spark as their core engine. Some of them include: Databricks, Azure Synapse Analytics, Google Dataproc, Amazon EMR. 

Spark supports multiple programming languages like Scala, Python, SQL. Since Spark requires a runtime environment to manage the execution of a task, the programming model is very similar to running applications on a VM. The Spark application connects to a Spark cluster to create a session, and it can then perform data processing and run Spark SQL queries. Let's look at what a Python and SQL application looks like with Spark.

Data Modeling and Transformation with PySpark and SQL:

The next example (for both Python and SQL) show us how to create a Spark session. It then joins two data frames by using the station_id as the related column. Lastly, it selects and displays the result of the query.

- PySpark: PySpark provides a high-level API for Spark, allowing us to write Spark applications using Python. It exposes the core Spark functionalities and supports DataFrame and Dataset APIs for working with structured data. PySpark is popular among data engineers and data scientists.

**PySpark Code Sample:**

```python
from pyspark.sql import SparkSession

# Assuming you already have the two DataFrames `dim_station` and `fact_turnstile`

# Create a SparkSession (if not already created)
spark = SparkSession.builder.appName("JoinEntities").getOrCreate()

# Join the two DataFrames on the 'station_id' column
joined_df = fact_turnstile.join(dim_station, on="station_id")

# Select the desired columns
result_df = joined_df.select("station_name", "created_datetime", "entries", "exits")

# Show the result
result_df.show()
```

- SQL: Spark includes a SQL module that allows us to run SQL queries directly on data. This makes it convenient for those familiar with SQL to leverage their SQL skills to perform data modeling and transformation tasks using Spark.

**PySpark and SQL Code Sample:**

```python
from pyspark.sql import SparkSession

# Assuming you already have the two DataFrames `dim_station` and `fact_turnstile`

# Create a SparkSession (if not already created)
spark = SparkSession.builder.appName("JoinEntities").getOrCreate()

# Register the DataFrames as temporary views
dim_station.createOrReplaceTempView("dim_station_view")
fact_turnstile.createOrReplaceTempView("fact_turnstile_view")

# Write the SQL query for joining and selecting the desired columns
sql_query = """
SELECT s.station_name, t.created, t.entries, t.exits
FROM fact_turnstile_view t
JOIN dim_station_view s ON t.station_id = s.station_id
"""

# Execute the SQL query
result_df = spark.sql(sql_query)

# Show the result
result_df.show()
```

##### Sample Output

|   station_name  |        created        |  entries  |  exits  |
|-----------------|-----------------------|-----------|---------|
| Central Station | 2023-02-13 12:00:00   |   10000   |   5000  |
| Times Square    | 2023-02-13 12:10:00   |   8000    |   3000  |
| Union Square    | 2023-02-13 12:20:00   |   12000   |   7000  |
| Grand Central   | 2023-02-13 12:30:00   |   9000    |   4000  |
| Penn Station    | 2023-02-13 12:40:00   |   11000   |   6000  |


By supporting multiple languages like PySpark and SQL, Apache Spark caters to a broader audience, making it easier for developers, data engineers, and data scientists to leverage its capabilities effectively. Apache Spark provides a unified and flexible platform for data modeling and transformation at scale.

#### Source Control and CI/CD

As we build code for our data model and transformation tasks, we need to track it, manage the different versions and automate the deployments to our data warehouse. Storing the source code on systems like GitHub offers several benefits that enhance governance, version control, collaboration, and continuous integration/continuous deployment (CI/CD) on a data engineering project. Some of these benefits include:

- Governance and Version Control for Data Models: [GitHub](https://github.com/) provides version control, ensuring that all changes to data models are tracked, audited, and properly managed, ensuring compliance with regulatory requirements and business standards

- CI/CD for Data Transformation: CI/CD pipelines ensure that changes to data transformation code are thoroughly tested and safely deployed, reducing errors and improving data accuracy

- Collaboration and Teamwork on Data Assets: GitHub's collaborative features enable data engineers and analysts to work together on data models and transformations code
  
- Reusability and Flexibility in Data Transformation: Storing data transformation code on GitHub promotes the reuse of code snippets and best practices across the data warehouse solution
   
- Disaster Recovery and Redundancy: GitHub acts as a secure backup for data transformation logic, ensuring redundancy and disaster recovery capabilities. In case of any issues, the data transformation code can be restored, minimizing downtime and data inconsistencies

In the context of a data warehouse solution, using GitHub, or similar systems, as a version control system for managing data models and transformation assets brings numerous advantages that improve governance, collaboration, and code quality. It ensures that the data warehouse solution remains agile, reliable, and capable of adapting to changes in business requirements and data sources.

## Data Warehouse Implementation

The data warehouse implementation is the stage where the conceptual data model and design plans are transformed into a functional system. During this critical phase, data engineers and architects convert the abstract data model into concrete structures, including dimension and fact tables, while also defining the data transformation tasks to cleanse, integrate, and load data into the data warehouse. This implementation process lays the foundation for data accessibility, efficiency, and accuracy, ensuring that the data warehouse becomes a reliable and valuable source of insights for analytical purposes. 

### Data Modeling

Data modeling is the implementation of the structure of the data warehouse, creating models (views) and entities (tables), defining attributes (columns), and establishing data relationships to ensure efficient querying and reporting. It is also important to identify the primary keys, foreign keys, and indexes to improve data retrieval performance. This is also the area where data needs to be normalize or denormalized data based on query patterns and analytical needs.

When using the Star Schema model, we need to carefully understand the data, so we can identify the dimensions and fact tables that need to be created. Dimension tables represent descriptive attributes or context data (e.g., train stations, commuters), while fact tables contain quantitative data or measures (e.g., number of stations or passengers). Dimensions are used for slicing data, providing business context to the measures, whereas fact tables store numeric data that can be aggregated to derive KPIs (Key Performance Indicators).

To help us define the data models, we can follow these simple rules:

- Dimensions: Dimensions are textual, and categorical attributes that describe business entities. They are often discrete and used for grouping, filtering, and organizing data.

- Fact Tables: Fact tables contain numeric data that can be aggregated. They hold the measurable data and are related to dimensions through foreign keys

- Measures: Measures are the quantitative values that are subject to calculations such as sum, average, minimum, maximum, etc. They represent the KPIs that organizations want to track and analyze

- ERD: Create a Entity Relationship Diagram to visualize the models and their relationships

> 👍 Simple Star Schema ERD with dimension and fact tables

![Data Engineering Process Fundamentals - Data Warehouse and Transformation Star Schema](images/ozkary-data-engineering-process-data-warehouse-star-schema.png "Data Engineering Process Fundamentals - Data Warehouse and Transformation Star Schema")

For reporting and dashboards, additional models can be created to accelerate the data analysis process. This is usually done to create common queries and abstract the join complexity with SQL views. Alternative, data scientist can choose to connect directly to the entities and create their data models using their analytical tools, which handle the building of SQL queries. The approach really depends on the expertise of the team, and the data modeling standards of the organization.

By defining clear dimension and fact tables with appropriate measures, a well-structured data model can enable effective analysis and visualization, supporting the generation of insightful KPIs for data-driven decision-making.

### Data Transformation

The data transformation phase is a critical stage in a data warehouse project, where raw data is processed, cleansed, mapped to use proper naming conventions, and loaded into the data warehouse to create a reliable dataset for analysis. Additionally, implementing incremental loads to continuously insert the new information since the last update via batch processes, ensures that the data warehouse stays up-to-date with the latest data.

To help us define the data transformation tasks, we should do the following activities:

- Data Dictionary, Mapping and Transformation Rules: Develop a clear and comprehensive data dictionary and mapping document that outlines how source data fields correspond to target data warehouse tables and columns
 
- Data Profiling: Identify data patterns, anomalies, and potential issues that need to be addressed during the transformation process, like removing null values, duplicates, invalid data

- Transformation Logic: Apply data transformation logic to standardize formats, resolve data inconsistencies, and calculate derived measures, define the incremental data rules

- Data Validation and Testing: Validate the transformed data against predefined business rules and requirements to ensure its accuracy and alignment with expectations

- Complete the Orchestration: Schedule the transformation tasks to automate the data loading process

- Monitor and Operations: Monitor the transformation tasks to check for failures. Track incomplete data and notify the team of errors

- Database Tuning: Involves making adjustments to the database system itself to optimize query execution and overall system performance.

A well-executed implementation phase ensures that the data warehouse aligns with the business requirements and enables stakeholders to make informed decisions based on comprehensive and organized data, thus playing a fundamental role in the success of the overall data warehouse project.

## Summary

Before we can move data into a data warehouse system, we explore two pivotal phases for our data warehouse solution: design and implementation. In the design phase, we lay the groundwork by defining the database system, schema model, and technology stack required to support the data warehouse's implementation and operations. This stage ensures a solid infrastructure for data storage and management.

Moving on to the implementation phase, we focus on converting conceptual data models into a functional system. By creating concrete structures like dimension and fact tables and performing data transformation tasks, including data cleansing, integration, and scheduled batch loading, we ensure that raw data is processed and unified for analysis. With this approach, we successfully complete the entire data pipeline and orchestration, seamlessly moving data from CSV files to the data warehouse. 

## Exercise - Data Warehouse Model and Transformation

Equipped with the knowledge of data warehouse design and implementation, let's put theory into practice with a hands-on exercise. We'll build a cloud data warehouse system, harnessing our newfound skills to create a powerful and efficient analytical platform.

---