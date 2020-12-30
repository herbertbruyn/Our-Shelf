<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <pre>
        {{ JSON.stringify($auth.user, null, 4) }}
      </pre>
      <pre>
        {{ $auth.strategy.token.get() }}
        {{ $auth.strategy.refreshToken.get() }}
      </pre>
    </v-col>
  </v-row>
</template>

<script>
export default { 
  async asyncData({ store, $notifyError }) {
    try { await store.dispatch('token/getToken');
    } catch(e) {
      if (process.client) return $notifyError(e.message) 
      console.log(e);
    }
  }
}
</script>
