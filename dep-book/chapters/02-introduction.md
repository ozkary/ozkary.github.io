# Preface

## How it all started

I started my career in data by learning and doing database design using Power Designer for Data Architects by Sybase, which is now own by SAP. This was a great tool that taught me how to build relational logical and physical database models using Oracle as the database system. The trend back then was to model both the software and databases using Unified Modeling Language (UML). In those days, my focus was to write apps in C++ for remote devices, use by police and emergency systems, that communicated over radio networks using Motorola Technology. No, there was no data nor WIFi networks back then, so the data transaction had to be very small.  

As my career evolved beyond writing only databases for apps and with the evolution of SQL Server, I started to work on Big Data use cases. I started to write solutions using the power of Transact SQL (TSQL) for backend layer, and .NET for the integration and application layers. This was no longer the small single transaction from a few devices, but it was about supporting thousands of concurrent transactions per second from Web applications.

### Learning from Experience

With data, there is a need for knowledge. This was so true when our database systems started to encounter performance issues due to the amount of transactions, and the few silly queries being doing by developers on the production systems, which created many dead locks and concurrency challenges. So, we have to adapt and learn from our mistakes. We started by creating reporting databases with denormalized schemas to separate operations from live systems. We moved the TSQL extraction, transformation and loading (ETL) pipelines to other databases to remotely move the data. When it improved performance, we created data objects and services using .NET, so they could run on Virtual Machines and free the resources of the backend systems. In many cases, we also used the power of SQL Server Integration Services (SSIS), which is a tool that introduced to us the future capabilities of data platform tools to come.

Overtime, we had to accept the fact that a relational database was not ideal for Data Analysis purposes, and we started using the power of Data Cubes with Microsoft Analysis Services. This indeed helped with the performance issues and allowed data analysts to use Excel as their analytical tool, but it added other set of challenges, and the support to rebuild the cubes was expensive. Things started to change with the evolution of cloud technologies and Python as a programming language for data solutions.

## The evolution of data platforms and cloud technologies

As data platform tools, cloud technologies, and Python for data solutions have evolved, I've learned how adapting to these technologies can produce solutions that are both distinctive and more robust. 

### NoSQL Database

In the case of schema-bound systems like SQL Server, it's become clear that apps should define their models, while the backend should embrace a flexible schema. NoSQL databases, such as MongoDB, have ushered in a new app-building paradigm where developers can concentrate on crafting app models without being bogged down by backend system complexities. This paradigm is supported by various cloud providers, including AWS DynamoDB, Google Firebase, and Azure CosmosDB, offering a range of options to suit diverse needs.

### Data Lakes for Storage

NoSQL databases alleviate some app integration concerns, but data migration from existing databases remains a challenge. Fortunately, the cloud offers solutions. Leverage data lakes in the cloud to store massive amounts of data at a lower cost without burdening your database systems. These data lakes, built on S3/Blob storage and offered by all major cloud providers, serve as transitional or staging environments for storing raw data and making it readily available for ETL pipelines.

### Data Warehouses for Analysis:

While data lakes excel at storing large volumes of data, they're not ideal for data analysis. For that, we need data warehouses. These centralized systems store integrated data from various sources and utilize optimized relational schemas to handle massive queries and result sets efficiently. Parallelism when reading data from separate storage units further boosts performance. Notable examples like Snowflake even support on-demand loading of archive data for performance optimization. AWS Redshift, Google BigQuery, and Azure Synapse Analytics are the leading data warehouse systems from the top cloud providers.

### Data Pipelines

Cloud data platform tools depend on data to perform their functions. To ensure data flows seamlessly within these systems, we construct data pipelines. These pipelines enable us to create workflows with interconnected tasks to execute both extract, transform, and load (ETL) and extract, load, and transform (ELT) operations. The choice of pipeline construction method aligns with team expertise. Options include code-centric pipelines using Python and SQL, or low-code tools like Amazon Data Factory. Python, due to its simplicity and abundance of data libraries, excels as a powerful language for data engineering and data science workloads. Alternatively, low-code tools allow data engineers to visually build workflows using user interface (UI) tools and embed code snippets for custom transformation tasks.

### Data Analysis and Visualization

