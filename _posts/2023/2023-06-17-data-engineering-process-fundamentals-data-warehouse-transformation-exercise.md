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

In this hands-on lab, we build upon our data engineering process where we previously focused on defining a data pipeline orchestration process. Now, we should focus on storing and making the data accessible for visualization and analysis. So far, our data is stored in a Data Lake, while Data Lakes excel at handling vast volumes of data, they are not optimized for query performance. To enable bulk data reading and analytics, we work on the design and implementation of a Data Warehouse (DW), which is a powerful Online Analytical Processing (OLAP) tool. 

During this exercise, we delve into the data warehouse design and implementation step, crafting robust data models, and designing transformation tasks. We explore how to efficiently load, cleanse, and merge data, ultimately creating dimension and fact tables. Additionally, we discuss areas like query performance, testability, and source control of our code, ensuring a reliable and scalable data solution. By leveraging incremental models, we continuously update our DW with only the deltas, optimizing query performance and enhancing the overall data pipeline. By the end, we have a complete data pipeline, taking data from CSV to our data warehouse, equipped for seamless visualization and analysis.

## Data Warehouse Design

A Data warehouse (DW) is an OLAP system, which serves as the central data repository for historical and aggregated data. In contrast to the ETL process employed by Data Lakes with Python code, a data warehouse (DW) relies on the ETL process. This fundamental distinction emphasizes the need for well-defined and optimized models within the DW, enabling efficient data access and exceptional performance. 

> 👉 For the ETL process, the data is transformed before adding it to storage. For the ELT process, the data is first loaded in storage in its raw format, the transformation is then done before inserting into the dimension and fact tables.

Before proceeding the implementation of concrete tables, our initial focus is on creating precise data models based on thorough analysis and specific requirements. To achieve this, we leverage code and tools that facilitate model development in an automated, testable, and repeatable manner. By incorporating such tools into our project, our architecture evolves to the following:

![ozkary-data-engineering-data-warehouse-architecture](../../assets/2023/ozkary-data-engineering-process-data-warehouse-architecture.png "Data Engineering Process Fundamentals - Data Warehouse and Transformation Architecture")

> 👉 For our use case, we are using [Google BigQuery](https://cloud.google.com/bigquery/) as our data warehouse system. Make sure to review the Data Engineering Process - Design and Planning section and run the Terraform script to provision this resource.

### External Tables

An external table is not physically hosted within the data warehouse database. Since our raw data is stored on a data lake, we can reference that location and load those files as an external table. we can create an external table using the data lake files as the source by providing a file pattern to select all the compressed files. 

The following SQL can be executed as a query on the data warehouse. Access to the data lake should already be configured when the service accounts where assigned to the resources.

```sql
CREATE OR REPLACE EXTERNAL TABLE mta_data.ext_turnstile
OPTIONS (
  format = 'CSV',
  uris = ['gs://ozkary_data_lake_ozkary-de-101/turnstile/*.csv.gz']  
);

```

When this file is executed and the external table is created, the data warehouse retrieves the metadata about the external data, such as the schema, column names, and data types, without actually moving the data into the data warehouse storage. Once the external table is created, we can query the data using SQL as if it were a regular table. 

## Design and Architecture


### Schema Design

star schema show the content from github

### Infrastructure

bigquery talk here

### Technology Stack

list all the tech including github


### Data Modeling

### Data Transformation

## How to Run It

<!--END-->

## Database Tuning

Database tuning involves making adjustments to the database system itself to optimize query execution and overall system performance. It includes actions like creating appropriate indexes on key columns, setting up partitioning for large tables, optimizing the database cache, and fine-tuning query plans generated by the query optimizer. The aim is to make the database engine run queries efficiently and reduce the query execution time.



### Incremental Models

In dbt (data build tool), an incremental model is a technique used to update a data warehouse's tables incrementally rather than performing a full reload of the data each time. This approach is particularly useful when dealing with large datasets and when the source data has frequent updates or inserts. Incremental models help optimize data processing and reduce the amount of data that needs to be processed during each run, resulting in faster data updates.

Here's how an incremental model works against a database like SQL Server:

Initial Full Load: When you create a dbt incremental model for a table, the first step is to perform an initial full load of the data. This involves extracting all the data from the source and loading it into the destination table in the data warehouse. This initial load establishes a baseline for the table.

Timestamp or Incremental Column: In order to perform incremental updates, you need a column in the table that can act as a timestamp or an incremental marker. This column keeps track of when the data was last updated or inserted. It can be a timestamp field (e.g., "created_at" or "updated_at") or an incremental ID field.

Identifying Changed or New Data: During subsequent runs of the incremental model, dbt queries the source database to identify rows that have been updated or inserted since the last run. It does this by comparing the timestamp or incremental column value in the source data with the corresponding values in the destination table.

Updating Changed Data: After identifying the changed or new data, dbt applies updates to the destination table in the data warehouse. It can use a combination of SQL statements, such as "UPDATE" and "INSERT," to modify the existing records and add new records accordingly.

Dealing with Deletes: Depending on the database and use case, dbt may handle deleted records in different ways. Some databases may support soft deletes, where a flag is set to indicate the record has been deleted. In other cases, dbt may need to execute a "DELETE" operation explicitly to remove records from the destination table.

Maintaining Consistency: During the incremental process, dbt ensures that the data in the destination table remains consistent with the source data, accounting for any changes or additions.

The incremental model is particularly powerful in scenarios where data changes frequently, as it significantly reduces the time and resources required to update the data warehouse. However, it's essential to design the incremental process carefully, taking into account the characteristics of the data and the database to ensure data integrity and accuracy.

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




![ozkary-data-engineering-data-warehouse-transformation](../../assets/2023/ozkary-data-engineering-process-pipeline-orchestration.png "Data Engineering Process Fundamentals - Data Warehouse and Transformation Exercise")

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

## Summary

????

## Next Step

??

> 👉 [Data Engineering Process Fundamentals - Data Analysis and Visualization]

Thanks for reading.

Send question or comment at Twitter @ozkary

👍 Originally published by [ozkary.com](https://www.ozkary.com)