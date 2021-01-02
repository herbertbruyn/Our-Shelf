<template>
  <v-data-table
    :headers="headers"
    :items="filteredBooks"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    :search="search"
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="sortDesc"    
  >

    <!-- eslint-disable -->
    <template v-slot:item.coverImage="{ item }">
      <v-img :src="item.coverImage" width="40px" height="60px" class="my-2" position="top center"></v-img>
    </template>

    <template v-slot:item.private="{ item }">
      <v-icon v-if="item.private" small title="private">mdi-cancel</v-icon>
      <v-icon v-else small color="blue" title="public">mdi-earth</v-icon>
    </template>  

    <template v-slot:item.actions="{ item }">
      <v-icon class="mr-1" title="edit" @click="$emit('edit', item)">mdi-pencil</v-icon>
      <v-icon class="mr-1" title="remove" @click="$emit('remove', item)">mdi-delete</v-icon>
      <v-icon title="show details" @click="$emit('showdetails', item)">mdi-text-box-outline</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { enums, propsValidators } from '@/common';

export default {
  name: 'AppCollectionList',
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
    }
  },
  data() {
    return {
      itemsPerPage: 5,
      itemsPerPageArray: [5, 10, 15],
      page: 1,
      headers: [
        {
          text: 'Cover',
          sortable: false,
          value: 'coverImage'
        },
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Edition',
          sortable: false,
          value: 'edition'
        },
        {
          text: 'Format',
          value: 'format'
        },
        {
          text: 'Language',
          value: 'language'
        },
        {
          text: 'Visibility',
          align: 'center',
          value: 'private'
        },
        {
          text: 'Actions',
          align: 'end',
          value: 'actions'
        }
      ]
    }
  },
  computed: {
    filteredBooks() {
      return this.books.filter(book => this.subtype ? book.subtypes.includes(this.subtype) : true);
    }
  }
}
</script>