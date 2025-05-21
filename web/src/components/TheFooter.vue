<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>CCISN</h3>
        <p>Votre partenaire de confiance pour le développement de votre entreprise</p>
      </div>
      <div class="footer-section">
        <h4>Liens Rapides</h4>
        <router-link to="/">Accueil</router-link>
        <router-link to="/services">Services</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <div class="footer-section">
        <h4>Contact</h4>
        <p>Email: contact@ccisn.com</p>
        <p>Téléphone: +212 5XX-XXXXXX</p>
        <p>Adresse: 123 Rue Example, Ville</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} CCISN. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 4rem 0 0;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #4CAF50;
}

.footer-section p {
  margin: 0.5rem 0;
  color: #ecf0f1;
}

.footer-section a {
  display: block;
  color: #ecf0f1;
  text-decoration: none;
  margin: 0.5rem 0;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #4CAF50;
}

.footer-bottom {
  margin-top: 3rem;
  padding: 1.5rem 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.footer-bottom p {
  margin: 0;
  color: #ecf0f1;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style> 