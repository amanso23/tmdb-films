
<template>
    <div>
      <LogOutComponent />
      <div class="container d-flex flex-wrap justify-content-center info-cards mt-4">
        <InfoCardComponent icono="<i class='fas fa-heart'></i>"
          message="¡Añade a tu lista de favoritas la películas que más te gustan!" link="/favoritas"/>
        <InfoCardComponent icono="<i class='fas fa-eye'></i>"
          message="¡No te olvides de tus películas vistas, añádelas a tu  Watchlist!" link="/watchlist"/>
        <InfoCardComponent icono="<i class='fas fa-folder'></i>"
          message="¡Crea una lista con tus películas favoritas!" link="/guardadas"/>
      </div>
      <div v-for="(seccion, index) in secciones" :key="index">
        <h2 class="mt-4 text-white fs-1 m-2" >
          <span v-if="seccion === 'popular'" class="d-flex align-items-center">
            <div class="noto--fire "></div> Las más populares...
          </span>
          <span v-else-if="seccion === 'topRated'" class="d-flex align-items-center">
            <div class="emojione--shooting-star"></div>  Las mejor valoradas...
          </span>
          <span v-else-if="seccion === 'nowPlaying'" class="d-flex align-items-center">
            <div class="svg-spinners--bars-scale"></div> En reproducción...
          </span>
          <span v-else-if="seccion === 'upcoming'" class="d-flex align-items-center">
            <div class="eos-icons--hourglass"></div> Próximamente...
          </span>
          <span v-else-if="seccion === 'terror'" class="d-flex align-items-center">
           <div class="noto-v1--alien-monster"></div> Un poco de miedo...
          </span>
          <span v-else-if="seccion === 'comedia'" class="d-flex align-items-center">
            <div class="line-md--coffee-loop"></div> Para pasar la tarde...
          </span>
          <span v-else-if="seccion === 'documental'" class="d-flex align-items-center">
            <div class="emojione-v1--movie-camera "></div> Documentales...
          </span>
          <span v-else-if="seccion === 'belica'" class="d-flex align-items-center">
            <div class="game-icons--tank-tread"></div> Bélicas...
          </span>
          <span v-else-if="seccion === 'romance'" class="d-flex align-items-center">
            <div class="noto-v1--love-letter"></div> Romance...
          </span>
        </h2>
        <div v-if="cargando[seccion]">
          <i class="fas fa-spinner fa-spin fa-4x mb-4"></i>
        </div>
        <div v-else>
          <PeliculasComponent :peliculas="peliculasMostrar[seccion]" />
      </div>
        <hr class="custom-hr mt-4">
      </div>
      <div id="scrollButtonContainer">
        <i class="fas fa-arrow-up d-flex justify-content-center text-white" @click="smoothScrollUp"></i>
      </div>

  </div>
</template>
  
<script>
/**
 * Componente principal de la aplicación.
 * @module HomeView
 */

 import LogOutComponent from "@/components/LogOutComponent.vue";
import InfoCardComponent from "../components/InfoCardComponent.vue";
import PeliculasComponent from "../components/PeliculasComponent.vue";

