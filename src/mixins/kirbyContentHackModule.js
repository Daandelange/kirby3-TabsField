
export default {

  // Needed if replacing original content module
  // Not needed if registering as content/ignorecontent
  // Useful : https://vuex.vuejs.org/guide/modules.html#namespacing
  namespaced: true, // Allow sharing global namespace ("content") 

  //// Tryed to extend the parent state here... didn't succeed. Alternative = replace the content module when registering.
  //state: (state) => ({ window.panel.app.$store.state }),// inherit state !
  //state: mapState([]),
  //state: () => ({ ... }),// inherit state !
  // state: function(state){
  //   console.log("INNERSTATE==", state, this);
  //   // From : https://github.com/laravel-mix/laravel-mix/issues/76#issuecomment-394292908
  //   // { ...myObj, a : 1 } is equal to Object.assign( { a : 1 }, myObj )
  //   return this?this.state:[];//mapState([]);
  // },// inherit state !
  //components: {
  //  mapState
  //},

  mutations: { // --> commit()
    IGNORECHANGES(state, fieldName) {

      if(state && state.models[state.current] && state.models[state.current].changes[fieldName]){
        // Sync values so changes indicator doesn't come back on refresh
        state.models[state.current].originals[fieldName] = state.models[state.current].changes[fieldName];

        // Rm changes key
        //window.panel.$vue.$set(state.models[state.current], "changes", {}); // resets ALL changes...
        window.panel.$vue.$delete(state.models[state.current].changes, fieldName);
      }
      else console.warn('TabsField could not cancel the changes of switching tab, please enjoy the changes notification.');
    }
  },
  actions: { // --> dispatch()
    ignorechanges({ commit }, fieldName){
      commit('IGNORECHANGES', fieldName);
      //commit('content/IGNORECHANGES', fieldName, { root: true }); // Alternative method of commiting to root ?
    },
  },
};
