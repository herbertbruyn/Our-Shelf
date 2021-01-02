<template>
  <v-row align="center" justify="center">
    <v-col align="center" justify="center">
      <v-card width="300px" height="250px" class="pa-3 brown lighten-5 d-flex flex-column flex-grow align-center justify-center">
        <v-card-text>
          <pre class="ma-3">{{ shrug }}</pre>
          <h1 v-if="error.statusCode === 404" class="mx-auto">
            {{ pageNotFound }}
          </h1>
          <h1 v-else class="mx-auto">
            <span v-if="error.statusCode">
              {{ error.statusCode }}
            </span>
            <span v-if="error.message">
              {{ error.message }}
            </span>
            <span v-else>
              {{ otherError }}
            </span>
          </h1>
          <div class="ma-2">
            <NuxtLink to="/">
              Home page
            </NuxtLink>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import code404 from "@/assets/ascii-art/404";
import shrug from "@/assets/ascii-art/shrug";

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      code404,
      shrug,
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
