import './firebase';
import Vue from 'vue';
import App from './App.vue';
import VueFire from 'vuefire';
import VueRouter from 'vue-router';
import Seed from './seed.vue';
import Home from './Home.vue';
import Sprout from './Sprout.vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(VueFire);
Vue.use(VueRouter);

const routes = [
  {path:'/seed/:id', component: Seed},
  {path:'/', component: Home },
  {path:'/sprout', component: Sprout}
];

const router = new VueRouter({
  routes,
  mode: 'history'
})

const store = new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