A data warehouse brimming with information isn't enough. We need to unlock its data value and turn them into actionable insights. This is where data analysis and visualization come into play. Data analysis delves into the data, exploring, comprehending, and even reshaping it to yield powerful insights empowering stakeholders to make informed business decisions. Visualization, on the other hand, takes these insights and paints them onto a canvas of charts and dashboards, transforming abstract data into a clear and compelling story. Tools like Looker Studio, PowerBI, and Tableau excel at this artistry, ensuring your audience not only receives information, but truly understands it.

### Orchestration

Even with data pipelines and robust data platform tools in place, running at an enterprise level requires a well-designed orchestration system for effective management and monitoring. Orchestration engines act as guardians, ensuring data processes and systems operate as planned. They orchestrate the entire data flow, from scheduling and execution to monitoring and alerting. This comprehensive oversight empowers the Ops team to swiftly respond to and resolve any system issues in case of failures.

### Data Streaming

Data streaming enables us to build data integration in real-time. Unlike traditional batch processing, where data is collected and processed periodically, streaming data arrives continuously by and is processed on-the-fly.

At the heart of data streaming solutions lies technologies like Apache Kafka, a distributed event streaming platform, and Apache Spark, a versatile data processing engine. Together, they form a powerful solution that ingests, processes, and analyzes streaming data at scale.

### Docker Containers

Regardless of whether you code in Python, .NET, or any other language, one truth remains constant: without the right dependencies in place, our solution won't reach its full potential. To avoid this common pitfall, we turn to the power of Docker containers. 

By packaging our code within these self-contained environments, we ensure consistent execution across systems, effectively isolating our code from any environment-specific dependency issues. This not only guarantees smooth operation but also unlocks the power of effortless scaling. Need to expand your infrastructure to handle growing demands? Simply deploy additional containerized nodes, ensuring a seamless user experience. And for added convenience, repositories like DockerHub offer a vast library of ready-to-use images, saving us time and effort in the deployment process. As we create custom images for our solutions, a CICD process can download the image from DockerHub as part of our automation process.

### Cloud Infrastructure Automation

Deployment isn't just about code; it's about building a seamless, adaptable cloud infrastructure. This is where the magic of CICD pipelines and cloud automation enters the stage. By harnessing tools like Terraform, we can orchestrate the construction of cloud resources across providers like AWS, GCP, or Azure with ease. Terraform scripts become our blueprints, enabling us to effortlessly spin up new environments or expand existing ones. Imagine a world where infrastructure evolves in sync with your code, adapting gracefully to changing needs and scaling effortlessly to meet growing demands. This is the power of CICD and cloud automation, unlocking a whole new level of efficiency and agility in our data engineering journey.

### Continuous Integration Continuous Delivery

In the world of DevOps, CICD pipelines serve as the tireless assembly lines, automating the build and deployment of our custom solutions and cloud infrastructure. GitHub, one of the most popular cloud code repository and project management cloud tools, also provides GitHub actions. These actions offer a versatile framework for orchestrating our pipelines. Whether coding Python scripts, Docker files, Terraform configurations, or bash script, GitHub Actions empower us to streamline the build, test, and deployment processes into a harmonious flow. 

By leveraging these pipelines, we can consistently build and deploy our changes, we can experience a boost in DevOps efficiency, productivity, and overall satisfaction. Embrace the automation, and watch our development journey transform into a flawless and smooth execution.

## Why Python?

The Data Engineering battlefield demands adaptability, efficiency, and versatility. This series, "Data Engineering Process Fundamentals," reflects this reality by choosing Python as our language of choice. Python's expansive and robust ecosystem of libraries, including NumPy, Pandas, and scikit-learn, empowers us to tackle a vast array of data challenges. From data analysis to complex transformations, Python offers a comprehensive and performant toolset, with support from all major cloud providers for hosting Python-based solutions.

Python also champions accessibility. Its intuitive syntax and emphasis on readability make it approachable for veterans and aspiring data engineers alike. Python prioritizes clear expression, allowing us to focus on the problem's essence rather than wrestling with syntactical roadblocks and coding complexity.

