const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function resetPassword() {
  try {
    const email = 'jamal@gmail.com';
    const newPassword = 'password123'; // Mot de passe temporaire simple
    
    console.log(`🔄 Réinitialisation du mot de passe pour: ${email}`);
    
    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true
      }
    });

    if (!user) {
      console.log(`❌ Utilisateur non trouvé: ${email}`);
      return;
    }

    console.log(`✅ Utilisateur trouvé: ${user.nom} ${user.prenom} (ID: ${user.id})`);

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(`🔑 Nouveau hash généré (longueur: ${hashedPassword.length})`);

    // Mettre à jour le mot de passe
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        motDePasse: hashedPassword,
        updatedAt: new Date()
      }
    });

    console.log(`✅ Mot de passe réinitialisé avec succès !`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔐 Nouveau mot de passe: ${newPassword}`);
    console.log(`⚠️  Changez ce mot de passe après la première connexion !`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la réinitialisation:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword(); 