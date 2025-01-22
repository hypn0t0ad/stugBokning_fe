<template>
  <div class="admin-dashboard">
    <h1>Admin Page</h1>
    <h2>Bookings</h2>
    <div v-if="bookings.length > 0">
      <div v-for="booking in bookings" :key="booking.cabinModel.id" class="booking-row">
        <p>Cabin name: {{booking.cabinModel.name}}</p>
        <p>Start Date: {{formatDate(booking.start)}}</p>
        <p>End Date: {{formatDate(booking.until)}}</p>
      </div>
    </div>
    <p v-else>No Bookings available</p>
    <div v-if="loading">Loading bookings...</div>
    <p v-if="error">{{error}}</p>
    <button @click="logout" type="submit">Logout</button>
  </div>
</template>

<script>
import adminApi from '../services/adminApi';

export default {
  data() {
    return {
      bookings: [],
      loading: false,
      error: null
    };
  },
  mounted() {
    this.fetchBookings();
  },
  methods: {
    formatDate(dateString){
      return new Date(dateString).toLocaleDateString();
    },
    async fetchBookings() {
      this.loading = true;
      try {
        const response = await adminApi.get('/bookings', {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        this.bookings = response.data;
      } catch (error) {
        console.error('Error fetching bookings', error)
        this.error = 'Failed to load bookings. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      try {
        await adminApi.post('/logout');
        document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.$router.push('/');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  }
};
</script>
<style scoped>
.admin-dashboard{
  padding: 20px;
}
.booking-row{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
h2 {
  margin-top: 20px;
}
</style>