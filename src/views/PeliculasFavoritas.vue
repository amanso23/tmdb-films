<template>
     <SeccionComponent :store="listaMeGustas" :titulo="'Peliculas favoritas...'" icono="twemoji--heart-on-fire fs-1"/>
</template>

<script>
/**
 * Componente para mostrar las películas favoritas del usuario.
 * @module PeliculasFavoritas
 */

import SeccionComponent from '@/components/SeccionComponent.vue';
import { listasUsuario } from '@/store/store';

export default {
    name: 'PeliculasFavoritas',
    components: {
        SeccionComponent
    },

    /**
     * Datos del componente.
     * @returns {object} Datos del componente.
     */
    data() {
        return {
            listaMeGustas: null,
        };
    },

    /**
     * Método que se ejecuta cuando el componente se ha montado en el DOM.
     * @description Carga la lista de películas favoritas del usuario.
     */
    mounted() {
        this.listaMeGustas = listasUsuario().listaMeGustas;
    }
};

</script>


