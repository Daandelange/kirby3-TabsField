<template>
  <!-- Note: most of the template is copy/pasted from KTabs. Changes: Add click method on tabs -->
  <div
    v-if="tabs && tabs.length > 1"
    :data-theme="theme"
    class="k-tabs k-tabs-field"
  >
    <nav>
      <k-button
        v-for="tabButton in visibleTabs"
        :key="tabButton.name"
        :link="tabButton.link"
        :current="current === tabButton.name"
        :icon="tabButton.icon"
        :tooltip="tabButton.label"
        class="k-tab-button"
        @click.stop="btnClick(tabButton.name, $event)"
      >
        {{ tabButton.label || tabButton.text || tabButton.name }}

        <span
          v-if="tabButton.badge"
          class="k-tabs-badge"
        >
          {{ tabButton.badge }}
        </span>
      </k-button>

      <k-button
        v-if="invisibleTabs.length"
        :text="$t('more')"
        class="k-tab-button k-tabs-dropdown-button"
        icon="dots"
        @click.stop="$refs.more.toggle()"
      />
    </nav>

    <k-dropdown-content
      v-if="invisibleTabs.length"
      ref="more"
      align="right"
      class="k-tabs-dropdown"
    >
      <k-dropdown-item
        v-for="tabButton in invisibleTabs"
        :key="'more-' + tabButton.name"
        :link="tabButton.link"
        :current="tab === tabButton.name"
        :icon="tabButton.icon"
        :tooltip="tabButton.label"
      >
        {{ tabButton.label || tabButton.text || tabButton.name }}
      </k-dropdown-item>
    </k-dropdown-content>
  </div>
</template>

<script>
// Note: this import needs some symlinks... see readme.
// Directions for extending a core component without importing it : https://github.com/rasteiner/oh-hi-mark/blob/main/src/index.js
import Tabs from "@KirbyPanel/components/Layout/Tabs.vue";
import KirbyContentHackModule from "@/mixins/kirbyContentHackModule.js";

export default {
  inheritAttrs: false,
  //components: {},
  mixins: [
    Tabs, // Inherit k-tabs functionalities. Template logic is over-ridden to bind buttons. Var tabs is replaced by tabsData
    //'k-tabs', // Todo: use this alternative without re-importing the whole component ?
  ],
  data() {
    return {
      currentTab: '', // Important : this must be in data not to trigger many mutations in vue, and allow changing it from more scopes.
    };
  },

  // Blueprint values
  props: {
    value: String, // Important: Needed for parent's value to be available in here, and to listen to it
  },

  beforeCreate: function(){
    // So we can create a computed tab() to trick KTabs, without throwing warnings about replacing a prop.
    window.panel.$vue.$delete(this.$options.props, 'tab');
  },

  // Useful : https://github.com/getkirby/ideas/issues/219#issuecomment-491178900
  created: function(){
    this.currentTab = this.getTabFromLocalStorage();

    //if(!this.$store.hasModule("content")){ // Error: content module always exists as we replace it.
    if(!window.panel.app.$store._mutations['content/IGNORECHANGES']){
      this.$store.registerModule("content", KirbyContentHackModule, { preserveState: true } ); // <-- works fine, but replaces content module ?

      // This way would be better, but I could not get access to the root content module state...
      //this.$store.registerModule(["content","ignorechanges"], KirbyContentHackModule, { preserveState: true } );
    }
    this.$emit('input', this.tab); // Sets the right value so when: conditions work.
    this.cancelChanges();

    return;
  },

  watch: {
    // Any time the value changes, cancel the changes object that probably got populated
    'value'(){
      this.writeTabToLocalStorage(this.value); // Save tab for when page reloads
      this.cancelChanges();
    },
  },

  computed: {
    // Returns the current tab key from URL, prior to using when conditions (from an older version)
    // tabsKey() {
    //   // K3.5 (has version in $store globally)
    //   if(this.$store.state && this.$store.state.system && this.$store.state.system.info && this.$store.state.system.info.version && parseInt(this.$store.state.system.info.version.at(0) + this.$store.state.system.info.version.at(2)) < 36 ){
    //     this.tab = this.$route.hash.replace('#', '');
    //   }
    //   // K3.6 (needs API query = system.info.version, or assume its 3.6+)
    //   else {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const myParam = urlParams.get('tab-'+this.$attrs.name);
    //     if(myParam) this.tab=myParam;
    //   }
    //   if(!this.tab || this.tab=='') this.tab = '';//this.tabsData?this.tabsData[0].name:'';//'simplestats-tabs-visitedpages';
    //   return this.tab;
    // },

    // Thicks the parent to use another ref to the current tab
    tab() {
      return this.currentTab;//??this.getTabFromLocalStorage();
    },
  },

  methods: {
    cancelChanges(){
      this.$store.dispatch('content/ignorechanges', this.$attrs.name); // Removes initial changed flag
    },
    getTabFromLocalStorage(){
      try {
        return window.localStorage.getItem(`tabsfield-${this.$attrs.name}`);
      } catch (error) {
        
      }
      return null;
    },
    writeTabToLocalStorage(tabName){
      if(!this.$attrs.name || this.$attrs.name=='') return false; // ignore when name isn't set
      try {
        window.localStorage.setItem(`tabsfield-${this.$attrs.name}`, tabName);
        return true;
      } catch (error) {
        
      }
      return false;
    },
    btnClick(newTab, $event){
      
      this.currentTab = newTab;
      this.$emit('input', newTab); // Changes value, which is then triggered by our listener.
      // this.cancelChanges();// <-- useless here... $emit is delayed. So listen for the change to happen

      // Some lines that didn't work well
      //this.$store.getters['content/model'](this.name).originals.sidebarview=(newTab); // Vue doesnt like this, warns, but it works to fool the changes indicator until next vue tick/render
      //this.$store.commit('UPDATE', 'content/originals', this.name, newTab);
    },
  },
}

</script>

<style lang="less">

.k-tabs.k-tabs-field {
  margin-bottom: -1rem; // Makes the content closer to the tabs
}

</style>
