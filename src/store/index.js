import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: {},
    friendList: [],
    message: {},
    room: {},
    image: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setMessage (state, payload) {
      state.message = payload
    },
    setRoom (state, payload) {
      state.room = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    setImage (state, payload) {
      state.image = payload
    }
  },
  actions: {
    interceptorsResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        console.log(error.response)
        if (error.response.status === 401 && error.response.data.result.message === 'Token is Invalid') {
          localStorage.removeItem('token')
          context.commit('setToken', null)
          // swal('Error!', "Don't Edit Token", 'error')
          router.push('/login')
        } else if (error.response.status === 401 && error.response.data.result.message === 'Token is Expired') {
          localStorage.removeItem('token')
          context.commit('setToken', null)
          swal('Error!', 'Session is Ended', 'error')
          router.push('/login')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Email Not Found!') {
          localStorage.removeItem('token')
          context.commit('setToken', null)
          swal('Error!', 'Email Address is Wrong!', 'error')
          router.push('/login')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Password is Wrong!') {
          localStorage.removeItem('token')
          context.commit('setToken', null)
          swal('Error!', 'Password is Wrong!', 'error')
          router.push('/login')
        } else if (error.response.status === 403 && error.response.data.result.message === 'Only Images with Extentions (jpeg/jpg/png) are Allowed') {
          swal('Error!', 'Only Images with Extentions (jpeg/jpg/png) are Allowed!', 'error')
        } else if (error.response.status === 403 && error.response.data.result.message === 'File Too Large') {
          swal('Error!', 'Cannot Upload File Because File Too Large', 'error')
        }
        return Promise.reject(error)
      })
    },
    interceptorsRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${context.state.token}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    login (context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/user/login`, payload)
          .then((res) => {
            context.commit('setUser', res.data.result)
            localStorage.setItem('token', res.data.result.token)
            localStorage.setItem('userId', res.data.result.userId)
            router.push('/main')
            resolve(res.data.result[0])
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    logout () {
      return new Promise((resolve, reject) => {
        if (this.state.token !== null) {
          localStorage.removeItem('token')
        }
      })
    },
    // getProduct (context, payload) {
    //   return new Promise((resolve, reject) => {
    //     axios.get(process.env.VUE_APP_PRODUCT_URL + `?${payload || ''}page=${this.state.currentPage}&limit=6`)
    //     // axios.get(`http://localhost:4000/api/v1/product?${payload || ''}&limit=6`)
    //       .then((res) => {
    //         context.commit('setProduct', res.data.result)
    //         context.commit('setPagination', res.data.resultPage)
    //         resolve(res.data.result)
    //       })
    //       .reject((err) => {
    //         console.log(err)
    //         reject(err)
    //       })
    //   })
    // },
    getImageByUserId (context, payload) {
      return new Promise((resolve, reject) => {
        // axios.get(`${process.env.VUE_APP_BASE_URL}/image/${context.state.user.userId}`)
        axios.get('http://localhost:4000/api/v1/image/' + context.state.user.userId, payload)
          .then((res) => {
            context.commit('setImage', res.data.result)
            resolve(res.data.result[0])
          })
          .reject((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRoomByName (context) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/v1/room?roomName=')
          .then((res) => {
            context.commit('setRoom', res.data.result)
            resolve(res.data.result)
          })
          .reject((err) => {
            console.log(err)
            reject(err)
          })
      })
    }
  },
  getters: {
    isLogin (state) {
      return state.token || localStorage.getItem('token')
    },
    getUserId (state) {
      return state.user.UserId || localStorage.getItem('userId')
    },
    getFriend (state) {
      return state.FriendList
    },
    getUsers (state) {
      return state.user
    },
    getImage (state) {
      return state.image
    },
    getRoom (state) {
      return state.room
    },
    getMessages (state) {
      return state.message
    }
  },
  modules: {
  }
})
