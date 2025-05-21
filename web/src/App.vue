<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
/* Reset CSS complet */
*, 
*::before, 
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Empêcher tout débordement horizontal */
html {
  width: 100%;
  overflow-x: hidden;
}

body {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fafafa;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
  margin: 0;
  padding: 0;
}

/* Forces toutes les sections à respecter les contraintes de largeur */
div, section, header, footer, nav, main, aside {
  max-width: 100%;
  box-sizing: border-box;
}

/* Assure que les images ne causent pas de débordement */
img, svg {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
