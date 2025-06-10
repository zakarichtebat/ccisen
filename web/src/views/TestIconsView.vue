<template>
  <div class="test-icons">
    <h1>🧪 Test des Icônes Font Awesome</h1>
    <div class="test-status">
      <span class="status-indicator" :class="{ 'success': iconsWorking, 'error': !iconsWorking }">
        {{ iconsWorking ? '✅ Icônes fonctionnelles' : '❌ Problème détecté' }}
      </span>
    </div>
    
    <section>
      <h2>Icônes Solid (fa-solid)</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <i class="fa-solid fa-home"></i>
          <span>Home</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-user"></i>
          <span>User</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-magnifying-glass"></i>
          <span>Search</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-circle-question"></i>
          <span>Question</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-book"></i>
          <span>Book</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-graduation-cap"></i>
          <span>Formation</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-calendar-days"></i>
          <span>Calendar</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-users"></i>
          <span>Users</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-gear"></i>
          <span>Settings</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-plus"></i>
          <span>Add</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-pen-to-square"></i>
          <span>Edit</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-trash"></i>
          <span>Delete</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Icônes Regular (fa-regular)</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <i class="fa-regular fa-heart"></i>
          <span>Heart</span>
        </div>
        <div class="icon-item">
          <i class="fa-regular fa-clock"></i>
          <span>Clock</span>
        </div>
        <div class="icon-item">
          <i class="fa-regular fa-user"></i>
          <span>User Regular</span>
        </div>
        <div class="icon-item">
          <i class="fa-regular fa-envelope"></i>
          <span>Email</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Icônes Brands (fa-brands)</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <i class="fa-brands fa-facebook"></i>
          <span>Facebook</span>
        </div>
        <div class="icon-item">
          <i class="fa-brands fa-twitter"></i>
          <span>Twitter</span>
        </div>
        <div class="icon-item">
          <i class="fa-brands fa-linkedin"></i>
          <span>LinkedIn</span>
        </div>
        <div class="icon-item">
          <i class="fa-brands fa-youtube"></i>
          <span>YouTube</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Icônes avec Fallback Émojis</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <i class="fas fa-question-circle"></i>
          <span>Question avec fallback 🏠</span>
        </div>
        <div class="icon-item">
          <i class="fas fa-book"></i>
          <span>Livre avec fallback 📖</span>
        </div>
        <div class="icon-item">
          <i class="fas fa-headset"></i>
          <span>Support avec fallback 🎧</span>
        </div>
        <div class="icon-item">
          <i class="fas fa-graduation-cap"></i>
          <span>Formation avec fallback 🎓</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Icônes utilisées dans l'Admin</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <i class="fa-solid fa-layer-group"></i>
          <span>Layer Group</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-filter"></i>
          <span>Filter</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-arrows-rotate"></i>
          <span>Refresh</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-chart-line"></i>
          <span>Chart</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-calendar-plus"></i>
          <span>Calendar Plus</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>Warning</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-map-location-dot"></i>
          <span>Location</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-phone"></i>
          <span>Phone</span>
        </div>
      </div>
    </section>

    <div class="actions">
      <router-link to="/aide" class="back-link">← Retour à la page d'aide</router-link>
      <router-link to="/admin" class="admin-link">🔧 Administration</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestIconsView',
  data() {
    return {
      iconsWorking: true
    }
  },
  mounted() {
    // Test simple pour vérifier si les icônes se chargent
    this.$nextTick(() => {
      const icons = document.querySelectorAll('.fa-solid, .fa-regular, .fa-brands')
      let workingIcons = 0
      
      icons.forEach(icon => {
        const computedStyle = window.getComputedStyle(icon)
        const fontFamily = computedStyle.fontFamily
        
        if (fontFamily.includes('Font Awesome')) {
          workingIcons++
        }
      })
      
      this.iconsWorking = workingIcons > icons.length * 0.5 // Au moins 50% des icônes fonctionnent
      console.log(`Icônes détectées: ${workingIcons}/${icons.length}`)
    })
  }
}
</script>

<style scoped>
.test-icons {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 20px;
}

h1 {
  text-align: center;
  color: #1e293b;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
}

.test-status {
  text-align: center;
  margin-bottom: 2rem;
}

.status-indicator {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.status-indicator.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.status-indicator.error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

h2 {
  color: #374151;
  margin: 3rem 0 1.5rem;
  border-bottom: 3px solid #e2e8f0;
  padding-bottom: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  position: relative;
}

h2::before {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.icon-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border-color: #667eea;
}

.icon-item i {
  font-size: 2rem;
  color: #667eea;
  transition: all 0.3s ease;
  margin: 0 0.25rem;
}

.icon-item:hover i {
  color: #764ba2;
  transform: scale(1.1);
}

.icon-item span {
  font-size: 0.9rem;
  color: #64748b;
  text-align: center;
  font-weight: 500;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.back-link, .admin-link {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.back-link {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
}

.back-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.admin-link {
  background: linear-gradient(135deg, #10b981 0%, #047857 100%);
  color: white;
}

.admin-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .test-icons {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .icon-item {
    padding: 1rem;
  }
  
  .icon-item i {
    font-size: 1.5rem;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .back-link, .admin-link {
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
}

/* Animation pour l'icône de rechargement */
.fa-sync-alt {
  animation: none;
}

.icon-item:hover .fa-sync-alt {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style> 