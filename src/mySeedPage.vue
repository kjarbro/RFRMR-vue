<template>
  <div id = 'home'>
    <!-- Submit Seed Card--> 
        <!-- <v-card class="SeedCard">
            <v-card-title primary-title>
            <div>
                <div class="headline">What problem do you want to solve today?</div>
            </div>
            </v-card-title>
            <v-text-field
                v-model="seedTitle"
                label="Name your Seed"
            ></v-text-field>
            <v-text-field
                v-model="seedDescription"
                label="Describe the problem you wish to solve"
            ></v-text-field>
            <v-select
                label="Categories"
                v-model="seedCategory"
                multiple
                autocomplete
                chips
                :items="['Arts & Entertainment', 'Automotive & Vehicle','Beauty & Fitness','Business & Industrial','Computers & Technology','Education and Employment','Food & Drink','Home & Garden','Law & Government','Leisure & Hobbies','News','Science','Shopping','Sports','Sexuality','Philosophy','Travel','Video Games',]"
            ></v-select>
            <v-card-actions>
                <v-btn flat @click="submitSeed()">Plant your Seed</v-btn>
            </v-card-actions>
        </v-card> -->
     <div >
     <v-layout class="grid">
          <!-- Seed Cards -->
            <div v-for="seed in seeds" :key="seed.id" >
            <!-- Seed Card no edit -->
                <div v-if="$store.state.user.uid == seed.UserID">
                    <div v-if="!seed.edit">
                        <v-card >
                            <v-card-title primary-title>
                                <div class="headline">{{seed.Title}}</div>
                            </v-card-title>
                            <br>
                            <v-card-text>
                                <small class = "seedCard"> by: {{seed.UserID}}</small>
                            </v-card-text>
                            
                            <v-card-actions>
                                <v-btn flat @click="showSeed(seed['.key'])">Show</v-btn>
                                <v-btn flat @click="deleteSeed(seed['.key'])">Delete</v-btn>
                                <v-btn flat @click="setEditSeed(seed['.key'])" @click.native.stop="Editdialog=true">Edit</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn icon @click.native="setActiveSeed(seed['.key'])">
                                    <v-icon>{{ activeSeedKey == seed['.key'] ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                                </v-btn>

                            </v-card-actions>
                            <!--<v-slide-y-transition>-->
                            <v-card-text v-if="activeSeedKey == seed['.key']">
                                {{seed.Description}}
                                
                            </v-card-text>
                            <!-- </v-slide-y-transition> -->
                        </v-card>
                    </div> 
                    <!-- Seed Cards Edit-->
                    <div v-else>
                        <v-dialog v-model="Editdialog" persistent max-width="500px">
                            <v-card class="SeedCard">
                                <v-card-title>
                                    <span class="headline">Edit Seed</span>
                                </v-card-title>
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
                </div>
                <div v-else></div>

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
      Editdialog: false,
      seedCategory:'',
      userId: '',
    };
  },
  firebase: {
    seeds: seedsRef
  }, 

  methods: {
    setActiveSeed(key) {
        this.activeSeedKey = (this.activeSeedKey == key) ? '' : key
    },
    // submitSeed(user){
    //     var self = this
    //     var user = self.$store.state.user
    //     if (user){
    //         seedsRef.push({Title: this.seedTitle, Description: this.seedDescription, Category: this.seedCategory, UserID: this.user.uid , edit:false})
    //         this.seedTitle =''
    //         this.seedDescription =''}
    //     else {
    //         //self.signUpDialog = true 
    //         console.log('You need to sign in!')

    //     }
    // },
    setEditSeed(key){
      seedsRef.child(key).update({edit: true})
    },
    deleteSeed(key){
      seedsRef.child(key).remove();
    },
    saveEdit(seed){
      const key = seed['.key']
      seedsRef.child(key).set({Title: seed.Title, Description: seed.Description , edit: false, dialog: false})
    },
    cancelEdit(key){
      seedsRef.child(key).update({edit: false, dialog: false})
    },
    showSeed (key){
        const self = this
        var seedId = seedsRef.child(key).key
        console.log(seedId)
        self.setSeedId(seedId)
        self.$router.push({name: 'seedPage', params: { seedId }})


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

.SeedCard{
    padding: 20px 40px; 
    margin: 20px 20px;
}

.grid {
    display:-ms-grid;
    grid-column-start: 10px;
    grid-template-columns: repeat(3, 3fr);
    grid-gap: 20px;
    grid-auto-rows: minmax(100px, auto);
}

</style>
