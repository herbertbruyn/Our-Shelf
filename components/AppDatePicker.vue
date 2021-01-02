<template>
  <v-menu
    v-model="picker"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="290px"
    :disabled="readonly"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        placeholder=" "
        :background-color="backgroundColor"        
        prepend-inner-icon="mdi-calendar"
        readonly
        outlined 
        clearable
        dense
        :rules="rules"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      :max="max"
      :min="min"
      @input="picker = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { patterns } from '@/common';

export default {
  name: 'AppDatePicker',
  props: {
    value: {
      type: String,
      required: false,
      default: null,
      validator: val => !val || patterns.DATE.test(val)
    },
    label: {
      type: String,
      default: 'Date'
    },
    min: {
      type: String,
      required: false,
      default: null,
      validator: val => !val || patterns.DATE.test(val)
    },
    max: {
      type: String,
      required: false,
      default: null,
      validator: val => !val || patterns.DATE.test(val)
    },
    rules: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      picker: false
    }
  },
  computed: {
    date: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>