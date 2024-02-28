<template>
  <div class="peliculas-list-container">
    <!-- Contenedor de la lista de películas -->
    <div class="peliculas-list">
        <!-- Lista de películas -->
        <div class="pelicula" v-for="pelicula in peliculas" :key="pelicula.id">
          <!-- Componente de tarjeta para cada película -->
          <CardComponent :pelicula="pelicula" @mostrarModal="mostrarModalAux(pelicula.id)"/>
          <!-- Componente de modal para mostrar detalles de la película seleccionada -->
          <ModalComponent v-if="peliculaAux === pelicula.id" :pelicula="pelicula" @closeModal="peliculaAux = null"/> 
      </div>
    </div>
    <!-- Botón de desplazamiento a la izquierda -->
    <button class="btn btn-prev fs-3 m-2" @click="scrollLeft"><i class="fas fa-chevron-left"></i></button>
    <!-- Botón de desplazamiento a la derecha -->
    <button class="btn btn-next fs-3 m-2" @click="scrollRight"><i class="fas fa-chevron-right"></i></button>
  </div>
</template>

<script>
import CardComponent from './CardComponent.vue';
import ModalComponent from './ModalComponent.vue';

export default {
  components: {
    CardComponent,
    ModalComponent
  },
  props: {
    /**
     * Lista de películas a mostrar.
     * @type {Array}
     * @required
     */
    peliculas: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      /**
       * ID de la película seleccionada para mostrar en el modal.
       * @type {Number|null}
       */
      peliculaAux: null,
      /**
       * Elemento DOM de la lista de películas.
       * @type {HTMLElement|null}
       */
      peliculasList: null
    };
  },
  methods: {
    /**
     * Método para mostrar el modal con detalles de una película.
     * @param {Number} peliculaId - ID de la película a mostrar en el modal.
     */
    mostrarModalAux(peliculaId) {
      this.peliculaAux = peliculaId;
    },
    /**
     * Método para cerrar el modal.
     */
    closeModal() {
      this.peliculaAux = null;
    },
    /**
     * Método para desplazar la lista de películas hacia la izquierda.
     */
    scrollLeft() {
      if (this.peliculasList) {
        this.peliculasList.scrollLeft -= 750;
      }
    },
    /**
     * Método para desplazar la lista de películas hacia la derecha.
     */
    scrollRight() {
      if (this.peliculasList) {
        this.peliculasList.scrollLeft += 750;
      }
    }
  },
  mounted() {
    this.peliculasList = this.$el.querySelector('.peliculas-list');
  }
}
</script>

<style scoped>
/* Estilos específicos del componente */
.peliculas-list-container {
  position: relative;
  overflow: hidden;
}

.peliculas-list {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  margin-bottom: -20px;
  overflow-y: hidden;
}

.pelicula {
  margin: 0.2em;
}

.btn-prev,
.btn-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  padding: 5px;
}

.btn-prev {
  left: 0;
}

.btn-next {
  right: 0;
}
</style>
