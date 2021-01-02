<template>
  <v-row class="mb-auto">
    <v-col>
      <app-authors></app-authors>
    </v-col>
  </v-row>

</template>

<script>
export default { 
  async asyncData({ store, $notifyError, isDev }) {
    try { await store.dispatch('authors/getList')
    } catch(e) {
      if (process.client) { $notifyError(e.message) } 
      if (isDev) { console.log(e); }
    }
  }
}
</script>
