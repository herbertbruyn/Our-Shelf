<template>
  <v-row class="mb-auto">
    <v-col>
      <app-publishers-crud></app-publishers-crud>
    </v-col>
  </v-row>

</template>

<script>
export default { 
  async asyncData({ store, $notifyError }) {
    try { await store.dispatch('publishers/getList')
    } catch(e) {
      if (process.client) return $notifyError(e.message) 
      console.log(e);
    }
  }
}
</script>
