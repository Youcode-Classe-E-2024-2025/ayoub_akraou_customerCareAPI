# CustomerCareAPI - Documentation des Endpoints

## Introduction
Cette API RESTful gère un système de support client avec des fonctionnalités d'authentification, de gestion de tickets et de réponses.

## Prérequis
- PHP 8.4+
- Laravel 12
- Sanctum pour l'authentification

## Authentification

### Inscription
- **Endpoint**: `POST /api/register`
- **Description**: Enregistre un nouvel utilisateur
- **Paramètres requis**:
  - `name`: Nom de l'utilisateur
  - `email`: Adresse email unique
  - `password`: Mot de passe (min. 8 caractères)
- **Réponse**: Token d'authentification Sanctum

### Connexion
- **Endpoint**: `POST /api/login`
- **Description**: Authentifie un utilisateur
- **Paramètres requis**:
  - `email`: Adresse email
  - `password`: Mot de passe
- **Réponse**: Token d'authentification Sanctum

### Déconnexion
- **Endpoint**: `POST /api/logout`
- **Description**: Invalide le token d'authentification de l'utilisateur courant
- **Authentification requise**: Oui

## Gestion des Tickets

### Créer un ticket
- **Endpoint**: `POST /api/tickets`
- **Description**: Crée un nouveau ticket de support
- **Authentification requise**: Oui
- **Paramètres requis**:
  - `sujet`: Titre du ticket
  - `description`: Description détaillée

### Lister les tickets
- **Endpoint**: `GET /api/tickets`
- **Description**: Récupère la liste des tickets
- **Authentification requise**: Oui

### Détails d'un ticket
- **Endpoint**: `GET /api/tickets/{id}`
- **Description**: Récupère les détails d'un ticket spécifique
- **Authentification requise**: Oui

### Mettre à jour un ticket
- **Endpoint**: `PUT/PATCH /api/tickets/{id}`
- **Description**: Modifie les informations d'un ticket
- **Authentification requise**: Oui

### Supprimer un ticket
- **Endpoint**: `DELETE /api/tickets/{id}`
- **Description**: Supprime un ticket
- **Authentification requise**: Oui

### Tickets disponibles
- **Endpoint**: `GET /api/tickets/available`
- **Description**: Liste les tickets non attribués
- **Authentification requise**: Oui

### Réclamer un ticket
- **Endpoint**: `POST /api/tickets/{id}/claim`
- **Description**: Attribue le ticket à l'agent connecté
- **Authentification requise**: Oui

### Résoudre un ticket
- **Endpoint**: `PATCH /api/tickets/{id}/resolve`
- **Description**: Marque un ticket comme résolu
- **Authentification requise**: Oui

## Gestion des Réponses

### Ajouter une réponse à un ticket
- **Endpoint**: `POST /api/tickets/{id}/responses`
- **Description**: Ajoute une réponse à un ticket spécifique
- **Authentification requise**: Oui

### Lister les réponses d'un ticket
- **Endpoint**: `GET /api/tickets/{id}/responses`
- **Description**: Récupère toutes les réponses pour un ticket
- **Authentification requise**: Oui

## Authentification
Tous les endpoints (sauf login et register) nécessitent un token Sanctum valide dans l'en-tête Authorization.

## Gestion des Erreurs
- 401 Unauthorized: Token invalide ou manquant
- 403 Forbidden: Droits insuffisants
- 404 Not Found: Ressource non trouvée
- 422 Unprocessable Entity: Erreurs de validation
