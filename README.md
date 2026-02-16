# ☕ Coffee Shop Website

Un projet d'application web dynamique développé dans le cadre de ma formation en conception et développement d'applications web.

## 📋 Description

**Coffee Shop Website** est une application web pour un café fictif spécialisé dans la vente de cafés du monde entier. L'application permet de consulter un catalogue de cafés avec leurs origines, caractéristiques et prix. Le projet m'a permis de monter en compétences avec Node.js, Express et PostgreSQL.

## ✨ Fonctionnalités

- **Catalogue de cafés** : Affichage dynamique des cafés stockés en base de données
- **Fiches produits détaillées** : Informations complètes sur chaque café (origine, caractéristiques, prix, stock)
- **Gestion des disponibilités** : Indication de disponibilité des produits
- **Formulaire de contact** : Envoi d'emails via EmailJS
- **Carte interactive** : Localisation de la boutique avec Leaflet.js
- **Architecture MVC** : Organisation claire et maintenable du code
- **Templates dynamiques** : Utilisation d'EJS pour le rendu des pages
- **Design responsive** : Adapté aux différentes tailles d'écran

## 🛠️ Technologies Utilisées

- **Node.js** : Environnement d'exécution JavaScript côté serveur
- **Express.js** (v5.2.1) : Framework web pour Node.js
- **PostgreSQL** : Base de données relationnelle
- **pg** (v8.18.0) : Client PostgreSQL pour Node.js
- **EJS** (v4.0.1) : Moteur de templates
- **dotenv** (v17.2.4) : Gestion des variables d'environnement
- **Multer** (v2.0.2) : Middleware pour la gestion des fichiers
- **EmailJS** : Service d'envoi d'emails côté client
- **Leaflet.js** : Bibliothèque de cartographie interactive

## 📁 Structure du Projet

```
website-coffee-nodejs/
├── index.js               # Point d'entrée de l'application
├── app/
│   ├── router.js         # Définition des routes
│   ├── db_client.js      # Configuration du client PostgreSQL
│   ├── dataMapper.js     # Requêtes SQL et manipulation des données
│   ├── controllers/      # Contrôleurs de l'application
│   └── views/            # Templates EJS
├── data/
│   └── create_db.sql     # Script de création et initialisation de la BDD
├── public/               # Fichiers statiques (CSS, JS, images)
├── package.json          # Dépendances du projet
└── .env.example          # Exemple de variables d'environnement
```

## 🎨 Concepts Mis en Œuvre

- **Architecture MVC** pour une organisation claire du code
- **Routage Express** pour la gestion des URLs
- **Data Mapper Pattern** pour l'abstraction de la base de données
- **Templates EJS** pour le rendu dynamique des pages
- **Requêtes paramétrées** pour la sécurité SQL
- **Variables d'environnement** pour la configuration
- **Modules ES6** avec import/export
- **Intégration d'APIs tierces** (EmailJS, Leaflet.js)

## 🚀 Installation et Utilisation

### Prérequis

- **Node.js** (version 14 ou supérieure)
- **npm** (généralement inclus avec Node.js)
- **PostgreSQL** (version 12 ou supérieure)
- **Compte EmailJS** (pour le formulaire de contact)

### Installation

1. **Cloner le repository** :
```bash
git clone https://github.com/CamilleDelmas/website-coffee-nodejs.git
cd website-coffee-nodejs
```

2. **Installer les dépendances** :
```bash
npm install
```

3. **Configurer les variables d'environnement** :
```bash
cp .env.example .env
```
Modifier le fichier `.env` avec vos paramètres :
```env
PORT=3000
PGHOST=localhost
PGUSER=votre_utilisateur
PGPASSWORD=votre_mot_de_passe
PGDATABASE=votre_bdd
PUBLICKEY=votre_cle_publique_emailjs
```

4. **Créer et initialiser la base de données** :

Se connecter à PostgreSQL :
```bash
psql -U postgres
```

Créer la base de données :
```sql
CREATE DATABASE coffee_shop;
\q
```

Importer le schéma et les données :
```bash
psql -U votre_utilisateur -d votre_bdd -f data/create_db.sql
```

5. **Lancer l'application** :
```bash
npm start
```

