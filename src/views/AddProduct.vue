<template>
  <div>
    <div class="alert alert-dismissible alert-danger" v-if="error">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>{{ error }}</strong>
    </div>
    <h1>Add New Product</h1>
    <form @submit.prevent="handleAddProduct" method="post">
      <div class="form-group">
        <label for="name" class="form-label mt-4">Name</label>
        <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label for="price" class="form-label mt-4">Price</label>
        <input v-model="price" type="number" class="form-control" id="price" placeholder="Enter price">
      </div>
      <div class="form-group">
        <label for="brand" class="form-label mt-4">Brand</label>
        <input v-model="brand" type="text" class="form-control" id="brand" placeholder="Enter brand">
      </div>
      <button type="submit" class="btn btn-primary mt-4">Add Product</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddProduct',
  data() {
    return {
      name: '',
      price: '',
      brand: '',
      error: ''
    }
  },
  methods: {
    handleAddProduct() {
      axios.post('http://localhost:3002/api/v1/product', {
        name: this.name,
        price: this.price,
        brand: this.brand
      },{headers: {
          "Authorization": "Bearer " + localStorage.getItem('token'),
          "Accept": "application/json",
          "cache-control": "no-cache"
      }}).then(() => {
        this.$router.push('/')
      }).catch((err) => {
        this.error = err.response.data.message
      })
    }
  },
}
</script>