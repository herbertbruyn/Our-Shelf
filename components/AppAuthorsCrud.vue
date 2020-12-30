<template>
  <div>
    <app-filter-bar class="mx-md-16 mb-4"
      type="authors"
      title="Authors"
      :search="search"
      :letter="letter"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :disabled="updating"
      @searchchange="searchChangeHandler"
      @letterchange="letterChangeHandler"
      @sortbychange="sortByChangeHandler"
      @sortdescchange="sortDescChangeHandler"
    ></app-filter-bar>
    <v-card class="mx-md-16" :loading="updating" :disabled="updating">
      <v-card-title>
        <div>
          <v-chip label>
            <v-icon class="mr-1">mdi-fountain-pen-tip</v-icon>
            <span v-if="authors.length === 0">no authors</span>
            <span v-else-if="authors.length === 1">one author</span>
            <span v-else>{{ authors.length }} authors</span>
          </v-chip>
        </div>
        <div class="ml-auto">
          <v-btn color="success" @click="add()">
            <span class="mr-3">New Author</span>
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <app-authors-grid
          :authors="authors"
          :search="search"
          :letter="letter"
          :sort-by="sortBy || 'name'"
          :sort-desc="sortDesc"
          @edit="edit"
          @remove="remove"
          @showdetails="showDetails"
        ></app-authors-grid>
      </v-card-text>
    </v-card>
    <app-author-details v-if="selected" v-model="show.details" :book="selected"></app-author-details>
    <v-dialog max-width="900" v-model="form">
      <app-author-form
        :author="selected"
        @cancel="form = false"
        @add="create"
        @update="update"
      ></app-author-form>
    </v-dialog>
    <app-confirmation-dialog v-if="selected" v-model="show.confirmation" @accept="deleteHandler($event)">
      <p class="text-body-1">
        Are you sure you want to permanently remove <span class="font-weight-bold">{{ selected.name }}</span>?
      </p>
    </app-confirmation-dialog>
  </div>
</template>

<script>
export default {
  name: 'AppAuthorsCrud',
  data() {
    return {
      updating: false,
      show: {
        confirmation: false,
        details: false
      },
      form: false,
      selected: null,
      search: null,
      letter: null,
      sortBy: '',
      sortDesc: false
    }
  },
  computed: {
    authors() {
      return this.$store.state.authors.list;
    }
  },
  methods: {
    searchChangeHandler(search) {
      this.search = search;
    },
    letterChangeHandler(letter) {
      this.letter = letter;
    },
    sortByChangeHandler(sortBy) {
      this.sortBy = sortBy;
    },
    sortDescChangeHandler(sortDesc) {
      this.sortDesc = sortDesc;
    },
    add() {
      this.selected = null;
      this.form = true;
    },
    edit(author) {
      this.selected = author;
      this.form = true;
    },
    remove(author) {
      this.selected = author;
      this.show.confirmation = true;
    },
    showDetails(author) {
      this.selected = author;
      this.show.details = true;
    },
    async create(authorInfo) {
      this.updating = true;
      try { 
        await this.$store.dispatch('authors/create', authorInfo);
        this.$notifySuccess('Author created!'); 
      } catch (e) {
        this.$notifyError(e.message);
      }
      this.updating = false;
    },
    async update(authorInfo) {
      this.updating = true;
      try { 
        await this.$store.dispatch('authors/update', { id: this.selected._id, authorInfo });
        this.$notifySuccess('Author updated!'); 
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
        let response = await this.$store.dispatch('authors/delete', this.selected._id); 
        this.$notifyInfo(response.message || 'Author deleted!'); 
      } catch (e) {
        this.$notifyError(e.message);
      }
      this.updating = false;
    }
  }
}
</script>
