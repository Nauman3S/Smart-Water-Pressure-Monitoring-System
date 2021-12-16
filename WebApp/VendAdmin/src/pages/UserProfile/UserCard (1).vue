<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">SmartWaterPressureMonitor Admin</h6>
      <h4 class="card-title">{{this.$store.state.loggedInUserDetails['FName']}} {{this.$store.state.loggedInUserDetails['LName']}}</h4>
      <p class="card-description">
        {{aboutme}}
      </p>
      <md-button class="md-round md-success">Follow</md-button>
    </md-card-content>
  </md-card>
</template>
<script>
const API_URL = "http://10.7.77.1:3000/v1/getUser";
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/vue-logo.png")
    }
  },
  data() {
    return {
      aboutme:null,
      firstname:null,
      lastname:null
    };
  },
  mounted(){
    fetch(API_URL)
       fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        
        this.lastname=result['data'][0].lastname
        this.firstname=result['data'][0].firstname
        this.aboutme=result['data'][0].aboutme
        

        //JSON.parse(result['data'])

      });
  },
  
};
</script>
<style></style>
