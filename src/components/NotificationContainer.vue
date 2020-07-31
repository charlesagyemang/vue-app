<template lang="html">
  <div class="notification-container">
    <NotificationBar
    v-for="notification in notifications"
    :key="notification.id"
    :notification="notification"
    />
  </div>
</template>

<script>

import NotificationBar from '@/components/NotificationBar'
import { mapState } from 'vuex'

export default {
  components: {
      NotificationBar,
    },

  computed: {
    ...mapState('notification', ['notifications'])
  }
}
</script>

<style lang="css" scoped>
  .notification-container {
    margin: 1em 0 1em;
  }
</style>
