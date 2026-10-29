# Tutorial: Web application with Docker

A simple project to learn Docker + Nginx + Node.js + MySQL + Git

## What we are going to do

- A **website** (separate HTML/CSS/JS)
- A **Node.js API**
- A **MySQL database**
- All of it with **Docker** and **Nginx** as a reverse proxy
- Version the code with **Git**

## Project structure

```
tuto_dev/
├── docker-compose.yml          # Docker configuration (IMPORTANT!)
│
├── nginx/
│   └── default.conf            # Reverse proxy configuration (9 lines)
│
├── frontend/                   # Website
│   ├── index.html             # HTML structure
│   ├── style.css              # CSS design
│   └── app.js                 # JavaScript logic
│
├── backend/                    # Node.js API
│   ├── server.js              # Server code (50 lines)
│   └── package.json           # Dependencies
│
└── mysql/
    └── init.sql               # Initial database (3 users)
```

## Quick start

### 1. Install the tools
- **Docker**: to run the containers (**Docker Desktop** on Windows)
- **Git**: to version your code

### 2. Clone or initialize the project

**If you clone from GitHub:**
```bash
git clone <repo-url>
cd tuto_dev
```

**If it is a new project:**
```bash
git init
git add .
git commit -m "Initial commit"
```

### 3. Configure the environment variables

Copy the example file and edit it if needed:

```bash
cp .env.example .env
```

The `.env` file contains:
- **DB_USER**: MySQL user (default: root)
- **DB_PASSWORD**: MySQL password (default: secret)
- **DB_NAME**: database name (default: tuto_db)
- **DB_HOST**: MySQL host (default: mysql)
- **DB_PORT**: MySQL port (default: 3306)

**Important:** the `.env` file is in `.gitignore` and will not be versioned (it may contain secrets).

### 4. Run the project
```bash
docker-compose up
```

### 5. Test the application
Open your browser: **http://localhost**

## How does it work?

### The 4 Docker containers

1. **nginx** (port 80) → entry point, routes the requests
2. **frontend** → serves the HTML/CSS/JS files
3. **backend** → Node.js API that talks to MySQL
4. **mysql** → database with 3 test users

### Data flow

```
Web browser (http://localhost)
           ↓
    Nginx (port 80)
           ↓
    ├─ "/" ────────→ Frontend (HTML/CSS/JS)
    │                    ↓
    └─ "/api/*" ───→ Backend (Node.js)
                         ↓
                    MySQL (database)
```

## Useful Docker commands

```bash
# Start the containers
docker-compose up

# Start in the background (detached)
docker-compose up -d

# Follow the logs in real time
docker-compose logs -f

# Stop the containers
docker-compose down

# Remove everything (containers + database)
docker-compose down -v

# Restart a single container
docker-compose restart frontend
docker-compose restart backend

# See the containers' state
docker-compose ps
```

## Testing the API directly

### In the browser
Open **http://localhost** and click the buttons!

### From the command line
```bash
# Test the API status
curl http://localhost/api/status
```

## Git: versioning your code

### Initialize Git in the project

```bash
# Go to the project folder
cd tuto_dev

# Initialize Git
git init

# Add all files
git add .

# Create the first commit
git commit -m "Initial commit: simple Docker project"
```

### Essential Git commands

```bash
# See the state of the files
git status

# See the history
git log --oneline

# Add modified files
git add .

# Create a commit
git commit -m "Description of your changes"

# See the differences
git diff
```

### Pushing to GitHub from the command line

```bash
# 1. Create a repository on GitHub (in your browser)

# 2. Link your local project to GitHub
git remote add origin https://github.com/YOUR-USERNAME/tuto_dev.git

# 3. Push your code
git branch -M main
git push -u origin main
```

### Typical workflow

```bash
# 1. Edit files (e.g. backend/server.js)

# 2. See what changed
git status
git diff

# 3. Add and commit
git add .
git commit -m "Add a new API route"

# 4. Push to GitHub
git push
```

### Branches

```bash
# Create a new branch
git checkout -b my-new-feature

# Make changes and commit
git add .
git commit -m "Try a new feature"

# Go back to the main branch
git checkout main

# Merge your branch
git merge my-new-feature
```

## Key points to remember

### Infrastructure
- **Nginx**: reverse proxy that routes requests using the **default.conf** configuration file
- **Docker Compose**: orchestrates several containers with **docker-compose.yml**, which defines all the services (frontend, backend, mysql, nginx)
- **Volumes**: persist the MySQL data even if you delete the containers
- **Networks**: let the containers talk to each other

### Web architecture
- **Frontend**: 3 separate files: **index.html**, **style.css** and **app.js**
- **Backend**: 1 **server.js** file with the API routes
- **REST API**: JSON communication between frontend and backend
- **MySQL**: relational database to store data, initialized with the **init.sql** file

### Git
- **git init**: creates a Git repository
- **git add .**: stages all modified files
- **git commit -m "message"**: saves a snapshot
- **git push**: sends to GitHub
- **.gitignore**: ignores node_modules, .env, etc.