# Media Tracker App (MyFaves App 2.0)
[View Live](https://mediatracker-proxy.vercel.app)

## Table of Contents
- [Problem](#problem)
- [Solution](#solution)
  - [Benefits](#benefits)
- [Overview](#overview)
  - [Technologies](#technologies)
  - [Features](#features)
- [Challenges](#challenges)
  - [CSV Parsing](#csv-parsing)
  - [Production Errors](#production-errors)
  - [Charts](#charts)
- [Continued Development](#continued-development)
  - [User Customization](#user-customization)
  - [Automation](#automation)
- [Screenshots](#screenshots)

## Problem
Managing media consumption across multiple platforms requires users to maintain separate accounts, making it difficult to consolidate and track their progress efficiently. Manually logging entries across different apps can be time-consuming and tedious.

## Solution
I created a full-stack application that centralizes media tracking into a single platform. Users can track series, books, and movies without needing multiple accounts. The dashboard overview lets users gain insight into their media consumption habits via charts and tables, including popular genres, highest rated, and more. Users can filter, search, and categorize their entries efficiently. Additionally, a CSV Import feature allows users to import their existing media lists from platforms like Goodreads, IMDb, and MyAnimeList, eliminating the need for manual data entry. For unsupported platforms, users can map CSV headers dynamically to match the app's tracker fields. 

### Benefits
1. Real-time insights into the user’s media consumption behavior
2. Track various types of media in a single app
3. Search functionality and Table filters for flexibility
4. Import media tracking data via CSV files from external acocunts


## Overview
### Technologies
- **Frontend:** Vite.js, React, TailwindCSVV, Flowbite-React, Redux, Recharts
- **Backend:** Node.js, Express.js, MongoDB, Firebase
- **CSV Parsing:** csv-parser, Multer (for file handling)

### Features
- Dashboard Charts
- Authentication, Authorization, and Session Management
- Search Functionality
- Create, Update, Delete Trackers
- Dark/Light Mode Toggle for Dashboard
- Importing Data via CSV (Static & Dynamic Parsing)

## Challenges
### CSV Parsing
**API Limitation Workaround**
- Originally, the goal was to sync data via external APIs. However, Goodreads no longer issues new developer keys, so a CSV import feature was created as an alternative

**Handling Missing Required Fields**
- Some CSV files may lack required fields, which can cause errors when saving trackers to MongoDB
- Solution: Implement validation and fallback mechanisms, such as using default values where appropriate

### Production Errors
**404 Not Found Error - Page would not load content on refresh**
- After a bit of digging, I found that the issue was coming from React-Router and Vercel, more specifically that the Vercel server does not know how to handle client-side routing from React-Route
- For example, this issue occurs when trying to access a direct URL such as https://domain/sign-up because the server tries to serve the requested route (/sign-up) as if it were a static file, resulting in a 404 error
- Solution:
  1. in client/vercel.json, add a rule to tell Vercel to redirect all requests to the root index file, allowing the React application to load and React-Router to handle the client-side routing correctly
  
  ```javascript
      "rewrites": [
        { "source": "/(.*)", "destination": "/" },
      ]
  ```

**401 Unauthorized Error - Every API request returned a 401 error**
- Cookies were being set in the backend but not showing up on the browser storage, most likely due to the frontend and backend being on different domains
- Solution:
  1. Decided to use 1st party cookies instead of 3rd party cookies and serve the backend and frontend under a single domain.
  2. To do so, create a proxy project by deploying a standalone vercel.json file with rewrite rules to handle routing between frontend and backend
  
    ```javascript
    {"rewrites": [
        { "source": "/api/(.*)", "destination": "https://your-backend-domain/api/$1" },
        { "source": "/(.*)", "destination": "https://your-frontend-domain/$1" }
      ]}
  ```
### Charts
Figuring out how to create a stacked bar chart that displays data for each tracker category (‘Series’, ‘Books’, ‘Movies’) and their statuses (‘Completed’, ‘In Progress’, ‘Not Started’) by month
- Solution:
  1. Fetch user activity data from MongoDB, grouping by month, category, and status, and then sorting it by created date
     ```javascript
     const userActivity = await Tracker.aggregate([
            {
                $match: {
                    userId: req.query.userId,
                    createdAt: { $gte: sixMonthsAgo },
                },
            },
            {
                $group: {
                    _id: { 
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' },
                        category: '$category', 
                        status: '$status' 
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1},
            },
        ])
     ```
     
  2. Format user activity data to fit Rechart’s structure, organizing each month by categories and statuses
     ```javascript
     const formatBarChartData = (data) => {
        const formattedData = {}
        const months = [ 
            'January', 
            'February', 
            'March', 
            'April', 
            'May', 
            'June', 
            'July', 
            'August', 
            'September',
            'October',
            'November',
            'December'
        ]

        data.forEach(({ _id, count }) => {
            const { month, year, category, status } = _id
            const monthLabel = `${months[month - 1]} ${year}`

            if (!formattedData[monthLabel]) {
                formattedData[monthLabel] = { month: monthLabel }
            }

            const key = `${category}_${status}`
            formattedData[monthLabel][key] = count
        })

        return Object.values(formattedData)
      }
     ```
  3. Render the stacked bar chart using Recharts
     ```html
     <ResponsiveContainer width='100%' height={300}>
          <BarChart data={userActivity}>
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
  
              {/* Series category */}
              <Bar dataKey='Series_Completed' stackId='Series' fill='#A1E091' />
              <Bar dataKey='Series_In Progress' stackId='Series' fill='#826EBF' />
              <Bar dataKey='Series_Not Started' stackId='Series' fill='#D4D2D2' />
  
              {/* Books category */}
              <Bar dataKey='Books_Completed' stackId='Books' fill='#A1E091' />
              <Bar dataKey='Books_In Progress' stackId='Books' fill='#826EBF' />
              <Bar dataKey='Books_Not Started' stackId='Books' fill='#D4D2D2' />
  
              {/* Movies category */}
              <Bar dataKey='Movies_Completed' stackId='Movies' fill='#A1E091' />
              <Bar dataKey='Movies_In Progress' stackId='Movies' fill='#826EBF' />
              <Bar dataKey='Movies_Not Started' stackId='Movies' fill='#D4D2D2' />
          </BarChart>
      </ResponsiveContainer>
     ```

## Continued Development
### User Customization
- Dashboard Overview
  - Customize “widgets” shown in overview
  - Filter data by status and date

- Tracker Table
  - Option to switch from "TABLE" to "LIST" view
  - Sort table data option

- Dashboard Sidebar Tabs
  - Option for user to create new categories that are automatically added to the sidebar tabs
  - Edit and Delete default tabs

### Automation
- APIs
  - Sync data from existing accounts such as Goodreads, Myanimelist, etc.
  - Suggest trackers and automatically fill in form data when creating new trackers
  

  
  

## Screenshots
### Dashborad
![Screen Shot 2024-11-21 at 10 53 09 AM](https://github.com/user-attachments/assets/22ffb250-b646-4b91-b08e-ff7cb0ded52f)

![Screen Shot 2024-11-21 at 10 54 08 AM](https://github.com/user-attachments/assets/0b6fccb1-cd7d-4e89-a63c-0562f1465e8e)

![Screen Shot 2024-11-21 at 10 53 49 AM](https://github.com/user-attachments/assets/913cc728-797b-4137-8df9-7c19c819e9e5)

![Screen Shot 2024-11-21 at 10 54 26 AM](https://github.com/user-attachments/assets/8160fd18-8cc5-4065-b2de-f4c4cb99ae7d)

### Home Page
![screencapture-mediatracker-proxy-vercel-app-2024-11-21-12_40_11](https://github.com/user-attachments/assets/e8b2a54a-6a1f-4002-bf3e-4dfc0f01bfc5)
