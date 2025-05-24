<template>
  <div class="map-wrapper">
    <!-- État de chargement -->
    <div v-if="isLoading" class="map-loading" :class="{ 'fade-out': fadeOut }">
      <i class="fas fa-map-marked-alt"></i>
      <p>Chargement de la carte...</p>
    </div>
    
    <!-- Conteneur de la carte -->
    <div class="map-container">
      <iframe
        :src="mapUrl"
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        @load="onMapLoad"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      
      <!-- Overlay avec informations -->
      <div class="map-overlay">
        <div class="map-info">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ locationName }}</span>
        </div>
        
        <a 
          :href="googleMapsUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="directions-btn"
        >
          <i class="fas fa-directions"></i>
          <span>Itinéraire</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props
const props = defineProps({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  locationName: {
    type: String,
    default: 'Notre localisation'
  },
  zoom: {
    type: Number,
    default: 15
  }
})

// État réactif
const isLoading = ref(true)
const fadeOut = ref(false)

// URLs calculées
const mapUrl = computed(() => {
  // Utilisation d'OpenStreetMap via iframe (alternative gratuite à Google Maps)
  return `https://www.openstreetmap.org/export/embed.html?bbox=${props.longitude - 0.01},${props.latitude - 0.01},${props.longitude + 0.01},${props.latitude + 0.01}&layer=mapnik&marker=${props.latitude},${props.longitude}`
})

const googleMapsUrl = computed(() => {
  return `https://www.google.com/maps/dir/?api=1&destination=${props.latitude},${props.longitude}`
})

// Gestionnaire de chargement de la carte
const onMapLoad = () => {
  fadeOut.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 600)
}

// Timeout de sécurité pour masquer le chargement
onMounted(() => {
  setTimeout(() => {
    if (isLoading.value) {
      onMapLoad()
    }
  }, 5000) // 5 secondes maximum
})
</script>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 450px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 
    0 32px 64px rgba(0, 0, 0, 0.12),
    0 16px 32px rgba(0, 0, 0, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.04);
  background: linear-gradient(145deg, #f8fafc, #e2e8f0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.map-wrapper:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 40px 80px rgba(0, 0, 0, 0.16),
    0 24px 48px rgba(0, 0, 0, 0.12),
    0 12px 24px rgba(0, 0, 0, 0.08);
}

.map-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.1) 0%,
    rgba(33, 150, 243, 0.1) 100%
  );
  backdrop-filter: blur(20px);
  z-index: 2;
  opacity: 1;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.map-loading.fade-out {
  opacity: 0;
  pointer-events: none;
}

.map-loading i {
  font-size: 3rem;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  animation: pulse 2s ease-in-out infinite;
}

.map-loading p {
  color: #64748b;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.025em;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
}

.map-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 24px;
  transition: all 0.3s ease;
  filter: contrast(1.05) saturate(1.1);
}

.map-container:hover iframe {
  filter: contrast(1.1) saturate(1.2);
}

.map-overlay {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transform: translateY(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.8s ease-out 0.5s both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.map-overlay:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 24px 48px rgba(0, 0, 0, 0.15),
    0 12px 24px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.map-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #1e293b;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.025em;
}

.map-info i {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
  color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  box-shadow: 0 8px 16px rgba(76, 175, 80, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: bounceIn 0.8s ease-out 0.8s both;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.map-info i:hover {
  transform: rotate(10deg) scale(1.1);
  box-shadow: 0 12px 24px rgba(76, 175, 80, 0.4);
}

.directions-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.025em;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 12px 24px rgba(76, 175, 80, 0.3),
    0 4px 8px rgba(76, 175, 80, 0.2);
  animation: fadeInRight 0.8s ease-out 1s both;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.directions-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.directions-btn:hover::before {
  left: 100%;
}

.directions-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 20px 40px rgba(76, 175, 80, 0.4),
    0 8px 16px rgba(76, 175, 80, 0.3);
}

.directions-btn:active {
  transform: translateY(-1px) scale(1.02);
}

.directions-btn i {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.directions-btn:hover i {
  transform: translateX(4px);
}

/* Responsive Design Amélioré */
@media (max-width: 992px) {
  .map-wrapper {
    height: 400px;
    border-radius: 20px;
  }
  
  .map-overlay {
    padding: 1.5rem;
    bottom: 20px;
    left: 20px;
    right: 20px;
    border-radius: 16px;
  }
}

@media (max-width: 768px) {
  .map-wrapper {
    height: 350px;
    border-radius: 16px;
  }
  
  .map-overlay {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 1.5rem;
  }
  
  .map-info {
    justify-content: center;
    font-size: 1rem;
  }
  
  .directions-btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .map-wrapper {
    height: 300px;
    border-radius: 12px;
  }
  
  .map-overlay {
    left: 16px;
    right: 16px;
    bottom: 16px;
    padding: 1.25rem;
    border-radius: 12px;
  }
  
  .map-info i {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .directions-btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    gap: 0.5rem;
  }
}

/* Animation d'entrée pour le wrapper */
@media (prefers-reduced-motion: no-preference) {
  .map-wrapper {
    animation: fadeInScale 1s ease-out;
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* États pour l'accessibilité */
@media (prefers-reduced-motion: reduce) {
  .map-wrapper,
  .map-overlay,
  .map-info i,
  .directions-btn {
    animation: none;
    transition: none;
  }
}

/* Mode sombre (optionnel) */
@media (prefers-color-scheme: dark) {
  .map-wrapper {
    background: linear-gradient(145deg, #1e293b, #334155);
  }
  
  .map-overlay {
    background: rgba(30, 41, 59, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .map-info {
    color: #f1f5f9;
  }
  
  .map-loading p {
    color: #94a3b8;
  }
}
</style>