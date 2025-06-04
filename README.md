# Chatbot Frontend

This is the frontend of a chatbot application built with React and Vite. It features a clean user interface with conditional styling for user and bot messages, a typing indicator, and disabled input during bot responses. The application is containerized using Docker for easy deployment.

## Features

- Built with React and Vite for fast development and performance.
- Modular components (ChatBubble, BotTyping).
- Responsive and minimal dark-themed UI.
- Dockerized for consistent builds and deployment.

## Getting Started

### Run with Docker

To build and run the frontend in a Docker container:

```bash
docker build -t chatbot-frontend .
docker run -p 3000:3000 chatbot-frontend
```
Once running, open your browser and go to http://localhost:3000

## Project Structure

├── src/  
│   ├── components/  
│   │   ├── BotTyping.jsx  
│   │   ├── ChatBubble.jsx  
│   │   └── Loader.jsx  
│   ├── pages/  
│   │   └── Home.jsx  
│   ├── App.css  
│   ├── App.jsx  
│   ├── index.css  
│   └── main.jsx  
├── public/  
├── .env  
├── .gitignore  
├── docker-compose.yml  
├── Dockerfile  
├── eslint.config.js  
├── index.html  
├── package-lock.json  
├── package.json  
└── vite.config.js  

