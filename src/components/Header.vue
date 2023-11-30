<!-- src/components/Header.vue -->
<template>
  <header  class="bg-sky-900 ">
    <nav class="flex justify-between border-b-solid border-b-2 border-white-500 text-xl py-5" >
      <div>
          <a href="">turkishairlines</a>
      </div>
      <div class="text-white">
          searchFlightChallange
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
header {

padding: 10px;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
}

nav li {
  margin-right: 20px;
}

nav a {
  color: white;
  text-decoration: none;
}
</style>
