<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app>
       <v-list-tile @click="homeRoute">
          <v-list-tile-action>
            <v-icon>fas fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Seeds Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      
      <v-list dense>
         <v-list-tile @click="profileRoute">
          <v-list-tile-action>
            <v-icon>fas fa-user-astronaut</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile @click="mySeedRoute">
          <v-list-tile-action>
            <v-icon>fas fa-seedling</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Seeds</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="mySproutRoute">
          <v-list-tile-action>
            <v-icon>fab fa-pagelines</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Sprouts</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="teal accent-2"fixed app>
      <v-toolbar-side-icon @click.stop="drawerToggle"></v-toolbar-side-icon>
      <v-toolbar-title class="grey-darken-3--text">RFRMR</v-toolbar-title>
      <v-btn class="grey-darken-3--text" flat small @click.native.stop="logOutDialog=true" >Logout</v-btn>
    </v-toolbar>
    
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer color="white" app>
      <span class="teal--text"> RFRMR &copy; 2018</span>
    </v-footer>
    
    <div id="LoginDialog">
      <v-dialog v-model="signUpDialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Help us solve problems!</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <span>
                Sign up below!
              </span><br>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field 
                    v-model = "userName" 
                    label="Username" 
                    required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field 
                  v-model ="userEmail" 
                  label="Email" 
                  required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <!-- <v-text-field 
                  v-model = "userPassword" 
                  type="password" 
                  label = "Password"
                  required></v-text-field> -->
                  <v-text-field
                    label="Enter your password"
                    hint="At least 8 characters"
                    v-model="userPassword"
                    min="8"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    counter
                   ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="signUpDialog = false" @click="signInDialog = true">Already Helping!</v-btn>
            <v-btn color="blue darken-1" flat @click.native="signUpDialog = false" @click="signUp(user)">Help us solve problems</v-btn>
            <v-btn color="blue darken-1" flat @click.native="signUpDialog = false" @click="drawerToggle">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div id="logOutDialog">
      <v-dialog v-model="logOutDialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Are you leaving us?</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="logOutDialog = false">No I want to stay!</v-btn>
            <v-btn color="blue darken-1" flat @click.native="logOutDialog = false" @click="logOut(user)">Yeah I've got to go</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div id="signInDialog">
      <v-dialog v-model="signInDialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Sign In </span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field 
                  v-model ="userEmail" 
                  label="Email" 
                  required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field 
                  v-model = "userPassword" 
                  type="password" 
                  label = "Password"
                  required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="signInDialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="signInDialog = false" @click="signIn(user)">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>


<script>

import firebase from 'firebase';
import {mapMutations} from 'vuex';
import {mapState} from 'vuex';

export default {
  data () {
    return {
      drawer: false,
      signedInToggle: false,
      signUpDialog: false,
      signInDialog: false,
      logOutDialog: false,
      e1: false,
      userName: '',
      userEmail: '',
      userPassword:'',
      userId:''
    };
  },
  mounted () {
    const user = firebase.auth().currentUser;
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        self.setUser(user)
        self.signedInToggle = true
        self.userId= user.uid
      } else {
        // No user is signed in.
        console.log('No User')
        self.signedInToggle = false
      }
    });
  },
  computed : mapState(['user']),
  methods : {
    signUp (user) {
      var name = this.userName;
      var email = this.userEmail;
      var password = this.userPassword;
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        this.userName = '';
        this.userEmail = '';
        this.userPassword = '';
        this.signedInToggle = true;
      });
    },
    signIn (user) {
      var email = this.userEmail;
      var password = this.userPassword;
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        this.userEmail = ''
        this.userPassword = ''
        this.signedInToggle = true
      });
    },
    drawerToggle (signedInToggle){
      var drawer = (this.signedInToggle == true) ? this.drawer =!this.drawer : this.signUpDialog = true;
    },
    logOut (user) {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        this.signedInToggle = false;
      }).catch(function(error) {
        // An error happened.
      });
    },
    homeRoute (){
      this.$router.push({name: 'homePage'});
    },
    profileRoute (){
      var userId = this.userId;
      this.$router.push({name: 'profilePage', params: { userId }});
    },
    mySeedRoute (){
      var userId = this.userId;
      this.$router.push({name: 'mySeedPage', params: { userId }});
    },
    mySproutRoute (){
      var userId = this.userId;
      this.$router.push({name: 'mySproutPage', params: { userId }});
    },
    ...mapMutations(['setUser'])
  }
}

</script>
