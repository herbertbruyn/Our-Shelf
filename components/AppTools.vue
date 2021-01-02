<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card max-width="1200" class="mx-auto brown--text text--darken-1">
          <v-card-title class="headline brown lighten-5 brown--text text--darken-4">
            <v-icon large class="mr-1">mdi-tools</v-icon>
            Tools
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="px-8 pb-8">
            <h5 class="text-h5 mb-4 text-center">ISBN Validator and Converter</h5>
            <v-text-field ref="isbn"
              style="max-width: 400px;"
              class="mx-auto"
              v-model="isbn"
              outlined
              clearable
              label="ISBN"
              placeholder=" "
              v-mask="['###-##-####-###-#', '##-####-###-X']"
              :rules="rules"
              persistent-hint
              :hint="hint"
              autocomplete="off"
              append-outer-icon="mdi-autorenew"
              @click:append-outer="convert"
              @click:clear="clear"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mask } from 'vue-the-mask';
import { validateIsbn10, validateIsbn13, from10To13, from13To10, formRules } from '@/common';

export default {
  name: 'AppTools',
  directives: {
    mask
  },
  data() {
    return {
      isbn: null,
      rules: [ (val) => !val || validateIsbn10(val) || validateIsbn13(val) || 'invalid ISBN' ]
    }
  },
  computed: {
    hint() {
      return (validateIsbn10(this.isbn) && 'A valid ISBN-10') || (validateIsbn13(this.isbn) && 'A valid ISBN-13') || '';
    }
  },
  methods: {
    clear() {
      this.isbn = null;
      this.$refs.isbn.reset();
    },
    convert() {
      if (validateIsbn10(this.isbn)) { 
        this.isbn = from10To13(this.isbn); 
      } else if (validateIsbn13(this.isbn)) {
        this.isbn = from13To10(this.isbn);
      }
    }
  }
}
</script>
