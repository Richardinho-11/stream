<script setup>
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>


  <nav class="navbar">
    <a href="/film">Film<span></span></a>
    <a href="/serie">Serie<span></span></a>

  </nav>

  <img src="/stream.png" alt="Logo" class="logo" />

  <router-view />
</template>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body, .main {
  min-height: 100vh;;
  color: #fff;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 10px 20px;
  z-index: 1000;
  background: transparent;
}

nav a {
  position: relative;
  font-size: 1.1em;
  font-weight: 500;
  color: #0ef;
  text-decoration: none;
  margin-right: 20px;
  transition: 0.5s;
}

nav a:hover {
  color: #0ef;
}

nav a span {
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #0ef;
  transform: scaleX(0);
  transform-origin: left;
  transition: 0.3s;
}

nav a:hover span {
  transform: scaleX(1);
}

.logo {
  position: fixed;
  top: 0;
  right: 0;
  margin: 10px;
  width: 60px;
  height: auto;
  filter: drop-shadow(0 0 2em #0ef);
  z-index: 1001;
}
</style>