<template>
    <div class="container d-flex flex-column align-items-center justify-content-center">
        <div class="row">
            <div class="col-12">
                <div class="text-center text-white fs-1 fw-bold">Inicia sesión</div>
                <div class="card shadow-pop-tr">
                    <div class="card-body text-white">
                            <div class="mb-3">
                                <div class="d-flex align-items-center"><label for="username" class="form-label fs-5 fw-bold ">Nombre</label> <div class="twemoji--winking-face "></div></div>
                                <input type="text" class="form-control" placeholder="usuario" v-model="username">
                            </div>
                            <div class="mb-3">
                                <div class="d-flex align-items-center"><label for="password" class="form-label fs-5 fw-bold">Contraseña</label><div class="twemoji--shushing-face"></div></div>
                                <input type="password" class="form-control" placeholder="1234" v-model="password">
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" checked>
                                <label class="form-check-label" for="exampleCheck1">Recuerdame</label>
                            </div>
                            <button type="submit" class="btn text-center text-white fw-bold m-auto" @click="iniciarSesion">Iniciar Sesión </button>
                    </div>
                </div>
            </div>
        </div>
        <p class="info text-white mt-2">Inicia sesión con tu cuenta y hecha un vistazo a las películas del momento de la mano de <a href="https://www.themoviedb.org/?language=es">TMDb &copy;</a></p>
        <AlertComponent v-if="mostrarAlerta" :mensaje="'Credenciales incorrectas'" :tipo="'alert-warning'" class="mt-2"/>
        <AlertComponent v-if="sesionCerrada" :mensaje="'Has cerrado sesión'" :tipo="'alert-info'" class="mt-2"/>
    </div>
</template>

<script>
/**
 * Componente de vista para iniciar sesión.
 * @module LoginView
 */

 import AlertComponent from '@/components/AlertComponent.vue';
import router from '@/router/router';
import { listasUsuario } from '@/store/store';

export default {
    name: "LoginView",
    components: {
        AlertComponent
    },

    /**
     * Datos del componente.
     * @returns {object} Datos del componente.
     */
    data() {
        return {
            usuario: { "username": 'usuario', "password": '1234' },
            username: '',
            password: '',
            mostrarAlerta: false,
            listasUsuario: listasUsuario(),
            sesionCerrada: false
        };
    },

    methods: {
        /**
         * Inicia sesión del usuario.
         * @description Verifica las credenciales de inicio de sesión y redirige al usuario a la página de inicio si son válidas.
         */
        iniciarSesion() {
            if (this.username === this.usuario.username && this.password === this.usuario.password) {
                router.push('/home');
            } else {
                if (this.mostrarAlerta === true) {
                    this.mostrarAlerta = false;
                }
                if (this.sesionCerrada === true) {
                    this.sesionCerrada = false;
                }
                this.mostrarAlerta = true;
            }
        }
    },

    /**
     * Método que se ejecuta cuando el componente se ha montado en el DOM.
     */
    mounted() {
        this.listasUsuario.resetearListas();
        this.sesionCerrada = this.listasUsuario.sesionCerrada;
    }
};

</script>

<style scoped>  
    a{
        color: inherit;
        text-decoration: underline;
    }

    .info{
        text-align: center;
        max-width: 300px;
        font-size: 0.6em;
    }

    .card{
        border-radius:0% !important;
        min-width: 300px;
        background-color: #2c3440;
        border: 1px solid #456;
        transition: border 0.2s ease-out;
    }
    .card:hover{
        border: 1px solid #048eae;
    }
    .container{
        min-height: 100vh;
    }

    .btn{
        background-color: #048eae
    }


    .shadow-pop-tr {
        
        -webkit-animation: shadow-pop-tr 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
        animation: shadow-pop-tr 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
    }

    @-webkit-keyframes shadow-pop-tr {
    0% {
        -webkit-box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff;
        box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff;
        -webkit-transform: translateX(0) translateY(0);
        transform: translateX(0) translateY(0);
    }
    100% {
        -webkit-box-shadow: 1px -1px #fff, 2px -2px #fff, 3px -3px #fff, 4px -4px #fff, 5px -5px #fff, 6px -6px #fff, 7px -7px #fff, 8px -8px #fff;
        box-shadow: 1px -1px #fff, 2px -2px #fff, 3px -3px #fff, 4px -4px #fff, 5px -5px #fff, 6px -6px #fff, 7px -7px #fff, 8px -8px #fff;
        -webkit-transform: translateX(-8px) translateY(8px);
        transform: translateX(-8px) translateY(8px);
    }
}

