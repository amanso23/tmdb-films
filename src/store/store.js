import {createPinia ,defineStore } from 'pinia'

export const listasUsuario = defineStore({
  id: 'idListasUsuario',
  state: () => ({
    listaMeGustas: [],
    listaWatchlist: [],
    listaGuardadas: [],
    sesionCerrada : false,

  }),
  actions: {
    agregarPeliculaMeGusta(pelicula) {
      const index = this.listaMeGustas.findIndex(item => item.id === pelicula.id); //buscamos en el array una pelicual con un id coincidente
      if (index !== -1) { //si lo encuentra, lo elimina
          this.listaMeGustas.splice(index, 1);
          return -1; //Si añades devuelves 1
      } else {
          this.listaMeGustas.push(pelicula); //si no, lo añade, esto evita que se añadan repetidos a la lista
          return 1; //si la eliminas devuelves 2
      }
      
  },
    agregarPeliculaWatchlist(pelicula) {
      const index = this.listaWatchlist.findIndex(item => item.id === pelicula.id); //buscamos en el array una pelicual con un id coincidente
      if (index !== -1) { //si lo encuentra, lo elimina
          this.listaWatchlist.splice(index, 1);
          return -1;
      } else {
          this.listaWatchlist.push(pelicula); //si no, lo añade, esto evita que se añadan repetidos a la lista
          return 1;
      }
    },
    agregarPeliculaGuardadas(pelicula) {
      const index = this.listaGuardadas.findIndex(item => item.id === pelicula.id); //buscamos en el array una pelicual con un id coincidente
      if (index !== -1) { //si lo encuentra, lo elimina
          this.listaGuardadas.splice(index, 1);
          return -1;
      } else {
          this.listaGuardadas.push(pelicula); //si no, lo añade, esto evita que se añadan repetidos a la lista
          return 1;
      }
    },
    resetearListas(){
      this.listaMeGustas = [];
      this.listaWatchlist = [];
      this.listaGuardadas = [];
    }
    
  },
})

const pinia = createPinia();

export default pinia;


