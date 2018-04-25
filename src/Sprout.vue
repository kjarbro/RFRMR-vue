<template>
  <div>
    <v-toolbar color="teal" dark tabs>
      <v-toolbar-title>{{sproutName}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs
        color="teal"
        slot="extension"
        v-model="tab"
        grow
      >
        <v-tabs-slider color="green" ></v-tabs-slider>
        <v-tab  v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat>
          <v-card-text v-for="item in text" :key="item">{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          'to do', 'chat', 'files'
        ],
        text: ['Lorem iabore et dolore ion ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'ndjsk', 'test3'],
        sproutName: 'Test'
      }
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
    display: grid;
    grid-column-start: 10px;
    grid-template-columns: repeat(3, 3fr);
    grid-gap: 20px;
    grid-auto-rows: minmax(100px, auto);
}

</style>
