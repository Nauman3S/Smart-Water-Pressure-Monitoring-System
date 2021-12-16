<template>
  <div>
    
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label=""><input type="checkbox" :id="item.ID" :value="item.Email" v-model="selectedReqs"></md-table-cell>
        <md-table-cell md-label="ID">{{ item.ID }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.Email }}</md-table-cell>
        <md-table-cell md-label="Credits Requested">{{ item.CreditsRequest }}</md-table-cell>
        
        <!-- <md-table-cell md-label="Total Money OUT 30 Days">{{ item.TMOUT30 }}</md-table-cell>
        <md-table-cell md-label="Total Money IN Daily">{{ item.TMIND }}</md-table-cell>
        <md-table-cell md-label="Total Money OUT Daily">{{ item.TMOUTD }}</md-table-cell> -->
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
const API_URL_CredsReqs = "http://bkc-backend.production.wrapdrive.tech/v1/allCredReqs";
//import selected from '@/assets/js/helper.js'
export default {
  name: "FilesList",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selectedReqs: [],
      allData:'this.$store.state.filesData',
      users: [
       
      ]
    };
  },
methods:{

getData(){

  

  
// this.allData=this.$store.state.filesData
// this.users=this.allData;
  this.users=this.$store.state.allCredsReqs;
this.$store.state.selectedCheckBoxes=this.selectedReqs;
//console.log(this.$store.state.selectedCheckBoxes)

  },
},

  mounted(){
    //this.getData()
    
    this.$nextTick(function () {
            window.setInterval(() => {
                this.getData();
                // this.allData=this.$store.state.filesData
                // this.users=this.allData;
            },200);
        })
    //this.getData()
  }
};
</script>
