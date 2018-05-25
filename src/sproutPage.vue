<template>
  <div>
    <v-toolbar color="primary" tabs>
      <v-toolbar-title>{{currentSprout.Title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs color="primary" slot="extension" v-model="tab" grow>
        <v-tabs-slider color="green" ></v-tabs-slider>
        <v-tab v-for="item in tabTitles" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text >{{ currentSprout.Description }}</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text >To do</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text >Chat</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text >Files</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          
          <v-card-text >Members</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>

import firebase from 'firebase';
import {seedsRef} from './firebase';
import {sproutsRef} from './firebase';
import {mapMutations} from 'vuex';
import {mapState} from 'vuex';

export default {
  data () {
    return {
      tab: null,
      tabTitles: ['description','to do', 'chat', 'files', 'members'],
      text: ['Lorem iabore et dolore ion ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'ndjsk', 'test3'],
      sproutName: '',
      key: '',
      currentSprout: ''
    };
  },
  firebase: {
    seeds: seedsRef,
    sprouts: sproutsRef
  }, 
  mounted (currentSprout) {
    const self = this;
    var key = self.$route.params.sproutId;
    console.log(key);
    var firebaseSprout = sproutsRef.child(key).on('value', function(snapshot) {
      self.currentSprout = snapshot.val();
      self.key = key;
      console.log(currentSprout);
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },
};

</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2 {font-weight: normal; }
ul {list-style-type: none; padding: 0; }
li {margin: 0 20px; }
a {color: #42b983; }
.SeedCard {padding: 20px 40px; margin: 20px 20px; }

.grid {
  display: grid;
  grid-column-start: 10px;
  grid-template-columns: repeat(3, 3fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(100px, auto);
}

</style>
