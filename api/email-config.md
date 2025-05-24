# Configuration Email pour CCIS Nador

## Étapes de configuration Gmail

### 1. Activer l'authentification à 2 facteurs sur Gmail
- Aller dans votre compte Google
- Sécurité → Authentification à 2 facteurs → Activer

### 2. Générer un mot de passe d'application
- Dans les paramètres de sécurité Google
- Aller dans "Mots de passe d'application"
- Sélectionner "Mail" et "Autre (nom personnalisé)"
- Saisir "CCIS Nador Website"
- Copier le mot de passe généré (16 caractères)

### 3. Créer le fichier .env dans le dossier api/

```env
# Configuration Email SMTP (Gmail)
EMAIL_USER=zakariachtebat@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
# ⬆️ Remplacer par le mot de passe d'application généré

# Autres configurations...
DATABASE_URL="votre-url-database"
JWT_SECRET="votre-secret-jwt"
PORT=3001
```

### 4. Tester l'envoi d'emails
- Redémarrer le serveur NestJS
- Tester le formulaire de contact sur le site
- Vérifier la réception dans zakariachtebat@gmail.com

## Format des emails reçus
Les emails auront ce format :
- **Expéditeur** : Email du visiteur
- **Destinataire** : zakariachtebat@gmail.com
- **Sujet** : "Contact CCIS Nador - [Sujet choisi]"
- **Contenu** : HTML formaté avec toutes les informations
- **Reply-To** : Email du visiteur (pour répondre directement)

## API Endpoint
- **URL** : `POST /contact/send`
- **Données** : nom, prenom, email, telephone, entreprise, sujet, message 