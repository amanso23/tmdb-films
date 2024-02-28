<template>
  <div>
    <div :class="['film', size]" @click="mostrarModal" data-toggle="modal" data-target="#miModal">
      <img :src="pelicula.poster_path ? 'https://image.tmdb.org/t/p/w500/' + pelicula.poster_path : 'https://via.placeholder.com/150'" class="card-img-top" :alt="pelicula.title">
    </div>
  </div>
</template>

<script>
/**
 * Componente para mostrar una tarjeta de película.
 * @module CardComponent
 */
export default {
  /**
   * Nombre del componente.
   * @type {string}
   */
  name: 'CardComponent',
  /**
   * Propiedades del componente.
   * @property {object} pelicula - Película a mostrar.
   * @property {string} size - Tamaño de la tarjeta.
   */
  props: {
    pelicula: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: 'large' // Tamaño por defecto
    }
  },
  /**
   * Métodos del componente.
   */
  methods: {
    /**
     * Método para mostrar el modal con detalles de la película.
     */
    mostrarModal() {
      this.$emit('mostrarModal', this.pelicula);
    }
  }
}
</script>

<style scoped>
.film {
  transition: transform 0.3s ease-in;
  cursor: pointer;
  border: 1px solid #456;
  border-radius: 3px;
  animation: expandAnimation 0.8s ease;
}

.film.small {
  width: 8vw; 
}

.film.large {
  width: 15rem; 
}

.film:hover {
  transform: scale(1.02);
}

@keyframes expandAnimation {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}



@media screen and (max-width: 768px){
  .film.small{
    width: 6em;
  }
  
}

</style>
