<template>
  <div class="modal-room">
    <form>
      <div class="form-group">
        <label for="inputRoom">Create Room</label>
        <input type="text" class="form-control" id="inputRoom" placeholder="Enter New Room" v-model="roomName">
      </div>
      <button type="submit" class="btn btn-primary" @click="addRoom">Create Room</button>
      <button type="submit" class="btn btn-danger" @click="$emit('close-room')">Cancel</button>
    </form>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'Room',
  props: ['close-room'],
  data () {
    return {
      roomName: ''
    }
  },
  methods: {
    // addRoom () {
    //   axios.post('http://localhost:4000/api/v1/room/', {
    //     roomName: this.roomName
    //   })
    //     .then((res) => {
    //       this.$swal('Room Added Success', "Room's Added Successfully", 'success')
    //       this.$emit('close-room')
    //       this.clearData()
    //     })
    //     .catch((res) => {
    //       this.$swal('Warning!', 'roomName Already Registered', 'warning')
    //     })
    // },
    // clearData () {
    //   this.roomName = ''
    // }
    handleSubmit () {
      this.$router.push({
        name: 'Chat',
        params: {
          roomName: this.roomName
        }
      })
    }
  }
}
</script>

<style scoped>
.modal-room {
  height: 200px;
  width: 400px;
  padding: 30px;
  margin: 100px 0 0 30px;
  border-radius: 20px;
  background-color: white;
  border: 1px solid black;
  position: absolute;
  z-index: 5;
}
.btn {
  width: 150px;
  margin-right: 10px;
  border-radius: 10px;
}
</style>
