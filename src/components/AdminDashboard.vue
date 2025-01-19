<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <button @click="showAddCabinForm = true">Add Cabin</button>
    <div v-if="showAddCabinForm">
      <AddCabinForm @cabin-added="fetchCabins; showAddCabinForm=false"/>
    </div>
    <h2>Cabin List</h2>
    <div v-if="cabins.length > 0">
      <div v-for="cabin in cabins" :key="cabin.id" class="cabin-row">
        <p>{{cabin.name}}</p>
        <div class="buttons">
          <button @click="showEditForm(cabin)">Edit</button>
          <button @click="deleteCabin(cabin.id)">Delete</button>
        </div>
        <div v-if="editCabinId === cabin.id">
          <EditCabinForm :cabin="cabin" @cabin-updated="fetchCabins; editCabinId = null"/>
        </div>
      </div>
    </div>
    <div v-else>
      <p v-if="loadingCabins">Loading cabins...</p>
      <p v-if="error">{{ error }}</p>
    </div>

    <h2>Bookings</h2>
    <BookingList :bookings="bookings"/>
    <div v-if="loadingBookings">Loading bookings...</div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import adminApi from '../services/adminApi';
import AddCabinForm from './AddCabinForm.vue'
import EditCabinForm from './EditCabinForm.vue'
import BookingList from './BookingList.vue'


export default {
  components:{
    AddCabinForm,
    EditCabinForm,
    BookingList
  },
  data() {
    return {
      cabins: [],
      bookings:[],
      loadingCabins: false,
      error: null,
      showAddCabinForm: false,
      editCabinId: null,
      loadingBookings: false
    };
  },
  methods: {
    async fetchCabins() {
      this.loadingCabins = true;
      this.error = null;
      try {
        const response = await adminApi.get('/admin/cabins');
        this.cabins = response.data;
      } catch (error) {
        this.error = 'Failed to load cabins. Please try again later.';
        console.error('API error', error);
      } finally {
        this.loadingCabins = false;
      }
    },
    async fetchBookings() {
      this.loadingBookings = true;
      try{
        const response = await adminApi.get('/admin/bookings');
        this.bookings = response.data
      }catch(error){
        console.error("API error", error);
      }finally{
        this.loadingBookings = false;
      }
    },
    showEditForm(cabin) {
      this.editCabinId = cabin.id;
    },
    async deleteCabin(id) {
      try {
        if(confirm('Are you sure you want to delete this cabin?')){
          await adminApi.delete(`/admin/cabins/${id}`);
          this.fetchCabins(); // Refresh cabin list after deletion
        }
      } catch (error) {
        console.error('Error deleting cabin', error);
        alert('Failed to delete cabin. Please try again.');
      }
    },
    logout(){
      localStorage.removeItem('adminToken');
      this.$router.push('/admin/login')
    }
  },
  mounted() {
    this.fetchCabins();
    this.fetchBookings();
  }
};
</script>
<style scoped>
.admin-dashboard{
  padding: 20px;
}
.cabin-row{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.buttons {
  display: flex;
  gap: 10px;
}
h2 {
  margin-top: 20px;
}
</style>