<template>
  <div class="main-container">
    <!-- <Room v-show= "showRoom" @close-room = "RoomOff"/>
    <Channel v-show= "showChannel" @close-channel = "ChannelOff"/> -->
    <div class="main-menu" v-show="showMain">
      <div class="header">
        <div class="app-title" v-show="showTitle">Telegram</div>
        <CreateAndChannel v-show="showCreateChannel" @launch-room = "RoomOn" @launch-channel = "ChannelOn"/>
        <div class="menu">
          <img class="img-menu" src="../../assets/Menu.png" alt="menu" @click="showMenuOn">
          <Menu class="menu-list" v-show="showMenu" @launch-profile = "ProfileOn"/>
        </div>
      </div>
      <div class="search-add">
        <div class="search">
          <img id="img-search" src="../../assets/Search.png" alt="search">
          <input id="search-box" type="text" v-model="message">
        </div>
        <div class="add" @click="CreateChannelOn">
          <img src="../../assets/Plus.png" alt="add">
        </div>
      </div>
      <div class="message-type">
        <div class="all" :class="{ active: isActive === 'all' }" @click="handleAll">
          <div class="type">All</div>
        </div>
        <div class="private" :class="{ active: isActive === 'private' }" @click="handlePrivate">
          <div class="type">Private</div>
        </div>
        <div class="group" :class="{ active: isActive === 'group' }" @click="handleGroup">
          <div class="type">Group</div>
        </div>
      </div>
      <div class="user-list">
      </div>
    </div>
    <div class="main-menu" v-show="showProfile">
      <div class="header">
        <div class="app-title">
          <img src="../../assets/back.png" alt="" @click="ProfileOff">
        </div>
        <div class="username-title">@{{getUsers.username}}</div>
      </div>
      <div class="account">
        <div class="profile-photo">
          <img v-if="getImage === null" class="pp" src='../../assets/profile.png' alt="profile-photo"/>
          <img v-else class="pp" :src="getImage[0].imageProfile" alt="profile-photo"/>
        </div>
        <div class="profile-user">
          <h3>{{getUsers.username}}</h3>
          <p class="at-user">@{{getUsers.username}}</p>
          <input id="upload" type="file" @change="onFileUpload">
          <button class="btn btn-primary" id="btn-update" @click="uploadImage (item.id, item)">Update</button>
          <h3>Location</h3>
          <Map/>
        </div>
      </div>
    </div>
    <div class="chat">
      <div class="recipient">
        <div class="recipient-group">
          <div class="image-recipient">
            <!-- <img src="../assets/contacts.png" alt=""> -->
          </div>
          <div class="name-recipient">
            <div id="name-recipient"> Room's Name <br> {{roomName}} </div>
            <!-- <div class="online-status">Online</div> -->
          </div>
        </div>
        <div class="profile-menu">
          <img id="profile-menu" src="../../assets/profile-menu.png" alt="profile-menu">
        </div>
      </div>
      <div class="message-box">
        <h4>Selamat Datang di Telegram {{getUsers.username}} </h4>
      <div class="message-list">
        <div class="message" v-for="(message, index) in messages" :key="index">
          <div class="sender">
            <img v-if="getImage === null" class="pp-sender" src='../../assets/profile.png' alt="profile-photo"/>
            <img v-else class="pp-sender" :src="getImage[0].imageProfile" alt="profile-photo"/>
          </div>
          <div class="msg"> {{message.senderName}} <br> {{message.messageBody}} <br> <div class="time"> {{formatDate(message.createdAt)}} </div> </div>
        </div>
      </div>
      </div>
      <div class="input-box">
        <inputMessage @send-message="handleSendMessage"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CreateAndChannel from '../../components/_base/CreateAndChannel'
