<template>
  <div>
    <v-fade-transition>
      <app-filter-bar v-if="user.selected"
        class="mx-md-16 mb-4"
        :title="user.selected.collectionName"
        type="books"
        :src="require('~/assets/banner.jpg')"
        :search="book.search"
        :subtype="book.subtype"
        :sort-by="book.sortBy"
        :sort-desc="book.sortDesc"
        :disabled="updating"
        :layouts="['charts', 'grid']"
        :layout="book.layout"
        @searchchange="searchChangeHandler('book', $event)"
        @subtypechange="subtypeChangeHandler('book', $event)"
        @sortbychange="sortByChangeHandler('book', $event)"
        @sortdescchange="sortDescChangeHandler('book', $event)"
        @layoutchange="layoutChangeHandler('book', $event)"
      ></app-filter-bar>
      <app-filter-bar v-else
        class="mx-md-16 mb-4"
        title="Browse Collections"
        type="users"
        :src="require('~/assets/banner_browser.jpg')"
        :search="user.search"
        :letter="user.letter"
        :sort-by="user.sortBy"
        :sort-desc="user.sortDesc"
        :disabled="updating"
        @searchchange="searchChangeHandler('user', $event)"
        @letterchange="letterChangeHandler('user', $event)"
        @sortbychange="sortByChangeHandler('user', $event)"
        @sortdescchange="sortDescChangeHandler('user', $event)"
      ></app-filter-bar>
    </v-fade-transition>
    <v-row class="mx-md-16">
      <v-col>
        <v-card color="light-blue lighten-4">
          <v-card-title class="text-h4 blue--text text--darken-4">Our Community</v-card-title>
          <v-card-text>
            <app-users-grid 
              :users="users"
              :search="user.search"
              :letter="user.letter"
              :sort-by="user.sortBy || 'name'"
              :sort-desc="user.sortDesc"
              @select="selectUser"
            ></app-users-grid>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-fade-transition>
      <v-row v-if="user.selected" class="mx-md-16">
        <v-col>
          <v-card :loading="updating" :disabled="updating">
            <v-card-title>
              <div>
                <v-chip label>
                  <v-icon>mdi-bookshelf</v-icon>
                  <span v-if="books.length === 0">no books</span>
                  <span v-else-if="books.length === 1">one book</span>
                  <span v-else>{{ books.length }} books</span>
                </v-chip>
              </div>
            </v-card-title>
            <v-card-text>
              <app-collection-dashboard v-if="book.layout === 'charts'" 
                :books="books"
              ></app-collection-dashboard>
              <app-collection-grid v-else
                :books="books"
                :search="book.search"
                :subtype="book.subtype"
                :sort-by="book.sortBy || 'title'"
                :sort-desc="book.sortDesc"
                size="cover"
                @showdetails="showDetails('book', $event)"
              ></app-collection-grid>
            </v-card-text>
          </v-card>
          <app-book-details v-if="book.selected" v-model="book.show" :book="book.selected"></app-book-details>
        </v-col>
      </v-row>
    </v-fade-transition>
  </div>
</template>

<script>

export default {
  name: 'AppUserCollection',
  data() {
    return {
      updating: false,
      index: null,
      books: [],
      book: {
        selected: null,
        show: false,
        search: null,
        subtype: null,
        sortBy: '',
        sortDesc: false,
        layout: 'grid'
      },
      user: {
        selected: null,
        show: false,
        search: null,
        letter: null,
        sortBy: '',
        sortDesc: false
      }
    }
  },
  computed: {
    users() {
      return this.$store.state.users.list;
    }
  },
  methods: {
    async selectUser(user) {
      this.user.selected = user;
      if (this.user.selected === null) return;
      this.updating = true;
      try { this.books = await this.$store.dispatch('books/getUserCollection', this.user.selected.email);
      } catch(e) {
        if (process.client) this.$notifyError(e.message) 
        if (this.$store.state.isDev) console.log(e);
      }
      this.updating = false;
    },
    searchChangeHandler(type, search) {
      this[type].search = search;
      console.log(this.user.search);
    },
    letterChangeHandler(type, letter) {
      this[type].letter = letter;
    },
    subtypeChangeHandler(type, subtype) {
      this[type].subtype = subtype;
    },
    sortByChangeHandler(type, sortBy) {
      this[type].sortBy = sortBy;
    },
    sortDescChangeHandler(type, sortDesc) {
      this[type].sortDesc = sortDesc;
    },
    layoutChangeHandler(type, layout) {
      this[type].layout = layout;
    },
    showDetails(type, data) {
      this[type].selected = data;
      this[type].show = true;
    }
  }
}
</script>
