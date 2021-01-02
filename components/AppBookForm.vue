<template>
  <v-form ref="bookForm" v-model="valid" :disabled="searching">
    <v-card :loading="searching">
      <v-card-title class="headline brown lighten-5 brown--text text--darken-4">
        <v-icon large class="mr-1">mdi-bookshelf</v-icon>
        <span v-if="isNew">Insert New Book</span>
        <span v-else>Edit Book</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-12">
        <v-row>
          <v-col cols="12" md="4" class="py-0">
            <v-row>
              <v-col class="py-0">
                <app-image-input 
                  required 
                  height="400" 
                  width="auto"
                  v-model="formData.coverImage"
                  :rules="rules.coverImage"
                ></app-image-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0">
                <v-text-field ref="isbn"
                  v-model="isbn"
                  dense 
                  outlined
                  :clearable="isNew"
                  :readonly="!isNew"
                  label="ISBN"
                  placeholder=" "
                  v-mask="['###-##-####-###-#', '##-####-###-X']"
                  :rules="rules.isbn"
                  autocomplete="off"
                  :append-outer-icon="isNew ? 'mdi-amazon' : ''"
                  @click:append-outer="getBookData"
                  @input="checkForm()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0">
                <v-rating
                  class="text-center"
                  v-model="formData.stars" 
                  dense
                  clearable
                  color="orange"
                  background-color="orange lighten-3" 
                  length="5" 
                  @input="checkForm()"
                ></v-rating>
              </v-col>
              <v-col class="py-0">
                <v-checkbox class="my-0"
                  v-model="formData.private"
                  hide-details
                  dense
                  label="Private"
                  @change="checkForm()"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="8" class="py-0">
            <v-row>
              <v-col class="py-0">
                <v-text-field
                  v-model="formData.title"
                  dense 
                  outlined
                  clearable
                  label="Book's title"
                  placeholder=" "
                  :rules="rules.title"
                  autocomplete="off"
                  @input="checkForm()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0">
                <v-combobox
                  v-model="formData.authors"
                  :items="authors"
                  dense
                  outlined
                  multiple
                  clearable
                  chips
                  deletable-chips
                  hide-selected
                  label="Authors"
                  placeholder=" "
                  :rules="rules.authors"
                  autocomplete="off"
                  @change="checkForm()"
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0">
                <v-combobox
                  v-model="formData.publishers"
                  :items="publishers"
                  dense
                  outlined
                  multiple
                  clearable
                  chips
                  deletable-chips
                  hide-selected
                  label="Publishers"
                  placeholder=" "
                  :rules="rules.publishers"
                  autocomplete="off"
                  @change="checkForm()"
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4" class="py-0">
                <v-text-field
                  v-model="formData.edition"
                  dense 
                  outlined
                  clearable
                  label="Edition"
                  placeholder=" "
                  :rules="rules.edition"
                  autocomplete="off"
                  @input="checkForm()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="py-0">
                <app-date-picker
                  v-model="formData.publishDate"
                  label="Publish date"
                  placeholder=" "
                  min="0000-01-01"
                  :max="new Date().toJSON().slice(0, 10)"
                  :rules="rules.publishDate"
                  @input="checkForm()"
                ></app-date-picker>
              </v-col>
              <v-col cols="12" md="4" class="py-0">
                <v-text-field
                  v-model.number="formData.pages"
                  dense 
                  outlined
                  clearable
                  label="Pages"
                  placeholder=" "
                  :rules="rules.pages"
                  autocomplete="off"
                  @input="checkForm()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" class="py-0">
                <v-combobox
                  v-model="formData.format"
                  :items="formats"
                  dense
                  outlined
                  clearable
                  label="Format"
                  placeholder=" "
                  :rules="rules.format"
                  @change="checkForm()"
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <v-select
                  v-model="formData.language"
                  :items="languages"
                  dense
                  outlined
                  clearable
                  label="Language"
                  placeholder=" "
                  :rules="rules.language"
                  @change="checkForm()"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0 d-flex align-start">
                <v-checkbox class="mr-4 mt-1 shrink"
                  v-model="fiction"
                  hide-details
                  dense
                  label="Fiction"
                  @input="checkForm()"
                  @change="formData.subtypes = null"
                ></v-checkbox>
                <v-select
                  v-model="formData.subtypes"
                  :items="fiction ? fictionSubtypes : nonFictionSubtypes"
                  dense
                  outlined
                  multiple
                  clearable
                  label="Subtypes"
                  placeholder=" "
                  :rules="rules.subtypes"
                  @change="checkForm()"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0">
                <v-textarea
                  v-model="formData.description" 
                  outlined
                  dense
                  no-resize
                  label="A short description"
                  placeholder=" "
                  rows="4"
                  :counter="2000"
                  :rules="rules.description"
                  autocomplete="off"
                  @input="checkForm()"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-combobox
              v-model="formData.keywords"
              :items="formData.keywords || []"
              dense
              outlined
              multiple
              clearable
              chips
              deletable-chips
              hide-selected
              label="Keywords"
              placeholder=" "
              :rules="rules.keywords"
              autocomplete="off"
              @change="checkForm()"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-textarea
              v-model="formData.ownersReview" 
              outlined
              dense
              no-resize
              label="Your personal review of the book"
              placeholder=" "
              rows="7"
              :counter="5000"
              :rules="rules.ownersReview"
              autocomplete="off"
              @input="checkForm()"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-8 pb-8">
        <v-btn large icon @click="reset()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <div class="ml-auto">
          <v-btn x-large outlined class="mr-4" color="grey" @click="cancel()">cancel</v-btn>
          <v-btn x-large depressed class="ml-2" 
            :class="!valid || !touched ? '' : (isNew ? 'primary' : 'success')" 
            :disabled="!valid || !touched" 
            @click="submit()">
            <span v-if="isNew">Create</span>
            <span v-else>Update</span>
            <v-icon v-if="isNew" class="ml-2">mdi-plus-circle-outline</v-icon>
            <v-icon v-else class="ml-2">mdi-content-save</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mask } from 'vue-the-mask';
