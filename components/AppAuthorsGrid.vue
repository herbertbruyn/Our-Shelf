<template>
  <v-data-iterator
    :items="filteredAuthors"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    :search="search"
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="sortDesc"    
  >
    <template v-slot:default="props">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="author in props.items" :key="author._id">
          <div class="d-flex justify-center">
            <app-author-card size="small"
              :author="author"
              @edit="$emit('edit', author)"
              @remove="$emit('remove', author)"
            ></app-author-card>
          </div>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import { enums, propsValidators } from '@/common';

export default {
  name: 'AppAuthorsGrid',
  props: {
    authors: {
      type: Array,
      default: () => [],
      validator: arr => {
        return arr.length === 0 
        || arr.every(author => propsValidators.author(author))
      }
    },
    search: {
      type: String,
      required: false
    },
    letter: {
      type: String,
      required: false
    },
    sortBy: {
      type: String,
      default: enums.SORT_KEYS.AUTHORS[0],
      validator: val => enums.SORT_KEYS.AUTHORS.includes(val)
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
    filteredAuthors() {
      return this.authors.filter(author => {
        return this.letter ? author.name.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').startsWith(this.letter.toUpperCase()) : true
      });
    }
  }
}
</script>