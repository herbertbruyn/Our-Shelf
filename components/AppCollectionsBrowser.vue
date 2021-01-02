<template>
  <div>
    <app-filter-bar class="mx-md-16 mb-4"
      title="Browse Collections"
      type="collections"
      :src="require('~/assets/banner_browser.jpg')"
      :search="search"
      :subtype="subtype"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :disabled="updating"
      @searchchange="searchChangeHandler"
      @subtypechange="subtypeChangeHandler"
      @sortbychange="sortByChangeHandler"
      @sortdescchange="sortDescChangeHandler"
    ></app-filter-bar>
    <v-row class="mx-md-16">
      <v-col cols="12" md="4" lg="3" xl="2">
        <v-card color="light-blue lighten-4">
          <v-card-title>Our Community</v-card-title>
          <v-card-text>
            <v-list two-line dense tile>
              <v-list-item-group @change="selectUser">
                <template v-for="(user, index) in users">
                  <v-list-item :key="user.email" :title="user.collectionName">
                    <v-list-item-avatar>
                      <v-img :src="user.picture"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ user.collectionName }}</v-list-item-title>
                      <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider
                    v-if="index < users.length - 1"
                    :key="index"
                  ></v-divider>                  
                </template>              
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="9" xl="10">
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
            <app-collection-grid
              :books="books"
              :search="search"
              :subtype="subtype"
              :sort-by="sortBy || 'title'"
              :sort-desc="sortDesc"
              readonly
              @showdetails="showDetails"
            ></app-collection-grid>
          </v-card-text>
        </v-card>
        <app-book-details v-if="selected.book" v-model="show.book" :book="selected.book"></app-book-details>

      </v-col>
    </v-row>
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
      show: {
        book: false,
        user: false
      },
      selected: {
        book: null,
        user: null
      },
      search: null,
      subtype: null,
      sortBy: '',
      sortDesc: false
    }
  },
  computed: {
    users() {
      return this.$store.state.users.list;
    }
  },
  methods: {
    async selectUser(index) {
      this.selected.user = this.users[index];
      this.updating = true;
      try { this.books = await this.$store.dispatch('books/getUserCollection', this.selected.user.email);
      } catch(e) {
        if (process.client) this.$notifyError(e.message) 
        if (this.$store.state.isDev) console.log(e);
      }
      this.updating = false;
    },
    searchChangeHandler(search) {
      this.search = search;
    },
    subtypeChangeHandler(subtype) {
      this.subtype = subtype;
    },
    sortByChangeHandler(sortBy) {
      this.sortBy = sortBy;
    },
    sortDescChangeHandler(sortDesc) {
      this.sortDesc = sortDesc;
    },
    showDetails(book) {
      this.selected.book = book;
      this.show.book = true;
    }
  }
}
</script>
