# Preface

## About the Author

Oscar D Garcia is passionate technologist and principal software engineer with over 25 years of experience with a proven track record in leading the development of innovative and scalable cloud solutions across diverse industries. Oscar's professional focus has been writing enterprise solutions using technologies like Python, .NET (C#, VB), JavaScript, TypeScript, SQL, Visual Studio, GitHub among others.

When it comes to Data Engineering for Big Data use cases, Oscar has a wide broad experience using data platform technologies hosted on the cloud. From on-premises Oracle and SQL Server relational systems to cloud based data warehouse platforms like AWS Redshift and Google BigQuery as well as data lakes, pipelines and orchestration tools. His expertise start from the concept of the solution, to the design, architecture, implementation and delivery to production environments with security and operation specifications in mind.

Beyond code, Oscar actively contribute to the tech community as a leader of the Google Developer Group in Broward County, FL, and a recipient of five Microsoft MVP awards. He maintains and constantly writes articles on the latest technology on his blog at ozkary.com, and he publishes technology videos on YouTube at youtube.com/@ozkary. Oscar thrives in collaborative environments and is eager to leverage his experience and passion to contribute the technical communities around the world. You can contact Oscar at Twitter @ozkary.


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

### Orchestration

Even with data pipelines and robust data platform tools in place, running at an enterprise level requires a well-designed orchestration system for effective management and monitoring. Orchestration engines act as guardians, ensuring data processes and systems operate as planned. They orchestrate the entire data flow, from scheduling and execution to monitoring and alerting. This comprehensive oversight empowers the Ops team to swiftly respond to and resolve any system issues in case of failures.

## Why write this book?

As software and data engineers, we understand the critical role of writing requirements to comprehend the solution we need to build. However, I believe documenting and following an engineering process holds equal importance. By "process," I mean adhering to a set of fundamental steps that serve as building blocks for the solution. This approach not only grants us a deeper understanding of the requirements but also defines a blueprint outlining the areas we need to cover and how we should approach them.

A process goes beyond listing technologies; it involves grasping concepts like problem statements, design, architecture, delivery, and scalability specifications. It also defines how these phases serve as inputs for the next phase in the process. The goal is to establish a repeatable process that facilitates the solution's ongoing expansion.

Instead of advocating for specific, out-of-the-box technologies, I favor discussing and comparing code-centric solutions with low-code turnkey solutions often utilized by large companies. After all, these turn-key solutions essentially build similar solutions as the one your are about the build by following this book.

Therefore, I want to share my experience, expertise, and thought process developed over the years to help you identify additional, highly relevant areas in data engineering. Throughout this journey, I also share my reflections on some technologies and the rationale behind their potential use. By the end of this book, you should have acquired a profound understanding of cloud data platforms and a solid thought process regarding data engineering process fundamentals.

## Scope and purpose of this book

The title of this book, "Data Engineering Process Fundamentals," reflects our focus on a foundational process accessible to data engineers of all levels. By adopting this process-oriented mindset, you'll be equipped to execute projects and deliver scalable, robust data engineering solutions.

The scope of this book embraces the following areas, each accompanied by a corresponding GitHub project showcasing the relevant code.

