## InternHub Dashboard

This project is a web-based dashboard designed to provide an overview of an internship program. It allows administrators to quickly view key statistics, recent candidate applications, open internships, and visual data on applicant numbers and candidate statuses.

## Preview of Project

https://github.com/user-attachments/assets/fe70cd73-7a56-4fba-81c5-ff9c8046a5bc


## Features

-> Dashboard Overview: Displays key metrics such as total candidates, active internships, pending applications, and approval rate.

-> Recent Candidates List: Shows a quick view of the most recent candidate applications with their names, applied internships, and current status.

-> Open Internships List: Lists currently open internship positions with details like title, department, duration, and stipend.

-> Applicants per Internship Graph: A bar chart visualizing the number of applicants for each open internship, providing insights into popular roles.

-> Candidate Status Distribution Pie Chart: A pie chart showing the breakdown of candidate statuses (Approved, Pending, Rejected), offering a quick visual summary of the application pipeline.

-> Notification Bell: Shows recent notifications that needs to be read.

-> Responsive Design: The dashboard and login page are designed to be responsive and work well on various screen sizes (mobile, tablet, desktop).

-> Login Page: A user authentication interface with email and password validation, and dynamic error clearing.

## Technologies Used

React.js: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapidly styling components.

Lucide React: A library for beautiful, open-source icons.

Recharts: A composable charting library built on React components for data visualization (used for the bar and pie charts).

React Router DOM: For declarative routing in React applications.

## Prerequisites

Node.js 

npm 

## Installation Steps

Clone the repository:
git clone <https://github.com/saadshakeel04/InternHub-Dashboard.git>

cd internhub

## Install dependencies:

npm install

Create data files:
Ensure you have candidates.js, internships.js and notifications.js files in your src/data/ directory. If they don't exist, create them.

## Usage

-> Login Page: Navigate to the root URL (/). Enter your credentials to log in.

-> Dashboard: After successful login, you will be redirected to the /dashboard route. Here you can view the various statistics and charts.

-> Navigation: Use the sidebar (on larger screens) or the mobile menu (on smaller screens) to navigate between different sections of the application.

## Live Link of Project
https://intern-hub-dashboard.vercel.app/
