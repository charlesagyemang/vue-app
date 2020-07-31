<template lang="html">

  <div class="">
    <h1>Even List</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event"/>
  </div>

</template>

<script>

import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'

export default {

  components: {

    EventCard

  },

  data () {
    return {
      events: []
    }
  },

  created() {
    EventService.getEvents()
    .then((response) => {
      this.events = response.data
      console.log(this.events);
    }).catch(error => {
      console.log(error.response);
    })
  }

}
</script>

<style lang="css" scoped>
</style>
