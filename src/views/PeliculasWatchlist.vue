<template>
    <SeccionComponent :store="listaWatchlist" :titulo="'Watchlist...'" icono="fluent-emoji-flat--eyes fs-1" />
</template>

<script>

    import SeccionComponent from '@/components/SeccionComponent.vue';
    import { listasUsuario } from '@/store/store';
    /**
     * Componente para mostrar las películas guardadas por el usuario.
     * @module PeliculasWatchlist
     */
    export default {
        /**
         * Nombre del componente.
         * @type {string}
         */
        components : {
            SeccionComponent
        },
        /**
         * Datos del componente.
         * @returns {object} Datos del componente.
         */
        data(){
            return {
                listaWatchlist: null,
            }
        },
        /**
         * Método que se ejecuta cuando el componente se ha montado en el DOM.
         * @description Carga la lista de películas guardadas por el usuario.
         */
        mounted(){
            this.listaWatchlist = listasUsuario().listaWatchlist;
        }
    }


</script>