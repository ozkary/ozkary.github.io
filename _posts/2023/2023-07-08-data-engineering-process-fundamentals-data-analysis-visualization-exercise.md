---
title: "Data Engineering Process Fundamentals - Data Analysis and Visualization"
excerpt: "Data Analysis and Visualization"
last_modified_at: 2023-07-08T13:00:00
header:
  teaser: "../assets/2023/ozkary-data-engineering-process-data-warehouse-dashboard.png"
  teaserAlt: "Ozkary Data Engineering Process Data Analysis and Visualization"
tags: 
 - visualization  
  - cloud-engineering
  - data-warehouse
  - data-lake
  - Python
  - Spark
  - looker
  - powerbi
  - jupyter
toc: true
---
After learning the concepts of efficient analysis and visualization, we are ready to embark on the data analysis and visualization exercise in our data engineering process. This phase marks an inflection point in our transformation of data into valuable insights.

With the understanding on best practices for data analysis, we first create a code-based dashboard utilizing Python and Plotly. We then follow up by using a high-quality enterprise tool, such as Looker, to construct a low-code cloud-hosted dashboard. This can provides us with enough understanding of the type of effort that each approach takes.

![ozkary-data-engineering-analysis-visualization-dashboard](../../assets/2023/ozkary-data-engineering-process-data-analysis-visualization-dashboard.png "Data Engineering Process Fundamentals - Analysis and Visualization Dashboard")

Once we have built our dashboard, we can align with our original requirements and work on the data analysis conclusion, which allows the stake holders to make the corresponding business decisions. But before we start coding, let's start by reviewing some of the specifications for our data analysis, which defines the blue print for our implementation effort.

## Specifications

At this point of the process, we understand the requirements, and we are also familiar with the data, so we can define our specifications as follows:

- Identify the relevant measures, exits and entries
- Perform distribution analysis by station
  - This provides a geo-fence boundary
- Perform distribution analysis by day of the week and time slots
  
By calculating the total number of passengers for arrivals and departures, we gain a comprehensive understanding of passenger flow dynamics. Furthermore, we can employ distribution analysis to investigate variations across stations, days of the week, and time slots. These analyses provide essential insights for business strategy and decision-making, allowing us to identify peak travel periods, station preferences, and time-specific trends that can help us make informed decisions.

### Data Analysis Requirements

- Identify the time slots for morning and afternoon analysis
  - 12:00am-3:59am 
  - 04:00am-7:59am 
  - 08:00am-11:59am 
  - 12:00pm-3:59pm 
  - 04:00pm-7:59pm 
  - 08:00pm-11:59pm	
- Analyze the data by commuter exits (arrival) and entries (departure)
- Use a master filter for a date rage to control all the charts
- Add a secondary filter component to select stations
- Show the total number of entries and exits for the selected date range 
  - Use a score card component
- Look at the distribution by stations, which represents the busiest stations
  - Create donut charts using the subway station name as main dimension 
- Look at the distribution using the day of the week to identify the busiest days
  - Add a bar chart to see the exits and entries per day
 - Look at the distribution using the time slot to identify the busiest hours of the day
  - Add a bar chart to see the exits and entries within each time slot

## Dashboard Design

For the dashboard design, we can use a a two column layout and place the exits components in the left column and the entries components on the right column of the dashboard. We can also add a header container for the filters, date range and station name. The layout should be like this:

### UI Components

For our dashboard components, we should use the following:

- Date range picker
- Station name list box
- For each selected measure (exits, entries), we should use a set of the following components
  - A score cards for the total numbers
  - A donut chart for the station distribution
  - A bar chart for the day of the week distribution
  - A bar chart for the time slot distribution

## Review the Code - Code Centric

```python


```

### How to Run It


## Review the Code - Low-Code

### How to Run It

## Summary

??

## Next Step

We have completed our data pipeline from a CSV files to our data warehouse and dashboard. We can now discuss an advanced concept in data engineering, data streaming, which enables the integration of data in real-time.

Coming Soon!

> 👉 [Data Engineering Process Fundamentals - Real-Time Data]

Thanks for reading.

Send question or comment at Twitter @ozkary

👍 Originally published by [ozkary.com](https://www.ozkary.com)