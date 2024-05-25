# office-lunch-menu-management-system [LunchHub]

The Office Lunch Menu Management System is a web application designed to streamline the process of managing daily lunch options in an office environment. This system aims to simplify the lunch ordering process and ensure that all employees' choices are recorded efficiently.

## Technologies used
***
A list of technologies used within the project:
* [React]
* [Tailwind]
* [Redux]
* [Node] 
* [Express]
* [Postgresql]
* [Prisma]

## Features
***
# Admin:
* Add, Update and Delete lunch menu option.
* View lunch menu options.
* View all employee lunch menu choice list.

# Employee
* View daily lunch menu options.
* Select lunch menu.
* Search lunch menu options.
* View my all lunch choice list.

## Database schema

# Users
  id        Int
  name      String
  email     String  
  password  String
  role      Role 
  createdAt DateTime 
  updatedAt DateTime 

# Menus
  id        Int
  title     String
  desc      String
  date      DateTime
  extras    String[]
  createdAt DateTime
  updatedAt DateTime

# Choices
  id     Int
  userId Int
  menuId Int
  extras String[]
  createdAt DateTime

## Requirment
Install node in local meachine.

## Setup instructions

First, install all dependency for Backend:

```bash
npm i
# or
yarn
```

Then, install all dependency for Frontend:

```bash
cd client

npm i
# or
yarn
```

## Project run instructions

Run the Backend development server:

```bash
npm start
# or
yarn start
```

Then, run the React development server:

```bash
cd client

npm run dev
# or
yarn dev
```