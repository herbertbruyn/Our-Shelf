<template>
  <v-row>
    <v-col cols="12" md="6" class="pb-5">
      <app-collection-chart :dataset="typesDataset" legend legend-position="right" :d3-scale="blues" responsive></app-collection-chart>
    </v-col>
    <v-col cols="12" md="6" class="pb-5">
      <app-collection-chart :dataset="subtypesDataset" legend legend-position="right" :d3-scale="inferno" responsive></app-collection-chart>
    </v-col>
  </v-row>
</template>

<script>
import { interpolateBlues } from 'd3-scale-chromatic';
import { interpolateOranges } from 'd3-scale-chromatic';
import { interpolateInferno } from 'd3-scale-chromatic';

import { propsValidators } from '@/common';

export default {
  name: 'UserCollectionDashboard',
  props: {
    books: {
      type: Array,
      required: true,
      validator: arr => {
        return arr.length === 0
        || arr.every(book => propsValidators.book(book));
      }
    }
  },
  data() {
    return {
      blues: interpolateBlues,
      oranges: interpolateOranges,
      inferno: interpolateInferno,
    }
  },
  computed: {
    fiction() {
      return this.books.filter(book => book.type === 'FICTION').length;
    },
    nonFiction() {
      return this.books.filter(book => book.type === 'NON-FICTION').length;
    },
    typesDataset() {
      return this.fiction > 0 || this.nonFiction > 0
      ? {
        labels: [ 'Fiction', 'Non-Fiction' ],
        data: [ this.fiction, this.nonFiction ]
      }
      : { data: [], labels: [] }
    },
    subtypesDataset() {
      let categories = this.books.reduce((result, item) => {
        item.subtypes.forEach(subtype => {
          result[subtype] = result[subtype] ? result[subtype] + 1 : 1; 
        });
        return result;
      }, {});
      return Object.keys(categories).reduce((result, category) => {
        result.data.push(categories[category]);
        result.labels.push(category);
        return result;
      }, { data: [], labels: [] })
    }
  }
}
</script>