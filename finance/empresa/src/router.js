import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Letras from './components/Letras.vue'
import CarteraLetras from './components/CarteraLetras.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/letras',
      name: 'letras',
      component: Letras
    },
    {
      path: '/carteraLetras',
      name: 'carteraLetras',
      component: CarteraLetras
    }

  ]
})