export default {
  name: 'HomeView',
  components: {
    PeliculasComponent,
    InfoCardComponent,
    LogOutComponent
  },
  
  /**
   * Datos del componente.
   * @returns {object} Datos del componente.
   */
  data() {
    return {
      peliculasMostrar: {},
      cargando: {},
      secciones: ['popular', 'topRated', 'nowPlaying', 'upcoming', 'terror', 'comedia', 'documental', 'belica','romance'],
      apis: {
        popular: `https://api.themoviedb.org/3/movie/popular?api_key=67f588ad8b232046f683cbe4eaf00bf4`,
        topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=67f588ad8b232046f683cbe4eaf00bf4`,
        nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=67f588ad8b232046f683cbe4eaf00bf4`,
        upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=67f588ad8b232046f683cbe4eaf00bf4`,
        terror : `https://api.themoviedb.org/3/discover/movie?api_key=67f588ad8b232046f683cbe4eaf00bf4&with_genres=27`,
        comedia : `https://api.themoviedb.org/3/discover/movie?api_key=67f588ad8b232046f683cbe4eaf00bf4&with_genres=35`,
        documental : `https://api.themoviedb.org/3/discover/movie?api_key=67f588ad8b232046f683cbe4eaf00bf4&with_genres=99`,
        belica : `https://api.themoviedb.org/3/discover/movie?api_key=67f588ad8b232046f683cbe4eaf00bf4&with_genres=10752`,
        romance : `https://api.themoviedb.org/3/discover/movie?api_key=67f588ad8b232046f683cbe4eaf00bf4&with_genres=10749`,
      }
    };
  },

  /**
   * Métodos del componente.
   * @type {object}
   */
  methods: {
    /**
     * Obtiene las películas de una sección específica.
     * @param {string} seccion - La sección de películas.
     */
    fetchPeliculas(seccion) {
      this.cargando[seccion] = true;
      fetch(this.apis[seccion])
        .then(response => response.json())
        .then(data => {
          this.peliculasMostrar[seccion] = data.results;
          this.cargando[seccion] = false;
        })
        .catch((error) => {
          console.error("Error al obtener datos:", error);
          this.cargando[seccion] = false;
        });
    },
    /**
     * Realiza un desplazamiento suave hacia arriba en la página.
     */
    smoothScrollUp() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    /**
     * Maneja el evento de desplazamiento de la ventana.
     */
    handleScroll() {
      var scrollButtonContainer = document.getElementById('scrollButtonContainer');
      if (window.scrollY >= 20) {
        scrollButtonContainer.classList.add('show');
      } else {
        scrollButtonContainer.classList.remove('show');
      }
    }
  },
  
  /**
   * Método que se ejecuta cuando el componente se ha montado en el DOM.
   */
  mounted() {
    this.secciones.forEach(seccion => {
      this.fetchPeliculas(seccion);
    });
    window.addEventListener('scroll', this.handleScroll);
  },
  
  /**
   * Método que se ejecuta justo antes de que el componente sea desmontado.
   */
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}

</script>
  
  
  <style scoped>

#scrollButtonContainer{
  z-index: 999;
}
  
  body{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .fas.fa-spinner.fa-spin {
    display: flex;
    justify-content: center;
  }
  .seleccionador {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #14181c;
    padding: 2em;
    gap: 1.5em;
  }
  
  .seleccionador button {
    color: white;
    background-color: transparent;
    cursor: pointer;
    position: relative; 
    border: none;
    padding: 10px 20px;
    color: #f5f5f5;
    
  }
  
  .info-cards{
    gap: 0;
  }

  #scrollButtonContainer {
  position: fixed;
  bottom: 1em;
  right: 1em;
  display: none;
}

.fa-arrow-up {
  cursor: pointer;
  background-color: #14181c;
  color: white;
  padding: 0.5em; 
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  transition: background-color 0.3s, transform 0.3s;
  font-size: 1.5em;
}

.fa-arrow-up:hover {
  background-color: #1e2428; 
  transform: scale(1.1);
}