The vibrant and thriving Python community further strengthens its appeal. This network of passionate developers, extensive online resources, and readily available libraries serves as a constant source of support and collaboration. Therefore, Python's selection in this series is not simply a technological preference, but a strategic decision. It grants access to a potent blend of power, simplicity, and community – the essential ingredients for conquering data challenges with confidence and efficiency.

## Why write this book?

As software and data engineers, we understand the critical role of writing requirements to comprehend the solution we need to build. However, I believe documenting and following an engineering process holds equal importance. By "process," I mean adhering to a set of fundamental steps that serve as building blocks for the solution. This approach not only grants us a deeper understanding of the requirements but also defines a blueprint outlining the areas we need to cover and how we should approach them.

A process goes beyond listing technologies; it involves grasping concepts like problem statements, design, architecture, delivery, and scalability specifications. It also defines how these phases serve as inputs for the next phase in the process. The goal is to establish a repeatable process that facilitates the solution's ongoing expansion.

Instead of advocating for specific, out-of-the-box technologies, I favor discussing and comparing code-centric solutions with low-code turnkey solutions often utilized by large companies. After all, these turn-key solutions essentially build similar solutions as the one your are about the build by following this book.

Therefore, I want to share my experience, expertise, and thought process developed over the years to help you identify additional, highly relevant areas in data engineering. Throughout this journey, I also share my reflections on some technologies and the rationale behind their potential use. By the end of this book, you should have acquired a profound understanding of cloud data platforms and a solid thought process regarding data engineering process fundamentals.

## Scope and purpose of this book

The title of this book, "Data Engineering Process Fundamentals," reflects our focus on a foundational process accessible to data engineers of all levels. By adopting this process-oriented mindset, you'll be equipped to execute projects and deliver scalable, robust data engineering solutions.

The scope of this book embraces the following areas, each accompanied by a corresponding GitHub project showcasing the relevant code.

![Data Engineering Process Fundamentals GitHub Project](images/qr-ozkary-data-engineering-process-fundamentals-home.png "Data Engineering Process Fundamentals GitHub Project"){width=50% height=50%}

- [Project Home Page](https://github.com/ozkary/data-engineering-mta-turnstile)
- [Discovery Process](https://github.com/ozkary/data-engineering-mta-turnstile/tree/main/Step1-Discovery/)  
- [Design and Planning](https://github.com/ozkary/data-engineering-mta-turnstile/tree/main/Step2-Cloud-Infrastructure/)
- [Data Pipeline and Orchestration](https://github.com/ozkary/data-engineering-mta-turnstile/tree/main/Step3-Orchestration/)
- [Data Warehouse and Modeling](https://github.com/ozkary/data-engineering-mta-turnstile/tree/main/Step4-Data-Warehouse/)
- [Data Analysis and Visualization](https://github.com/ozkary/data-engineering-mta-turnstile/tree/main/Step5-Analysis/)
- [Data Streaming](https://github.com/ozkary/data-engineering-mta-turnstile/tree/main/Step6-Data-Streaming/)
  
## How to Use the Code

Each section of this book seamlessly blends concepts and hands-on exercises. The concepts section delves into the section's purpose and outlines crucial activities, while the hands-on exercises guide you through a lab-like approach, empowering you to build the solution yourself. Each exercise is tightly integrated with a corresponding folder in the GitHub project, accessible via a convenient QR code.

To fully utilize the project, ensure you have a GitHub profile. If you don't, create one and then fork the repository. Once you have your forked version, meticulously follow the steps outlined in the book. As this is a native cloud solution, you'll also need to establish profiles within each cloud service we explore throughout the book.

## Closing Thoughts

As the final page turns, your journey as a cloud-native data engineer is just beginning. This book forges your process-oriented mindset, armed you with practical principles, and ignited your hands-on coding with Python, SQL and Jupiter Notebooks. Now, embrace the GitHub project, refine your skills, complete the coding exercises and witness the evolution and organization of your coding and process skills. Remember, process guides, practice refines, and learning never ends. Step into the cloud with confidence, use this book as a roadmap to get you started. Follow the GitHub project, give it a star, and stay in touch as this project as well as this book will continue to evolve with the latest trend in technology.

> 👉 If you have problems with the exercises, open a GitHub issue on the project, so we can help you resolve the problem.

**Are you ready to step into the cloud? Learn about Data Engineering Process Fundamentals today!**
