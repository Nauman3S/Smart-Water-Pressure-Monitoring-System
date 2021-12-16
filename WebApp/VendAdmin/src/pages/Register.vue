<template>
  <div class="content">
     <img :src="imgFile" width="50%" height="auto"/><br><br>
    <div class="md-layout">

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>First Name</label>
              <md-input v-model="fname" type="text"></md-input>
            </md-field>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="lname" type="text"></md-input>
            </md-field>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="emailAd" type="text"></md-input>
            </md-field>
      </div>
      
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Password</label>
              <md-input v-model="password1" type="password"></md-input>
            </md-field>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Retype Password</label>
              <md-input v-model="password2" type="password"></md-input>
            </md-field>
      </div>
          
      </div>
<div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
     <md-button
                    class="md-primary"
                    @click="signUp()"
                    >Signup</md-button><br><br>
      
      <router-link to="/main">Already a user? Login Now!</router-link>
  </div>
    </div>
  </div>
</template>

<script>
const API_URL = "http://bkc-backend.production.wrapdrive.tech/v1/registerUser";


export default {
  components: {
    
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      imgFile: require("@/assets/img/swpm.png"),
      password1: "",
      password2: "",
      fname:"",
      lname:"",
      emailAd:"",
       
     
      }
    
  },
  methods:{
    notifyM(verticalAlign, horizontalAlign,clr,title,msg) {
      var color = clr;//Math.floor(Math.random() * 4 + 1);
      this.$notify({
        message:
          "<b>"+title+"</b><br>"+msg,
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color]
      });
    },
    signUp(){
      if(this.password1==this.password2){
        console.log('updating')
    const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ FName: this.fname, LName:this.lname,Email:this.emailAd,Password:this.password1})
  };
  fetch(API_URL, requestOptions)
    .then(response => response.json())
    .then();//data => (this.postId = data.id)
    this.notifyM("top","right",2,'Registraion','Registraion successful.')
    this.$router.push({ path: 'main'})
    }
      else{
        this.notifyM("top","right",4,'Error','Passwords didn\'t match.')
      }
      
      
    },
getData(){
fetch(API_URL)
       fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        
        this.Timestamp ='Last Updated '+ result['data'][0].Timestamp,
        this.PlayerID = result['data'][0].PlayerID
        this.TMIN30=result['data'][0].TMIN30
        this.TMOUT30=result['data'][0].TMOUT30
        //JSON.parse(result['data'])

      });
  },
},
  mounted(){
  //  / this.getData()
  }
};
</script>
