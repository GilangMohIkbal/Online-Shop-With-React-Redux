# **Online Shop React JS**
## Overview

This project is an online shop built using Vite, React JS, React Redux for state management, and JSON-server for data storage. It features several key functionalities including browsing products, managing a shopping cart, product details, checkout, and order history.
## Installation
To get started with the project, follow these steps:
1. Clone the repository from GitHub:
   
   ```
   git clone https://github.com/GilangMohIkbal/Online-Shop-With-React-Redux.git
   cd <project-directory>
   ```
3. Install dependencies using npm

   ```
   npm install
   ```

## Running the Project
Once the dependencies are installed, you can run the project locally: 
1. Start the JSON-server to simulate backend data:

   ```
   npx json-server -p 2000 db.json
   ```

2. Start the development server for the frontend:

   ```
   npm run dev
   ```

3. Open your browser and navigate to http://localhost:5173 to view the application

## Features
### 1. Home Page
- Displays a list of products available for purchase.
- Allows users to browse and filter products.
### 2. Product Detail Page
- Shows detailed information about a selected product
- Displays available stock and other product details.
### 3. Cart Page
- Lists products added to the cart
- Calculates total price including taxes.
### 4. Checkout
- Allows users to proceed with the purchase of items in their cart
- Collects necessary billing and shipping information.
### 5. Order History
- Provides a list of past orders made by the user.

## State Management
The project utilizes **React Redux** for state management to maintain a centralized state for handling user actions across different components.

## Data Storage
- JSON-server is used as a mock backend to store and serve product data.
- The db.json file contains sample data for products and orders.

## Dependencies
- **Vite**: Fast, modern development environment for React.
- **React**: JavaScript library for building user interfaces.
- **React Redux**: State container for JavaScript apps.
- **JSON-server**: Simulate a backend server using a JSON file.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Chakra UI**: Component library for React applications.
- **Axios**: Promise-based HTTP client for making requests.
- **Zod**: TypeScript-first schema validation library.
- **React Hook Form**: Performant, flexible library for forms in React.
- **React Router DOM**: Declarative routing for React applications.
- **React Icons**: Popular icon library for React projects.

##
