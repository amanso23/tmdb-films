<template>
  <div id="app">
    
    <router-view /> 
    <FooterComponent v-if="$route.path !== '/login'" :mensaje="'Contenido proporcionado por '" />
  </div>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';


export default {
  /**
   * Componente principal de la aplicación.
   * @module App
   */
  components : {
    FooterComponent

  },
  /**
   * Datos del componente.
   * @returns {object} Datos del componente.
   */
  data(){
    return {
      rutaActual: null
    }
  },
 
}
</script>

<style>

</style>
