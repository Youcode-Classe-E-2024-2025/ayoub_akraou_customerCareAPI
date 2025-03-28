# ayoub_akraou_customerCareAPI

**CustomerCareAPI – API avancée pour un service client avec Laravel et consommation en JS.**

**Project Supervisor:** Iliass RAIHANI.

**Author:** Ayoub Akraou.

## Links

- **Presentation Link :** [View Presentation](https://www.canva.com/design/DAGjBqlPGMA/gaZpkEDXmeAg1iPhuEMA5g/edit?utm_content=DAGjBqlPGMA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- **Backlog Link :** [View on Backlog](https://github.com/orgs/Youcode-Classe-E-2024-2025/projects/182/views/1)


### Créé : 28/03/25


# Configuration et Exécution du Projet Laravel

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- **PHP** (à partir de la version recommandée par Laravel, voir [PHP](https://www.php.net/)).
- **Composer** ([télécharger ici](https://getcomposer.org/download/)).
- **Node.js** et **npm** ([télécharger ici](https://nodejs.org/)).

## Installation du projet

### 1. Cloner le dépôt

Ouvrez un terminal et exécutez :
```bash
git clone https://github.com/Youcode-Classe-E-2024-2025/ayoub_akraou_customerCareAPI.git
cd ayoub_akraou_customerCareAPI
```

### 2. Installer les dépendances PHP

Dans le dossier du projet, exécutez :
```bash
composer install
```

### 3. Configurer le fichier `.env`

Copiez le fichier `.env.example` et renommez-le en `.env` :
```bash
cp .env.example .env  # Linux/Mac
copy .env.example .env # Windows
```

Modifiez les paramètres de la base de données dans `.env` :
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=YOUR_DATABSE_NAME
DB_USERNAME=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
```

### 4. Générer la clé d'application

Exécutez la commande suivante pour générer une clé unique :
```bash
php artisan key:generate
```

### 5. Exécuter les migrations et seeders (si disponibles)

Créez la base de données et appliquez les migrations :
```bash
php artisan migrate --seed
```

### 6. Installer les dépendances front-end

Installez les dépendances npm :
```bash
npm install
```
Si votre projet utilise Vite, démarrez le build :
```bash
npm run dev
```

### 7. Démarrer le serveur local

Utilisez la commande artisan pour démarrer le serveur Laravel :
```bash
php artisan serve
```
Accédez au projet via : [http://127.0.0.1:8000](http://127.0.0.1:8000)


## Contexte du projet:

- Le projet CustomerCareAPI consiste à développer une API avancée en Laravel pour la gestion d’un service client. L’API devra gérer les tickets d’assistance, permettre l’attribution de demandes aux agents, suivre l’état des requêtes et fournir un historique des interactions. L’objectif est de concevoir une API REST robuste en respectant les bonnes pratiques de développement et d’architecture, puis de la consommer via n’importe quel framework JS (Vue.js, React, Angular, etc.).


## **Objectifs du projet :**

#### **Fonctionnels :**
L’objectif est d’apprendre à créer une API avancée avec Laravel et de la consommer via un framework JavaScript, en intégrant :

✅ Swagger pour documenter l’API.

✅ Service Layer Design Pattern pour organiser le code.

✅ Gestion avancée des requêtes API.

✅ Authentification et autorisation sécurisées avec Laravel Sanctum.

✅ Consommation de l’API avec un framework JS.

## **Modalités d'évaluation**

L’évaluation portera sur les critères suivants :
✅ Conception de l’API : respect des bonnes pratiques REST et architecture modulaire.
✅ Service Layer Design Pattern correctement implémenté.
✅ Swagger : documentation complète et claire de l’API.
✅ Tests PHPUnit : couverture correcte avec tests unitaires et fonctionnels.
✅ Consommation de l’API avec un framework JS : bonne interaction entre le frontend et l’API.
✅ Gestion de projet : organisation rigoureuse sur GitHub (backlog, commits, Kanban).
✅ Présentation et démonstration lors de la soutenance.