#scrollButtonContainer.show {
  display: block;
}

  .custom-hr {
    border: none;
    height: 1px;
    background-color: transparent; /* Establecemos el color de fondo como transparente */
    background-image: linear-gradient(to right, #6c757d 0%, #6c757d 50%, #fff 50%, #fff 100%); /* Establecemos un gradiente que va desde el color gris oscuro hasta blanco */
    background-size: 200% 100%; /* Hacemos que el gradiente tenga el doble de ancho del contenedor */
    animation: desplazamiento-color 20s linear infinite; /* Aplicamos la animación con interpolación lineal */
  }

  @keyframes desplazamiento-color {
    0% {
      background-position: 200% 0; /* Comenzamos con el color gris oscuro fuera del área visible */
    }
    100% {
      background-position: -100% 0; /* Desplazamos el color gris oscuro hasta que esté completamente visible */
    }
  }
  .d-flex{
    gap: 0.1em;
  }

  .svg-spinners--bars-scale {
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='2.8' height='12' x='1' y='6' fill='%23000'%3E%3Canimate id='svgSpinnersBarsScale0' attributeName='y' begin='0;svgSpinnersBarsScale1.end-0.1s' calcMode='spline' dur='0.6s' keySplines='.36,.61,.3,.98;.36,.61,.3,.98' values='6;1;6'/%3E%3Canimate attributeName='height' begin='0;svgSpinnersBarsScale1.end-0.1s' calcMode='spline' dur='0.6s' keySplines='.36,.61,.3,.98;.36,.61,.3,.98' values='12;22;12'/%3E%3C/rect%3E%3Crect width='2.8' height='12' x='5.8' y='6' fill='%23000'%3E%3Canimate attributeName='y' begin='svgSpinnersBarsScale0.begin+0.1s' calcMode='spline' dur='0.6s' keySplines='.36,.61,.3,.98;.36,.61,.3,.98' values='6;1;6'/%3E%3Canimate attributeName='height' begin='svgSpinnersBarsScale0.begin+0.1s' calcMode='spline' dur='0.6s' keySplines='.36,.61,.3,.98;.36,.61,.3,.98' values='12;22;12'/%3E%3C/rect%3E%3Crect width='2.8' height='12' x='10.6' y='6' fill='%23000'%3E%3Canimate attributeName='y' begin='svgSpinnersBarsScale0.begin+0.2s' calcMode='spline' dur='0.6s' keySplines='.36,.61,.3,.98;.36,.61,.3,.98' values='6;1;6'/%3E%3Canimate attributeName='height' begin='svgSpinnersBarsScale0.begin+0.2s' calcMode='spline' dur='0.6s' keySplines='.36,.61,.3,.98;.36,.61,.3,.98' values='12;22;12'/%3E%3C/rect%3E%3Crect width='2.8' height='12' x='15.4' y='6' fill='%23000'%3E%3Canimate attributeName='y' begin='svgSpinnersBarsScale0.begin+0.3s' calcMode='spline' dur='0.6s' keySplines='.36,.61,.3,.98;.36,.61,.3,.98' values='6;1;6'/%3E%3Canimate attributeName='height' begin='svgSpinnersBarsScale0.begin+0.3s' calcMode='spline' dur='0.6s' keySplines='.36,.61,.3,.98;.36,.61,.3,.98' values='12;22;12'/%3E%3C/rect%3E%3Crect width='2.8' height='12' x='20.2' y='6' fill='%23000'%3E%3Canimate id='svgSpinnersBarsScale1' attributeName='y' begin='svgSpinnersBarsScale0.begin+0.4s' calcMode='spline' dur='0.6s' keySplines='.36,.61,.3,.98;.36,.61,.3,.98' values='6;1;6'/%3E%3Canimate attributeName='height' begin='svgSpinnersBarsScale0.begin+0.4s' calcMode='spline' dur='0.6s' keySplines='.36,.61,.3,.98;.36,.61,.3,.98' values='12;22;12'/%3E%3C/rect%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.eos-icons--hourglass {
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg%3E%3Cpath fill='%23000' d='M7 3H17V7.2L12 12L7 7.2V3Z'%3E%3Canimate id='eosIconsHourglass0' fill='freeze' attributeName='opacity' begin='0;eosIconsHourglass1.end' dur='2s' from='1' to='0'/%3E%3C/path%3E%3Cpath fill='%23000' d='M17 21H7V16.8L12 12L17 16.8V21Z'%3E%3Canimate fill='freeze' attributeName='opacity' begin='0;eosIconsHourglass1.end' dur='2s' from='0' to='1'/%3E%3C/path%3E%3Cpath fill='%23000' d='M6 2V8H6.01L6 8.01L10 12L6 16L6.01 16.01H6V22H18V16.01H17.99L18 16L14 12L18 8.01L17.99 8H18V2H6ZM16 16.5V20H8V16.5L12 12.5L16 16.5ZM12 11.5L8 7.5V4H16V7.5L12 11.5Z'/%3E%3CanimateTransform id='eosIconsHourglass1' attributeName='transform' attributeType='XML' begin='eosIconsHourglass0.end' dur='0.5s' from='0 12 12' to='180 12 12' type='rotate'/%3E%3C/g%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.line-md--coffee-loop {
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath stroke-dasharray='48' stroke-dashoffset='48' d='M17 9v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9z'%3E%3Canimate fill='freeze' attributeName='stroke-dashoffset' dur='0.6s' values='48;0'/%3E%3C/path%3E%3Cpath stroke-dasharray='14' stroke-dashoffset='14' d='M17 14H20C20.55 14 21 13.55 21 13V10C21 9.45 20.55 9 20 9H17'%3E%3Canimate fill='freeze' attributeName='stroke-dashoffset' begin='0.6s' dur='0.2s' values='14;28'/%3E%3C/path%3E%3C/g%3E%3Cmask id='lineMdCoffeeLoop0'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='2' d='M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4'%3E%3CanimateMotion calcMode='linear' dur='3s' path='M0 0v-8' repeatCount='indefinite'/%3E%3C/path%3E%3C/mask%3E%3Crect width='24' height='0' y='7' fill='%23000' mask='url(%23lineMdCoffeeLoop0)'%3E%3Canimate fill='freeze' attributeName='y' begin='0.8s' dur='0.6s' values='7;2'/%3E%3Canimate fill='freeze' attributeName='height' begin='0.8s' dur='0.6s' values='0;5'/%3E%3C/rect%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.noto--fire {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3CradialGradient id='notoFire0' cx='68.884' cy='124.296' r='70.587' gradientTransform='matrix(-1 -.00434 -.00713 1.6408 131.986 -79.345)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.314' stop-color='%23ff9800'/%3E%3Cstop offset='.662' stop-color='%23ff6d00'/%3E%3Cstop offset='.972' stop-color='%23f44336'/%3E%3C/radialGradient%3E%3Cpath fill='url(%23notoFire0)' d='M35.56 40.73c-.57 6.08-.97 16.84 2.62 21.42c0 0-1.69-11.82 13.46-26.65c6.1-5.97 7.51-14.09 5.38-20.18c-1.21-3.45-3.42-6.3-5.34-8.29c-1.12-1.17-.26-3.1 1.37-3.03c9.86.44 25.84 3.18 32.63 20.22c2.98 7.48 3.2 15.21 1.78 23.07c-.9 5.02-4.1 16.18 3.2 17.55c5.21.98 7.73-3.16 8.86-6.14c.47-1.24 2.1-1.55 2.98-.56c8.8 10.01 9.55 21.8 7.73 31.95c-3.52 19.62-23.39 33.9-43.13 33.9c-24.66 0-44.29-14.11-49.38-39.65c-2.05-10.31-1.01-30.71 14.89-45.11c1.18-1.08 3.11-.12 2.95 1.5'/%3E%3CradialGradient id='notoFire1' cx='64.921' cy='54.062' r='73.86' gradientTransform='matrix(-.0101 .9999 .7525 .0076 26.154 -11.267)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.214' stop-color='%23fff176'/%3E%3Cstop offset='.328' stop-color='%23fff27d'/%3E%3Cstop offset='.487' stop-color='%23fff48f'/%3E%3Cstop offset='.672' stop-color='%23fff7ad'/%3E%3Cstop offset='.793' stop-color='%23fff9c4'/%3E%3Cstop offset='.822' stop-color='%23fff8bd' stop-opacity='0.804'/%3E%3Cstop offset='.863' stop-color='%23fff6ab' stop-opacity='0.529'/%3E%3Cstop offset='.91' stop-color='%23fff38d' stop-opacity='0.209'/%3E%3Cstop offset='.941' stop-color='%23fff176' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cpath fill='url(%23notoFire1)' d='M76.11 77.42c-9.09-11.7-5.02-25.05-2.79-30.37c.3-.7-.5-1.36-1.13-.93c-3.91 2.66-11.92 8.92-15.65 17.73c-5.05 11.91-4.69 17.74-1.7 24.86c1.8 4.29-.29 5.2-1.34 5.36c-1.02.16-1.96-.52-2.71-1.23a16.09 16.09 0 0 1-4.44-7.6c-.16-.62-.97-.79-1.34-.28c-2.8 3.87-4.25 10.08-4.32 14.47C40.47 113 51.68 124 65.24 124c17.09 0 29.54-18.9 19.72-34.7c-2.85-4.6-5.53-7.61-8.85-11.88'/%3E%3C/svg%3E");
}
.noto-v1--alien-monster {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23d7598b' d='M102.26 21.7s-1.19-1.83-3.65-2.22c-3.06-.48-6.08.07-7.05 4.51c-.96 4.42-1.45 10.11 3.49 14.08l-7.6 2.13l-6.51-7.89s2.52.96 2.86-.91c.42-2.29.42-4.36.97-7.87c.58-3.67 1.73-7.51 5.25-9.54c1.92-1.11 4.98-1.74 5.99-2.55c.78-.63.99-2.65 1.33-4.84l5.42 4.16l1.7 7.4z'/%3E%3Ccircle cx='107.39' cy='12.02' r='11.93' fill='%23fcc21b'/%3E%3Cpath fill='%23d7598b' d='M25.74 21.7s1.19-1.83 3.65-2.22c3.06-.48 6.08.07 7.05 4.51c.96 4.42 1.46 10.11-3.49 14.08l7.6 2.13l6.51-7.89s-2.52.96-2.86-.91c-.42-2.29-.42-4.36-.97-7.87c-.59-3.67-1.73-7.51-5.25-9.54c-1.92-1.11-4.98-1.74-5.99-2.55c-.78-.63-.99-2.65-1.33-4.84l-5.42 4.16l-1.7 7.4z'/%3E%3Ccircle cx='20.61' cy='12.02' r='11.93' fill='%23fcc21b'/%3E%3Cpath fill='%23d7598b' d='M107.29 114.08c-.43-2.59.02-5.5.48-7.83c.82-4.19 2.31-8.22 3.78-12.21c.47-1.29.95-2.58 1.4-3.87c1.5-4.32 2.32-8.9 2.32-13.67c0-25.47-16.78-46.11-51.26-46.11S12.75 51.04 12.75 76.5c0 4.45.71 8.74 2.03 12.81c2.48 7.64 6.49 15.25 6.23 23.48c-.15 4.94-2.97 7.47-6.43 10.44c-1.07.92-1.27 2.42.08 3.19c3.1 1.78 8.32-.19 11.33-1.4c2.69-1.08 5.21-2.93 7.31-5.08c1.08-1.1 2.08-2.27 3.07-3.44c.82-.96 2.18-3.42 3.74-2.72c3.4 1.53-.58 7.86-2.3 9.38c-.7.62-1.65 1.18-1.97 2.12c-.36 1.03.37 1.93 1.3 2.3c2.6 1.04 8.28-.72 10.88-2.46c1.86-1.25 3.41-2.85 4.71-4.68c.81-1.14 2.21-4.74 4.02-4.31c3.32.8 1.92 6.03 2.14 8.3c.11 1.16.78 2.32 1.94 2.77c2.52.99 4.74-.79 6.22-2.63c1.65-2.05 2.44-4.32 3.73-6.54c1.03-1.79 2.83-2.16 4.12-.31c1.88 2.69 3.04 5.25 6.03 6.96c2.46 1.4 5.3 2.27 8.14 2.29c1.25 0 6.79-.66 4.92-3.11c-.82-1.06-2.39-1.32-3.46-2.11c-1.76-1.31-2.57-3.48-2.63-5.62c-.08-3.05 2.87-2.27 4.32-.8c2.35 2.38 3.75 5.76 6.78 7.39c3.63 1.95 9.29 2.9 13.29 1.67c1.36-.42 2.92-1.01 3.01-2.65c.09-1.55-1.23-1.92-2.47-2.27c-1.59-.44-2.69-.84-3.91-2.06c-.92-.88-1.42-2.08-1.63-3.33'/%3E%3Cpath fill='%23bdcf46' d='m72.04 80.73l18.22-8.71s2.54 3.93 1.92 8.56c-.38 2.77-2.22 6-6.35 7.38c-3.72 1.24-6.78.81-8.78-.08c-4.77-2.11-5.01-7.15-5.01-7.15m-16.64 0l-18.22-8.71s-2.54 3.93-1.92 8.56c.38 2.77 2.23 6 6.35 7.38c3.72 1.24 6.78.81 8.78-.08c4.78-2.11 5.01-7.15 5.01-7.15'/%3E%3Cpath fill='%232f2f2f' d='M74.85 94.95c-.37-1.25-1.66-2.33-2.97-2.38c-1.57-.06-2.57 1.41-3.73 2.22c-1.34.94-3.01 1.61-4.67 1.46c-2.01-.19-3.07-1.54-4.61-2.64c-1.4-.99-3.15-1-4.39.3c-.59.62-.91 1.47-.86 2.33c.06 1.13.81 2.28 1.61 3.03c3.14 2.97 8.02 3.62 12.08 2.58c2.83-.73 8.73-2.93 7.54-6.9'/%3E%3C/svg%3E");
}
  
.emojione--shooting-star {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='%23f5a300' d='m7 31l14.1 10.3L14.2 62l17.9-12.8l18 12.8L57 2z'/%3E%3Cpath id='emojioneShootingStar0' fill='%23fff' d='m38.9 39.9l10.9-7.8H36.3l-4.2-12.6L28 32.1H14.5l10.9 7.8l-4.1 12.6l10.8-7.8L43 52.5z'/%3E%3Cuse href='%23emojioneShootingStar0'/%3E%3Cpath fill='%23ffce31' d='M39 28.4h3.5L57 2L37.8 24.7zM57 2L34.6 15l1.8 5.6zm-3.1 26.4L57 2l-9.8 26.4z'/%3E%3C/svg%3E");
}

.noto-v1--love-letter {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%2378a3ad' d='M125.4 55.11c-4.08-8.33-7.89-16.79-12.12-25.05c-2.13-4.18-4.38-8.31-6.8-12.33c-1.83-3.04-4-7.64-7.59-8.91c-2.01-.72-4.19-.92-6.31-.8c-4.22.22-8.25 1.62-12.3 2.69c-6.87 1.82-13.69 3.82-20.5 5.87c-7 2.1-14.14 4.19-21.03 6.59c-8.08 2.82-16.42 4.92-24.4 7.97C10.8 32.5 6.77 34 3.67 36.25C1.95 37.5.86 39.94.38 41.95c-.39 1.7-.01 3.27.16 4.96c.33 3.12 1.57 5.71 2.69 8.61c3.98 10.31 8.98 20.25 13.31 30.42c2.26 5.28 4.55 10.57 7.24 15.65c1.17 2.21 2.52 4.24 3.7 6.46c1.43 2.7 2.95 4.85 4.77 7.32c1.61 2.19 3.63 4.25 6.43 4.61c2.75.35 5.27-.75 7.73-1.81c6.69-2.86 12.58-6.92 18.66-10.84c4.84-3.12 9.82-6 14.79-8.92c5.75-3.37 11.43-6.85 17.02-10.48c9.68-6.29 20.26-11.73 28.78-19.64c3.57-3.32 2.06-8.42-.26-13.18'/%3E%3Cpath fill='%23fff' d='M112.74 68.69c-3.18 2.44-6.5 4.67-9.91 6.79c-13.13 8.13-26.3 15.92-40.12 22.84c-5.97 2.99-12.99 7.63-19.83 8.06c-6.17.38-9.34-4.22-11.92-9.21c-4.01-7.79-7.79-15.9-11.13-24.01c-2.12-5.14-3.81-10.45-5.55-15.72c-.46-1.4-1.09-2.95-1.65-4.53c-.07-.66-.53-1.48-.29-1.88c.35-.57 1.54-.4 2.05-.35c1.66.19 3.2.95 4.79 1.41c3.52 1.03 7.06 1.97 10.59 2.95c5.74 1.58 11.54 3.04 17.25 4.72c1.77.52 3.52 1.14 5.35 1.43c.68.11 1.36.22 2.04.3c.53.07 1.28.05 1.63-.43c.41-.56.01-1.62-.14-2.19c-.45-1.64-2.04-2.29-3.48-2.86c-1.77-.69-3.49-1.43-5.28-2.07c-5.98-2.13-12.09-3.76-18.16-5.65c-3.75-1.17-7.59-2.29-11.24-3.73c-1.06-.41-3.14-.78-3.32-2.15c-.09-.64.24-1.08.72-1.46c.04-.04.15-.12.27-.21c3.91-2.31 8.15-3.81 12.4-5.39c10.12-3.75 20.6-6.51 30.85-9.9c4.77-1.57 9.46-3.4 14.29-4.72c4.94-1.36 9.94-2.49 14.86-3.92c1.02-.3 2.05-.49 3.08-.65c.14.03.28.05.4.1c.87.41.97 1.59.96 2.42c-.02 1.19-.04 2.39-.12 3.59c-.17 2.56-.41 5.12-.51 7.68c-.05 1.36-.21 2.7-.16 4.05c.05 1.42-.23 2.82.13 4.22c.3 1.17 1.52 2.63 2.89 2.42c1.59-.24 1.84-6.08 1.97-7.19c.4-3.07.82-6.14 1.14-9.22c.13-1.24.25-2.48.34-3.72c.04-.5-.07-1.72.63-1.83c.25-.04.5.14.73.36c1.11 1.4 2.11 2.96 3.05 4.47c3.32 5.32 6.51 10.8 8.76 16.65c2.35 6.11 5.64 11.73 7.48 18.06c1.37 4.73-2.49 7.9-5.84 10.47'/%3E%3Cpath fill='%23d7598b' d='M90.92 43.79c-3.15-3.36-9.31-3.37-12.03.48c-.54.76-1.12 2.22-1.99 2.94c-.37.31-.8.48-1.3.4c-.8-.13-1.58-.17-2.38-.27c-2.47-.32-5.27-.38-7.54.72c-3.79 1.85-5.57 5.71-5.26 9.78c.37 4.87 3.62 8.3 8.07 10.13c3.09 1.27 6.39 1.97 9.69 2.4c1.66.22 3.33.37 5 .48c.7.05 1.33.04 2.02 0c.8-.05 1.59.15 2.4.02c2.89-.46 3.85-6.14 4.44-8.39c1.35-5.15 2.89-12.94-.34-17.73c-.24-.33-.5-.66-.78-.96'/%3E%3C/svg%3E");
}

.game-icons--tank-tread {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='white' d='M225.691 394.74a91.308 91.308 0 1 0-91.308-91.309a91.308 91.308 0 0 0 91.308 91.308zm0-132.663a41.345 41.345 0 1 1-41.344 41.345a41.392 41.392 0 0 1 41.344-41.345m-13.778 41.345a13.778 13.778 0 1 1 13.778 13.759a13.797 13.797 0 0 1-13.788-13.75zm160.047-73.068a52.056 52.056 0 1 0-52.056-52.056a52.056 52.056 0 0 0 52.056 52.056m0-75.628a23.572 23.572 0 1 1-23.572 23.572a23.6 23.6 0 0 1 23.572-23.553zm-7.854 23.572a7.854 7.854 0 1 1 7.854 7.855a7.864 7.864 0 0 1-7.864-7.855zm114.106 1.357v-1.156a103.194 103.194 0 0 0-2.962-31.684l14.839-3.67A122.304 122.304 0 0 0 464.29 93.46l-11.485 9.976a103.749 103.749 0 0 0-22.483-19.645c-.84-.545-1.7-1.061-2.56-1.577l7.892-13.1a117.527 117.527 0 0 0-53.757-16.664l-.955 15.288v.163c-2.322-.153-4.654-.077-7.004-.077H350.06V52.506h-45.864v15.288h-30.577V52.506h-45.864v15.288H197.18V52.506h-45.864v15.288H120.74V52.506H74.875v15.288H44.299V52.506H18.5v46.82h355.38c28.666 0 53.28 14.916 65.93 39.892a73.335 73.335 0 0 1 7.95 38.22v.44a71.959 71.959 0 0 1-10.682 32.487c-25.216 40.963-68.386 96.305-113.82 155.002a153.97 153.97 0 0 1-20.018 21.566a122.304 122.304 0 0 1-75.246 25.798H18.5v31.532h10.51v15.288h45.865v-15.288h30.576v15.288h45.864v-15.288h30.576v15.288h45.864v-15.498a145.762 145.762 0 0 0 21.824-1.615h.153l2.236 15.145a163.812 163.812 0 0 0 50.565-16.13l-6.975-13.682a149.794 149.794 0 0 0 26.916-17.59l9.737 11.857a164.146 164.146 0 0 0 28.025-29.554l6.364-8.6l-12.317-9.058l18.155-24.623l12.25 9.02l27.183-36.94l-12.316-9.058l18.154-24.623l12.317 9.058l27.146-36.95l-12.317-9.058l13.177-17.839a107.215 107.215 0 0 0 5.035-7.51l13.033 8.026a117.336 117.336 0 0 0 17.4-53.575zm-231.853 232.37a118.148 118.148 0 0 0 35.287-11.467a117.986 117.986 0 0 1-35.287 11.466zM18.5 394.73v-49.964a41.392 41.392 0 0 0 40.924-41.335A41.392 41.392 0 0 0 18.5 262.096v-49.973a91.308 91.308 0 0 1 90.888 91.308A91.308 91.308 0 0 1 18.5 394.73m0-77.55v-27.518a13.788 13.788 0 0 1 13.377 13.76A13.788 13.788 0 0 1 18.5 317.18'/%3E%3C/svg%3E");
}

.emojione-v1--movie-camera {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='%23354a52' d='M49.45 1.557c-6.078 0-11.255 3.797-13.327 9.143H23.797a8.552 8.552 0 1 0 0 17.104h17.818a14.247 14.247 0 0 0 7.835 2.346c7.894 0 14.296-6.403 14.296-14.295c0-7.898-6.402-14.298-14.296-14.298'/%3E%3Cpath fill='%23243438' d='M47.691 6.591c-5.01 0-9.273 3.126-10.977 7.532H26.557a7.051 7.051 0 0 0-7.05 7.05c0 3.89 3.157 7.05 7.05 7.05h14.681a11.718 11.718 0 0 0 6.454 1.933c6.507 0 11.781-5.275 11.781-11.779c0-6.51-5.275-11.781-11.782-11.781'/%3E%3Cpath fill='%2356787f' d='M44.47 17.03c0 2.346 1.857 4.25 4.146 4.25c2.298 0 4.16-1.903 4.16-4.25c0-2.351-1.862-4.256-4.16-4.256c-2.289 0-4.146 1.905-4.146 4.256'/%3E%3Cg fill='%23243438'%3E%3Cpath d='M34.539 47.957h3.798v15.775h-3.798zm-5.112 15.775H25.24l6.283-20.952h4.19z'/%3E%3Cpath d='M42.723 63.732h4.19L40.629 42.78h-4.191z'/%3E%3Cpath d='M26.69 45.4h19.498v9.751H26.69zm-6.345-2.14L.848 47.45V27.23l19.497 6.284z'/%3E%3C/g%3E%3Cpath fill='%2334484c' d='M14.174 27.23h46.09v23.05h-46.09z'/%3E%3Cpath fill='%2356787f' d='M33.26 30.471h20.854v10.43H33.26zM16.263 41.04h1.558v6.918h-1.558zm3.568 0h1.557v6.918h-1.557zm3.598 0h1.559v6.918h-1.559z'/%3E%3C/svg%3E");
}
  </style>
  