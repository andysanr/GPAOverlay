# FIU GPA Overlay Chrome Extension
## Description
A chrome extension that allows students to view estimated GPA range of courses on their FIU course catalog by specific instructor.

## Python Scripts
Downloaded university grade distribution data as .csv, converted to .json and ran Python script to format data with necessary information and GPA calculations.

Output is saved as .json:

<img width="650" alt="image" src="https://user-images.githubusercontent.com/113227693/227858056-f9fe75c0-12f2-433e-90e1-32a1072cbca2.png">

## Updating Data
URL to access grade distribution data: https://analytics.fiu.edu/t/AIM/views/GradeDistributionReport/GradeDistributionReport?:embed=y&:display_count=no&:showAppBanner


- Filter data as needed
- Download as CrossTab 
- Run Python script
- Import filtered data to FireBase or other SQL/database
<img width="550" alt="image" src="https://user-images.githubusercontent.com/113227693/227859515-4e3df585-8681-44be-8f1d-d3d4d4d1fff4.png">


## Popup UI
Allows users to easily login to course catalog.

<img width="320" alt="image" src="https://user-images.githubusercontent.com/113227693/227857426-4abb0d1c-aab5-48e7-9bf6-570969494330.png">

## Overlay Examples
Works with any course and any professor in data set. GPA range is overlayed and color-coded for ease of understanding.

<img width="650" alt="image" src="https://user-images.githubusercontent.com/113227693/227857614-b627de37-0fc4-4ffa-a3d9-a8feafe72dcb.png">
<img width="650" alt="image" src="https://user-images.githubusercontent.com/113227693/227857663-83a5c840-6b51-4d3e-ab87-9067e913bd88.png">

## 

