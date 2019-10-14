import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Programador from './components/Programador.vue'
import Actividad from './components/Actividad.vue'
import Proyecto from './components/Proyecto.vue'

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
      path: '/programadores',
      name: 'programador',
      component:Programador
    },
    {
      path: '/actividades',
      name: 'actividad',
      component:Actividad
    },
    {
      path: '/proyectos',
      name: 'proyecto',
      component:Proyecto
    }
  ]
})
