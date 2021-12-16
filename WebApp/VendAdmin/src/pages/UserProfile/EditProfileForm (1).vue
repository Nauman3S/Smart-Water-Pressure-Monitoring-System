<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Edit Profile</h4>
        <p class="category">Complete your profile</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>User Name</label>
              <md-input v-model="username" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="emailadress" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>First Name</label>
              <md-input v-model="firstname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="lastname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Password</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>
          </div>
          
          <div class="md-layout-item md-size-100 text-right">
            <!-- <md-button class="md-raised md-success" @click="UpdateUser">Update Profile</md-button> -->
            <!-- <button  @click="UpdateUser">Update Profile</button> -->
            <md-button class="md-raised md-primary" @click="UpdateUser()">
                   Update
        </md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
const API_URL = "http://bkc-backend.production.wrapdrive.tech/v1/updateAdmin";

export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
       type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      username: null,
      company: null,
      emailadress: '0',
      lastname: null,
      firstname: null,
      password: null,
      
      aboutme:
        "Nothing special"
    };
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
  UpdateUser(){
    console.log('updating')
    const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ FName: this.firstname, LName:this.lastname,Email:this.emailadress,Password:this.password   
    })
  };
  fetch(API_URL, requestOptions)
    .then(response => response.json())
    .then(
      this.$store.state.loggedInUserDetails['FName']=this.firstname,
      this.$store.state.loggedInUserDetails['LName']=this.lastname,
      this.$store.state.loggedInUserDetails['Email']=this.emailadress,
      this.$store.state.loggedInUserDetails['Password']=this.password,
      this.notifyM("top","right",2,'Updated','Updated the user profile succesfully.')
    );//data => (this.postId = data.id)

  },
  },
mounted(){

  this.username=this.$store.state.loggedInUserDetails['FName']+this.$store.state.loggedInUserDetails['LName']
  this.emailadress=this.$store.state.loggedInUserDetails['Email']
  this.firstname=this.$store.state.loggedInUserDetails['FName']
  this.lastname=this.$store.state.loggedInUserDetails['LName']
  this.password=this.$store.state.loggedInUserDetails['Password']
    // fetch(API_URL)
    //    fetch(API_URL)
    //   .then(response => response.json())
    //   .then(result => {
        
    //     this.username =''+ result['data'][0].username,
    //     this.emailadress = result['data'][0].email
    //     this.company = result['data'][0].company
    //     this.lastname=result['data'][0].lastname
    //     this.firstname=result['data'][0].firstname
    //     this.address=result['data'][0].address
    //     this.city=result['data'][0].city
    //     this.country=result['data'][0].country
    //     this.aboutme=result['data'][0].aboutme
    //     this.code=result['data'][0].postalcode

    //     //JSON.parse(result['data'])

    //   });
  },
  
};
</script>
<style></style>
