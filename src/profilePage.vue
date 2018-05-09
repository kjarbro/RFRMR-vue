<template>
  <v-layout row>
    <v-flex sm12 sm6 >
      <v-card>
        <v-subheader>My Seeds</v-subheader>
        <v-container fluid grid-list-sm>
          <v-layout row wrap></v-layout>
        </v-container>
        <v-subheader>My Seeds</v-subheader>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex v-if="$store.state.user.uid == seed.UserID" v-for="seed in seeds" :key="seed.id" sm4>
              <div v-if="!seed.edit">
                <v-card >
                  <v-card-title primary-title><div class="headline">{{seed.Title}}</div></v-card-title>
                  <br>
                  <v-card-text><small class = "seedCard"> by: {{seed.UserID}}</small></v-card-text>
                  <v-card-actions>
                    <v-btn flat @click="showSeed(seed['.key'])">Show</v-btn>
                    <v-btn flat @click="deleteSeed(seed['.key'])">Delete</v-btn>
                    <v-btn flat @click="setEditSeed(seed['.key'])" @click.native.stop="Editdialog=true">Edit</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="setActiveSeed(seed['.key'])">
                      <v-icon>{{ activeSeedKey == seed['.key'] ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-card-text v-if="activeSeedKey == seed['.key']"> {{seed.Description}} </v-card-text>
                </v-card>
              </div> 
              <div v-else>
                <v-dialog v-model="Editdialog" persistent max-width="500px">
                  <v-card class="SeedCard">
                    <v-card-title><span class="headline">Edit Seed</span></v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex l12 l6 md4>
                              <v-text-field v-model="seed.Title"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                              <v-text-field v-model="seed.Description"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native= "Editdialog = false" @click="cancelEdit(seed['.key'])">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click.native= "Editdialog = false" @click="saveEdit(seed)">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>    
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import firebase from './firebase';
import {seedsRef} from './firebase';
import {sproutsRef} from './firebase';
import {mapMutations} from 'vuex';
import {mapState} from 'vuex';

export default {
  data () {
    return {
      activeSeedKey: '',
    };
  },
  firebase: {
    seeds: seedsRef,
    sprouts: sproutsRef
  },
  methods: {
    setActiveSeed(key) {
      this.activeSeedKey = (this.activeSeedKey == key) ? '' : key;
    },
    setEditSeed(key) {
      seedsRef.child(key).update({edit: true});
    },
    deleteSeed(key) {
      seedsRef.child(key).remove();
    },
    saveEdit(seed) {
      const key = seed['.key'];
      seedsRef.child(key).set({Title: seed.Title, Description: seed.Description , edit: false, dialog: false});
    },
    cancelEdit(key) {
      seedsRef.child(key).update({edit: false, dialog: false});
    },
    showSeed (key) {
      const self = this;
      var seedId = seedsRef.child(key).key;
      console.log(seedId);
      self.setSeedId(seedId);
      self.$router.push({name: 'seedPage', params: {seedId}});
    },
    ...mapMutations(['setUser']),
    ...mapMutations(['setSeedId'])
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['seedId'])
  }
}

</script>