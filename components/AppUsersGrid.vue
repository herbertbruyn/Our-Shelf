<template>
  <v-data-iterator
    :items="filteredUsers"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    :search="search"
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="sortDesc"
  >
    <template v-slot:default="{ items }">
      <v-item-group active-class="primary" @change="$emit('select', $event ? $event : null)">
        <div class="d-flex flex-wrap justify-start">
          <div v-for="user in items" :key="user.email" class="ma-1">
            <v-item v-slot="{ active, toggle }" :value="user">
              <app-user-card 
                :user="user"
                :active="active"
                @click="toggle"
              ></app-user-card>
            </v-item>
          </div>
        </div>
      </v-item-group>
    </template>
  </v-data-iterator>
</template>

<script>
import { enums, propsValidators } from '@/common';

export default {
  name: 'AppUsersGrid',
  props: {
    users: {
      type: Array,
      default: () => [],
      validator: arr => {
        return arr.length === 0 
        || arr.every(user => propsValidators.user(user))
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
      default: enums.SORT_KEYS.USERS[0],
      validator: val => enums.SORT_KEYS.USERS.includes(val)
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
    filteredUsers() {
      return this.users.filter(user => {
        return this.letter ? user.name.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').startsWith(this.letter.toUpperCase()) : true
      });
    }
  }
}
</script>