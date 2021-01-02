<template>
  <v-card :width="width">
    <v-img :src="author.picture" :height="height" position="top center"></v-img>
    <v-card-text>
      <div class="subtitle-2">{{ author.name }}</div>
      <div class="caption">{{ caption }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn icon title="edit" @click="$emit('edit')">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon title="remove" @click="$emit('remove')">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn v-if="author.shortBiography" icon title="show bio" class="ml-auto" @click="show.bio = true">
        <v-icon>mdi-text-box-outline</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="show.bio" @click:outside="show.bio = false" max-width="800">
      <v-card>
        <v-card-text class="px-8 py-8">
          <img :src="author.picture" height="250" alt="author picture" class="float-left mr-8 rounded">
          <div class="text-h6">{{ author.name }}</div>
          <div class="text-caption grey--text">({{ birthInfo || 'missing birth info' }}, {{ deathInfo || 'missing death info' }})</div>
          <div class="body-2 mt-8 text-justify">{{ author.shortBiography }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn x-large text color="primary" class="ml-auto" @click="show.bio = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { propsValidators } from '@/common';

export default {
  name: 'AppAuthorCard',
  props: {
    author: {
      type: Object,
      required: true,
      validator: author => propsValidators.author(author)
    },
    size: {
      type: String,
      default: 'medium',
      validator: val => [
        'small',
        'medium',
        'large'
      ].includes(val)
    }    
  },
  data() {
    return {
      show: {
        bio: false
      },
      widths: {
        small: '200',
        medium: '300',
        large: '400'
      },
      heights: {
        small: '250',
        medium: '350',
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
    },
    caption() {
      return (this.author.birthYear || this.author.deathYear) ? `(${this.author.birthYear || '?'} - ${this.author.deathYear || '?'})` : ' ';
    },
    birthInfo() {
      let place = this.author.birthPlace ? this.author.birthPlace : '';
      let year = this.author.birthYear ? (place ? `, ${this.author.birthYear}` : this.author.birthYear) : '';
      return `born in ${place}${year}`;
    },
    deathInfo() {
      let place = this.author.deathPlace ? this.author.deathPlace : '';
      let year = this.author.deathYear ? (place ? `, ${this.author.deathYear}` : this.author.deathYear) : '';
      return `died in ${place}${year}`;
    }    
  }
}
</script>