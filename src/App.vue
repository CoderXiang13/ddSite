<template>
  <div id="app">
    <header-com/>
    <router-view/>
    <footer-com/>
  </div>
</template>

<script>
  import headerCom from './components/common/header-com'
  import footerCom from './components/common/footer-com'
export default {
  name: 'App',
  components: {
    headerCom,
    footerCom
  },
  created() {
    // localStorage.clear();
    if (localStorage.getItem('infos') == undefined) {
      localStorage.setItem("infos", JSON.stringify({users: [],nowLogin: '现在所登录的'}));
      // console.log(localStorage.getItem(infos));
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
  #app{
    overflow: hidden;
  }
</style>
