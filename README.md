# Media Tracker App (Faves Tracker 2.0)
[View Live](https://mediatracker-proxy.vercel.app)

## Table of Contents
- [Problem](#problem)
- [Solution](#solution)
  - [Benefits](#benefits)
- [Technologies](#technologies)
- [Features](#features)
- [Challenges](#challenges)
  - [Production Errors](#production-errors)
  - [Charts](#charts)
- [Continued Development](#continued-development)
  - [User Customization](#user-customization)
  - [Automation](#automation)
- [Screenshots](#screenshots)

## Problem
The hassle of having to create multiple accounts across several different apps in order to keep track of the various media being consumed (e.g. GoodReads, Myanimelist, etc.), which makes it more time consuming to keep track of everything. 


## Solution
I wanted to create a single fullstack application where users can keep track of everything in one place and would only need to create a single account to do so. 
### Benefits
#### 1. Real-time insights into the user’s media consumption behavior
#### 2. Track various types of media in a single app
#### 3. Search functionality and Table filters for flexibility



## Technologies
- Vite.js
- Node
- Express
- MongoDB
- TailwindCSS
- Flowbite-React
- Firebase
- Redux
- Recharts

## Features
- Dashboard Charts
- Authentication, Authorization, and Session Management
- Search Functionality
- Create, Update, Delete Trackers
- Dark/Light Mode Toggle for Dashboard

## Challenges
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
  - Sync data from existing accounts such as Goodreads, Myanimelist, etc. *(in progress)*
  - Suggest trackers and automatically fill in form data when creating new trackers
  

  
  

## Screenshots
### Home Page