- [Discovery Process](https://www.ozkary.dev/data-engineering-process-fundamentals-discovery/)  
- [Design and Planning](https://www.ozkary.dev/data-engineering-process-fundamentals-design-planning/)  
- [Data Pipeline and Orchestration](https://www.ozkary.dev/data-engineering-process-fundamentals-pipeline-orchestration/)
- [Data Warehouse and Modeling](https://www.ozkary.dev/data-engineering-process-fundamentals-data-warehouse-transformation/)
- [Data Analysis and Visualization](https://www.ozkary.dev/data-engineering-process-fundamentals-data-analysis-visualization/)  
- [Data Streaming](https://www.ozkary.com/2023/08/data-engineering-process-fundamentals-data-streaming.html)
  
## How to Use the Code

Each section of this book seamlessly blends concepts and hands-on exercises. The concepts section delves into the section's purpose and outlines crucial activities, while the hands-on exercises guide you through a lab-like approach, empowering you to build the solution yourself. Each exercise is tightly integrated with a corresponding folder in the GitHub project, accessible via a convenient QR code.

To fully utilize the project, ensure you have a GitHub profile. If you don't, create one and then fork the repository. Once you have your forked version, meticulously follow the steps outlined in the book. As this is a native cloud solution, you'll also need to establish profiles within each cloud service we explore throughout the book.

## Closing Thoughts

As the final page turns, your journey as a cloud-native data engineer is just beginning. This book has forged your process-oriented mindset, armed you with practical principles, and ignited your hands-on coding. Now, embrace the GitHub project, refine your skills, and witness the transformative power of your coding prowess. Remember, process guides, practice refines, and learning never ends. Step into the cloud with confidence, use this book as a roadmap to get you started. 

**Are you ready to step into the cloud? Learn about Data Engineering Process Fundamentals today!**

## Preface


### 1. **Introduction and Welcome:**
   - Introduce yourself to the readers.
   - Extend a warm welcome and express gratitude for their interest in your book.

### 2. **Your Background and Expertise:**
   - Briefly discuss your background, including your education and professional experience.
   - Highlight relevant achievements or projects that showcase your expertise in the subject matter.

### 3. **Motivation for Writing the Book:**
   - Share the motivation behind writing the book. What inspired you to delve into the topic?
   - Explain how your experiences have shaped your understanding and perspective.

### 4. **Connection to the Reader:**
   - Establish a connection with the reader. Share common challenges or experiences that they may relate to.
   - Convey your enthusiasm for sharing knowledge and helping others learn.

### 5. **Scope and Purpose of the Book:**
   - Clearly define the scope of the book. What topics will be covered, and what can readers expect to gain?
   - Articulate the purpose of the book and how it addresses the needs of the target audience.

### 6. **Acknowledgments:**
   - Express gratitude to anyone who has contributed to the book or supported you in your writing journey.
   - Acknowledge mentors, colleagues, or anyone else who played a role in shaping your understanding of the subject.

### 7. **Use of GitHub or Other Platforms:**
   - If applicable, mention that supporting code and resources are available on GitHub.
   - Provide information on how readers can access and interact with the code examples.

### 8. **Reader Guidance:**
   - Offer guidance on how readers can approach the book. Are there exercises or hands-on activities they should engage with?
   - Provide any additional information that will enhance the reader's experience.

### 9. **Personal Touch:**
   - Consider adding a personal touch or anecdote that illustrates your passion for the subject.
   - Show your personality to make the preface engaging and relatable.

### 10. **Closing Thoughts:**
   - Conclude the preface with a positive and encouraging note.
   - Invite readers to dive into the content and assure them that they are in for a valuable learning experience.

Remember, the preface sets the stage for the entire book, so make it informative, engaging, and reflective of your passion for the subject. Keep it concise but impactful, giving readers a glimpse into the journey that led you to write the book.

## Purpose and Scope


why python:

The Pragmatic Choice: Python for Data Engineering Mastery
The Data Engineering battlefield demands versatility, efficiency, and adaptability. This series, "Data Engineering Process Fundamentals," reflects this reality by anchoring its exploration in the prevalent and potent force of Python. Forget fleeting trends and alluring buzzwords; our focus is on equipping you with the tools and frameworks that deliver tangible results. So, why Python?

This choice is not driven by whimsicality, but by a careful assessment of the landscape. Python's extensive and robust ecosystem of libraries like NumPy, Pandas, and scikit-learn empowers you to tackle a vast array of data challenges. From data wrangling through complex model training, Python provides a comprehensive and performant toolset.

Furthermore, Python champions accessibility. Its intuitive syntax and emphasis on readability make it approachable for both seasoned veterans and aspiring data engineers. Unlike the esoteric rituals of some languages, Python prioritizes clear expression, allowing you to focus on the essence of your solution rather than wrestling with syntactical roadblocks.

Finally, Python boasts a vibrant and thriving community. This network of passionate developers, extensive online resources, and readily available libraries serves as a constant source of support and collaboration. No matter the obstacle you encounter, the Python community stands ready to assist, ensuring you're never left to navigate the dataverse alone.

Therefore, Python's selection in this series is not merely a technological preference, but a strategic decision. It grants you access to a potent blend of power, simplicity, and community – the essential ingredients for conquering data challenges with confidence and efficiency. So, buckle up, fellow data engineers, as we embark on this practical and pragmatic journey together. With Python as our trusted companion, we are poised to master the intricate dance of data engineering and build solutions that truly transform the world.