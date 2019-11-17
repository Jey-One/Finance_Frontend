import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Letras from './components/Letras.vue'
import CarteraLetras from './components/CarteraLetras.vue'
import MisLetras from './components/MisLetras.vue'
import OptionsTabs from './components/OptionsTabs.vue'
import Pasos from './components/Pasos.vue'
import Progress from './components/Progress.vue'
import Login from './components/Login.vue'

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
    },
    {
      path: '/misLetras',
      name: 'misLetras',
      component: MisLetras
    },
    {
      path: '/option',
      name: 'option',
      component: OptionsTabs
    },
    {
      path: '/pasos',
      name: 'pasos',
      component: Pasos
    },
    {
      path: '/progress',
      name: 'progress',
      component: Progress
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }


  ]
})
