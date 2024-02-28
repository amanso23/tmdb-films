<template>
  <footer class="footer mb-3 mt-3">
      <p class="text-center text-secondary "> <span class="mensaje">{{ mensaje }}</span> <span class="badge logo"><a href="https://www.themoviedb.org/?language=es">TMDb &copy;</a></span></p>
      <p class="text-secondary text-center mt-0 nombre">Adrian Manso {{getFullYear() }} &copy;</p>
  </footer>
</template>

<script>
/**
 * Componente para mostrar el pie de página.
 * @module FooterComponent
 */
export default {
  /**
   * Propiedades del componente.
   */
  props : {
    /**
     * Mensaje a mostrar en el pie de página.
     * @type {string}
     */
    mensaje : {
      type : String,
      required : false
    }
  },
  /**
   * Datos del componente.
   * @returns {object} Datos del componente.
   */
  data() {
    return {
      currentYear: new Date().getFullYear() // Año actual.
    }
  },
  methods : {
    getFullYear(){
      return new Date().getFullYear();
    }

  }
};
</script>

<style>

  .d-flex{
    gap: 0.2em;
  }

  .social-icon{
    color: rgb(97, 97, 97);
    transition: color 0.8s ease-in;
  }

  .social-icon:hover{
    color: rgb(252, 252, 252);
  }

  .badge.logo{
    background: linear-gradient(135deg, #048eae, #379698, #5a9a88, #689e82);
    cursor: pointer;
  }

  a{
    text-decoration: none;
    color: white;
  }

  .nombre{
    margin-top: -0.6em !important;
  }

</style>
