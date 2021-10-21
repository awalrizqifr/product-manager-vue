<template>
  <div v-if="!loading" class="row home">
    <div v-for="product in products" :key="product.id" class="col-lg-4 col-md-6">
      <SingleProduct :product="product" @deleteProduct="handleDeleteProduct" />
    </div>
    <ul class="pagination mt-1">
      <li @click="previousPage" class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li @click="nextPage" class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
import SingleProduct from '@/components/SingleProduct.vue'

export default {
  name: 'Home',
  components: {
    SingleProduct
  },
  data() {
    return {
      products: [],
      loading: true,
      skip:  0,
      limit: 6
    }
  },
  mounted() {
    this.fetchPage()
  },
  methods: {
    handleDeleteProduct(id) {
      axios.delete('http://localhost:3002/api/v1/product/' + id, {headers: {
        "Authorization": "Bearer " + localStorage.getItem('token'),
        "Accept": "application/json",
        "cache-control": "no-cache"
      }})
        .then((res) => {
          this.fetchPage()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // getAllProducts() {
    //   axios.get('http://localhost:3002/api/v1/product')
    //   .then((res) => {
    //     this.loading = false
    //     this.products = res.data.body
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // },
    // async getAllProducts() {
    //   try {
    //     const res = await axios.get('http://localhost:3002/api/v1/product', {headers: {
    //       "Authorization": "Bearer " + localStorage.getItem('token'),
    //       "Accept": "application/json",
    //       "cache-control": "no-cache"
    //     }})
      
    //     this.loading = false
    //     this.products = res.data.body
    //   } catch (error) {
    //     console.log(error)
    //     this.$store.dispatch('logout')
    //     this.$router.push("/login")
    //   }
    // },
    nextPage() {
      if (this.skip > this.products.length) {
        this.skip -= this.limit
      }
      this.skip += this.limit // For the next page you just increment 'skip' for the page size 'limit'
      this.fetchPage()
    },
    previousPage() {
      if(this.skip > 0) {
        this.skip -= this.limit // For the previous page, you just increment 'skip' for the page size 'limit'
        this.fetchPage()
      }
    },
    async fetchPage() {
      try {
        const res = await axios.get(`http://localhost:3002/api/v1/product?skip=${this.skip}&limit=${this.limit}`, {headers: {
          "Authorization": "Bearer " + localStorage.getItem('token'),
          "Accept": "application/json",
          "cache-control": "no-cache"
        }})
      
        this.loading = false
        this.products = res.data.body
      } catch (error) {
        console.log(error)
        this.$store.dispatch('logout')
        this.$router.push("/login")
      }
    },
  },
}
</script>
