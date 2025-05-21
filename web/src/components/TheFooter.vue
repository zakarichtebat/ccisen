<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Logo et description -->
      <div class="footer-section company-info">
        <h3>CCISN Nador</h3>
        <p>Chambre de Commerce, d'Industrie et de Services de Nador - Votre partenaire de confiance depuis 1965.</p>
        <div class="social-icons">
          <a href="https://www.facebook.com/ChambreDeCommerceDeNador/" aria-label="Facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      
      <!-- Liens rapides -->
      <div class="footer-section links">
        <h4>Liens Rapides</h4>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/services">Services</router-link></li>
          <li><router-link to="/about">À propos</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/faq">FAQ</router-link></li>
        </ul>
      </div>
      
      <!-- Services -->
      <div class="footer-section services">
        <h4>Nos Services</h4>
        <ul>
          <li><router-link to="/services/accompagnement">Accompagnement des Entreprises</router-link></li>
          <li><router-link to="/services/certificats">Certificats et Documents</router-link></li>
          <li><router-link to="/services/formation">Formation</router-link></li>
          <li><router-link to="/services/export">Promotion et Export</router-link></li>
          <li><router-link to="/services/carte-adherent">Carte d'Adhésion</router-link></li>
        </ul>
      </div>
      
      <!-- Contact et newsletter -->
      <div class="footer-section contact">
        <h4>Contact</h4>
        <ul class="contact-info">
          <li><i class="fas fa-map-marker-alt"></i> Quartier Administratif, Rue Ahmed Arrifi, BP.37, Nador, Maroc</li>
          <li><i class="fas fa-phone"></i> +212 536 603 857</li>
          <li><i class="fas fa-envelope"></i> contact@ccisn.ma</li>
          <li><i class="fas fa-clock"></i> Lun-Ven: 8h30-16h30</li>
        </ul>
        
       
      </div>
    </div>
    
    <!-- Barre de séparation -->
    <div class="footer-divider"></div>
    
    <!-- Copyright et liens légaux -->
    <div class="footer-bottom">
      <div class="footer-bottom-container">
        <p class="copyright">&copy; {{ new Date().getFullYear() }} CCISN. Tous droits réservés.</p>
        <div class="legal-links">
          <router-link to="/privacy">Politique de confidentialité</router-link>
          <router-link to="/terms">Conditions d'utilisation</router-link>
          <router-link to="/legal">Mentions légales</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
/**
 * Gère l'abonnement à la newsletter
 */
const subscribeNewsletter = () => {
  // Logique d'abonnement à implémenter
  console.log('Abonnement à la newsletter demandé')
  // Ici vous pourriez appeler une API pour enregistrer l'email
}
</script>

<style scoped>
.footer {
  background-color: #1a2431;
  color: #f8f9fa;
  font-size: 0.95rem;
  position: relative;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2.5rem;
}

/* Section entreprise */
.footer-section h3 {
  font-size: 2rem;
  margin-bottom: 1.2rem;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  font-weight: 700;
}

.footer-section h4 {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
  color: #fff;
  position: relative;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-section h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 40px;
  height: 3px;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
}

.company-info p {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #ccc;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #fff;
  transition: all 0.3s ease;
}

.social-icons a:hover {
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  transform: translateY(-3px);
}

/* Liens */
.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 0.8rem;
}

.footer-section ul li a {
  color: #ccc;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 15px;
  display: block;
}

.footer-section ul li a::before {
  content: '›';
  position: absolute;
  left: 0;
  color: #4CAF50;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.footer-section ul li a:hover {
  color: #4CAF50;
  transform: translateX(5px);
}

.footer-section ul li a:hover::before {
  transform: translateX(3px);
}

/* Contact info */
.contact-info {
  list-style: none;
  padding: 0;
}

.contact-info li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: #ccc;
}

.contact-info li i {
  margin-right: 10px;
  color: #4CAF50;
  min-width: 16px;
}

/* Newsletter */
.newsletter-title {
  margin-top: 2rem;
}

.newsletter-form {
  display: flex;
  margin-top: 1rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 4px 0 0 4px;
}

.newsletter-form input::placeholder {
  color: #aaa;
}

.newsletter-form input:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.15);
}

.btn-subscribe {
  padding: 0.8rem 1.2rem;
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  transition: all 0.3s ease;
}

.btn-subscribe:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* Divider */
.footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 auto;
  width: 90%;
}

/* Footer bottom */
.footer-bottom {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1.5rem 0;
}

.footer-bottom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  margin: 0;
  color: #aaa;
  font-size: 0.9rem;
}

.legal-links {
  display: flex;
  gap: 1.5rem;
}

.legal-links a {
  color: #aaa;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.legal-links a:hover {
  color: #4CAF50;
}

/* Responsive design */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 3rem 2rem 2rem;
  }
  
  .footer-section h4::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .footer-section,
  .contact-info,
  .social-icons,
  .footer-section ul li a {
    text-align: center;
    display: block;
  }
  
  .footer-section ul li a::before {
    display: none;
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .contact-info li {
    justify-content: center;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-form input {
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .btn-subscribe {
    border-radius: 4px;
  }
  
  .footer-bottom-container {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .legal-links {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style> 