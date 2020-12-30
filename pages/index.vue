<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-text>
          <v-text-field outlined v-model="isbn10" label="isbn10" :rules="rules.isbn10"></v-text-field>
          <v-text-field outlined v-model="isbn13" label="isbn13" :rules="rules.isbn13"></v-text-field>
          <v-btn text @click="convert10To13">convert 10 to 13</v-btn>
          <v-btn text @click="convert13To10">convert 13 to 10</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-text>
          <pre>
            {{ JSON.stringify($auth.user, null, 4) }}
          </pre>
          <pre>
            {{ $auth.strategy.token.get() }}
            {{ $auth.strategy.refreshToken.get() }}
          </pre>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { validateIsbn10, validateIsbn13, from10To13, from13To10 } from '@/common';

export default { 
  async asyncData({ store, $notifyError }) {
    try { await store.dispatch('token/getToken');
    } catch(e) {
      if (process.client) return $notifyError(e.message) 
      console.log(e);
    }
  },
  data() {
    return {
      isbn10: '',
      isbn13: '',
      rules: {
        isbn10: [],
        isbn13: []
      }
    }
  },
  methods: {
    convert10To13() {
      try {
        console.log(from10To13(this.isbn10));
      } catch(e) {
        console.log(e);
      }
    },
    convert13To10() {
      try {
        console.log(from13To10(this.isbn13));
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.rules.isbn10 = this.$createRules('required|isbn10');
    this.rules.isbn13 = this.$createRules('required|isbn13');
  }
}
</script>
