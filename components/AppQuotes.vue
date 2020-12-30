<template>
  <v-row>
    <v-col cols="2" sm="3" md="1"></v-col>
    <v-col cols="8" sm="6" md="10">
      <v-card max-width="800" class="mx-auto">
        <div class="d-flex flex-column flex-md-row justify-center justify-md-space-between align-center">
          <v-avatar tile size="300" class="ma-3 rounded">
            <v-img :src="picture" position="top center"></v-img>
          </v-avatar>
          <v-card-text style="height: 300px;" class="d-flex flex-column">
            <div class="flex-grow-1 d-flex flex-column justify-center align-center align-md-start">
              <blockquote class="blockquote">
                &#8220;{{ quote }}.&#8221;
                <footer>
                  <small>
                    <em>&mdash;{{ author }}</em>
                  </small>
                </footer>
              </blockquote>
            </div>
            <div class="d-flex flex-row justify-end align-end">
              <v-btn icon @click.stop="decrement()">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn icon @click.stop="increment()">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </v-card-text>
        </div>
      </v-card>
    </v-col>
    <v-col cols="2" sm="3" md="1"></v-col>
  </v-row>
</template>

<script>
import quotes from '@/assets/quotes';

export default {
  name: 'AppQuotes',
  data() {
    return {
      quotes: [],
      index: 0
    }
  },
  computed: {
    quote() {
      return this.quotes.length ? this.quotes[this.index].quote : 'n/c';
    },
    author() {
      return this.quotes.length ? this.quotes[this.index].author: 'n/c';
    },
    picture() {
      return this.quotes.length ? this.quotes[this.index].picture: '';
    }
  },
  methods: {
    decrement() {
      this.index--;
      if (this.index < 0) {
        this.index = this.quotes.length - 1;
      } else {
        this.index %= this.quotes.length;
      }
    },
    increment() {
      this.index = ++this.index % this.quotes.length;
    },
    todays() {
      this.index = new Date().getDate() % this.quotes.length;
    }
  },
  created() {
    this.quotes = quotes || [];
    this.todays();
  }
}
</script>
