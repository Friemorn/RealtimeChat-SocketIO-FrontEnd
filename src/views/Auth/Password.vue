<template>
  <div>
    <form>
      <div class="header">
        <router-link class="login" to="/login">
          <div class="back">
            <img src="../../assets/back.png" alt="back">
          </div>
        </router-link>
        <div class="password-title">Forgot Password</div>
      </div>
      <div class="password-greeting">You'll get messages soon on your e-mail</div>
      <div class="form-group">
        <div><label for="InputEmail">Email</label></div>
        <div><input type="email" class="input" id="InputEmail" v-model="email" placeholder="Enter Email"></div>
      </div>
      <button type="submit" class="btn-primary" @click="handleLogin">Send</button>
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Password',
  data () {
    return {
      socket: io('http://localhost:4000'),
      username: '',
      email: '',
      password: '',
      state: false
    }
  },
  methods: {
    togglePassword () {
      if (this.state) {
        document.getElementById('InputPassword').setAttribute('type', 'password')
        document.getElementById('eye').style.color = '#232323'
        this.state = false
      } else {
        document.getElementById('InputPassword').setAttribute('type', 'text')
        document.getElementById('eye').style.color = '#7E98DF'
        this.state = true
      }
    },
    handleLogin () {
      const userId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)

      this.$router.push({ name: 'Chat', params: { userId: userId, email: this.email } })
    }
  }
}
</script>

<style scoped>
form {
  width: 500px;
  height: 720px;
  margin: 40px auto;
  padding: 20px 70px;
  box-sizing: border-box;
  background: #FFFFFF;
  border-radius: 30px;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border: 1px solid black;
}
.header {
  display: flex;
  flex-direction: row;
  margin: 30px 0;
}
.back {
  flex: 1;
}
.password-title {
  flex: 1;
  font-size: 22px;
  color: #7E98DF;
  text-align: center;
}
.password-greeting {
  font-size: 14px;
  margin-bottom: 40px;
}
.form-group {
  height: 80px;
  margin: 20px 0;
}
label {
  font-size: 14px;
  color: #848484;
}
input {
  height: 40px;
  width: 100%;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
}
.input:focus {
  outline: none;
}
.eye {
    position: absolute;
    cursor: pointer;
    margin: -30px 0 0 330px;
}
.fa {
    font-size: 20px;
    color: #232323;
}
.btn-primary {
  height: 50px;
  width: 100%;
  margin-bottom: 40px;
  font-size: 16px;
  color: white;
  outline: none;
  border: none;
  background-color: #7E98DF;
  border-radius: 25px;
}
</style>
