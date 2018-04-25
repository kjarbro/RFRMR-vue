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

Vue.use(Vuetify)
Vue.use(VueFire);
Vue.use(VueRouter);

const routes = [
  {path:'/seed/:id', component: Seed, props: { signedInUser: App.data().signedInUser } },
  {path:'/', component: Home, props: { signedInUser: App.data().signedInUser } },
  {path:'/sprout', component: Sprout, props: { signedInUser: App.data().signedInUser } }
];

const router = new VueRouter({
  routes,
  mode: 'history'
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
