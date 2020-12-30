<template>
  <v-data-table
    :headers="headers"
    :items="filteredPublishers"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    :search="search"
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="sortDesc"    
  >
    <!-- eslint-disable -->
    <template v-slot:item.actions="{ item }">
      <v-icon class="mr-1" title="edit" @click="$emit('edit', item)">mdi-pencil</v-icon>
      <v-icon class="mr-1" title="remove" @click="$emit('remove', item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { enums, publisherValidator } from '@/common';

export default {
  name: 'AppPublishersList',
  props: {
    publishers: {
      type: Array,
      default: () => [],
      validator: arr => {
        return arr.length === 0 
        || arr.every(publisher => publisherValidator(publisher))
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
      default: enums.SORT_KEYS[0],
      validator: val => enums.SORT_KEYS.PUBLISHERS.includes(val)
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
    filteredPublishers() {
      return this.publishers.filter(publisher => {
        return this.letter ? publisher.name.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').startsWith(this.letter.toUpperCase()) : true
      });
    }
  }
}
</script>