# Task Management Dashboard

A full-stack dashboard for managing acquisition targets, built with Next.js 14, TypeScript, and Tailwind CSS. This project features a dashboard page for displaying, filtering, and updating acquisition targets by pipeline status.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [File Structure](#file-structure)
- [API Routes](#api-routes)

## Features

- **Bar Chart**: Displays the number of acquisition targets per pipeline status.
- **Target Table**: Lists all acquisition targets, grouped by status and sorted by last updated date.
- **Global Filter**: Filters both the bar chart and table based on pipeline status.
- **Editable Pipeline Status**: Allows direct updates to pipeline statuses, reflecting changes in both the UI and data file.
- **Optimized UI**: Provides a user-friendly interface with Tailwind CSS styling and responsive design.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data**: JSON file (`data/targets.json`) simulating a simple database
- **Charts**: [Chart.js](https://www.chartjs.org/) and [react-chartjs-2](https://react-chartjs-2.js.org/)

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/topet124/Task-Management.git
   cd Task-Management
   npm install
   npm run dev
   The app will be available at http://localhost:3000.
   ```

   ## Task-Management/

   ├── app/ # Next.js app directory
   │ ├── api/targets/ # API routes for targets
   │ ├── dashboard/ # Dashboard page
   │ └── layout.tsx # Main layout component
   ├── components/ # Reusable components
   │ ├── BarChart.tsx # Bar chart for pipeline status
   │ └── TargetTable.tsx # Target table with pipeline status updates
   ├── data/ # Sample data files
   │ └── targets.json # JSON data for acquisition targets
   ├── lib/ # Utility and type definitions
   ├── public/ # Static assets
   ├── styles/ # Tailwind CSS configuration
   └── README.md # Project README file

## API Routes

GET /api/targets: Fetches all acquisition targets from targets.json.
PATCH /api/targets/[id]: Updates the pipeline status of a target in targets.json.
