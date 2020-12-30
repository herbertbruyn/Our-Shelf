<template>
  <v-dialog :value="value" persistent max-width="80%">
    <v-card>
      <v-card-title class="headline brown lighten-5 brown--text text--darken-4">
        Book Details
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col md="auto">
            <v-img :src="book.coverImage" width="300" height="450" position="top center"></v-img>
          </v-col>
          <v-col>
            <div class="text-h4 font-weight-bold">{{ book.title }}</div>
            <div class="text-subtitle-1">{{ book.authors.map(author => author.name).join(', ') }}</div>
            <div class="text-subtitle-1">{{ book.publishers.map(publisher => publisher.name).join(', ') }}</div>
            <div class="text-subtitle-1">{{ book.edition }}</div>
            <div class="text-subtitle-1">{{ book.publishYear }}, {{ book.publishPlace }}</div>
            <div class="text-subtitle-1">{{ book.format }}</div>
            <v-rating
              class="text-left"
              :value="book.stars" 
              color="orange"
              background-color="orange lighten-3" 
              length="5" 
              dense
              readonly
            ></v-rating>
            <div>
              <v-chip v-if="book.private" small label color="secondary" class="mt-2 mr-1">private</v-chip>
              <v-chip v-else small label color="primary" class="mt-2 mr-1">public</v-chip>
            </div>
            <div>
              <v-chip small label color="secondary" class="mt-2 mr-1">{{ book.language.toLowerCase() }}</v-chip>
              <v-chip small label color="secondary" class="mt-2 mr-1">{{ book.type.toLowerCase() }}</v-chip>
            </div>
            <div>
              <v-chip v-for="subtype in book.subtypes" :key="subtype" small label color="warning" class="mt-2 mr-1">{{ subtype.toLowerCase() }}</v-chip>
            </div>
            <div>
              <v-chip v-for="word in book.keywords" :key="word" small label class="mt-2 mr-1">{{ word.toLowerCase() }}</v-chip>
            </div>
          </v-col>
        </v-row>
        <v-row class="py-3">
          <v-col style="line-height: 1;">
            <div class="text-body-2">{{ book.description }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn large depressed color="primary" @click="$emit('input', false)">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { bookValidator } from '@/common';

export default {
  name: "AppBookDetails",
  props: {
    book: {
      type: Object,
      required: true,
      validator: book => bookValidator(book)
    },
    value: {
      type: Boolean,
      default: false
    }
  }
};
</script>