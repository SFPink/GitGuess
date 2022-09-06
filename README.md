# Git Guess

A simple application that aims to guess your favourite programming language based on your repositories. Built with React, Typescript, CSS and a little D3.

### Project Status

This project is currently in development.



## Installation and Setup Instructions

Clone repository and follow the steps below.

**First Time Setup**

`make setup`

**Start Application**

`make up`

Navigate to `http://localhost:3000/`

**To Run Tests**

`make test.unit`

**To Run Coverage**

`make test.coverage`

### Gotcha's

GitHub API throttling can be an issue. If this is an issue rename the `.env.example` file to `.env`. Following this create a *Personal Access Token* on your GitHub account (or use an existing one) and paste it into the `.env`. This will give you some additional requests.

### TODO's

- Fix Cypress E2E testing in docker
