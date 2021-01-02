<template>
  <v-card tile :width="width">
    <v-img :src="book.coverImage" :height="height" position="top center" :title="book.title" @click="imageClickHandler"></v-img>
    <v-rating v-if="size !== 'cover'"
      class="text-center"
      :value="book.stars" 
      color="orange"
      background-color="orange lighten-3" 
      length="5" 
      :small="size === 'small'"
      :large="size === 'large'"
      dense
      readonly
    ></v-rating>
    <v-card-actions v-if="size !== 'cover'">
      <v-btn icon title="edit" @click="$emit('edit')">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon title="remove" @click="$emit('remove')">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon title="show details" class="ml-auto" @click="$emit('showdetails')">
        <v-icon>mdi-text-box-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { propsValidators } from '@/common';

export default {
  name: 'AppBookCard',
  props: {
    book: {
      type: Object,
      required: true,
      validator: book => propsValidators.book(book)
    },
    size: {
      type: String,
      default: 'medium',
      validator: val => [
        'cover',
        'small',
        'medium',
        'large'
      ].includes(val)
    }    
  },
  data() {
    return {
      widths: {
        cover: '100',
        small: '150',
        medium: '200',
        large: '300'
      },
      heights: {
        cover: '150',
        small: '200',
        medium: '300',
        large: '500'
      }
    }
  },
  computed: {
    width() {
      return this.widths[this.size];
    },
    height() {
      return this.heights[this.size];
    }
  },
  methods: {
    imageClickHandler() {
      if (this.size === 'cover') {
        this.$emit('showdetails');
      }      
    }
  }
}
</script>