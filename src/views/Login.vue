<template>
  <div>
    <div class="alert alert-dismissible alert-danger" v-if="error">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>{{ error }}</strong>
    </div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" method="post">
      <div class="form-group">
        <label for="email" class="form-label mt-4">Email</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="password" class="form-label mt-4">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary mt-4">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    // handleLogin() {
    //   axios.post('http://localhost:3002/api/v1/user/login', {
    //     email: this.email,
    //     password: this.password
    //   }).then((res) => {
    //     localStorage.setItem('token', res.data.body.token)
    //     this.$router.push('/')
    //   }).catch((err) => {
    //     this.error = err.response.data.message
    //   })
    // },
    async handleLogin() {
      try {
        const res = await axios.post('http://localhost:3002/api/v1/user/login', {
          email: this.email,
          password: this.password
        })
        localStorage.setItem("isLoggedIn", true)
        localStorage.setItem('token', res.data.body.token)
        this.$store.dispatch("loadUser")
        this.$router.push('/')
      } catch (err) {
        this.error = err.response.data.message
      }
    }
  },
}
</script>