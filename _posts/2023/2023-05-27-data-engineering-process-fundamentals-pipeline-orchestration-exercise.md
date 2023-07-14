---
title: "Data Engineering Process Fundamentals - Pipeline and Orchestration Exercise"
excerpt: "When it comes to writing a data pipeline using Python, there are several options to consider. Apache Spark provides a powerful distributed processing framework, Apache Airflow offers a flexible and scalable solution for workflow orchestration, Prefect provides a code-centric approach to building workflows, allowing you to define complex data pipelines using Python code. Lastly, Azure Data Factory offers a low-code solution for data integration and orchestration."
last_modified_at: 2023-05-27T13:00:00
header:
  teaser: "../assets/2023/ozkary-data-engineering-process-pipeline-orchestration-flow.png"
  teaserAlt: "Ozkary Data Engineering Process Pipeline and Orchestration Exercise"
tags: 
  - pipelines  
  - cloud-engineering
  - data-warehouse
  - data-lake
toc: true
---

Once we have gained an understanding of data pipelines and their orchestration, along with the various programming options and technical tools at our disposal, we can proceed with the implementation and configuration of our own data pipeline. We have the flexibility to adopt either a code-centric approach, leveraging languages like Python, or a low-code approach, utilizing tools such as Azure Data Factory. This allows us to evaluate and compare the effectiveness of each approach based on our team's expertise and the operational responsibilities involved. Before diving into the implementation, let's first review our pipeline process to ensure a clear roadmap for our journey ahead.

## Data Flow Process

<img src="../images/mta-data-lake-bucket.png" width="650px" alt="ozkary data lake files">

![ozkary-data-engineering-pipeline-orchestration-flow](../../assets/2023/ozkary-data-engineering-process-pipeline-orchestration-flow.png "Data Engineering Process Fundamentals - Pipeline and Orchestration Flow")


Our basic data flow can be defined as the following:

- Perform an HTTP Get request to download the CSV file for the selected week
- Compress the text file and upload in chunks to the data lake container

After the file is copied to our data lake, the data transformation service picks up the file, identifies new data and inserts into the Data Warehouse. We will take a look at the process on the Data WareHouse and Transformation services on the next step of the process. 

