<template>
  <div id="app">
      <router-view ></router-view>
    </div>
</template>

<script>
export default {

  data() {
    return {
      name: 'app',
    }
  },
  methods: {

    },
  created: function(newPath) {
  }
}
</script>

<style>
  * {
    -webkit-user-select:text;
    margin: 0;
    padding: 0;
  }
  #app {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-y: hidden;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
  }
</style>
