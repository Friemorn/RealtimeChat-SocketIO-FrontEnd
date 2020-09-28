<template>
  <div>
    <router-view :socket="socket"/>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Main',
  data () {
    return {
      socket: io('http://localhost:4000')
    }
  }
}
</script>

<style scoped>

</style>