> 👉 Since a new file is available weekly, This data integration project fits into the batch processing model. For real-time scenarios, we should use a data streaming technologies like [Apache Kafka](https://kafka.apache.org/) with [Apache Spark](https://spark.apache.org/) 


### Initial Data Load

When there are requirements to load previous data, we need to first run a batch process to load all the previous months of data. Since the file are available weekly, we need to write code that can accept a date range, identify all the past Saturdays, and copy each file into our data lake. The process can be executed in parallel processes by running different years or months (if only one year is selected) in each process. This way multiple threads can be used to copy the data, which should reduce the processing time.

Moving forward, the process will target a specific date for when the file becomes available. The process will not allow for the download of future data files, so an attempt to pass future dates will not be allowed.

### Weekly Automation

Since the files are available on a weekly basis, we use a batch processing approach to process those files. For that, we create a scheduled job on our automation tool. This trigger should run on the day that the file is available, so a dynamic parameter can be created based on the current date value. The code can then parse this date and resolve the file name format to download the corresponding file.

### Monitor the jobs

It is very important to be able to monitor and create alerts in case there are failures. This should allow the teams to identify and address the problems quickly. Therefore, it is important that we select a code-centric framework of a platform that provides integrated monitor and alert system.

## Programming Language and Tooling

A code-centric data pipeline refers to a high coding effort using a programming language, supporting libraries and cloud platform that can enable us to quickly implement our pipelines and collect telemetry to monitor our jobs. In our case, Python provides a versatile and powerful programming language for building data pipelines, with various frameworks available to streamline the process. Three popular options for Python-based data pipelines are Prefect, Apache Airflow, and Apache Spark. 

- [Apache Airflow](https://airflow.apache.org/) is a robust platform for creating, scheduling, and monitoring complex workflows. It uses Directed Acyclic Graphs (DAGs) to define pipelines and supports a rich set of operators for different data processing tasks.

- [Apache Spark](https://spark.apache.org/) is a distributed data processing engine that provides high-speed data processing capabilities. It supports complex transformations, real-time streaming, and advanced analytics, making it suitable for large-scale data processing.

- [Prefect](https://www.prefect.io/) is a modern workflow management system that enables easy task scheduling, dependency management, and error handling. It emphasizes code-driven workflows and offers a user-friendly interface.

For low-code efforts, [Azure Data Factory](https://azure.microsoft.com/en-us/products/data-factory/) is a cloud-based data integration service provided by Microsoft. It offers a visual interface for building and orchestrating data pipelines, making it suitable for users with less coding experience.

When choosing between these options, we should consider factors such as the complexity of the pipeline, scalability requirements, ease of use, and integration with other tools and systems. Each framework has its strengths and use cases, so selecting the most suitable one depends on your specific project needs.

## Pipeline Implementation Requirements

For our example, we will take on a code-centric approach and use Python as our programming language. In addition, we use the Prefect libraries and cloud services to manage the orchestration. After we are done with the code-centric approach, we take a look at using a low-code approach with Azure Data Factory, so we can compare between the two different approaches. 

Before we get started, we need to setup our environment with all the necessary dependencies.

### Requirements

- Docker and Docker Hub
    - [Install Docker](https://github.com/ozkary/data-engineering-mta-turnstile/wiki/Configure-Docker)
    - [Create a Docker Hub Account](https://hub.docker.com/)
- Prefect dependencies and cloud account
  - Install the Prefect Python library dependencies
  - [Create a Prefect Cloud account](https://www.prefect.io/)
- Data Lake for storage
  - Make sure to have the storage account and access ready

<p>👉 <a href="https://github.com/ozkary/data-engineering-mta-turnstile/tree/main/Step3-Orchestration/" target="_pipeline">Clone this repo or copy the files from this folder
</a></p>

### Prefect Configuration
- Install the Python libraries using the requirements file from the repo
  
```bash
$ cd Step3-Orchestration
$ pip install -r prefect-requirements.txt
```

- Make sure to run the terraform script to build the VM, Datalake and BigQuery resources as shown on the Design and Planning exercise
- Copy the GCP credentials file to follow this format

```bash
$ cd ~ && mkdir -p ~/.gcp/
$ cp <path to JSON file> ~/.gcp/credentials.json
```

#### Create the PREFECT Cloud Account

> 👉 Login to Prefect Cloud, API keys can be created from the user profile configuration (click your profile picture)

- From a terminal, login with preface cloud to host the blocks, deployments, and dashboards on the Cloud
```bash
$ preface cloud login  
# or use an API key to login instead
# prefect cloud login -k API_KEY_FROM_PREFECT 
```  
The login creates a key file ~/.prefect/profiles.toml which the framework looks for to authenticate the app.

- Install the Prefect code blocks dependencies and run the ls command to check that there are none installed

```bash
$ prefect block register -m prefect_gcp
$ prefect block ls
```

### List of resources that are needed 

 These are the resources that are used by the code.

- Data lake name
    - mta_data_lake
- Prefect Account block name
    - blk-gcp-svc-acc
- Prefect GCS (storage) block name
    - blk-gcs_name
- Prefect Deployments
    - dep-docker-mta    
- Docker container name after pushing to Docker Hub
    - ozkary/prefect:mta-de-101

## Explain the Code

After setting up all the dependencies, we can move forward to look at the actual code. We can start by reviewing the  code blocks or components. We can then view the actual pipeline code, and how it is wired, so we can enable the flow telemetry in our pipeline.

### Code Blocks or Components

> 👉 Blocks are a secured and reusable components which can manage a single technical concern and can be used by our applications

#### Credentials Component

Since we need secured access to cloud resources, we first need to create a credentials component to store the cloud key file. We can then use this component in other areas of the code whenever we need to do a cloud operation. The save operation pushes the component to the cloud, so it is centralized.

```python
import argparse
import os
from pathlib import Path
from prefect_gcp import GcpCredentials

# insert your own service_account_file path or service_account_info dictionary from the json file
# IMPORTANT - do not store credentials in a publicly available repository!

def main(params) -> None:
    """entry point to create the prefect block for GCP service account"""
    gcp_file_path = params.file_path
    account_block_name = params.gcp_acc_block_name
    
    file_handle = Path(gcp_file_path) #.read_text()
    print(file_handle.read_text())
    if file_handle.exists() :
        content = file_handle.read_text()

        if content :
            credentials_block = GcpCredentials(
                service_account_info=content     # set the file credential
            )
            credentials_block.save(account_block_name, overwrite=True)
            print('block was saved')
    else:
        print(F'{gcp_file_path} not found')

    os.system('prefect block ls')
            
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Create a reusable Credential block')

    parser.add_argument('--file_path', required=True, help='key file path for the service account')
    parser.add_argument('--gcp_acc_block_name', required=True, help='prefect block name to hold the service account setting')
        
    args = parser.parse_args()

    main(args)

```

#### Cloud Storage Component

The cloud storage component enables us to reuse the credentials component, so applications can be authenticated and authorize to access it. This component also has support to upload files to the storage container, thus simplifying our code. Similar to the credential component, this component is saved on the cloud.

```python
import argparse
from prefect_gcp import GcpCredentials
from prefect_gcp.cloud_storage import GcsBucket

# insert your own service_account_file path or service_account_info dictionary from the json file
# IMPORTANT - do not store credentials in a publicly available repository!

def main(params) -> None:
    """entry point to create the prefect block for GCS"""    
    account_block_name = params.gcp_acc_block_name
    gcs_bucket_name = params.gcs_bucket_name
    gcs_block_name = params.gcs_block_name
    
    credentials = GcpCredentials.load(account_block_name)
    if credentials :
        bucket_block = GcsBucket(
            gcp_credentials=credentials,
            bucket=gcs_bucket_name  # insert your  GCS bucket name
        )
        # save the bucket
        bucket_block.save(gcs_block_name, overwrite=True)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Ingest CSV data to storage')
    
    parser.add_argument('--gcp_acc_block_name', required=True, help='prefect block name which holds the service account')
    parser.add_argument('--gcs_bucket_name', required=True, help='GCS bucket name')
    parser.add_argument('--gcs_block_name', required=True, help='GCS block name')
        
    args = parser.parse_args()

    main(args)

```

#### Docker Container Component

Since we are running our pipeline on a Docker container, we also want to write a component which can manage that concern. This allow us to pull the Docker image from Docker Hub when we are ready to deploy and run the pipeline.

```python

import argparse
from prefect.infrastructure.docker import DockerContainer

def main(params) -> None:
    """Create a Docker prefect block"""
    block_name = params.block_name
    image_name = params.image_name

    # alternative to creating DockerContainer block in the UI
    docker_block = DockerContainer(
        image=image_name,  # insert your image here
        image_pull_policy="ALWAYS",
        auto_remove=True,
    )

    docker_block.save(block_name, overwrite=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Create a reusable Docker image block from DockerHub')

    parser.add_argument('--block_name', required=True, help='Prefect block name')    
    parser.add_argument('--image_name', required=True, help='Docker image name used when the image was build')    
        
    args = parser.parse_args()

    main(args)

```

## How to Run It

![ozkary-data-engineering-pipeline-orchestration-data-lake](../../assets/2023/ozkary-data-engineering-process-pipeline-orchestration.png "Data Engineering Process Fundamentals - Pipeline and Orchestration Data Lake")


## Summary

When it comes to writing a data pipeline and orchestration using Python, there are several options to consider. Apache Spark provides a powerful distributed processing framework for large-scale data processing and is a good choice for batch processing and handling big data. Apache Airflow offers a flexible and scalable solution for workflow orchestration, allowing you to schedule and monitor your data pipeline tasks. Prefect provides a code-centric approach to building workflows, allowing you to define complex data pipelines using Python code. Lastly, Azure Data Factory offers a low-code solution for data integration and orchestration, providing a visual interface to configure and manage your data workflows. Choosing the right option depends on your team's expertise, operational requirements, and the specific needs of your data pipeline. Evaluating these options can help you determine the best fit for your project and ensure efficient data pipeline implementation and orchestration.

## Next - ???

????.


> 👉 [Data Engineering Process Fundamentals - Pipeline and Orchestration Exercise](//www.ozkary.dev/data-engineering-process-fundamentals-pipeline-orchestration-exercise/)

Thanks for reading.

Send question or comment at Twitter @ozkary

👍 Originally published by [ozkary.com](https://www.ozkary.com)