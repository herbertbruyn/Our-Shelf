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
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="book in props.items" :key="book._id">
          <div class="d-flex justify-center">
            <app-book-card 
              :book="book"
              @edit="$emit('edit', book)"
              @remove="$emit('remove', book)"
              @showdetails="$emit('showdetails', book)"
            ></app-book-card>
          </div>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import { enums, bookValidator } from '@/common';

export default {
  name: 'AppCollectionGrid',
  props: {
    books: {
      type: Array,
      default: () => [],
      validator: arr => {
        return arr.length === 0 
        || arr.every(book => bookValidator(book))
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
      validator: val => enums.SORT_KEYS.includes(val)
    },
    sortDesc: {
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