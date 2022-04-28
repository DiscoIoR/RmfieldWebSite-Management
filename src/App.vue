<template>
    <router-view/>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
html{
  height: 100%;
  margin: 0;
  padding: 0;
}
body{
  background-color: rgba(0,16,28);
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: hidden;
}
body::-webkit-scrollbar{
  display: none;
}
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
