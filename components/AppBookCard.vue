<template>
  <v-hover v-slot="{ hover }">
    <v-card tile :width="width" :elevation="hover ? 6 : 2">
      <v-img 
        :src="book.coverImage" 
        :height="height" 
        position="top center" 
        :title="book.title" 
      >
        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            opacity="0.7"
            :class="{ cover: size === 'cover' }"
          >
            <div v-if="size === 'cover'">
              <v-btn small depressed color="primary" @click="$emit('showdetails')">details</v-btn>
            </div>
            <v-card-actions v-else class="px-0" :class="size === 'small' ? 'py-0' : ''">
              <v-btn dark icon title="edit" :large="size === 'large'" @click="$emit('edit')">
                <v-icon :small="size === 'small'" :large="size === 'large'">mdi-pencil</v-icon>
              </v-btn>
              <v-btn dark icon title="remove" :large="size === 'large'" :class="size === 'large' ? 'mr-16' : ''" @click="$emit('remove')">
                <v-icon :small="size === 'small'" :large="size === 'large'">mdi-delete</v-icon>
              </v-btn>
              <v-btn dark icon title="show details" :large="size === 'large'" :class="size === 'small' ? 'ml-8' : 'ml-16'" @click="$emit('showdetails')">
                <v-icon :small="size === 'small'" :large="size === 'large'">mdi-text-box-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-overlay>
        </v-fade-transition>
      </v-img>
      <div v-if="size !== 'cover'" class="d-flex flex-row justify-space-between align-center pa-2">
        <v-rating
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
        <v-icon v-if="book.private" :small="size !== 'large'" title="private">mdi-cancel</v-icon>
        <v-icon v-else :small="size !== 'large'" color="blue" title="public">mdi-earth</v-icon>
      </div>
    </v-card>
  </v-hover>
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
  }
}
</script>

<style scoped>

.v-overlay:not(.cover) {
  align-items: flex-end;
  justify-content: center;
}

</style>