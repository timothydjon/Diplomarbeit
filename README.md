# Project: Viktig

This README document provides instructions for setting up your local development environment for the Viktig Frontend project.

## Prerequisites

Before getting started, ensure you have:

- Cloned the repository
- Set up nvm (Node Version Manager)
- Installed Yarn globally

## Setup

### 1. Install dependencies

Install the necessary dependencies using `yarn`:

```bash
nvm use && yarn
```

2. Create .env file

Create a .env file at the root of the project with the following content:

```bash
REACT_APP_SOCKET_URL=http://localhost:8080
```

3. Run the application

Start your local development server using yarn dev:

```bash
yarn dev
```

After following these steps, the da_frontend application should be up and running in your local development environment.