6. **Ouvrir votre navigateur** à l'adresse :
```
http://localhost:3000
```

### Scripts disponibles

- `npm start` : Lance l'application avec rechargement automatique (mode watch)
- `npm test` : Lance les tests (à configurer)

## 📦 Base de Données

### Structure

La base de données PostgreSQL contient 4 tables principales :

#### **country**
- `id` : Identifiant unique du pays
- `name` : Nom du pays d'origine du café

#### **coffee**
- `id` : Identifiant unique du café
- `reference` : Référence produit
- `name` : Nom du café
- `text` : Description détaillée
- `price_kg` : Prix au kilogramme
- `stock` : Disponibilité (boolean)
- `country_id` : Clé étrangère vers la table country

#### **feature**
- `id` : Identifiant unique de la caractéristique
- `name` : Nom de la caractéristique (Corsé, Fruité, Chocolaté, Doux, Épicé, Acide)

#### **coffee_feature**
- `id` : Identifiant unique
- `coffee_id` : Clé étrangère vers la table coffee
- `feature_id` : Clé étrangère vers la table feature

### Données de test

Le fichier `data/create_db.sql` contient :
- 16 pays producteurs de café
- 16 cafés du monde entier avec leurs caractéristiques
- 6 types de caractéristiques gustatives
- Les associations cafés/caractéristiques

### Réinitialisation de la base de données

Pour réinitialiser complètement la base de données :
```bash
psql -U votre_utilisateur -d coffee_shop -f data/create_db.sql
```
## 📧 Configuration EmailJS

Le formulaire de contact utilise **EmailJS** pour l'envoi d'emails sans backend dédié.

### Mise en place

1. **Créer un compte sur [EmailJS](https://www.emailjs.com/)**

2. **Configurer un service email** :
   - Connectez votre compte email (Gmail, Outlook, etc.)
   - Notez votre `Service ID`

3. **Créer un template d'email** :
   - Créez un template avec les variables du formulaire
   - Notez votre `Template ID`

4. **Récupérer votre clé publique** :
   - Dans les paramètres du compte, récupérez votre `Public Key`

5. **Configurer les variables d'environnement** :
   - Ajoutez votre `PUBLICKEY` dans le fichier `.env`
   - La clé sera injectée dans les templates EJS pour utilisation côté client

### Utilisation

Le formulaire de contact permet aux visiteurs de :
- Envoyer un message directement depuis le site
- Recevoir une confirmation d'envoi
- Bénéficier d'une validation des champs

## 🗺️ Configuration Leaflet.js

La page boutique affiche une **carte interactive** montrant la localisation du Coffee Shop grâce à **Leaflet.js**.

### Fonctionnalités de la carte

- **Affichage de la localisation** : Marker sur l'emplacement exact de la boutique
- **Zoom et déplacement** : Navigation fluide sur la carte
- **Popup d'information** : Informations sur la boutique au clic
- **Tuiles OpenStreetMap** : Fond de carte libre et gratuit

### Intégration

La carte est intégrée dans la page boutique avec :
- Inclusion du CSS et JS Leaflet depuis CDN
- Initialisation de la carte avec les coordonnées de la boutique

## 🎯 Objectifs Pédagogiques

Ce projet m'a permis d'aborder les thèmes suivants :
- Le développement d'applications avec **Node.js** et **Express**
- L'intégration et la manipulation d'une base de données **PostgreSQL**
- L'architecture **MVC** pour structurer une application
- Le **Data Mapper Pattern** pour l'abstraction des données
- La gestion des routes et du routage côté serveur
- L'utilisation de **templates EJS** pour le rendu dynamique
- Les requêtes SQL et les jointures entre tables
- Les bonnes pratiques en développement full-stack
- La gestion des variables d'environnement avec **dotenv**

## 📝 TODO

- [ ] Ajouter un système de recherche de cafés
- [ ] Implémenter un système de filtrage avancé
- [ ] Ajouter un panier et un système de commande
- [ ] Créer une interface d'administration pour gérer les produits
- [ ] Mettre en place des tests unitaires et d'intégration
- [ ] Déployer l'application sur un serveur de production


---

*Projet réalisé dans le cadre d'un exercice de formation en développement web full-stack*
