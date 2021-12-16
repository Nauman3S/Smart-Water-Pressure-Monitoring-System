<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green"> </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card> </user-card>
        
      </div>
       <!-- <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-33 md-size-66"
      >
        <md-card>
          <md-card-header data-background-color="teal">
            <h4 class="title">Credits</h4>
            <p class="category">Credits Management</p>
          </md-card-header>
          <md-card-content  >
            
            <h4>{{this.$store.state.rewardToCreds}} Reward Point = ${{rewardToCredit}} Credit</h4>
            <p>Adjustments</p>
            <input type="text" name="username" placeholder="Enter rewards value" v-model="rewVal"  /><br>
            <md-button class="md-raised md-primary" @click="updateRewards()">
                   Update Rewards Value
        </md-button>

        
          </md-card-content>
        </md-card>
        
        
        
      </div> -->
      
    </div>
  </div>
</template>

<script>
const API_URL_RewCredsUpd = "http://bkc-backend.production.wrapdrive.tech/v1/updateAdminRewVal";
const API_URL_R_Creds = "http://bkc-backend.production.wrapdrive.tech/v1/rewardToCred";

import { EditProfileForm, UserCard } from "@/pages";

export default {
  components: {
    EditProfileForm,
    UserCard
  },
    data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      credits: "21",
      rewards: "5",
      rewVal: "",
      rewardToCredit: "1",
       
     
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

  rewUpt(){
     const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ RewardEqCredits: this.rewVal
    })
  };
  fetch(API_URL_RewCredsUpd, requestOptions)
    .then(response => response.json())
    .then(
      this.$store.state.rewardToCreds=this.rewVal
      
    );//data => (this.postId = data.id)


  },
    updateRewards(){
        console.log(this.reqCredits)
        if(this.rewVal!=""){
          if(!isNaN(this.rewVal)){
              this.notifyM("top","right",2,'Reward Value Update','Rewards value updated.')
              this.rewUpt()
          }
          
        }
        else{
            this.notifyM("top","right",4,'Error','Please enter a valid amount.')
        }
    },
    

    
    }
};
</script>
