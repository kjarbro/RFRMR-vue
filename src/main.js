import './firebase';
import Vue from 'vue';
import App from './App.vue';
import VueFire from 'vuefire';
import VueRouter from 'vue-router';
import seedPage from './seedPage.vue';
import Home from './Home.vue';
import sproutPage from './sproutPage.vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(VueFire);
Vue.use(VueRouter);

const routes = [
  {path:'/seed/:seedId',
  name: 'seedPage', 
  component: seedPage,},

  {path:'/',
  name: 'homePage',
  component: Home },

  {path:'/sprout',
  name: 'sproutPage',
  component: sproutPage}
];

const router = new VueRouter({
  routes,
  mode: 'history'
})

const store = new Vuex.Store({
  state: {
    user: '',
    seedId: '',
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setSeedId (state, seedId){
    state.seedId = seedId
  }}
})

var app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
