      <k-button
        icon="dots"
        @click.stop="$refs.more.toggle()"
      />

<script>
// Note: this import needs some symlinks... see readme.
// Directions for extending a core component without importing it : https://github.com/rasteiner/oh-hi-mark/blob/main/src/index.js
// import Tabs from "@KirbyPanel/components/Layout/Tabs.vue";
// import KirbyContentHackModule from "~/mixins/kirbyContentHackModule.js";

export default {
  extends: 'k-tabs',
  inheritAttrs: false,
  //components: {},

  // Blueprint values
  props: {
    value: String, // Important: Needed for parent's value to be available in here, and to listen to it
  },

  beforeCreate: function(){
    // So we can create a computed tab() to trick KTabs, without throwing warnings about replacing a prop.
    //window.panel.$vue.$delete(this.$options.props, 'tab'); // K3 only !!!
  },

  // Useful : https://github.com/getkirby/ideas/issues/219#issuecomment-491178900
  created: function(){
    // set initial tab from memory
    let valueFromStorage = this.getTabFromLocalStorage();
    if(valueFromStorage){ 
      // Fallback to first tab
      let curTab = this.tabs.find((tab) => tab.name === valueFromStorage) ?? this.tabs[0];
      //curTab = curTab?.name;
      if(curTab) this.$emit('input', curTab?.name);
    }

    return;
  },

  watch: {
    // Any time the value changes, cancel the changes object that probably got populated
    'value'(){
      this.writeTabToLocalStorage(this.value); // Save tab for when page reloads
      this.$set(this.$props, 'tab', this.value); // Modify the tab prop
      this.cancelChanges(); // Ignore value change
    },
  },

  computed: {

    // Try to override the prop ? (checkme: Has no effect !?)
    saveable(){
      return false;
    },

    // Changed : inject click method (works on hidden tabs too !)
    // (This version uses less copied code than `methods.button()` below)
    buttons() {
      let btns = this.visible.map(this.button);
      let self = this;
      return btns.map(function(btn){btn.click=function(e){self.btnClick(btn.name,e);}; return btn;});
    },
  },

  methods: {
    // Changed : inject click method (works on hidden tabs too !)
    // Works but I found a better method.
    // button(tab) {
    //   let self = this; // Added line !
    //   const button = {
    //     ...tab,
    //     current: tab.name === this.current,
    //     title: tab.label,
    //     text: tab.label ?? tab.text ?? tab.name,
    //     click(e){self.btnClick(tab.name,e);}, // Added line !
    //   };

    //   if (tab.badge) {
    //     button.badge = {
    //       theme: this.theme,
    //       text: tab.badge
    //     };
    //   } else {
    //     delete button.badge;
    //   }

    //   return button;
    // },
    
    // Trick notification system by overwriting the original value with the new value
    cancelChanges(){
      if(!this.$attrs.name || this.$attrs.name=='') return; // ignore when name isn't set

      // If it breaks: See kirby/panel/src/panel/content.js @ change()
      panel.view.props.originals[this.$attrs.name]=panel.view.props.content[this.$attrs.name]; // K5, way simpler ! :)
    },
    getTabFromLocalStorage(){
      try {
        return window.localStorage.getItem(`tabsfield-${this.$attrs.name}`);
      } catch (error) {

      }
      return null;
    },
    writeTabToLocalStorage(tabName){
      if(!this.$attrs.name || this.$attrs.name=='' || tabName == undefined || tabName == null) return false; // ignore when name isn't set
      try {
        window.localStorage.setItem(`tabsfield-${this.$attrs.name}`, tabName);
        return true;
      } catch (error) {

      }
      return false;
    },
    btnClick(newTab, $event){
      // this.current = newTab;
      this.$emit('input', newTab); // Changes value, which is then triggered by our listener.
      // this.cancelChanges();// <-- useless here... $emit is delayed. So listen for the change to happen
    },
  },
}

</script>

<style lang="less">

</style>
