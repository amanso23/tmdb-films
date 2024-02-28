<template>
    <div>
      <h1 class="text-white mt-2">{{ titulo }}</h1>
    </div>
  </template>
  
<script>
/**
 * Componente para mostrar un título.
 * @module TituloComponent
 */

 export default {
    name: 'TituloComponent',
    props: {
        /**
         * Título a mostrar.
         * @type {string}
         */
        titulo: {
            type: String,
            required: true
        }
    }
};

</script>
  
  <style scoped>
 
  
  
  </style>
  