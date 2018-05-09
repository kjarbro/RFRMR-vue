<template>
  <div id = 'seedPage'>
  
    <!--Seed Card--> 
    <v-card class="SeedCard">
        <v-card-title primary-title.display-4>
           <h1> {{currentSeed.Title}} </h1>
        </v-card-title>

        <v-card-text>
        {{currentSeed.Description}}
        
        </v-card-text>
        <v-tooltip bottom>
            <v-btn 
                light
                color="primary" 
                slot="activator" 
                @click="setSproutSeed(currentSeed['.key'])" 
                @click.native.stop="newSproutDialog=true"> 
                Create Sprout
                <v-icon right>fab fa-pagelines</v-icon> 
            </v-btn>
            <v-btn 
                light
                color="primary" 
                slot="activator" 
                @click="seedChildrenRoute" > 
                View this seed's sprouts
                <v-icon right>fab fa-pagelines</v-icon> 
            </v-btn>
            <span>Sprouts allow you to organize your team so that you can more effectively solve problems.</span>
        </v-tooltip>
        <v-flex> 
            
        </v-flex>    
    </v-card>
    <v-card class="CommentCard">
      <v-card-title primary-title>
        <div>
          <div class="headline">Post a Comment</div>
        </div>
      </v-card-title>
      <v-text-field v-model="seedComment" label="Your comment here."></v-text-field>
      <v-card-actions>
        <v-btn flat @click="submitSeedComment()">Post Comment</v-btn>
      </v-card-actions>
    </v-card>

    <div>
        <div v-for="comment in currentSeed.Comments" :key="comment.id" >
            <!-- Seed Card no edit -->
            <div v-if="!comment.edit">
                <v-card >
                    <v-card-title primary-title>
                        <div class="headline">{{comment.Comment}}</div>
                    </v-card-title>
                    <v-card-text>
                         <small> by: {{comment.UserId}}</small>
                    </v-card-text>
                   
                    <v-card-actions>
                        <v-btn flat @click="deleteComment(comment['.key'])">Delete</v-btn>
                        <v-btn flat @click="setEditComment(comment['.key'])" @click.native.stop="Editdialog=true">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
            <!-- Seed Cards Edit -->
            <div v-else>
                <v-dialog v-model="Editdialog" persistent max-width="500px">
                    <v-card class="SeedCard">
                        <v-card-title>
                            <span class="headline">Edit Comment</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex l12 l6 md4>
                                        <v-text-field v-model="seed.Comment"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="teal accent-2" flat @click.native= "Editdialog = false" @click="cancelEdit(seed['.key'])">Cancel</v-btn>
                            <v-btn color="teal accent-2" flat @click.native= "Editdialog = false" @click="saveEdit(seed)">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
    </div>

    <div>
        <v-dialog
            v-model="newSproutDialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable
            >
            <v-card tile>
                <v-toolbar card color="teal accent-2">
                    <v-btn icon @click.native="newSproutDialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Create Your Sprout</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    <!-- <v-btn dark flat @click.native="newSproutDialog = false" @click="saveSprout">Save</v-btn> -->
                    </v-toolbar-items>
                    <v-menu bottom right offset-y>
                    </v-menu>
                </v-toolbar>

                <v-card-text>
                    <v-list three-line subheader>
                            <v-flex xs8>
                                <v-text-field
                                v-model="sproutTitle"
                                label="Sprout Name"
                                > </v-text-field>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field
                                v-model="sproutDescription"
                                label="Describe your Sprout"
                                ></v-text-field>
                            </v-flex>
                        <v-menu
                            offset-x
                            :close-on-content-click="true"
                            :nudge-width="200"
                            v-model="accessMenu"
                            >
                            <v-btn color="teal accent-2" slot="activator">Sprout user access permited...</v-btn>
                            <v-card>
                                <v-radio-group v-model="userAccess">
                                    <v-radio
                                        label="by Invite"
                                        color="teal accent-2"
                                        value="byInvite">    
                                    </v-radio>
                                    <v-radio
                                        label="by Request"
                                        color="teal accent-2"
                                        value="byRequest">
                                    </v-radio>
                                    <v-radio
                                        label="by Existence"
                                        color="teal accent-2"
                                        value="byExistence">
                                    </v-radio>
                                </v-radio-group>
                            </v-card>
                        </v-menu>
                        <v-flex>
                            <v-btn  color="teal accent-2"  
                                slot="activator" 
                                @click="submitSprout()">
                                Submit Your Sprout
                            </v-btn> 
                        </v-flex>
                        
                        
                    </v-list>
                </v-card-text>
                 
              
                 <div style="flex: 1 1 auto;"></div>
                </v-card>
      </v-dialog>
    </div>
    </div>
  </div>
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
      seedComment: '',
      newSproutDialog: false,
      accessMenu: false,
      sproutTitle: '',
      sproutDescription: '',
      userAccess: '',
      UserId: '',
      currentSeed: '',
      key: '',
      sproutId: ''
    };
  },
  firebase: {
    seeds: seedsRef,
    sprouts: sproutsRef
  }, 
  mounted (currentSeed) {
    const self = this;
    var key = self.$route.params.seedId;
    console.log(key);
    var firebaseSeed = seedsRef.child(key).on('value', function(snapshot) {
      self.currentSeed = snapshot.val();
      self.key = key;
      console.log(currentSeed);
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },
  methods: {
    submitSprout(user, key){
      var self = this
      var user = self.$store.state.user
      if (user) {
        var newSprout = sproutsRef.push({
          Title: this.sproutTitle, 
          Description: this.sproutDescription, 
          OwnerId: this.user.uid,
          MemberId: [''],
          ParentSeed: this.key,
          PrivacyType: this.userAccess,  
          edit:false
        });
        this.sproutTitle = '';
        this.sproutDescription = '';
        this.newSproutDialog = false;
        var sproutId = newSprout.key;
        self.$router.push({name: 'sproutPage', params: { sproutId }})
      }
      else {
        console.log('You need to sign in!')
      }
    },
    submitSeedComment(user, key) {
      const self = this;
      var key = self.$route.params.seedId;
      self.userId = self.$store.state.user.uid;
      console.log(seedsRef.child(key).child('/Comments'));
      console.log(key);
      seedsRef.child(key).child('/Comments').push({Comment: self.seedComment, UserId: self.user.uid, edit:false});
      this.seedComment ='' ;
    },
    setEditComment(key) {
      seedsRef.child(key).update({edit: true})
    },
    deleteComment(key) {
      seedsRef.child(key).remove();
    },
    saveEdit(seed) {
      const key = seed['.key']
      seedsRef.child(key).set({Title: seed.Title, Description: seed.Description , edit: false, dialog: false})
    },
    cancelEdit(key) {
      seedsRef.child(key).update({edit: false, dialog: false})
    },
    setSproutSeed(key) {
    },
    seedChildrenRoute(key){
      var userId = this.userId;
      this.$router.push({name: 'seedChildSprouts', params: {key}})
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

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 20px;
}

a {
  color: #42b983;
}

.CommentCard {
  padding: 20px 40px; 
}

.SeedCard {
  padding: 20px 40px; 
  width: 1200px; 
  margin: 20px 40px;
}

</style>