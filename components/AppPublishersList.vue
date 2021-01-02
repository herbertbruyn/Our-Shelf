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
    <template v-slot:item.logo="{ item }">
      <v-avatar size="60" class="my-2">
        <v-img :src="item.logo"></v-img>
      </v-avatar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon class="mr-1" title="edit" @click="$emit('edit', item)">mdi-pencil</v-icon>
      <v-icon class="mr-1" title="remove" @click="$emit('remove', item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { enums, propsValidators } from '@/common';

export default {
  name: 'AppPublishersList',
  props: {
    publishers: {
      type: Array,
      default: () => [],
      validator: arr => {
        return arr.length === 0 
        || arr.every(publisher => propsValidators.publisher(publisher))
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
      headers: [
        {
          text: 'Logo',
          sortable: false,
          value: 'logo'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Country',
          value: 'country'
        },
        {
          text: 'Province',
          value: 'province'
        },
        {
          text: 'City',
          value: 'city'
        },
        {
          text: 'Actions',
          sortable: false,
          value: 'actions'
        }
      ],
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