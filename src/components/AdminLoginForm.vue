<template>
  <div class="auth-form">
    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import adminApi from '../services/adminApi';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        console.log("The username and password: " + this.username, this.password);
        const response = await adminApi.post('/login', {
          username: this.username,
          password: this.password,
        });
        console.log("Respons från server: " + response)
        localStorage.setItem('adminToken', response.data.token);
        this.$router.push('/admin');
      } catch (error) {
        this.error = 'Invalid credentials. Please try again';
        console.error('API error', error);
      }
    },
  },
};
</script>
<style scoped>
.auth-form{
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

.auth-form div {
  margin-bottom: 10px;
}

.auth-form label {
  display: block;
  margin-bottom: 5px;
}

.auth-form input[type="email"],
.auth-form input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.auth-form button {
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