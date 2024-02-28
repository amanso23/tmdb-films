<template>
    
    <div :class="['alert', 'text-center', tipo]">
        {{ mensaje }}
    </div>
</template>


<script>
/**
 * Componente para mostrar una alerta.
 * @module AlertComponent
 */
export default {
    name : 'AlertComponent',
    /**
     * Propiedades del componente.
     * @returns {object} Propiedades del componente.
     */
    props : {
        /**
         * Mensaje a mostrar en la alerta.
         * @type {string}
         */
        mensaje : {
            type : String,
            required : true
        },
        /**
         * Tipo de alerta.
         * @type {string}
         */
        tipo : {
            type : String,
            required : true
        }
    }
}
</script>

<style>

    .alert{
        min-width: 300px;
        background: #2c3440;
        border: 1px solid #456;
        border-radius: 3px;
        color: #fff;
        margin-bottom: 20px;
        padding: 10px;
        position: relative;
        transition: border 0.2s ease-out;
    }

    .alert-info{
        border: 1px solid #048eae;
    }

    .alert-warning{
        border: 1px solid #f0ad4e;
    }

</style>