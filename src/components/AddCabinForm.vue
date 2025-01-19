<template>
  <div class="cabin-form">
    <h2>Add Cabin</h2>
    <form @submit.prevent="addCabin">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="capacity">Capacity:</label>
        <input type="number" id="capacity" v-model.number="capacity" required />
      </div>
      <div>
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="location" required />
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" id="price" v-model.number="price" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <div>
        <label for="amenities">Amenities (comma-separated):</label>
        <input type="text" id="amenities" v-model="amenities" />
      </div>
      <div>
        <label for="image">Image URL:</label>
        <input type="text" id="image" v-model="image" required />
      </div>
      <button type="submit">Add Cabin</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import adminApi from '../services/adminApi';

export default {
  data() {
    return {
      name: '',
      capacity: null,
      location: '',
      price: null,
      description: '',
      amenities: '',
      image: '',
      error: null,
    };
  },
  methods: {
    async addCabin() {
      try {
        const amenitiesArray = this.amenities ? this.amenities.split(',').map(item => item.trim()) : [];
        await adminApi.post('/admin/cabins', {
          name: this.name,
          capacity: this.capacity,
          location: this.location,
          price: this.price,
          description: this.description,
          amenities: amenitiesArray,
          image: this.image
        });
        this.$emit('cabin-added');
      } catch (error) {
        this.error = 'Failed to add cabin. Please try again';
        console.error('API error', error);
      }
    },
  },
};
</script>
<style scoped>
.cabin-form{
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  max-width: 400px;
  margin: 20px auto; /* Center form*/
}
h2 {
  text-align: center;
  margin-bottom: 15px;
}

.cabin-form div {
  margin-bottom: 10px;
}

.cabin-form label {
  display: block;
  margin-bottom: 5px;
}

.cabin-form input[type="text"],
.cabin-form input[type="number"],
.cabin-form textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.cabin-form button {
  display: block;
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px auto 0;
}
.error {
  color: red;
}
</style>