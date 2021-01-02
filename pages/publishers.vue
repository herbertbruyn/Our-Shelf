<template>
  <v-row class="mb-auto">
    <v-col>
      <app-publishers></app-publishers>
    </v-col>
  </v-row>

</template>

<script>
export default { 
  async asyncData({ store, $notifyError, isDev }) {
    try { await store.dispatch('publishers/getList')
    } catch(e) {
      if (process.client) { $notifyError(e.message) } 
      if (isDev) { console.log(e); }
    }
  }
}
</script>
