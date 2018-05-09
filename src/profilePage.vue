<template>
  <v-layout row>
    <v-flex xl>
      <v-card>
        <v-subheader>My Profile</v-subheader>
        <v-container v-if="profile" grid-list-xl>
          <v-layout>
            <v-card class="grey-darken-2--text">
              <v-container grid-list-xl>
                <v-layout>
                  <v-flex>
                    <v-card-media src="/static/doc-images/cards/halcyon.png" height="125px" contain></v-card-media>
                  </v-flex>
                  <v-flex xl12 xl6>
                    <div>
                      <div>UserName:  {{name}}</div>
                      <div>Email: {{email}}</div>
                      <v-btn flat @click.native="profile = false, profileEdit= true">Edit</v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-layout>
        </v-container>
        <v-container v-if="profileEdit" grid-list-md>
          <v-layout row wrap>
            <v-flex xl12 xl6>
              <v-text-field v-model="name" box label="UserName"></v-text-field>
            </v-flex>
            <v-flex xl12>
              <v-text-field v-model="email" box label="Email address" hint="Enter your email!" persistent-hint></v-text-field>
            </v-flex>
            <v-flex xl12>
              <v-text-field v-model="bio" box multi-line label="Bio"></v-text-field>
            </v-flex>
            </div><v-btn flat @click.native="profile = true, profileEdit= false" @click="profileUpdate">Save</v-btn></div>
          </v-layout>
        </v-container>
        <v-subheader>My Seeds</v-subheader>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex v-if="$store.state.user.uid == seed.UserID" v-for="seed in seeds" :key="seed.id" sm4>
                <!-- Seed Card no edit -->
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
                    <!-- Seed Cards Edit-->
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
        <v-subheader>Sprouts</v-subheader>
        <v-flex 
            v-if="$store.state.user.uid == sprout.UserID" 
            v-for="sprout in sprouts" :key="sprout.id" sm4>
                <!-- Seed Card no edit -->
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import firebase from 'firebase'
import {seedsRef} from './firebase'
import {sproutsRef} from './firebase'
import {mapMutations} from 'vuex'
import {mapState} from 'vuex'


export default {
  data () {
    return {
        profile: true,
        profileEdit:  false,
        activeSeedKey: '',
        name: '',
        email: '',
        photoUrl: '',
        emailVerified: '',
        uid: ''
    };
  },
  firebase: {
    seeds: seedsRef,
    sprouts: sproutsRef
  },
  mounted() {
    var self = this;
    var user = firebase.auth().currentUser;
    if (user != null) {
      self.name = user.displayName;
      self.email = user.email;
      self.photoUrl = user.photoURL;
      self.emailVerified = user.emailVerified;
      self.uid = user.uid;
    }   
},
 updated() {
    var self = this;
    var user = firebase.auth().currentUser;
    if (user != null) {
      self.name = user.displayName;
      self.email = user.email;
      self.photoUrl = user.photoURL;
      self.emailVerified = user.emailVerified;
      self.uid = user.uid;
    }   
},
  methods:{
    setActiveSeed(key) {
      this.activeSeedKey = (this.activeSeedKey == key) ? '' : key;
    },
    setEditSeed(key) {
      seedsRef.child(key).update({edit: true});
    },
    deleteSeed(key) {
      seedsRef.child(key).remove();
    },
    saveEdit(seed){
      const key = seed['.key'];
      seedsRef.child(key).set({Title: seed.Title, Description: seed.Description , edit: false, dialog: false});
    },
    cancelEdit(key){
      seedsRef.child(key).update({edit: false, dialog: false});
    },
    showSeed (key){
      const self = this;
      var seedId = seedsRef.child(key).key;
      console.log(seedId);
      self.setSeedId(seedId);
      self.$router.push({name: 'seedPage', params: {seedId}});
    },
    profileUpdate(user){
      var user = firebase.auth().currentUser;
      var self = this;
      var name = self.name;
      user.updateProfile({
        displayName: name
        //photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      }) ;
      user.updateEmail(self.email).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
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