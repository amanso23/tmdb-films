<template>
    <div>
        <BotonAtrasComponent/> 
        <div class="header container-fluid m-0 d-flex align-items-center justify-content-center">
           <div :class="icono"></div> <TituloComponent :titulo="titulo"/>
        </div>
        <div v-if="!store || store.length === 0">
            <div class="mensaje-info">
                <h3 class="">No hay películas disponibles</h3>
            </div>
        </div>
        <div v-else class="peliculas mt-4">
            <div class="content d-flex flex-wrap justify-content-center">
                <div v-for="pelicula in store" :key="pelicula.id" class="peliculas-list">
                    <CardComponent :pelicula="pelicula" @mostrarModal="mostrarModalAux(pelicula.id)" :size="'small'"/>
                    <ModalComponent v-if="peliculaAux === pelicula.id" :pelicula="pelicula" @closeModal="peliculaAux = null"/>
                </div>
            </div>
        </div>
        <div class="custom-hr mb-2 mt-4"></div>
    </div>
</template>

<script>
   /**
 * Componente para mostrar una lista de películas.
 * @module ListaPeliculasComponent
 */

import ModalComponent from './ModalComponent.vue';
import CardComponent from './CardComponent.vue';
import BotonAtrasComponent from './BotonAtrasComponent.vue';
import TituloComponent from './TituloComponent.vue';

export default {
    components: {
        ModalComponent,
        CardComponent,
        BotonAtrasComponent,
        TituloComponent
    },
    props: {
        /**
         * Array de películas a mostrar.
         * @type {Array}
         */
        store: Array,
        /**
         * Título de la lista de películas.
         * @type {string}
         */
        titulo: String,
        /**
         * Clase de icono a mostrar en el encabezado.
         * @type {string}
         */
        icono: String
    },
    data() {
        return {
            /**
             * ID de la película seleccionada para mostrar en el modal.
             * @type {number|null}
             */
            peliculaAux: null
        };
    },
    methods: {
        /**
         * Muestra el modal con los detalles de la película seleccionada.
         * @param {number} pelicula - ID de la película.
         */
        mostrarModalAux(pelicula) {
            this.peliculaAux = pelicula;
        }
    }
};

</script>

<style scoped>
.peliculas {
    width: 55%; 
    margin: auto;
    min-height: 80vh;
}


