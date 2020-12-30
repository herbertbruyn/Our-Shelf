<template>
  <div>
    <app-filter-bar class="mx-md-16 mb-4"
      :title="$auth.user.collectionName"
      :search="search"
      :subtype="subtype"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :layout="layout"
      :disabled="updating"
      @searchchange="searchChangeHandler"
      @subtypechange="subtypeChangeHandler"
      @sortbychange="sortByChangeHandler"
      @sortdescchange="sortDescChangeHandler"
      @layoutchange="layout = $event"
    ></app-filter-bar>
    <v-card class="mx-md-16" :loading="updating" :disabled="updating">
      <v-card-title>
        <div>
          <v-chip label>
            <v-icon>mdi-bookshelf</v-icon>
            <span v-if="books.length === 0">no books</span>
            <span v-else-if="books.length === 1">one book</span>
            <span v-else>{{ books.length }} books</span>
          </v-chip>
        </div>
        <div class="ml-auto">
          <v-btn color="success" @click="add()">
            <span class="mr-3">New Book</span>
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <app-collection-dashboard v-if="layout === 0" 
          :books="books"
        ></app-collection-dashboard>
        <app-collection-list v-else-if="layout === 1"
          :books="books"
          :search="search"
          :subtype="subtype"
          :sort-by="sortBy || 'title'"
          :sort-desc="sortDesc"
          @edit="edit"
          @remove="remove"
          @showdetails="showDetails"
        ></app-collection-list>
        <app-collection-grid v-else
          :books="books"
          :search="search"
          :subtype="subtype"
          :sort-by="sortBy || 'title'"
          :sort-desc="sortDesc"
          @edit="edit"
          @remove="remove"
          @showdetails="showDetails"
        ></app-collection-grid>
      </v-card-text>
    </v-card>
    <app-book-details v-if="selected" v-model="showDetailsDialog" :book="selected"></app-book-details>
    <app-confirmation-dialog v-if="selected" v-model="confirmationDialog" @accept="deleteHandler($event)">
      <p class="text-body-1">
        Are you sure you want to permanently remove <span class="font-weight-bold">{{ selected.title }}</span>?
      </p>
    </app-confirmation-dialog>
  </div>
</template>

<script>

export default {
  name: 'AppUserCollection',
  data() {
    return {
      updating: false,
      showDetailsDialog: false,
      confirmationDialog: false,
      bookForm: false,
      selected: null,
      layout: 2,
      search: null,
      subtype: null,
      sortBy: '',
      sortDesc: false
    }
  },
  computed: {
    books() {
      return this.$store.state.books.collection;
    }
  },
  methods: {
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
    add() {
      this.selected = null;
      this.bookForm = true;
    },
    edit(book) {
      this.selected = book;
      this.bookForm = true;
    },
    remove(book) {
      this.selected = book;
      this.confirmationDialog = true;
    },
    showDetails(book) {
      this.selected = book;
      this.showDetailsDialog = true;
    },
    async create(bookInfo) {
      this.updating = true;
      try { 
        await this.$store.dispatch('books/create', bookInfo);
        this.$notifySuccess('Book created!'); 
      } catch (e) {
        this.$notifyError(e.message);
      }
      this.updating = false;
    },
    async update(bookInfo) {
      this.updating = true;
      try { 
        await this.$store.dispatch('books/update', { id: this.selected._id, bookInfo });
        this.$notifySuccess('Book updated!'); 
      } catch (e) {
        this.$notifyError(e.message);
      }
      this.updating = false;
    },
    async deleteHandler(yes) {
      this.updating = false;
      if (!yes) { return }
      this.updating = true;
      try { 
        let response = await this.$store.dispatch('books/delete', this.selected._id); 
        this.$notifyInfo(response.message || 'Book deleted!'); 
      } catch (e) {
        this.$notifyError(e.message);
      }
      this.updating = false;
    }
  }
}
</script>
