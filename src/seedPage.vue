<template>
  <div id = 'seedPage'>
      <div>
    <!-- Submit Seed Card--> 
        <v-card class="SeedCard">
            <v-card-title primary-title>
                {{currentSeed.Title}}
            </v-card-title>

            <v-card-text>
               <small>{{currentSeed.Description}}</small> 
            </v-card-text>

            <v-card-actions>
                <v-btn flat @click="submitSeed()">Plant your Seed</v-btn>
            </v-card-actions>
        </v-card>
        </div>
        <div></div>
    </div>
    </v-layout>
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
      seedTitle: '',
      seedDescription: '',
      activeSeedKey: '',
      dialog: false,
      seedCategory:'',
      userId: '',
      currentSeed: '',
    };
  },
  firebase: {
    seeds: seedsRef
  }, 
 mounted (currentSeed) {
    const self = this
    var key = self.$route.params.seedId
    var firebaseSeed = seedsRef.child(key).on("value", function(snapshot) {
        self.currentSeed = snapshot.val()
        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        })
    },
  methods: {
    // setActiveSeed(key) {
    //     this.activeSeedKey = (this.activeSeedKey == key) ? '' : key
    // },
    // submitSeed(user){
    
    //     seedsRef.push({Title: this.seedTitle, Description: this.seedDescription, Category: this.seedCategory, UserID: this.user.uid , edit:false})
    //     this.seedTitle =''
    //     this.seedDescription =''
    // },
    // setEditSeed(key){
    //   seedsRef.child(key).update({edit: true})
    // },
    // deleteSeed(key){
    //   seedsRef.child(key).remove();
    // },
    // saveEdit(seed){
    //   const key = seed['.key']
    //   seedsRef.child(key).set({Title: seed.Title, Description: seed.Description , edit: false, dialog: false})
    // },
    // cancelEdit(key){
    //   seedsRef.child(key).update({edit: false, dialog: false})
    // },
    // showSeed (key){
    //     const self = this
    //     var seedId = seedsRef.child(key).key
    //     self.setSeedId(seedId)
    //     console.log(self.setCurrentSeed)
    //     self.$router.push({name: 'seedPage', params: { seedId }})

    // },
    ...mapMutations(['setUser']),
    ...mapMutations(['setSeedId'])
  },
  computed: {
      ...mapState(['user']),
      ...mapState(['seed'])
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

.SeedCard{
    padding: 20px 40px; 
    margin: 20px 20px;
}

</style>
