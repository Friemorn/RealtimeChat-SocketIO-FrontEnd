<template>
  <div>
    <form>
      <div class="login-title">Login</div>
      <div class="login-greeting">Hi, Welcome back!</div>
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
      <router-link class="password" to="/password">
        <div class="forgot-password">Forgot Password?</div>
      </router-link>
      <button type="submit" class="btn-primary" @click="handleLogin">Login</button>
      <img id="login-with" src="../../assets/login with.png" alt="login-with">
      <div class="btn-secondary">
        <div class="logo-google">
          <img src="../../assets/google.png" alt="google">
        </div>
        <div class="btn-google">
          Google
        </div>
      </div>
      <div class="no-account">Don't have an account
        <router-link class="register" to="/register">
          <span class="signup">Sign Up</span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'Login',
  data () {
    return {
      socket: io('http://localhost:4000'),
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
    handleLogin (e) {
      e.preventDefault()
      const data = {
        email: this.email,
        password: this.password
      }
      this.login(data)
        .then(() => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          this.$router.push('/chat')
        })
    },
    ...mapActions(['login'])
  }
}
</script>

<style scoped>
form {
  width: 500px;
  height: 100%;
  margin: 20px auto;
  padding: 10px 70px;
  box-sizing: border-box;
  background: #FFFFFF;
  border-radius: 30px;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border: 1px solid black;
}
.login-title {
  margin: 30px auto;
  font-size: 22px;
  color: #7E98DF;
  text-align: center;
}
.login-greeting {
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
.forgot-password {
  margin: 20px 0 40px 0;
  font-size: 16px;
  text-align: right;
  color: #7E98DF;
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
#login-with {
  width: 100%;
  margin-bottom: 30px;
}
.no-account {
  font-size: 14px;
  text-align: center;
}
.signup {
  color: #7E98DF;
}
</style>
