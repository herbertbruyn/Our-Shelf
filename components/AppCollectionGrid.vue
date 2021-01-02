<template>
  <v-data-iterator
    :items="filteredBooks"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    :search="search"
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="sortDesc"    
  >
    <template v-slot:default="props">
      <div class="d-flex flex-wrap justify-start">
        <app-book-card v-for="book in props.items" :key="book._id"
          class="ma-1"
          :book="book"
          :size="readonly ? 'cover' : undefined"
          @edit="$emit('edit', book)"
          @remove="$emit('remove', book)"
          @showdetails="$emit('showdetails', book)"
        ></app-book-card>
      </div>
    </template>
  </v-data-iterator>
</template>

<script>
import { enums, propsValidators } from '@/common';

export default {
  name: 'AppCollectionGrid',
  props: {
    books: {
      type: Array,
      default: () => [],
      validator: arr => {
        return arr.length === 0 
        || arr.every(book => propsValidators.book(book))
      }
    },
    search: {
      type: String,
      required: false
    },
    subtype: {
      type: String,
      required: false
    },
    sortBy: {
      type: String,
      default: enums.SORT_KEYS[0],
      validator: val => enums.SORT_KEYS.BOOKS.includes(val)
    },
    sortDesc: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      itemsPerPage: 5,
      itemsPerPageArray: [5, 10, 15],
      page: 1
    }
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => this.subtype ? book.subtypes.includes(this.subtype) : true);
    }
  }
}
</script>