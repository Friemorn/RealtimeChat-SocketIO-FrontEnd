<template>
  <div class="modal-channel">
    <form>
      <div class="form-group">
        <label for="inputChannel">Join Room's Channel</label>
        <input type="text" class="form-control" id="inputChannel" placeholder="Enter Room's Name">
      </div>
      <button type="submit" class="btn btn-primary">Join</button>
      <button type="submit" class="btn btn-danger" @click="$emit('close-channel')">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Room',
  props: ['channel-room']
}
</script>

<style scoped>
.modal-channel {
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
