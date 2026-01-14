# Tutoriel : Application Web avec Docker

Un projet simple pour apprendre Docker + Nginx + Node.js + MySQL + Git

## Ce qu'on va faire

- Un **site web** (HTML/CSS/JS séparés)
- Une **API** en Node.js (1 seul fichier !)
- Une **base de données** MySQL
- Le tout avec **Docker** et **Nginx** comme reverse proxy
- Versionner le code avec **Git**

## Structure du projet

```
tuto_dev/
├── docker-compose.yml          # Configuration Docker (IMPORTANT !)
│
├── nginx/
│   └── default.conf            # Configuration du reverse proxy (9 lignes)
│
├── frontend/                   # Site web
│   ├── index.html             # Structure HTML
│   ├── style.css              # Design CSS
│   └── app.js                 # Logique JavaScript
│
├── backend/                    # API Node.js
│   ├── server.js              # Code serveur (50 lignes)
│   └── package.json           # Dépendances
│
└── mysql/
    └── init.sql               # Base de données initiale (3 users)
```

## Démarrage rapide

### 1. Installer les outils
- **Docker Desktop** : pour faire tourner les conteneurs
- **Git** : pour versionner ton code

### 2. Cloner ou initialiser le projet

**Si tu clones depuis GitHub :**
```bash
git clone <url-du-repo>
cd tuto_dev
```

**Si c'est un nouveau projet :**
```bash
git init
git add .
git commit -m "Initial commit"
```

### 3. Configurer les variables d'environnement

Copie le fichier d'exemple et modifie-le si nécessaire :

```bash
cp .env.example .env
```

Le fichier `.env` contient :
- **DB_USER** : utilisateur MySQL (par défaut : root)
- **DB_PASSWORD** : mot de passe MySQL (par défaut : secret)
- **DB_NAME** : nom de la base de données (par défaut : tuto_db)
- **DB_HOST** : hôte MySQL (par défaut : mysql)
- **DB_PORT** : port MySQL (par défaut : 3306)

**Important :** Le fichier `.env` est dans `.gitignore` et ne sera pas versionné (il peut contenir des secrets).

### 4. Lancer le projet
```bash
docker-compose up
```

### 5. Tester l'application
Ouvre ton navigateur : **http://localhost**

## Comment ça marche ?

### Les 4 conteneurs Docker

1. **nginx** (port 80) → Point d'entrée, redirige les requêtes
2. **frontend** → Sert les fichiers HTML/CSS/JS
3. **backend** → API Node.js qui communique avec MySQL
4. **mysql** → Base de données avec 3 utilisateurs de test

### Le flux de données

```
Navigateur web (http://localhost)
           ↓
    Nginx (port 80)
           ↓
    ├─ "/" ────────→ Frontend (HTML/CSS/JS)
    │                    ↓
    └─ "/api/*" ───→ Backend (Node.js)
                         ↓
                    MySQL (base de données)
```

## Commandes Docker utiles

```bash
# Démarrer les conteneurs
docker-compose up

# Démarrer en arrière-plan (detached)
docker-compose up -d

# Voir les logs en temps réel
docker-compose logs -f

# Arrêter les conteneurs
docker-compose down

# Tout supprimer (conteneurs + base de données)
docker-compose down -v

# Redémarrer un seul conteneur
docker-compose restart frontend
docker-compose restart backend

# Voir l'état des conteneurs
docker-compose ps
```

## Tester l'API directement

### Via le navigateur
Ouvre **http://localhost** et clique sur les boutons !

### Via la ligne de commande
```bash
# Tester le status de l'API
curl http://localhost/api/status

## Git : Versionner ton code

### Initialiser Git dans le projet

```bash
# Se placer dans le dossier du projet
cd tuto_dev

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: projet Docker simple
# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Premier commit : projet Docker complet"
```

### Commandes Git essentielles

```bash
# Voir l'état des fichiers
git status

# Voir l'historique
git log --oneline

# Ajouter des fichiers modifiés
git add .

# Créer un commit
git commit -m "Description de tes changements"

# Voir les différences
git diff
```

### Pousser sur GitHub via les commandes

```bash
# 1. Créer un repo sur GitHub (dans ton navigateur)

# 2. Lier ton projet local à GitHub
git remote add origin https://github.com/TON-PSEUDO/tuto_dev.git

# 3. Pousser ton code
git branch -M main
git push -u origin main
```

### Workflow typique

```bash
# 1. Modifier des fichiers (ex: backend/server.js)

# 2. Voir ce qui a changé
git status
git diff

# 3. Ajouter et committer
git add .
git commit -m "Ajout d'une nouvelle route API"

# 4. Pousser sur GitHub
git push
```

### Branches

```bash
# Créer une nouvelle branche
git checkout -b ma-nouvelle-feature

# Faire des modifs et committer
git add .
git commit -m "Test d'une nouvelle fonctionnalité"

# Revenir sur la branche principale
git checkout main

# Fusionner ta branche
git merge ma-nouvelle-feature
```

## Points clés à retenir

### Infrastructure
- **Nginx** : reverse proxy qui redirige les requêtes avec le fichier de configuration **default.conf**
- **Docker Compose** : orchestre plusieurs conteneurs avec **docker-compose.yml** qui définit tous les services (frontend, backend, mysql, nginx)  
- **Volumes** : persiste les données MySQL même si tu supprimes les conteneurs  
- **Networks** : permet aux conteneurs de communiquer entre eux  

### Architecture Web
- **Frontend** : 3 fichiers séparés : **index.html**, **style.css** et **app.js**
- **Backend** : 1 fichier **server.js** avec les routes de l'API
- **API REST** : communication en JSON entre frontend et backend  
- **MySQL** : base de données relationnelle pour stocker les données initialisée avec le fichier **init.sql**

### Git
- **git init** : crée un dépôt Git  
- **git add .** : prépare tous les fichiers modifiés  
- **git commit -m "message"** : sauvegarde un snapshot  
- **git push** : envoie sur GitHub  
- **.gitignore** : ignore node_modules, .env, etc...  
