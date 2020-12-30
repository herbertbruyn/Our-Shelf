<template>
  <div>
    <app-filter-bar class="mx-md-16 mb-4"
      type="publishers"
      title="Publishers"
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
            <v-icon>mdi-domain</v-icon>
            <span v-if="publishers.length === 0">no publishers</span>
            <span v-else-if="publishers.length === 1">one publisher</span>
            <span v-else>{{ publishers.length }} publishers</span>
          </v-chip>
        </div>
        <div class="ml-auto">
          <v-btn color="success" @click="add()">
            <span class="mr-3">New Publisher</span>
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <app-publishers-list
          :publishers="publishers"
          :search="search"
          :letter="letter"
          :sort-by="sortBy || 'name'"
          :sort-desc="sortDesc"
          @edit="edit"
          @remove="remove"
        ></app-publishers-list>
      </v-card-text>
    </v-card>
    <v-dialog v-model="form">
      <app-publisher-form
        :publisher="selected"
        @cancel="form = false"
        @add="create"
        @update="update"
      ></app-publisher-form>
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
  name: 'AppPublishersCrud',
  data() {
    return {
      updating: false,
      show: {
        confirmation: false
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
    publishers() {
      return this.$store.state.publishers.list;
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
    edit(publisher) {
      this.selected = publisher;
      this.form = true;
    },
    remove(publisher) {
      this.selected = publisher;
      this.show.confirmation = true;
    },
    async create(publisherInfo) {
      this.updating = true;
      try { 
        await this.$store.dispatch('publishers/create', publisherInfo);
        this.$notifySuccess('Publisher created!'); 
      } catch (e) {
        this.$notifyError(e.message);
      }
      this.updating = false;
    },
    async update(publisherInfo) {
      this.updating = true;
      try { 
        await this.$store.dispatch('publishers/update', { id: this.selected._id, publisherInfo });
        this.$notifySuccess('Publisher updated!'); 
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
        let response = await this.$store.dispatch('publishers/delete', this.selected._id); 
        this.$notifyInfo(response.message || 'Publisher deleted!'); 
      } catch (e) {
        this.$notifyError(e.message);
      }
      this.updating = false;
    }
  }
}
</script>
