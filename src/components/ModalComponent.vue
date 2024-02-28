
<template>
    <div class="modal fade" id="miModal"  tabindex="-1" role="dialog" aria-labelledby="miModalLabel" aria-hidden="true" @click="closeModalOutside">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
            <div class="modal-content" style="background-color: #101316; color: #FFFFFF;" ref="modalContent">
                <div class="modal-body">
                    <button class="close" data-dismiss="modal" @click="closeModal"><i class="fas fa-times "></i></button>
                    <div class="row">
                        <div class="col-md-4 poster">
                            <img v-if="pelicula && pelicula.poster_path"
                                :src="'https://image.tmdb.org/t/p/w500/' + pelicula.poster_path" class="img-fluid"
                                alt="Poster de la película" style="height: 100%;">
                        </div>
                        <div class="col-md-8">
                            <div v-if="pelicula" class="modal-title m-0"><h2>{{ pelicula.title }}</h2><p class="fs-5 m-0 year">{{parsearFecha(pelicula.release_date)  }}</p></div>
                            <p class="text-secondary descripcion" >{{ pelicula && pelicula.overview }}</p>
                            <hr>
                            <p v-if="pelicula" class="fs-4 nota d-flex align-items-center">
                    
                                <span v-if="pelicula.vote_average.toFixed(1) === '0.0'" class="badge bg-warning">Sin calificar</span>
                                <span v-else><i class="fas fa-star"></i> {{ pelicula.vote_average.toFixed(1) }}</span>
                                </p>
                            <div v-if="pelicula">
                                <p class="d-flex flex-wrap">
                                    <span v-for="(genreId, index) in pelicula.genre_ids" :key="index"
                                        class="bg-secondary p-2 m-1 genero"> {{ getGenreName(genreId) }}</span>
                                </p>
                                <p class="language badge bg-warning">{{ pelicula.original_language }}</p>
                                <p v-if="pelicula.adult"><span class="uil--18-plus"></span></p>
                                <div class="acciones d-flex">
                                    <i class="fas fa-heart " :class="{ 'rojo': esFavorita(pelicula) }" @click.stop="toggleMeGusta(pelicula)"></i> 
                                    <i class="fas fa-eye " :class="{ 'azul':  esVista(pelicula)}" @click.stop="toggleVista(pelicula)"></i>
                                    <i class="fas fa-folder " :class="{ 'amarillo': esCarpeta(pelicula)}" @click="toggleCarpeta(pelicula)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

/**
 * Componente de modal para mostrar detalles de una película.
 * @module ModalComponent
 */

 import { listasUsuario } from '../store/store.js';
import router from '@/router/router';

