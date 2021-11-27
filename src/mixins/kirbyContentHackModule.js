// Useful : https://vuex.vuejs.org/guide/modules.html#namespacing
//import Vue from "vue";
//import Vue from "vue";
//import {mapGetters} from 'vue';
//import mapState from "vuex";
//import Vuex from 'vuex';
//Vue.use(Vuex);

export default {

  // Needed if replacing original content module
  // Not needed if registering as content/ignorecontent
  namespaced: true, // Allow sharing a namespace ("content") 
  //state: [],
  //state: (state) => ({ window.panel.app.$store.state }),// inherit state !
  //state: ...mapState({a: state => state}),
  //state: mapState([]),
  //state: this.state,
  // state: function(state){
  //   console.log("INNERSTATE==", state, this);
  //   //Vue.component(name);
  //   // From : https://github.com/laravel-mix/laravel-mix/issues/76#issuecomment-394292908
  //   // { ...myObj, a : 1 } is equal to Object.assign( { a : 1 }, myObj )
  //   return this?this.state:[];//mapState([]);
  // },// inherit state !
  components: {
    //MyVue,
    //mapState
  },
/*
  state: () => ({ ... }),// inherit state !
  actions: { // --> dispatch()
    ..., // inherit !
    notabchanges(state) {
      console.log('Hello from inside injected module actions code !');
    },
  },
  getters: { ... },
  mutations: { // --> commit()
    ..., // inherit !
    NOTABCHANGES(state) {
      console.log('Hello from inside injected module mutation code !');
    }
  },
*/
  mutations: { // --> commit()
    IGNORECHANGES(state, fieldName) {
      // Note: this hols a store object
      console.log('Hello from inside injected module mutation code !', state, this, fieldName);//state[$parent.$store.getters['content/id']($parent.$attrs.endpoints.model)]);
      //window.panel.$vue.$set( this.$store.getters['content/model'](this.$store.getters['content/id'](this.$attrs.endpoints.model)).originals, this.name, this.value);
      //window.panel.$vue.$set( state(this.$store.getters['content/id'](this.$attrs.endpoints.model)).originals, this.name, this.value);
      if(state && state.models[state.current] && state.models[state.current].changes[fieldName]){
        console.log('Erasing changes !', state.models[state.current]);
        //state.current
        // Sync values so changes indicator doesn't come back on refresh
        state.models[state.current].originals[fieldName] = state.models[state.current].changes[fieldName];

        // Rm changes key
        //window.panel.$vue.$set(state.models[state.current], "changes", {}); // resets all changes...
        window.panel.$vue.$delete(state.models[state.current].changes, fieldName);
      }
      else console.log('NO STATE !', state);
    }
  },
  actions: { // --> dispatch()
    //..., // inherit !
    ignorechanges({ commit }, fieldName){
      console.log('Hello from inside injected module actions code ! = ', fieldName);
      commit('IGNORECHANGES', fieldName);
      //commit('content/IGNORECHANGES', fieldName, { root: true });
    },
  },
};
