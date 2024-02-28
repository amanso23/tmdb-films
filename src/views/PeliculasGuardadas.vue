<template>
    <SeccionComponent :store="listaGuardadas" :titulo="'Guardadas...'" icono="twemoji--file-folder fs-1"/>
</template>

<script>
import { listasUsuario } from '@/store/store';
import SeccionComponent from '@/components/SeccionComponent.vue';

export default {
    /**
     * Componente para mostrar las películas guardadas por el usuario.
     * @module PeliculasGuardadas
     */
    name: 'PeliculasFavoritas',
    /**
     * Componentes del componente.
     * @type {object}
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
            listaGuardadas: null,
        }
    },
    /**
     * Método que se ejecuta cuando el componente se ha montado en el DOM.
     * @description Carga la lista de películas guardadas por el usuario.
     */
    mounted(){
        this.listaGuardadas = listasUsuario().listaGuardadas;
    }
}
</script>


