<template>
  <div>
    <div class="alert alert-dismissible alert-danger" v-if="error">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>{{ error }}</strong>
    </div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister" method="post">
      <div class="form-group">
        <label for="name" class="form-label mt-4">Name</label>
        <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label for="email" class="form-label mt-4">Email</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="password" class="form-label mt-4">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary mt-4">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    handleRegister() {
      axios.post('http://localhost:3002/api/v1/user/register', {
        name: this.name,
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('/login')
      }).catch((err) => {
        this.error = err.response.data.message
      })
    }
  },
}
</script>