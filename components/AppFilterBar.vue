<template>
  <v-card :disabled="disabled">
    <v-img :height="height"
      class="px-4" 
      :src="require('~/assets/banner.jpg')"
      gradient="to top right, rgba(62, 39, 35, .9), rgba(93, 64, 55, .4)"
    >
      <v-row>
        <v-col cols="12" sm="8" class="d-flex align-center">
          <h1 class="brown--text text--lighten-5 text-h2">{{ title }}</h1>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex justify-center justify-sm-end align-center">
          <v-btn-toggle v-if="type === 'books'"
            :value="layout" 
            mandatory
            @change="$emit('layoutchange', $event)"
          >
            <v-btn>
              <v-icon color="brown darken-4">mdi-chart-donut</v-icon>
            </v-btn>
            <v-btn>
              <v-icon color="brown darken-4">mdi-view-list</v-icon>
            </v-btn>
            <v-btn>
              <v-icon color="brown darken-4">mdi-view-grid</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row v-show="layout !== 0" justify="center" justify-sm="space-between">
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Search" 
            :value="search"
            color="brown darken-5"
            class="brown--text text--darken-5"
            solo
            clearable
            hide-details
            append-icon="mdi-magnify"
            @input="$emit('searchchange', $event)"
          ></v-text-field>
        </v-col>
        <v-col v-if="type === 'books'" cols="12" sm="6" md="3">
          <v-select
            label="Subcategory" 
            :value="subtype" 
            color="brown darken-5"
            class="brown--text text--darken-5"
            solo 
            clearable
            hide-details
            :items="subtypes"
            @input="$emit('subtypechange', $event)"
          ></v-select>
        </v-col>
        <v-col v-else cols="12" sm="6" md="3">
          <v-select
            label="Starting with" 
            :value="letter" 
            color="brown darken-5"
            class="brown--text text--darken-5"
            solo 
            clearable
            hide-details
            :items="letters"
            @input="$emit('letterchange', $event)"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            :value="sortBy"
            color="brown darken-5"
            class="brown--text text--darken-5"
            solo 
            clearable
            hide-details
            :items="keys[type]"
            label="Sort by"
            @input="$emit('sortbychange', $event)"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" class="d-flex justify-center justify-sm-end align-center">
          <v-btn-toggle 
            :value="sortDesc" 
            mandatory
            @change="$emit('sortdescchange', $event)"
          >
            <v-btn depressed :value="false">
              <v-icon color="brown darken-4">mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn depressed :value="true">
              <v-icon color="brown darken-4">mdi-arrow-down</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
import { enums } from '@/common';

export default {
  name: 'AppFilterBar',
  props: {
    type: {
      type: String,
      default: 'books',
      validator: val => [ 'books', 'authors', 'publishers' ].includes(val)
    },
    title: {
      type: String,
      default: 'My Collection'
    },
    search: {
      type: String,
      required: false
    },
    sortBy: {
      type: String,
      default: '',
      validator: val => !val || enums.SORT_KEYS.includes(val)
    },
    sortDesc: {
      type: Boolean,
      default: false
    },
    subtype: {
      type: String,
      required: false
    },
    letter: {
      type: String,
      required: false
    },
    layout: {
      type: Number,
      default: 2
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      subtypes: Array.prototype.concat(enums.FICTION, enums.NON_FICTION).sort(),
      letters: 'ABCDEFGHIJKLMNOPQRSTUVXYWZ'.split(''),
      keys: {
        books: enums.SORT_KEYS.BOOKS,
        authors: enums.SORT_KEYS.AUTHORS,
        publishers: enums.SORT_KEYS.PUBLISHERS
      }
    }
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'auto'
        case 'sm': return '290px'
        case 'md': return '160px'
        case 'lg': return '160px'
        case 'xl': return '160px'
      }
    }
  }
}
</script>