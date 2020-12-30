<template>
  <v-card tile :width="width">
    <v-img :src="author.picture" :height="height" position="top center"></v-img>
    <div class="subtitle-2">{{ author.name }}</div>
    <div class="caption">
      born <span v-if="author.birthPlace">in {{ author.birthPlace }}, </span><span>{{ author.birthDate ? $moment(author.birthDate).format('LL') : '?' }}</span>
    </div>
    <div class="caption">
      deceased <span v-if="author.deathPlace">in {{ author.deathPlace }}, </span><span>{{ author.deathDate ? $moment(author.deathDate).format('LL') : '?' }}</span>
    </div>
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
    <v-dialog v-model="show.bio" @click:outside="show.bio = false">
      <v-card>
        <v-card-title class="text-h6">{{ author.name }}</v-card-title>
        <v-card-text>
          <div class="body-1">{{ author.shortBiography }}</div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { authorValidator } from '@/common';

export default {
  name: 'AppAuthorCard',
  props: {
    author: {
      type: Object,
      required: true,
      validator: author => authorValidator(author)
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
        small: '150',
        medium: '200',
        large: '300'
      },
      heights: {
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
  }
}
</script>