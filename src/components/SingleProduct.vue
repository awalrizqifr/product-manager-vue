<template>
    <div class="card text-white bg-secondary mt-3" style="max-width: 20rem;">
      <div class="card-header">{{ product.name }}</div>
      <div class="card-body">
        <h4 class="card-title">${{ product.price }}</h4>
        <p class="card-text">{{ product.brand }}</p>
          <div class="d-grid gap-2">
            <router-link class="btn btn-lg btn-light" :to="{ name: 'EditProduct', params: { id: product.id }}">Edit</router-link>
            <button class="btn btn-lg btn-light" type="button" @click="deleteProduct">Delete</button>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SingleProduct',
  props: ['product'],
  methods: {
    deleteProduct() {
      if (confirm('Are you sure?')) {
        this.$emit('deleteProduct', this.product.id)
      }
    }
  },
}
</script>