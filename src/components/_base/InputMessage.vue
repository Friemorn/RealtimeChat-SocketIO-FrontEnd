<template>
  <div class="input-message">
    <input class="txt" type="text" ref="inputMessage" v-model="textMessage" @keyup.enter="sendMessage" placeholder="Type your message ..." aria-label="Message">
    <div class="pei">
      <div class="pls">
      <img src="../../assets/Plus.png" alt="plus">
      </div>
      <div class="emj">
        <img src="../../assets/emoji.png" alt="emoji">
      </div>
      <div class="img">
        <img src="../../assets/image.png" alt="image">
      </div>
      <div class="snd">
        <img src="../../assets/send.png" alt="send" @click="sendMessage">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'InputMessage',
  data () {
    return {
      textMessage: ''
    }
  },
  methods: {
    sendMessage () {
      this.$emit('send-message', { msg: this.textMessage, dom: this.$refs.inputMessage })
    }
  },
  computed: {
    ...mapGetters(['getUsers'])
  }
}
</script>

<style scoped>
.input-message {
  margin: 20px;
  border-radius: 15px;
  background-color: #FAFAFA;
  display: flex;
  flex-direction: row;
  border: 1px solid #e7e7e7;
}
.txt {
  width: 80%;
}
.pei {
  margin-top: 12px;
  background-color: #FAFAFA;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.pei img {
  height: 25px;
  width: 25px;
  margin: 0 10px;
}
input {
  height: 50px;
  width: 100%;
  font-size: 15px;
  margin-left: 20px;
  background-color: #FAFAFA;
  border-top-style: hidden;
  border-right-style: hidden;
  border-bottom-style: hidden;
  border-left-style: hidden;
}
.txt:focus {
  outline: none;
}
</style>
