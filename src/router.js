import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import EventCreate from './views/EventCreate.vue';
import EventList from './views/EventList.vue';
import EventShow from './views/EventShow.vue';
import NProgress from 'nprogress';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({

  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/events',
      name: 'event-list',
      component: EventList,
      props: true,
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next){
        store.dispatch('event/fetchEventById', routeTo.params.id).then((event) => {
          routeTo.params.event = event
          next()
        })
      },
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate,
    },
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach((routeTo, routeFrom, next) => {
  NProgress.done()
})

export default router
