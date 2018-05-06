import './firebase';
import Vue from 'vue';
import App from './App.vue';
import VueFire from 'vuefire';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Vuex from 'vuex';

// Pages
import seedPage from './seedPage.vue';
import home from './Home.vue';
import sproutPage from './sproutPage.vue';
import profilePage from './profilePage.vue';
import mySeedPage from './mySeedPage.vue';
import mySproutPage from './mySproutPage.vue';
import newSproutPage from './newSproutPage.vue';


Vue.use(Vuex)
Vue.use(Vuetify,{
  theme: {
    primary: '#64FFDA',
    secondary: '#C0CA33',
    accent: '#8c9eff',
    text: '#616161',
    error: '#b71c1c'
  }
} )
Vue.use(VueFire);
Vue.use(VueRouter);

const routes = [
  {path:'/seed/:seedId',
  name: 'seedPage', 
  component: seedPage,},

  {path:'/',
  name: 'homePage',
  component: home },

  {path:'/sprout',
  name: 'sproutPage',
  component: sproutPage},

  {path:'/user/:userId',
  name: 'profilePage',
  component: profilePage },

  {path:'/myseeds/:userId',
  name: 'mySeedPage',
  component: mySeedPage },

  {path:'/mySprouts/:userId',
  name: 'mySproutPage',
  component: mySproutPage },

  {path:'/sprout/new',
  name: 'newSproutPage',
  component: newSproutPage },
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