export default {
    name: 'ModalComponent',
    props: {
        pelicula: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            store: listasUsuario(),
            mostrarMensajeInfo: 0
        };
    },
    methods: {
        /**
         * Obtiene el nombre del género a partir de su ID.
         * @param {number} genreId - ID del género.
         * @returns {string} Nombre del género.
         */
        getGenreName(genreId) {
            switch (genreId) {
                case 28:
                    return 'Acción';
                case 12:
                    return 'Aventura';
                case 16:
                    return 'Animación';
                case 35:
                    return 'Comedia';
                case 80:
                    return 'Crimen';
                case 18:
                    return 'Drama';
                case 14:
                    return 'Fantasía';
                case 27:
                    return 'Terror';
                case 10751:
                    return 'Familia';
                case 878:
                    return 'Ciencia ficción';
                case 9648:
                    return 'Misterio';
                case 10749:
                    return 'Romance';
                case 53:
                    return 'Suspenso';
                case 10752:
                    return 'Bélica';
                case 37:
                    return 'Western';
                default:
                    return 'Desconocido';
            }
        },
        /**
         * Parsea la fecha de lanzamiento de la película.
         * @param {string} fecha - Fecha de lanzamiento en formato string.
         * @returns {number} Año de lanzamiento de la película.
         */
        parsearFecha(fecha) {
            const releaseDate = fecha;
            const parsedDate = new Date(releaseDate);
            const year = parsedDate.getFullYear();
            return year;
        },
        /**
         * Desactiva el desplazamiento de la página mientras el modal está abierto.
         */
        desactivarDesplazamiento() {
            const body = document.querySelector("body");
            body.style.overflowY = "hidden";
        },
        /**
         * Activa el desplazamiento de la página cuando el modal se cierra.
         */
        activarDesplazamiento() {
            const body = document.querySelector("body");
            body.style.overflowY = "auto";
        },
        /**
         * Cierra el modal.
         */
        closeModal() {
            this.$emit('closeModal');
            this.activarDesplazamiento();
            var modal = document.getElementById('miModal');
            modal.style.display = 'none';
            modal.classList.remove('show');
            var modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
                modalBackdrop.parentNode.removeChild(modalBackdrop);
            }
            document.body.classList.remove('modal-open');
        },
        /**
         * Cierra el modal al hacer clic fuera de él.
         * @param {MouseEvent} event - Evento de clic.
         */
        closeModalOutside(event) {
            if (event.target.id === 'miModal') {
                this.closeModal();
            }
        },
        /**
         * Agrega o quita la película de la lista de "Me gusta" del usuario.
         * @param {Object} pelicula - Objeto de la película.
         */
        toggleMeGusta(pelicula) {
            const value = this.store.agregarPeliculaMeGusta(pelicula);
            if (router.currentRoute.value.path !== "/home" && router.currentRoute.value.path !== "/watchlist" && router.currentRoute.value.path !== "/guardadas" && value === -1) {
                this.closeModal();
            }
        },
        /**
         * Agrega o quita la película de la lista de "Vistas" del usuario.
         * @param {Object} pelicula - Objeto de la película.
         */
        toggleVista(pelicula) {
            const value = this.store.agregarPeliculaWatchlist(pelicula);
            if (router.currentRoute.value.path !== "/home" && router.currentRoute.value.path !== "/favoritas" && router.currentRoute.value.path !== "/guardadas" && value === -1) {
                this.closeModal();
            }
        },
        /**
         * Agrega o quita la película de la lista de "Guardadas" del usuario.
         * @param {Object} pelicula - Objeto de la película.
         */
        toggleCarpeta(pelicula) {
            const value = this.store.agregarPeliculaGuardadas(pelicula);
            if (router.currentRoute.value.path !== "/home" && router.currentRoute.value.path !== "/favoritas" && router.currentRoute.value.path !== "/watchlist" && value === -1) {
                this.closeModal();
            }
        },
        /**
         * Comprueba si la película está marcada como favorita.
         * @param {Object} pelicula - Objeto de la película.
         * @returns {boolean} True si la película está marcada como favorita, de lo contrario false.
         */
        esFavorita(pelicula) {
            return this.store.listaMeGustas.some(p => p.id === pelicula.id);
        },
        /**
         * Comprueba si la película está marcada como vista.
         * @param {Object} pelicula - Objeto de la película.
         * @returns {boolean} True si la película está marcada como vista, de lo contrario false.
         */
        esVista(pelicula) {
            return this.store.listaWatchlist.some(p => p.id === pelicula.id);
        },
        /**
         * Comprueba si la película está en la lista de guardadas.
         * @param {Object} pelicula - Objeto de la película.
         * @returns {boolean} True si la película está en la lista de guardadas, de lo contrario false.
         */
        esCarpeta(pelicula) {
            return this.store.listaGuardadas.some(p => p.id === pelicula.id);
        }
    },
    mounted() {
        this.desactivarDesplazamiento();
    }
};

</script>

<style scoped>
    .modal-lg{
        min-width: 60em !important;
        padding: 2em !important;
        margin: auto !important;
    }
    
    
    .language, .nota{
        text-shadow: 1.5px 1.5px 1.5px black;
    }

    .close {
    background-color: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.8em;
   
}



.modal-title{
    display: flex;
    align-items: center;
    gap: 0.8em;
}
.year{
    color: rgb(190, 190, 190);
}   

.d-flex{
    gap: 0.2em;

}


.acciones .fas{
    cursor: pointer;
    color: rgb(151, 151, 151);
}
.fa-heart, .fa-eye, .fa-folder{
    transition: color 0.4s ease-out;

}



.rojo{
    color: rgb(245, 58, 58) !important;
}

.azul{
    color: rgb(66, 66, 255) !important;
}

.amarillo{
    color: rgb(252, 252, 101) !important;
}


.d-flex{
    gap: 0.2em;
    
}

.uil--18-plus {
  display: inline-block;
  width: 2em;
  height: 2em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M18 5h1v1a1 1 0 0 0 2 0V5h1a1 1 0 0 0 0-2h-1V2a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2M7 7v10a1 1 0 0 0 2 0V7a1 1 0 0 0-2 0m14.6 2a1 1 0 0 0-.78 1.18a9 9 0 1 1-7-7a1 1 0 1 0 .4-2A10.8 10.8 0 0 0 12 1a11 11 0 1 0 11 11a10.8 10.8 0 0 0-.22-2.2A1 1 0 0 0 21.6 9M11 9v1a3 3 0 0 0 .78 2a3 3 0 0 0-.78 2v1a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-1a3 3 0 0 0-.78-2a3 3 0 0 0 .78-2V9a3 3 0 0 0-3-3h-1a3 3 0 0 0-3 3m5 6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1Zm0-6v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1'/%3E%3C/svg%3E");
 
    


}

@media screen and (max-width: 1024px){
    .modal-lg{
        min-width: 48em !important;
       height: min-content !important;
        margin: auto !important;
    }

    .row{
        font-size: 1.3vw;
    } 
}

@media screen and (max-width: 892px){
    .row{
        font-size: 1.3vw;
    }

}

@media screen and (max-width: 768px){
    .modal-lg{
        min-width: 23em !important;
        margin: auto !important;
    }  
    
    .row{
        font-size: initial !important;
    }

    .poster{
        margin-bottom: 1em;
    }
}


</style>