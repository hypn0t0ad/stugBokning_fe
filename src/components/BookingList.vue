<template>
  <div class="booking-list">
    <h3>Booking List</h3>
    <div v-if="bookings.length > 0">
      <div v-for="booking in bookings" :key="booking.id" class="booking-row">
        <p>Booking Id: {{booking.id}}</p>
        <p>Cabin Id: {{booking.cabinId}}</p>
        <p>Start Date: {{formatDate(booking.startDate)}}</p>
        <p>End Date: {{formatDate(booking.endDate)}}</p>
      </div>
    </div>
    <p v-else>No bookings available</p>
  </div>
</template>

<script>
export default {
  props: {
    bookings: {
      type: Array,
      required: true
    }
  },
  methods:{
    formatDate(dateString){
      return new Date(dateString).toLocaleDateString();
    }
  }
};
</script>
<style scoped>
.booking-list {
  border: 1px solid #eee;
  padding: 20px;
  margin-top: 20px;
}
h3 {
  text-align: center;
  margin-bottom: 10px
}
.booking-row{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>