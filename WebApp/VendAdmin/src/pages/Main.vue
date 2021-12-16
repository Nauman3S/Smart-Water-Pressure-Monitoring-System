<template>
  <div class="content">
     <img :src="imgFile" width="50%" height="auto"/><br><br>
    <div class="md-layout">

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
      <!-- <input type="text" name="username" placeholder="Email Address" v-model="emailAd"  /><br><br>
      <input type="password" name="password" placeholder="Password" /> -->
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="emailAd" type="text"></md-input>
            </md-field>
      </div>
      
      <div class="md-layout-item md-small-size-100 md-size-80">
            <md-field>
              <label>Password</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>
      </div>
      </div>
<div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
     <md-button
                    class="md-primary"
                    @click="logIn()"
                    >Login</md-button><br><br>
      
      <!-- <a href="http://bkc-frontend.production.wrapdrive.tech">Login as a user</a> -->
  </div>
    </div>
  </div>
</template>

<script>
const API_URL = "http://10.7.77.1:3000/v1/loginAdmin";


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
      emailAd: "",
      password: "",
       
     
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
    logIn(){
      console.log('login');
      //this.$sidebar.displaySidebar(false);

      const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email:this.emailAd,password:this.password})
  };
  fetch(API_URL, requestOptions)
    .then(response => response.json())
    .then(result=>{
       console.log(result.data)
      // console.log(result.data[0])
      // console.log(result.data[0]['Credits'])
      this.$store.state.loggedInUserDetails=result.data[0]
      console.log(this.$store.state.loggedInUserDetails)
      
      if(result.data.length==0){

        this.notifyM("top","right",4,'Error','Error while logging-in.')
      }
      else{

        
        this.notifyM("top","right",2,'Login','Login successful.')
          this.$store.state.loggedInUser=this.emailAd;
          this.$router.push({ path: 'dashboard'})

      }
    });//data => (this.postId = data.id)
    
    
    // this.notifyM("top","right",2,'Registraion','Registraion successful.')
    // this.$router.push({ path: 'main'})

    //   this.$store.state.loggedInUser=this.emailAd;
    //   console.log(this.$store.state.loggedInUser)
    //   this.$router.push({ path: 'dashboard'})

      
    },
getData(){
fetch(API_URL)
       fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        
        this.EventTime ='Last Updated '+ result['data'][0].EventTime,
        this.RelayState = result['data'][0].RelayState
        this.PressureValue = result['data'][0].PressureValue
        // this.TMIN30=result['data'][0].TMIN30
        // this.TMOUT30=result['data'][0].TMOUT30
        //JSON.parse(result['data'])

      });
  },
},
  mounted(){
  //  / this.getData()
  }
};
</script>
