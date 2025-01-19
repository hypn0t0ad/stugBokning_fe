<template>
  <div class="cabin-card">
    <h3>{{ cabin.name }}</h3>
    <p>Capacity: {{ cabin.size }}</p>
    <p>Price: {{ cabin.price }}Crowns per night</p>
    <router-link :to="`/cabins/${cabin.id}`" class="view-button">View Dates</router-link>
  </div>
</template>

<script>
export default {
  props: {
    cabin: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
.cabin-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cabin-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 5px;
}
.view-button {
  display: inline-block;
  padding: 8px 15px;
  text-decoration: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-top: 10px;
  text-align: center;
}

.view-button:hover {
  background-color: #0056b3;
}
</style>