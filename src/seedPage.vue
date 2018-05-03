<template>
    <div id = 'seedPage'>
        <div>
        <!--Seed Card--> 
            <v-card>
                <v-card-title primary-title>
                    {{currentSeed.Title}}
                </v-card-title>

                <v-card-text>
                <small>{{currentSeed.Description}}</small> 
                </v-card-text>

            </v-card>
            <v-card class="CommentCard">
                <v-card-title primary-title>
                    <div>
                        <div class="headline">Post a Comment</div>
                    </div>
                </v-card-title>
                <v-text-field
                    v-model="seedComment"
                    label="Your comment here."
                ></v-text-field>
                <v-card-actions>
                    <v-btn flat @click="submitSeedComment()">Post Comment</v-btn>
                </v-card-actions>
            </v-card>
        </div>
         <div>
            <div v-for="comment in currentSeed.Comments" :key="comment.id" >
                <!-- Seed Card no edit -->
                <div v-if="!comment.edit">
                    <v-card >
                        <v-card-title primary-title>
                            <div class="headline">{{comment.Comment}}</div>
                        </v-card-title>
                        <small> by: {{comment.UserId}}</small>
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
                                <v-btn color="blue darken-1" flat @click.native= "Editdialog = false" @click="cancelEdit(seed['.key'])">Cancel</v-btn>
                                <v-btn color="blue darken-1" flat @click.native= "Editdialog = false" @click="saveEdit(seed)">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from './firebase'
import {seedsRef} from './firebase'
import {mapMutations} from 'vuex'
import {mapState} from 'vuex'


export default {
  data () {
    return {
      seedComment: '',
      dialog: false,
      UserId: '',
      currentSeed: '',
      key: '',
    };
  },
  firebase: {
    seeds: seedsRef,
  }, 
 mounted (currentSeed) {
    const self = this
    var key = self.$route.params.seedId
    //var key = self.$store.state.seedId
    console.log(key)
    var firebaseSeed = seedsRef.child(key).on("value", function(snapshot) {
        self.currentSeed = snapshot.val()
        self.key = key
        console.log(currentSeed)
        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        })
    },
  methods: {
    submitSeedComment(user, key){
        const self = this
        //var key = self.$store.state.seedId
        var key = self.$route.params.seedId
        self.userId = self.$store.state.user.uid
        console.log(seedsRef.child(key).child('/Comments'))
        console.log(key)
        seedsRef.child(key).child('/Comments').push({Comment: self.seedComment, UserId: self.user.uid, edit:false})
        this.seedComment =''
       
        
    },
     
    // },
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

.CommentCard{
    padding: 20px 40px; 
    
}

</style>
