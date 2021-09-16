import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import SquadList from '../views/squads/list'
import SquadNew from '../views/squads/new'
import SquadEdit from '../views/squads/edit'
import UserList from '../views/users/list'
import UserNew from '../views/users/new'
import UserEdit from '../views/users/edit'
import ReservationNew from '../views/reservations/new'
import ReservationList from '../views/reservations/list'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ReservationList,
    meta: {
      requiresAuth: true,
      title: 'Reservaciones'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: true,
      title: 'Registro de usuarios'
    }
  },
  {
    path: '/squads',
    name: 'squadList',
    component: SquadList,
    meta: {
      requiresAuth: true,
      title: 'Cuadraciclos registrados'
    }
  },
  {
    path: '/squads/new',
    name: 'squadNew',
    component: SquadNew,
    meta: {
      requiresAuth: true,
      title: 'Creacion de cuadraciclo'
    }
  },
  {
    path: '/squads/:id/edit',
    name: 'squadEdit',
    component: SquadEdit,
    meta: {
      requiresAuth: true,
      title: 'Edición de cuadraciclo'
    }
  },
  {
    path: '/users',
    name: 'users',
    component: UserList,
    meta: {
      requiresAuth: true,
      title: 'Usuarios registrados'
    }
  },
  {
    path: '/users/New',
    name: 'userNew',
    component: UserNew,
    meta: {
      requiresAuth: true,
      title: 'Registro de usuarios'
    }
  },
  {
    path: '/users/:id/edit',
    name: 'userEdit',
    component: UserEdit,
    meta: {
      requiresAuth: true,
      title: 'Edición de usuarios'
    }
  },
  {
    path: '/reservations/new',
    name: 'reservationNew',
    component: ReservationNew,
    meta: {
      requiresAuth: true,
      title: 'Nueva reservación'
    }
  },
  {
    path: '/reservations',
    name: 'reservationList',
    component: ReservationList,
    meta: {
      requiresAuth: true,
      title: 'Reservaciones'
    }
  },
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!localStorage.getItem('user-token')) {
      next({
        path: '/login',
        name: 'login',
        component: Login,
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.name === 'login' && localStorage.getItem('user-token')) {
    next({
      path: '/reservations',
      name: 'reservationList',
      component: ReservationList
    })
  } else {
    next()
  }
})

export default router
