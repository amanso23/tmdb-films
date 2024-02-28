<template>
    <router-link to="/home" class="btn">
        <i class="fas fa-arrow-left"></i>
    </router-link>
</template>

<script>
    /**
     * Componente para mostrar un botón de retroceso.
     * @module BotonAtrasComponent
     */
    export default {
        name: 'BotonAtrasComponent',
    }
</script>

<style scoped>
    .btn {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0.1em;
        color: white;
    }
</style>
