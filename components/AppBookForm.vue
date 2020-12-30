<template>
  <v-form ref="bookForm">
    <v-card>

    </v-card>
  </v-form>
</template>

<script>
import { entities, enums, bookValidator, imageUrlExists } from '@/common';
const { Book } = entities;

export default {
  name: 'AppBookForm',
  props: {
    book: {
      type: Object,
      required: false,
      default: null,
      validator: book => bookValidator(book)
    }
  },
  data() {
    return {
      updating: false,
      valid: false,
      touched: false,
      picker: false,
      bookInfo: {
        isbn10: null,
        isbn13: null,
        title: null,
        description: null,
        coverImage: null,
        format: null,
        language: null,
        authors: [],
        publishers: [],
        edition: null,
        pages: null,
        publishYear: null,
        publishDate: null,
        private: false,
        stars: null,
        type: null,
        subtypes: [],
        keywords: [],
        owner: null,
        ownersReview: null
      },
      rules: {
        isbn10: [],
        isbn13: [],
        title: [],
        description: [],
        coverImage: [],
        format: [],
        language: [],
        authors: [],
        publishers: [],
        edition: [],
        pages: [],
        publishYear: [],
        publishDate: [],
        private: [],
        stars: [],
        type: [],
        subtypes: [],
        keywords: [],
        owner: [],
        ownersReview: []
      }
    }
  },
  computed: {
    editMode() {
      return this.book !== null;
    }
  },
  methods: {
    reset() {
      if (this.$refs.bookForm) {
        this.$refs.bookForm.reset();
      }
      this.$nextTick(() => {
        this.bookInfo.isbn10 = this.book.isbn10 || '';
        this.bookInfo.isbn13 = this.book.isbn13 || '';
        this.bookInfo.title = this.book.title || '';
        this.bookInfo.description = this.book.description || '';
        this.bookInfo.coverImage = this.book.coverImage || '';
        this.bookInfo.format = this.book.format || '';
        this.bookInfo.language = this.book.language || '';
        this.bookInfo.authors = this.book.authors || [];
        this.bookInfo.publishers = this.book.publishers || [];
        this.bookInfo.edition = this.book.edition || '';
        this.bookInfo.pages = this.book.pages || 0;
        this.bookInfo.publishYear = this.book.publishYear || '';
        this.bookInfo.publishDate = this.book.publishDate || '';
        this.bookInfo.private = (this.book.private === true || this.book.private === false) ? this.book.private : false;
        this.bookInfo.stars = this.book.stars || 0;
        this.bookInfo.type = this.book.type || null;
        this.bookInfo.subtypes = this.book.subtypes || [];
        this.bookInfo.keywords = this.book.keywords || [];
        this.bookInfo.ownersReview = this.book.ownersReview || '';
        this.touched = false;
      });
    },
    equals(a, b) {
      return JSON.stringify(a) === JSON.stringify(b);
    },
    checkFields() {
      this.touched = this.editMode 
          && !(this.equals(this.bookInfo.isbn10, this.book.isbn10) || (this.equals(this.bookInfo.isbn13, this.book.isbn13)))
          || !this.equals(this.bookInfo.title, this.book.title)
          || !this.equals(this.bookInfo.description, this.book.description)
          || !this.equals(this.bookInfo.coverImage, this.book.coverImage)
          || !this.equals(this.bookInfo.format, this.book.format)
          || !this.equals(this.bookInfo.language, this.book.language)
          || !this.equals(this.bookInfo.authors, this.book.authors || [])
          || !this.equals(this.bookInfo.publishers, this.book.publishers || [])
          || !this.equals(this.bookInfo.edition, this.book.edition)
          || !this.equals(this.bookInfo.pages, this.book.pages)
          || !this.equals(this.bookInfo.publishDate, this.book.publishDate)
          || !this.equals(this.bookInfo.private, this.book.private)
          || !this.equals(this.bookInfo.stars, this.book.stars)
          || !this.equals(this.bookInfo.type, this.book.type)
          || !this.equals(this.bookInfo.subtypes, this.book.subtypes || [])
          || !this.equals(this.bookInfo.keywords, this.book.keywords)
          || !this.equals(this.bookInfo.ownersReview, this.book.ownersReview);
    },
    cancel() {
      this.reset();
    },
    async validateImageUrl(url) {
      return await imageUrlExists(url);
    }
  },
  mounted() {
    this.reset();
    this.rules.isbn10 = this.$createRules('required|isbn10');
    this.rules.isbn13 = this.$createRules('required|isbn13');
    this.rules.title = this.$createRules('required|minLength:5|maxLength:100');
    this.rules.description = this.$createRules('required|maxLength:2000');
    this.rules.coverImage = this.$createRules('required');
    this.rules.format = this.$createRules('required');
    this.rules.language = this.$createRules('required');
    this.rules.authors = this.$createRules('required|minLength:1');
    this.rules.publishers = this.$createRules('required|minLength:1');
    this.rules.edition = this.$createRules('required|maxLength:50');
    this.rules.publishDate = this.$createRules('required');
    this.rules.stars = this.$createRules('required|min:0|max:5');
    this.rules.type = this.$createRules('required');
    this.rules.subtypes = this.$createRules('required|minLength:1');
    this.rules.ownersReview = this.$createRules('maxLength:5000');
  }
}
</script>