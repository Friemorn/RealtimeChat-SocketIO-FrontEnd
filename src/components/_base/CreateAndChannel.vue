<template>
  <div>
    <div class="create-channel">
      <div class="new-group" @click="$emit('launch-room')">
        <img id="new-group" src="../../assets/new group.png" alt="">
      </div>
      <div class="secret-chat">
        <img id="secret-chat" src="../../assets/secret chat.png" alt="">
      </div>
      <div class="new-channel" @click="$emit('launch-channel')">
        <img id="new-channel" src="../../assets/new channel.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateAndChannel',
  props: ['launch-room', 'launch-channel']
}
</script>

<style scoped>
.create-channel {
  height: 50px;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  background-color: #7E98DF;
}
.new-group, .secret-chat, .new-channel {
  margin: 15px 20px;
}
</style>