@keyframes shadow-pop-tr {
    0% {
        -webkit-box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff;
        box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff;
        -webkit-transform: translateX(0) translateY(0);
        transform: translateX(0) translateY(0);
    }
    100% {
        -webkit-box-shadow: 1px -1px #fff, 2px -2px #fff, 3px -3px #fff, 4px -4px #fff, 5px -5px #fff, 6px -6px #fff, 7px -7px #fff, 8px -8px #fff;
        box-shadow: 1px -1px #fff, 2px -2px #fff, 3px -3px #fff, 4px -4px #fff, 5px -5px #fff, 6px -6px #fff, 7px -7px #fff, 8px -8px #fff;
        -webkit-transform: translateX(-8px) translateY(8px);
        transform: translateX(-8px) translateY(8px);
    }
}

.twemoji--winking-face {
margin-bottom: 0.3em;
  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cpath fill='%23ffcc4d' d='M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18'/%3E%3Cellipse cx='11.5' cy='16.5' fill='%23664500' rx='2.5' ry='3.5'/%3E%3Cpath fill='%23664500' d='M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297c-2.957 0-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604M5.999 12.458a1 1 0 0 1-.799-1.6c3.262-4.35 7.616-4.4 7.8-4.4a1 1 0 0 1 .004 2c-.156.002-3.569.086-6.205 3.6a.995.995 0 0 1-.8.4m23.002 2.125a.998.998 0 0 1-.801-.4c-2.592-3.457-6.961-2.627-7.004-2.62a1 1 0 0 1-.393-1.961c.231-.047 5.657-1.072 8.996 3.38a1 1 0 0 1-.798 1.601m-5.747 8.994a.513.513 0 0 0-.597.06c-.01.008-1.013.863-4.657.863c-3.641 0-4.646-.854-4.646-.854a.5.5 0 0 0-.838.475c.01.044 1.144 4.379 5.484 4.379s5.474-4.335 5.485-4.379a.497.497 0 0 0-.231-.544'/%3E%3C/svg%3E");
}

.twemoji--shushing-face {
margin-bottom: 0.3em;
  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cpath fill='%23ffcb4c' d='M35 17c0 9.389-7.611 17-17 17S1 26.389 1 17S8.611 0 18 0s17 7.611 17 17'/%3E%3Cellipse cx='17.812' cy='23.125' fill='%2365471b' rx='4.062' ry='1.93'/%3E%3Cpath fill='%23f19020' d='m25.35 25.981l-.033-.02a1.795 1.795 0 0 0-2.462.589l-.151.245a3.97 3.97 0 0 0-2.068-1.141l-1.399-.286l1.272-6.224a1.795 1.795 0 0 0-1.395-2.112l-.038-.008a1.795 1.795 0 0 0-2.112 1.395l-1.673 8.183l-.015.074l-.313 1.531l-.001.01l-1.128 5.533c-.22 1.078.27 2.25 1.895 2.25H19c2.804 0 3.635-1.01 4.198-3.093l2.741-4.463a1.798 1.798 0 0 0-.589-2.463'/%3E%3Cpath fill='%2365471b' d='M22.409 30.743a.337.337 0 0 1-.333-.403a1.028 1.028 0 0 0-.187-.839c-.59-.808-2.289-1.175-2.894-1.248a.339.339 0 0 1-.296-.377a.333.333 0 0 1 .377-.296c.101.011 2.474.31 3.36 1.521c.298.407.401.868.306 1.368a.34.34 0 0 1-.333.274m-3.259 4.73c-.253 0-.53-.031-.833-.102c-.61-.144-1.04-.499-1.18-.975a1.152 1.152 0 0 1 .289-1.135c.388-.402 1.003-.534 1.695-.358a.34.34 0 0 1-.168.658c-.445-.114-.825-.05-1.038.171a.482.482 0 0 0-.127.473c.069.236.319.421.685.506c1.18.277 1.833-.186 2.174-.625c.508-.653.568-1.538.387-1.885c-.422-.812-2.049-.992-2.64-.993a.34.34 0 0 1 0-.678c.103 0 2.542.015 3.242 1.359c.305.585.218 1.751-.454 2.614c-.308.394-.943.97-2.032.97m-4.928-22.251c0 1.391-.846 2.519-1.889 2.519c-1.043 0-1.889-1.127-1.889-2.519c0-1.391.845-2.519 1.889-2.519c1.043.001 1.889 1.128 1.889 2.519m15.664-2.951a1.061 1.061 0 0 0 .849-1.7c-3.466-4.622-8.092-4.675-8.287-4.675a1.062 1.062 0 0 0-.004 2.125c.166.002 3.792.091 6.592 3.825c.208.278.527.425.85.425m-8.108 2.951c0 1.391.846 2.519 1.889 2.519c1.043 0 1.889-1.127 1.889-2.519c0-1.391-.845-2.519-1.889-2.519c-1.044.001-1.889 1.128-1.889 2.519M6.114 10.271a1.062 1.062 0 0 1-.849-1.7c3.466-4.622 8.092-4.675 8.287-4.675a1.062 1.062 0 0 1 .004 2.125c-.166.002-3.792.091-6.592 3.825a1.06 1.06 0 0 1-.85.425'/%3E%3C/svg%3E");
}




.d-flex{
    gap: 0.3em;
}

</style>
