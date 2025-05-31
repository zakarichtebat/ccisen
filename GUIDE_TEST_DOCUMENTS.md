# 🧪 Guide de Test - Système Documents CCISN

## 🚀 Étapes pour Tester les Fonctionnalités

### **Étape 1: Préparer les Données de Test**

```bash
# Dans le dossier api/
node seed-documents-data.js
```

**Résultat attendu:**

```
🌱 Ajout des données de test pour le système de documents...

📋 Création des types de documents...
✅ 3 types de documents créés

👤 Utilisateur de test: Jean Kouassi
📄 3 demandes créées
📊 Historique créé
🔔 Notifications créées
📄 Document généré créé

📊 RÉSUMÉ DES DONNÉES CRÉÉES:
├─ Types de documents: 3
├─ Demandes: 3
├─ Documents générés: 1
├─ Notifications: 3
└─ Historique: 5
```

---

### **Étape 2: Démarrer l'API**

```bash
npm run start:dev
```

**Résultat attendu:**

```
[Nest] 12345 - LOG Application is running on: http://[::1]:3000
```

---

### **Étape 3: Vérifier Swagger**

1. **Ouvrir:** http://localhost:3000/api
2. **Vérifier présence de:** `Documents CCISN` dans la liste des contrôleurs
3. **Constater:** Toutes les routes sont maintenant visibles !

**Routes visibles dans Swagger:**

- ✅ `/documents/types` - GET, POST, PATCH, DELETE
- ✅ `/documents/demandes` - GET, POST, PATCH
- ✅ `/documents/demandes/{id}/generer` - POST
- ✅ `/documents/mes-documents` - GET
- ✅ `/documents/notifications` - GET, PATCH
- ✅ `/documents/statistiques` - GET

---

### **Étape 4: Tests Automatisés**

```bash
# Dans un nouveau terminal (gardez l'API qui tourne)
node test-documents-api.js
```

**Résultat attendu:**

```
🧪 TEST COMPLET DE L'API DOCUMENTS CCISN
==================================================

ℹ️  Test 1: Vérification du serveur...
✅ API Swagger accessible

ℹ️  Test 2: Récupération des types de documents...
✅ 3 types de documents trouvés
Types disponibles: [ '1: Certificat d\'origine (15000 FCFA)', ... ]

ℹ️  Test 3: Création d'un nouveau type de document...
✅ Type créé avec ID: 4
✅ Type récupéré: Licence d'importation

[... autres tests ...]

✅ Tests API terminés
```

---

## 🎯 Tests Manuels dans Swagger

### **Test 1: Récupérer les Types de Documents**

**Route:** `GET /documents/types`

**Action:** Cliquer sur "Try it out" → "Execute"

**Résultat attendu:**

```json
[
  {
    "id": 1,
    "nom": "Certificat d'origine",
    "description": "Certificat attestant l'origine des marchandises",
    "prix": 15000,
    "delaiTraitement": 3,
    "actif": true
  }
  // ... autres types
]
```

---

### **Test 2: Créer une Demande de Document**

**Route:** `POST /documents/demandes`

**Données de test:**

```json
{
  "typeDocumentId": 1,
  "nomDemandeur": "Traore",
  "prenomDemandeur": "Aminata",
  "emailDemandeur": "aminata.traore@test.ci",
  "numRegistreCommerce": "RC-TEST-2024-002",
  "registreCommercePdf": "/uploads/registre-test.pdf",
  "photoIdentite": "/uploads/photo-test.jpg",
  "commentairesClient": "Test via Swagger"
}
```

**Résultat attendu:**

```json
{
  "id": 4,
  "nomDemandeur": "Traore",
  "prenomDemandeur": "Aminata",
  "statut": "en_attente",
  "typeDocument": {
    "nom": "Certificat d'origine",
    "prix": 15000
  },
  "user": {
    "nom": "Kouassi",
    "prenom": "Jean"
  }
}
```

