<template>
  <v-row class="mb-auto">
    <v-col>
      <app-my-collection></app-my-collection>
    </v-col>
  </v-row>

</template>

<script>
export default { 
  async asyncData({ store, $notifyError }) {
    try {
      await store.dispatch('books/getMyCollection');
      await store.dispatch('authors/getList');
      await store.dispatch('publishers/getList');
    } catch(e) {
      if (process.client) { $notifyError(e.message) } 
      if (isDev) { console.log(e); }
    }
  }
}
</script>
