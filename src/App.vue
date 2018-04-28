<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app>
      <v-list dense>
         <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>User Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Seeds</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Sprouts</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="teal"fixed app>
      <v-toolbar-side-icon @click.stop="handleUser"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">RFRMR</v-toolbar-title>
      <v-btn class="white--text" flat small @click.native.stop="logOutDialog=true" >Logout</v-btn>
    </v-toolbar>
    
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer color="white" app>
      <span class="teal--text">&copy; 2017</span>
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
            <v-btn color="blue darken-1" flat @click.native="signUpDialog = false" @click="signInDialog = true">Already Helping!</v-btn>
            <v-btn color="blue darken-1" flat @click.native="signUpDialog = false" @click="signUp(user)">Help us solve problems</v-btn>
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
import firebase from 'firebase'
import {mapMutations} from 'vuex'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      drawer: false,
      signUpDialog: false,
      signInDialog: false,
      logOutDialog: false,
      userName: '',
      userEmail: '',
      userPassword:'',
      userId:'',
    };
  },
  
  mounted () {
    const user = firebase.auth().currentUser;
    const self = this
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      self.setUser(user)
      // User is signed in.

    } else {
      // No user is signed in.
      console.log('No User')
    }
});
  },
  computed : mapState(['user']),
  methods : {
    signUp (user) {
      var name = this.userName
      var email = this.userEmail
      var password = this.userPassword
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        this.userName = ''
        this.userEmail = ''
        this.userPassword = ''
      })
    },
    signIn (user) {
      var email = this.userEmail
      var password = this.userPassword
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        this.userEmail = ''
        this.userPassword = ''
      })
    },
    handleUser (user) {
      var user = firebase.auth().currentUser;

      if (user) {
        // User is signed in.
        user = firebase.auth().currentUser
          this.drawer = !this.drawer
          console.log(this.userId)
      } else {
        // No user is signed in.
        console.log('hell yeah')
          this.signUpDialog = true
    }},

    logOut (user) {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('signed out')

      }).catch(function(error) {
        // An error happened.
      });
    },
    ...mapMutations(['setUser']),
  }
}

</script>

   

