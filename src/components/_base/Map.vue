<template>
  <div class="map">
    <GmapMap
      :center="{lat:location.lat, lng:location.lng}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 480px; height: 250px"
    >
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'Map',
  data () {
    return {
      location: {
        lat: 1,
        lng: 1
      }
    }
  },
  mounted () {
    this.$getLocation()
      .then(coordinates => {
        this.location.lat = coordinates.lat
        this.location.lng = coordinates.lng
      })
  }
}
</script>

<style scoped>

</style>
