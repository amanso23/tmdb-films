<template>
    <router-link to="/login" class="btn-logout" @click="cerrarSesion">Salir</router-link>
</template>

<script>    

    import { listasUsuario } from '@/store/store';
    /**
     * Componente para cerrar la sesión del usuario.
     * @module LogOutComponent
     */
    export default {
        /**
         * Datos del componente.
         * @returns {object} Datos del componente.
         */
        name: 'LogOutComponent',
        data(){
            return {
                sesionCerrada: listasUsuario(),
            }
        },
        /**
         * Métodos del componente.
         * @returns {object} Métodos del componente.
         */
        methods: {
            cerrarSesion(){
                this.sesionCerrada.sesionCerrada = true;
            }
        }
    }
</script>

<style> 
    .btn-logout {
        position: relative;
            display: flex;
            justify-content: center;
            margin: 1em;
            margin-bottom: -0.4em;
        color: white;
        font-size: 0.9em;
        text-decoration: underline;
    }

    
   
</style>
