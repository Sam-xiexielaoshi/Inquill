# INQUILL 
[(https://inquill.onrender.com/)]

_Transform Ideas into Action with Seamless Clarity_

[![Built with React](https://img.shields.io/badge/Built%20With-React-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Built with the tools and technologies:

![Tech Stack](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Tech Stack](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

---

## Overview

**Inquill** is an all-in-one developer tool that streamlines the creation of interactive, styled note-taking applications. It combines a modern React frontend with a scalable Node.js backend, optimized for rapid development and robust performance.

### Why Inquill?

This project aims to simplify building feature-rich note apps with a focus on user experience and maintainability. Key features include:

- 🎨 **Colorful**: A Tailwind CSS-based design system supporting light, dark, and retro themes.
- ⚡ **Speedy**: Vite-powered React setup with hot module replacement for fast iteration.
- 🧩 **Modular**: Reusable components like note cards, headers, and navigation for flexible UI development.
- 🔗 **Connected**: Centralized Axios configuration for reliable API communication.
- 🗂️ **Secure**: Backend with CRUD endpoints, MongoDB integration, and request rate limiting via Upstash Redis.
- 🏗️ **Scalable**: Organized architecture supporting growth and maintainability.

---

## Getting Started

### Prerequisites

To run this project, ensure you have the following:

- **Programming Language**: JavaScript
- **Package Manager**: [npm](https://www.npmjs.com/)

---

## Installation

To build and run Inquill from source:

1. **Clone the repository**

  ```bash
  git clone https://github.com/Sam-xiexielaoshi/inquill
  ```

2. **Navigate to the project directory Install the dependencies**
   
 ```bash
   cd inquill
   npm install
 ```

---

## Features

- 🧩 **Component-Based** architecture using React
- 🎨 **Tailwind CSS** for consistent and modern UI
- ⚡ **Vite** for lightning-fast development and builds
- 🔗 **Axios** for communicating with backend APIs
- 🚥 **Routing** via React Router
- 📄 Dedicated pages for:
  - Creating Notes
  - Viewing Note Details
  - Viewing All Notes

---

## Usage
To run the project:
```bash
npm start
```

---

## Folder Structure

**Backend**
```kotlin
├── src/
│ ├── config/               # Configuration files
│ │ ├── db.js               # MongoDB connection setup
│ │ └── upstash.js          # Upstash Redis configuration for rate limiting
│ ├── controllers/
│ │ └── notesControllers.js # Handlers for notes-related logic
│ ├── middleware/
│ │ └── rateLimiter.js      # Middleware to apply rate limiting
│ ├── models/
│ │ └── Note.js             # Mongoose schema for notes
│ └── routes/
│ └── notesRoutes.js        # Routes for note CRUD operations
├── .env                    # Environment variables
├── server.js               # Entry point to the backend server
├── package.json            # Project metadata and dependencies
└── package-lock.json       # Auto-generated lockfile for dependencie
```

**Frontend**
```kotlin
├── public/
│ └── quill.png             # Logo/image asset
├── src/
│ ├── components/           # Reusable UI components
│ │ ├── Navbar.jsx
│ │ ├── NoteCard.jsx
│ │ ├── NotesNotFound.jsx
│ │ ├── RateLimitedUI.jsx
│ │ └── Spinner.jsx
│ ├── lib/                  # Utility libraries
│ │ ├── axios.js            # Axios instance for API calls
│ │ └── utils.js            # Helper utility functions
│ ├── pages/                # Route-level components (pages)
│ │ ├── CreatePage.jsx
│ │ ├── DetailPage.jsx
│ │ └── HomePage.jsx
│ ├── App.jsx               # Main app component with routes
│ ├── index.css             # Tailwind CSS import
│ └── main.jsx              # React DOM root entry
├── index.html              # Main HTML template
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind theme and settings
├── vite.config.js          # Vite config for dev/prod builds
├── eslint.config.js        # Linting rules
└── README.md               # Project documentation
```