.custom-hr {
    width: 20%;
    margin: auto;
    border: none;
    height: 1px;
    background-color: transparent;
    background-image: linear-gradient(to right, #6c757d 0%, #6c757d 50%, #fff 50%, #fff 100%);
    background-size: 200% 100%;
    animation: desplazamiento-color 5s linear infinite;
}

@keyframes desplazamiento-color {
    0% {
        background-position: 100% 0;
    }
    100% {
        background-position: -100% 0;
    }
}

.mensaje-info {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}


.d-flex{
    gap: 0.4em;
}

.twemoji--heart-on-fire {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cpath fill='%23f4900c' d='m33.629 16.565l-.092 1.608l-.041.814c-.02.265-.092.529-.142.794l-.285 1.598c-.153.519-.326 1.028-.499 1.547c-.743 2.025-1.791 4.029-3.246 5.698a23.476 23.476 0 0 1-5.006 4.396c-1.903 1.221-3.867 2.167-6.126 2.859l-.385.121l-.427-.142c-1.526-.499-2.798-1.099-4.101-1.832c-1.272-.722-2.503-1.536-3.612-2.524l-.835-.732l-.784-.794c-.529-.519-.987-1.109-1.455-1.689a20.511 20.511 0 0 1-2.3-3.826c-.611-1.353-1.109-2.768-1.404-4.213c-.071-.366-.183-.722-.224-1.089l-.132-1.089c-.071-.733-.193-1.435-.153-2.279c.061-1.618.56-3.175 1.313-4.508a14.016 14.016 0 0 1 2.849-3.48l3.46-3.053l-1.669 4.174c-.57 1.435-.845 3.134-.193 4.202c.315.529.885.814 1.587.824c.733 0 1.475-.203 1.872-.692c.407-.478.438-1.231.183-1.954c-.326-.753-.631-1.77-.59-2.696c0-.946.275-1.893.753-2.717c.488-.824 1.19-1.496 1.984-1.994l1.028-.641l-.285 1.19c-.295 1.221-.081 2.503.733 3.287c.804.784 2.076 1.058 3.103.794c1.028-.275 1.72-1.109 1.76-2.025c.081-.946-.417-2.015-1.058-3.002L16.932 0l3.887 1.628c1.089.448 2.167.956 3.185 1.669c1.007.712 2.004 1.608 2.686 2.788c.712 1.16 1.007 2.584.977 3.836c0 .315-.02.621-.041.926c-.041.305-.051.55-.122.936c-.122.682-.305 1.19-.458 1.709c-.315.997-.519 2.025-.295 2.564c.132.509 1.292.906 2.147.794c.916-.092 1.77-.733 2.371-1.577c.6-.855.916-1.923 1.079-2.981l.132-.834l.295.763c.549 1.383.864 2.859.854 4.344'/%3E%3Cpath fill='%23ffcc4d' d='M33.146 16.503c-.001-1.463.068-2.222-.507-3.52c-.393 3.824-3.228 5.144-5.792 4.23c-2.402-.857-.783-4.198-.664-5.793c.202-2.703-.01-5.796-5.919-8.369c2.455 3.903.284 6.327-1.993 6.475c-2.526.164-4.84-1.804-3.986-4.997c-2.765 1.693-2.846 4.543-1.993 6.386c.89 1.921-.036 3.518-2.206 3.695c-2.426.199-3.773-2.158-2.531-5.913c-2.151 2.104-3.676 4.837-3.449 7.805C5.142 30.035 17.841 33.93 17.841 33.93s15.319-3.757 15.305-17.427'/%3E%3Cpath fill='%23dd2e44' d='M30.935 19.489a7.234 7.234 0 0 0-7.233-7.234a7.22 7.22 0 0 0-5.878 3.027a7.22 7.22 0 0 0-5.877-3.027a7.234 7.234 0 0 0-7.234 7.234c0 .566.072 1.114.195 1.643c1.004 6.24 7.943 12.824 12.915 14.632c4.972-1.808 11.911-8.391 12.914-14.631a7.074 7.074 0 0 0 .198-1.644'/%3E%3Cpath fill='%23ffcc4d' d='M24.312 31.553s1.426-2.769 1.319-5.645c-.038-1.024-.327-2.019-.736-2.958c-.958-2.196-2.806-7.706 1.147-10.661c0 0-.755 1.269-.085 3.581c.265.915.761 1.741 1.35 2.49c1.36 1.732 4.219 6.501-.484 10.948zm-7.659 3.728s-1.581-1.515-2.421-3.652c-.299-.761-.406-1.58-.406-2.398c-.001-1.911-.409-6.529-4.242-7.427c0 0 .957.687 1.205 2.591c.098.753-.001 1.516-.192 2.251c-.441 1.701-.972 5.909 3.886 7.659z'/%3E%3C/svg%3E");
}

.fluent-emoji-flat--eyes {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cg fill='none'%3E%3Cpath fill='%239b9b9b' d='M9.528 7a8.5 8.5 0 0 0-8.5 8.5v7a8.5 8.5 0 0 0 15 5.477a8.5 8.5 0 0 0 15-5.477v-7a8.5 8.5 0 0 0-15-5.477A8.482 8.482 0 0 0 9.528 7'/%3E%3Cpath fill='%23fff' d='M9.528 8a7.5 7.5 0 0 0-7.5 7.5v7a7.5 7.5 0 0 0 14 3.744a7.5 7.5 0 0 0 14-3.744v-7a7.5 7.5 0 0 0-14-3.744A7.497 7.497 0 0 0 9.528 8'/%3E%3Cpath fill='%23d3d3d3' d='M15.028 15.5c0-1.364.364-2.642 1-3.744A7.527 7.527 0 0 0 12.226 8.5h-.167c1.094.656 1.938 3.25 1.938 4.5v12.125c0 1.375-.157 3.093-1.937 4.437a7.525 7.525 0 0 0 3.968-3.318a7.465 7.465 0 0 1-1-3.744zm15 0a7.503 7.503 0 0 0-4.802-7h-.167c1.656 1.094 2.906 3.063 2.906 4.531V25c0 1.375-1.124 3.218-2.905 4.562a7.503 7.503 0 0 0 4.968-7.062z'/%3E%3Cpath fill='%23321b41' d='M6.59 13a3.5 3.5 0 0 0-3.5 3.5v5a3.5 3.5 0 1 0 7 0v-5a3.5 3.5 0 0 0-3.5-3.5m12.938 0a3.5 3.5 0 0 0-3.5 3.5v5a3.5 3.5 0 1 0 7 0v-5a3.5 3.5 0 0 0-3.5-3.5'/%3E%3Cpath fill='%23f4f4f4' d='M8.766 16.861c.372-.31.355-.942-.038-1.414c-.393-.472-1.012-.603-1.384-.294c-.371.309-.354.942.039 1.414c.392.471 1.012.603 1.383.294m12.997 0c.371-.31.354-.942-.039-1.414c-.392-.472-1.012-.603-1.383-.294c-.372.309-.354.942.038 1.414c.393.471 1.012.603 1.384.294'/%3E%3C/g%3E%3C/svg%3E");
}

.twemoji--file-folder {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cpath fill='%23269' d='M0 29a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V12a4 4 0 0 0-4-4h-9c-3.562 0-3-5-8.438-5H4a4 4 0 0 0-4 4z'/%3E%3Cpath fill='%2355acee' d='M30 10h-6.562C18 10 18.562 15 15 15H6a4 4 0 0 0-4 4v10a1 1 0 1 1-2 0a4 4 0 0 0 4 4h26a4 4 0 0 0 4-4V14a4 4 0 0 0-4-4'/%3E%3C/svg%3E");
}


</style>