import { enums, entities, propsValidators, formRules, equals, cropClone, from10To13, from13To10, validateIsbn10, validateIsbn13 } from '@/common';
const { Book } = entities;

export default {
  name: 'AppBookForm',
  directives: {
    mask
  },
  props: {
    book: {
      type: Object,
      required: false,
      default: null,
      validator: book => propsValidators.book(book)
    },
    authors: {
      type: Array,
      default: () => []      
    },
    publishers: {
      type: Array,
      default: () => []      
    }
  },
  data() {
    return {
      valid: false,
      touched: false,
      searching: false,
      isbn: null,
      fiction: true,
      formData: { ...Book },
      initial: { ...Book },
      rules: formRules.book,
      formats: enums.FORMAT,
      languages: enums.LANGUAGE,
      fictionSubtypes: enums.FICTION,
      nonFictionSubtypes: enums.NON_FICTION,
    }
  },
  watch: {
    book(val) {
      this.setInitial();
      this.reset();
    }
  },
  computed: {
    isNew() {
      return this.book === null;
    }
  },
  methods: {
    setInitial() {
      this.initial = this.book === null ? { ...Book } : cropClone(this.book, Book);
      this.isbn = this.book === null ? null : this.book.isbn13;
      this.fiction = this.book === null ? false : this.book.type === 'FICTION';
    },
    resetFormData() {
      this.formData = this.isNew ? { ...Book } : { ...this.initial };
      this.isbn = this.book === null ? null : this.book.isbn13;
      this.fiction = this.book === null ? false : this.book.type === 'FICTION';
    },
    reset() {
      if (this.$refs.bookForm) this.$refs.bookForm.reset();
      this.$nextTick(() => {
        this.resetFormData();
        this.checkForm();
      });
    },
    checkForm() {
      this.touched = this.isNew || !equals(this.formData, this.initial);
    },
    async getBookData() {
      const input = this.$refs.isbn.$el.querySelector('input');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      if (this.$refs.isbn.validationState !== 'error') {
        this.searching = true;

        let bookData;
        try { bookData = await this.$store.dispatch('books/search', this.isbn);
        } catch (e) { 
          if (this.$nuxt.context.isDev) console.log(e);
          this.$notifyError(e.message); 
        }

        if (bookData) {
          if (this.$nuxt.context.isDev) console.log(bookData);
          this.formData.title = bookData.title ? bookData.title : this.formData.title;
          this.formData.coverImage = bookData.cover ? bookData.cover : this.formData.coverImage;
          this.formData.description = bookData.content ? bookData.content : this.formData.description;
          this.formData.format = bookData.details.format && enums.FORMAT.includes(bookData.details.format) ? bookData.details.format : this.formData.format;
          this.formData.language = bookData.details.language && enums.LANGUAGE.includes(bookData.details.language) ? bookData.details.language : this.formData.language;
          this.formData.pages = bookData.details.pages ? bookData.details.pages : this.formData.pages;
          this.formData.publishDate = bookData.details.publishDate ? bookData.details.publishDate : this.formData.publishDate;
          if (bookData.details.publisher) {
            if (!this.formData.publishers) {
              this.formData.publishers = [];
            }
            this.formData.publishers.push(bookData.details.publisher)
          };
          if (bookData.details.author) {
            if (!this.formData.authors) {
              this.formData.authors = [];
            }
            this.formData.authors.push(bookData.details.author)
          };
        }
        this.searching = false;
      }
    },
    cancel() {
      this.$emit('cancel');
      this.reset();
    },
    submit() {
      this.$refs.bookForm.validate();
      if (this.valid) {
        let event = this.isNew ? 'add' : 'update';
        const formData = { ...this.formData };
        if (this.isNew) {
          formData.isbn10 = this.isbn.length === 13 ? this.isbn : from13To10(this.isbn); 
          formData.isbn13 = this.isbn.length === 17 ? this.isbn : from10To13(this.isbn); 
        }
        formData.publishYear = Number(this.formData.publishDate.split('-')[0]);
        formData.pages = this.formData.pages ? Number(this.formData.pages) : null;
        formData.type = this.fiction ? 'FICTION' : 'NON_FICTION';
        formData.private = this.formData.private === true;
        this.$emit(event, formData);
        this.reset();
      }
    }
  },
  mounted() {
    this.setInitial();
    this.reset();
  }
}
</script>