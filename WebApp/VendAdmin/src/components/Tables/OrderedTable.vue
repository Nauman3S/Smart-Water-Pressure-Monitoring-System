<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.ID }}</md-table-cell>
        <md-table-cell md-label="Event Time">{{ item.EventTime }}</md-table-cell>
        <md-table-cell md-label="Pressure Value">{{ item.PressureValue }}</md-table-cell>
        
        <md-table-cell md-label="Relay State">{{ item.RelayState }}</md-table-cell>
        <!-- <md-table-cell md-label="Total Vends">{{ item.TotalVends }}</md-table-cell> -->
        
        
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
//const API_URL_LedgerLog = //"htt0p://swpm-backend.production.wrapdrive.tech/v1/getLogs";
const API_URL_LedgerLog = "http://10.7.77.1:3000/v1/getLogs";
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      allData:[],
      users: [
        {
          id: 1,
          name: "D1akota Rice",
          salary: "$36,738",
          country: "Niger",
          city: "Oud-Turnhout"
        },
        {
          id: 2,
          name: "Minerva Hooper",
          salary: "$23,738",
          country: "Curaçao",
          city: "Sinaai-Waas"
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          salary: "$56,142",
          country: "Netherlands",
          city: "Overland Park"
        },
        {
          id: 4,
          name: "Philip Chaney",
          salary: "$38,735",
          country: "Korea, South",
          city: "Gloucester"
        }
      ]
    };
  },

  
methods:{
getData(){
const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: ''
  };
  fetch(API_URL_LedgerLog, requestOptions)
    .then(response => response.json())
    .then(result => {
        
        // console.log(result.data)
        this.allData = result['data']

        this.users=this.allData
        this.$store.state.logsData=this.users;
       
        });
  },
},
  mounted(){
    this.$nextTick(function () {
            window.setInterval(() => {
                this.getData();
            },2000);
        })
    // this.getData()
  }
};
</script>
