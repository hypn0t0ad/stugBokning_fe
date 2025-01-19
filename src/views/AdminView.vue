<template>
  <div class="admin-view">
    <AdminDashboard />
  </div>
</template>

<script>
import AdminDashboard from '../components/AdminDashboard.vue';

export default {
  components: {
    AdminDashboard,
  },
};
</script>
<style scoped>
.admin-view{
  padding: 20px;
}
</style>