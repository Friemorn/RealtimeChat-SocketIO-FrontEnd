<template>
  <div>
    <form>
      <div class="header">
        <router-link class="login" to="/login">
          <div class="back">
            <img src="../../assets/back.png" alt="back">
          </div>
        </router-link>
        <div class="register-title">Register</div>
      </div>
      <div class="register-greeting">Let's create your account!</div>
      <div class="form-group">
        <div><label for="InputUsername">Username</label></div>
        <div><input type="text" class="input" id="InputUsername" v-model="username" placeholder="Your Username"></div>
      </div>
      <div class="form-group">
        <div><label for="InputEmail">Email</label></div>
        <div><input type="email" class="input" id="InputEmail" v-model="email" placeholder="Enter Email"></div>
      </div>
      <div class="form-group">
        <div><label for="InputPassword">Password</label></div>
        <div><input type="password" class="input" id="InputPassword" v-model="password" placeholder="Enter Password"></div>
        <span class="eye">
          <i class="fa fa-eye" id="eye" @click="togglePassword"></i>
        </span>
      </div>
      <button type="submit" class="btn-primary" @click="addUser">Register</button>
      <img id="register-with" src="../../assets/register with.png" alt="register-with">
      <div class="btn-secondary">
        <div class="logo-google">
          <img src="../../assets/google.png" alt="google">
        </div>
        <div class="btn-google">
          Google
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
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
    addUser () {
      axios.post(`${process.env.VUE_APP_BASE_URL}/user/register`, {
        username: this.username,
        email: this.email,
        password: this.password
      })
        .then((res) => {
          this.$swal('Register Success', 'User Added Successfully', 'success')
          this.$router.push('/login')
        })
        .catch((res) => {
          this.$swal('Warning!', 'User Already Registered', 'warning')
        })
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
.register-title {
  flex: 1;
  font-size: 22px;
  color: #7E98DF;
  text-align: center;
}
.register-greeting {
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
.btn-secondary {
  height: 50px;
  width: 100%;
  margin-bottom: 40px;
  font-size: 16px;
  color: #7E98DF;
  outline: none;
  border: none;
  background-color: white;
  border: 1px solid #7E98DF;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.logo-google, .btn-google {
  padding-top: 15px;
}
#register-with {
  width: 100%;
  margin-bottom: 30px;
}
</style>
