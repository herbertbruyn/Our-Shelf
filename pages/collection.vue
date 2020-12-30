<template>
  <v-row class="mb-auto">
    <v-col>
      <app-user-collection></app-user-collection>
    </v-col>
  </v-row>

</template>

<script>
export default { 
  async asyncData({ store, $notifyError }) {
    try { await store.dispatch('books/getUserCollection')
    } catch(e) {
      if (process.client) return $notifyError(e.message) 
      console.log(e);
    }
  }
}
</script>
