<template>
  <div>
    <app-filter-bar class="mx-md-16 mb-4"
      :title="$auth.user.collectionName"
      :src="require('~/assets/banner.jpg')"
      :search="search"
      :subtype="subtype"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :layouts="['charts', 'list', 'grid']"
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
        <div class="ml-auto d-flex flex-row align-center">
          <v-select v-if="layout === 'grid'"
            class="mr-4"
            solo 
            dense
            hide-details
            label="Size"
            v-model="size"
            :items="['cover', 'small', 'medium', 'large']"
          ></v-select>
          <v-btn color="success" @click="add()">
            <span class="mr-3">New Book</span>
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <app-collection-dashboard v-if="layout === 'charts'" 
          :books="books"
        ></app-collection-dashboard>
        <app-collection-list v-else-if="layout === 'list'"
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
          :size="size"
          @edit="edit"
          @remove="remove"
          @showdetails="showDetails"
        ></app-collection-grid>
      </v-card-text>
    </v-card>
    <v-dialog max-width="900" v-model="show.form">
      <app-book-form
        :book="selected"
        :authors="authors"
        :publishers="publishers"
        @cancel="cancel"
        @add="create"
        @update="update"
      ></app-book-form>
    </v-dialog>
    <app-book-details v-if="selected" v-model="show.details" :book="selected"></app-book-details>
    <app-confirmation-dialog v-if="selected" v-model="show.confirmation" @accept="deleteHandler($event)">
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
      show: {
        form: false,
        confirmation: false,
        details: false
      },
      selected: null,
      layout: 'grid',
      size: 'small',
      search: null,
      subtype: null,
      sortBy: '',
      sortDesc: false
    }
  },
  computed: {
    books() {
      return this.$store.state.books.collection;
    },
    authors() {
      return this.$store.state.authors.list.map(author => author.name);
    },
    publishers() {
      return this.$store.state.publishers.list.map(publisher => publisher.name);
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
    cancel() {
      this.selected = null;
      this.show.form = false;
    },
    add() {
      this.selected = null;
      this.show.form = true;
    },
    edit(book) {
      this.selected = book;
      this.show.form = true;
    },
    remove(book) {
      this.selected = book;
      this.show.confirmation = true;
    },
    showDetails(book) {
      this.selected = book;
      this.show.details = true;
    },
    async create(bookInfo) {
      this.show.form = false;
      this.updating = true;
      try { 
        await this.$store.dispatch('books/create', bookInfo);
        this.$notifySuccess('Book created!'); 
      } catch (e) { this.$notifyError(e.message); }
      this.selected = null;
      this.updating = false;
    },
    async update(bookInfo) {
      this.show.form = false;
      this.updating = true;
      try { 
        await this.$store.dispatch('books/update', { id: this.selected._id, bookInfo });
        this.$notifySuccess('Book updated!'); 
      } catch (e) { this.$notifyError(e.message); }
      this.selected = null;
      this.updating = false;
    },
    async deleteHandler(yes) {
      this.updating = false;
      if (!yes) { return }
      this.updating = true;
      try { 
        let response = await this.$store.dispatch('books/delete', this.selected._id); 
        this.$notifyInfo(response.message || 'Book deleted!'); 
      } catch (e) { this.$notifyError(e.message); }
      this.updating = false;
    }
  }
}
</script>
