<template>
  <div v-if="cabin" class="cabin-details">
    <h2>{{ cabin.name }}</h2>
    <p>Capacity: {{ cabin.size }}</p>
    <p>Price: ${{ cabin.price }}Kr per night</p>

    <div class="date-picker">
      <label for="fromDate">From Date:</label>
      <v-date-picker
          v-model="fromDate"
          :allowed-dates="allowedDates"
          hide-header
      />

      <label for="untilDate">Until Date:</label>
      <v-date-picker
          v-model="untilDate"
          :allowed-dates="allowedDates"
          hide-header
          :min="fromDate"
      />
    </div>
    <div v-if="fromDate && untilDate" class="date-range">
      <p>Selected dates:</p>
      <p>From: {{ formatDate(fromDate) }}</p>
      <p>Until: {{ formatDate(untilDate) }}</p>
      <button @click="bookCabin" :disabled="!validRange">Book Cabin</button>
      <p v-if="bookingMessage">{{ bookingMessage }}</p>
      <p v-if="!validRange" class="error">Please pick a valid range without unavailable dates inbetween</p>
    </div>
    <div v-else-if="fromDate || untilDate" class="date-range">
      <p>Please select a valid date range</p>
    </div>
  </div>
  <div v-else>
    <p v-if="loading">Loading cabin details...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import api from "../services/api";
import { VDatePicker } from 'vuetify/components';

export default {
  components: {
    VDatePicker
  },
  data() {
    return {
      cabin: null,
      loading: false,
      error: null,
      fromDate: null,
      untilDate: null,
      availableDates: [],
      bookingMessage: null,
    };
  },
  watch: {
    '$route.params.id': {
      handler: 'fetchCabinDetails',
      immediate: true,
    }
  },
  computed: {
    allowedDates() {
      return (val) => {
        if (!this.availableDates || this.availableDates.length === 0) {
          return false;
        }
        return this.availableDates.includes(new Date(val).toISOString().split('T')[0]);
      };
    },
    validRange() {
      if (!this.fromDate || !this.untilDate) return true;

      let currentDate = new Date(this.fromDate);
      const endDate = new Date(this.untilDate);

      while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().split('T')[0];
        if(!this.availableDates.includes(formattedDate)){
          return false;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return true;
    },
  },
  methods: {
    formatDate(dateString){
      return new Date(dateString).toLocaleDateString()
    },
    async fetchCabinDetails() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get(`/${this.$route.params.id}`);
        this.cabin = response.data;
        this.availableDates = response.data.availableDates;
      } catch (error) {
        this.error = "Failed to load cabin details. Please try again later.";
        console.error("API Error:", error);
      } finally {
        this.loading = false;
      }
    },
    async bookCabin() {
      if(!this.fromDate || !this.untilDate) {
        this.bookingMessage = "Please select a valid date range";
        return;
      }
      try {
        this.bookingMessage = 'Booking in progress...';
        const response = await api.post('/book', {
          id: this.$route.params.id,
          start: this.fromDate,
          until: this.untilDate,
        });
        alert("The cabin " + response.data.cabin.name + " has been booked successfully the dates: " + response.data.bookedStart + " to: " + response.data.bookedUntil);
        this.$router.push('/');
      }catch(error){
        console.error("Error booking cabin:", error);
        this.bookingMessage = "Booking failed, Please try again later.";
      }
    },
  },
};
</script>

<style scoped>
.cabin-details {
  padding: 20px;
  border: 1px solid #ddd;
  margin: 20px auto;
  max-width: 700px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
}

.detail-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
}

.date-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.date-picker label {
  margin-bottom: 5px;
}
.date-range{
  margin-top: 10px;
  text-align: center;
}
</style>