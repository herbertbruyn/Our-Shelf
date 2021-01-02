<template>
  <v-row class="mb-auto">
    <v-col>
      <app-collections-browser></app-collections-browser>
    </v-col>
  </v-row>
</template>

<script>
export default { 
  async asyncData({ store, $notifyError, isDev }) {
    try { await store.dispatch('token/getToken');
    } catch(e) {
      if (process.client) $notifyError(e.message) 
      if (isDev) console.log(e);
    }

    try { await store.dispatch('users/getList');
    } catch(e) {
      if (process.client) $notifyError(e.message) 
      if (isDev) console.log(e);
    }
  }
}
</script>
