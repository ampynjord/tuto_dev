-- Script d'initialisation MySQL
-- Ce fichier est exécuté automatiquement au premier démarrage du conteneur MySQL

USE tuto_db;

-- Créer la table des utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ajouter quelques utilisateurs de test
INSERT INTO users (name, email) VALUES
    ('Alice Dupont', 'alice@example.com'),
    ('Bob Martin', 'bob@example.com'),
    ('Charlie Dubois', 'charlie@example.com');

-- Afficher les utilisateurs créés
SELECT '✅ Base de données initialisée !' AS status;
SELECT * FROM users;
