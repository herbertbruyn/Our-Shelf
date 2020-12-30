<template>
  <v-dialog :value="value" persistent max-width="450">
    <v-card>
      <v-card-title class="headline">
        Please confirm
      </v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-text v-if="confirmationText.length > 0">
        <v-text-field 
          v-model="text" 
          outlined 
          label="Confirmation text" 
          placeholder=" " 
          autocomplete="off"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn large depressed @click="clickHandler(false)">cancel</v-btn>
        <v-btn large depressed color="error" :disabled="text !== confirmationText" @click="clickHandler(true)">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AppConfirmationDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    confirmationText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    clickHandler(response) {
      this.text = '';
      this.$emit('accept', response);
      this.$emit('input', false);
    }
  }
};
</script>

