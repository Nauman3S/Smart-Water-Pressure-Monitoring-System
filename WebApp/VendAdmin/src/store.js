
import Vuex from 'vuex'
import Vue from "vue";

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    selectedCheckBoxes: [] ,
    loggedInUser: "",
    loggedInUserRole: "",
    loggedInUserDetails:[],
    rewardToCreds:'1',
    allCredsReqs:[],
    RelayState:"NA",
    PressureValue:"NA",
    EventTime:"0",
    systemStatus:'Normal',
    logsData:[]
  },
  
  getters: {
    // Here we will create a getter
  },
  
  mutations: {
    // Here we will create Jenny
    updateCheckBoxList(state) {
      // For now we allow Jenny just to remove 
      // one TV at a time.
     
    }
  },
  
  actions: {
    // Here we will create Larry
  }
});
