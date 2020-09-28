<template>
  <div class="box-menu">
    <div class="set-list" @click="$emit('launch-profile')">
      <img src="../../assets/settings.png" alt="">
    </div>
    <div class="set-list">
      <img src="../../assets/contacts.png" alt="">
    </div>
    <div class="set-list">
      <img src="../../assets/calls.png" alt="">
    </div>
    <div class="set-list">
      <img src="../../assets/save messages.png" alt="">
    </div>
    <div class="set-list">
      <img src="../../assets/invite friends.png" alt="">
    </div>
    <div class="set-list">
      <img src="../../assets/telegram faq.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: ['launch-profile']
}
</script>

<style scoped>
.box-menu {
  height: 360px;
  width: 250px;
  padding: 30px;
  border-radius: 35px 10px 35px 35px;
  background-color: #7E98DF;
  position: absolute;
}
.set-list {
  margin-bottom: 30px;
}
</style>
