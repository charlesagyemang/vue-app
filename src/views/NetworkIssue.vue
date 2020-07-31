<template lang="html">
  <div class="">
    <h1>Uh-Oh!</h1>
    <h3>It looks like youre experiencing some network issues, please click back button try again</h3>
    <router-link :to="{ name: 'event-list', params: {} }">or go back to the home page</router-link>
  </div>

</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
