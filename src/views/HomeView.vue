<template>
  <div class="home">
    <h1>Available Cabins</h1>
    <div class="cabin-list">
      <CabinCard
          v-for="cabin in cabins"
          :key="cabin.id"
          :cabin="cabin"
      />
    </div>
    <div v-if="loading">Loading Cabins...</div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import CabinCard from '../components/CabinCard.vue';
import CabinDetails from '../components/CabinDetails.vue';
import api from '../services/api';

export default {
  components: {
    CabinCard,
    CabinDetails
  },
  data() {
    return {
      cabins: [],
      loading: false,
      error: null
    };
  },
  mounted() {
    this.fetchCabins();
  },
  methods: {
    async fetchCabins() {
      this.loading = true;
      try{
        const response = await api.get('/all');
        this.cabins = response.data;
      } catch (error){
        this.error = 'Failed to load cabins. Please try again later.';
        console.error("API error", error);
      }finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.cabin-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
```