import InputMessage from '../../components/_base/InputMessage'
import Menu from '../../components/_base/Menu'
// import Room from '../../components/_base/Room'
// import Channel from '../../components/_base/Channel'
import Map from '../../components/_base/Map'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Chat',
  props: ['socket'],
  components: {
    CreateAndChannel,
    InputMessage,
    Menu,
    // Room,
    // Channel,
    Map
  },
  data () {
    return {
      FILE: null,
      messages: [],
      isActive: 'all',
      receiverId: 3,
      receiverName: 'df7',
      showTitle: true,
      showMenu: false,
      showCreateChannel: false,
      showRoom: false,
      showChannel: false,
      showMain: true,
      showProfile: false,
      roomName: ''
    }
  },
  computed: {
    ...mapGetters(['getUsers', 'getUserId', 'getImage'])
  },
  mounted () {
    this.getImageByUserId()
    this.socket.emit('setupUserLogin', this.getUserId)
    this.socket.on('receiveMessage', data => {
      console.log(data)
      this.messages.push(data)
    })
    // if (!this.getUsers.userId) {
    //   this.$router.push('/login')
    // }
    // this.roomName = this.$route.params.roomName
    // console.log(this.$route.params.roomName)
    // this.socket.emit('welcomeMessage', { id: this.getUsers.userId, username: this.getUsers.username, roomName: this.roomName })
    // this.socket.on('message', message => {
    //   console.log(message)
    //   this.messages.push(message)
    // })
    // this.socket.on('notification', message => {
    //   this.$notify({
    //     group: 'auth',
    //     duration: 10000,
    //     speed: 1000,
    //     title: 'Notification',
    //     text: (message)
    //   })
    // })
  },
  methods: {
    ...mapActions(['getImageByUserId']),
    handleSendMessage (data) {
      console.log(data.dom)
      data.dom.value = ''
      data.dom.focus()
      const dataMessage = {
        messageBody: data.msg,
        senderId: this.getUserId,
        senderName: this.getUsers.username,
        receiverId: this.receiverId,
        receivername: this.receiverName
      }
      this.socket.emit('sendMessage', dataMessage, data => {
        this.messages.push(data)
      })
      this.socket.on('notification', message => {
        this.$notify({
          group: 'auth',
          duration: 10000,
          speed: 1000,
          title: 'Notification',
          text: (message)
        })
      })
      const scroll = this.messages.length
      document.getElementsByClassName('message')[scroll - 1].scrollIntoView()
    },
    formatDate (date) {
      return moment(date).format('lll')
    },
    onFileUpload (event) {
      this.FILE = event.target.files[0]
    },
    uploadImage () {
      const formData = new FormData()
      formData.append('imageProfile', this.FILE, this.FILE.name)
      formData.append('userId', this.getUsers.userId)
      axios.patch(`${process.env.VUE_APP_BASE_URL}/image`, formData)
        .then((res) => {
          this.$swal('Upload Success', 'Image Upload Successfully', 'success')
          // this.$emit('get-data')
        })
        .catch((res) => {
          this.$swal('Error!', 'Failed Upload Image', 'error')
        })
    },
    clearData () {
      this.FILE = null
    },
    CreateChannelOn () {
      if (!this.showCreateChannel) {
        this.showTitle = false
        this.showCreateChannel = true
      } else {
        this.showTitle = true
        this.showCreateChannel = false
      }
    },
    showMenuOn () {
      if (!this.showMenu) {
        this.showMenu = true
      } else {
        this.showMenu = false
      }
    },
    handleAll () {
      this.isActive = 'all'
    },
    handlePrivate () {
      this.isActive = 'private'
    },
    handleGroup () {
      this.isActive = 'group'
    },
    RoomOn () {
      this.showRoom = true
    },
    RoomOff () {
      this.showRoom = false
    },
    ChannelOn () {
      this.showChannel = true
    },
    ChannelOff () {
      this.showChannel = false
    },
    ProfileOn () {
      this.showProfile = true
      this.showMain = false
    },
    ProfileOff () {
      this.showProfile = false
      this.showMain = true
      this.showMenu = false
    }
  }
}
</script>

<style scoped>
.main-container {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.main-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px;
  box-sizing: border-box;
}
.chat {
  flex: 2;
  border: 1px solid #e7e7e7;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
}
.app-title {
  font-size: 29px;
  color: #7E98DF;
  margin-bottom: 8px;
}
.img-menu {
  margin-top: 15px;
}
.menu-list {
  margin: 5px 0 0 -230px;
}
.search-add {
  height: 50px;
  display: flex;
  flex-direction: row;
}
.search {
  width: 100%;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 15px;
  border: 1px solid #e7e7e7;
}
.img-search {
  position: absolute;
  display: inline;
  cursor: pointer;
}
input {
  height: 30px;
  width: 85%;
  font-size: 20px;
  margin: 0 0 20px 20px;
  background: #FAFAFA;
  border-top-style: hidden;
  border-right-style: hidden;
  border-bottom-style: hidden;
  border-left-style: hidden;
}
#search-box:focus {
  outline: none;
}
.add {
  margin: 10px 0 0 20px;
}
.message-type {
  height: 50px;
  margin: 50px 0;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.all, .private, .group {
  flex: 1;
  margin: -15px 5px 0;
  border-radius: 20px;
  text-align: center;
}
.type {
  margin-top: 20px;
}
.active {
  color: white;
  background-color: #7E98DF;
}
.user-list {
  height: 500px;
  overflow: auto;
  border: 1px solid #e7e7e7;
}
.chat {
  display: flex;
  flex-direction: column;
}
.recipient {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.recipient-group {
  display: flex;
  flex-direction: row;
}
.image-recipient {
  height: 80px;
  width: 80px;
  margin: 30px 0 30px 30px;
  border-radius: 10px;
  background-color: #7E98DF;
  background-size: cover;
  background-image: url('../../assets/Room-icon.png');
}
.name-recipient {
  padding: 20px;
  margin: 30px 0 30px 10px;
}
#name-recipient {
  font-size: 18px;
  font-weight: 600;
}
.profile-menu {
  margin: 30px;
}
#profile-menu {
  margin-top: 30px;
}
.online-status {
  color: #7E98DF;
}
.message-box {
  flex: 5;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  background-color: #FAFAFA;
  border: 1px solid #e7e7e7;
}
.input-box {
  flex: 1;
  border: 1px solid #e7e7e7;
}
.message-list {
  padding-bottom: 100px;
}
.message {
  display: flex;
  flex-direction: row;
}
.sender {
  width: 60px;
  height: 60px;
  margin: 50px 50px 0 0;
  background-size: cover;
  background-image: url('../../assets/profile.png');
}
.pp-sender {
  width: 60px;
  height: 60px;
  border-radius: 17px;
}
.msg {
  width: 70%;
  padding: 30px;
  margin-top: 30px;
  border-radius: 35px 35px 35px 10px;
  color: white;
  background-color: #7E98DF;
  word-break: break-all;
}
.profile-photo {
  height: 100px;
  width: 100px;
  margin: 10px auto;
  background-size: cover;
}
.pp {
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 25px;
}
h3 {
  text-align: center;
}
.at-user {
  text-align: center;
  color: #848484;
}
.username-title {
  width: 100%;
  text-align: center;
  font-size: 29px;
  color: #7E98DF;
}
#upload {
  height: 40px;
  width: 350px;
}

.time {
  text-align: right;
}
</style>