---

### **Test 3: Changer le Statut d'une Demande**

**Route:** `PATCH /documents/demandes/{id}`

**ID:** Utiliser l'ID de la demande créée (ex: 4)

**Données:**

```json
{
  "statut": "accepte",
  "notes": "Documents vérifiés et conformes"
}
```

**Résultat attendu:**

```json
{
  "id": 4,
  "statut": "accepte",
  "notes": "Documents vérifiés et conformes",
  "dateTraitement": "2024-01-01T10:00:00.000Z"
}
```

---

### **Test 4: Générer un Document**

**Route:** `POST /documents/demandes/{id}/generer`

**ID:** Utiliser l'ID de la demande acceptée

**Résultat attendu:**

```json
{
  "id": 2,
  "numeroDocument": "CCISN-CE-1704067890123",
  "nomFichier": "certificat-d'origine-CCISN-CE-1704067890123.pdf",
  "cheminFichier": "/documents/generated/...",
  "statut": "genere"
}
```

---

### **Test 5: Vérifier les Statistiques**

**Route:** `GET /documents/statistiques`

**Résultat attendu:**

```json
{
  "totalDemandes": 4,
  "demandesEnAttente": 1,
  "demandesAcceptees": 1,
  "demandesRejetees": 0,
  "documentsGeneres": 2,
  "typesDocuments": 4
}
```

---

## 🔍 Vérification de la Structure

### **Relations dans la Base de Données**

Vérifier que les relations fonctionnent en testant:

1. **Demande → Type de Document**

   ```
   GET /documents/demandes
   → Chaque demande doit avoir un objet "typeDocument"
   ```

2. **Demande → Utilisateur**

   ```
   GET /documents/demandes
   → Chaque demande doit avoir un objet "user"
   ```

3. **Notifications liées aux Demandes**
   ```
   GET /documents/notifications
   → Notifications doivent référencer les demandes
   ```

---

## 🏆 Critères de Réussite

**✅ Tests Réussis Si:**

1. **Swagger fonctionne**

   - Section "Documents CCISN" visible
   - Toutes les routes documentées
   - Exemples de données fournis

2. **CRUD Complet**

   - ✅ Create: Créer types et demandes
   - ✅ Read: Lister et récupérer par ID
   - ✅ Update: Modifier statuts
   - ✅ Delete: Supprimer types (logique)

3. **Fonctionnalités Métier**

   - ✅ Workflow de demande complet
   - ✅ Historique des changements de statut
   - ✅ Notifications automatiques
   - ✅ Génération de documents
   - ✅ Statistiques

4. **Structure Données**
   - ✅ Relations Prisma fonctionnelles
   - ✅ Validation des données (DTOs)
   - ✅ Gestion d'erreurs appropriée

---

## 🚨 Problèmes Potentiels

**Si les routes n'apparaissent pas dans Swagger:**

1. Vérifier que `DocumentModule` est importé dans `AppModule`
2. Redémarrer l'API: `npm run start:dev`
3. Vider le cache du navigateur

**Si erreurs de base de données:**

1. Vérifier Prisma: `npx prisma generate`
2. Re-sync DB: `npx prisma db push`
3. Relancer le seed: `node seed-documents-data.js`

**Si erreurs de validation:**

1. Vérifier le format JSON dans Swagger
2. S'assurer que tous les champs requis sont fournis
3. Vérifier les types de données (string, number)

---

## 📋 Checklist Finale

- [ ] API démarre sans erreur
- [ ] Swagger affiche "Documents CCISN"
- [ ] Données de test créées
- [ ] Tests automatisés passent
- [ ] CRUD fonctionne dans Swagger
- [ ] Relations base de données OK
- [ ] Workflow complet testé
- [ ] Statistiques correctes

**🎉 Si tout est coché → Système de documents CCISN 100% fonctionnel !**
