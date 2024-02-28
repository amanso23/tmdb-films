
<template>
    <div class="tarjeta container p-0">
      <router-link :to="link" class="router-link">
        <div class="d-flex align-items-center">
            <div class="icono m-2">
                <div v-html="icono" class="fs-3"></div>
            </div>
            <div class="mensaje-info mensaje m-2">
                {{ message }}
            </div>
        </div>
      </router-link>
    </div>
</template>
  
  <script>
  /**
   * Componente para mostrar una tarjeta de información.
   * @module InfoCardComponent
   */
  export default {
    /**
     * Propiedades del componente.
     */
    name: 'InfoCardComponent',
    /**
     * Propiedades del componente.
     * @returns {object} Propiedades del componente.
     */
    props: {
      icono: String,
      message: String,
      link: String
    }
  }
  </script>
  
  <style scoped>

.d-flex{
  gap: 0.8em;
}
  
 .tarjeta{
   width: 350px;
    background: #2c3440;
    border: 1px solid #456;
    border-radius: 3px;
    color: #fff;
    margin-bottom: 20px;
    padding: 10px;
    position: relative;
    transition: border 0.2s ease-out;
    cursor: pointer;
    
    
 }

 .tarjeta:hover{
  border: 1px solid #048eae;
 
 }

 
 .icono{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1.5em !important;
 }

 .mensaje-info{
    display: flex;
    align-items: center;
 }

 .router-link{
  text-decoration: none;
  color: inherit;
 }

 
 

  
  </style>