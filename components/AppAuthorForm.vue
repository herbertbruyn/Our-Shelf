<template>
  <v-form ref="authorForm">
    <v-card>
      <v-card-title class="headline brown lighten-5 brown--text text--darken-4">
        <span v-if="isNew">Insert New Author</span>
        <span v-else>Edit Author</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-12">
        <v-row>
          <v-col cols="12" sm="4" class="d-flex flex-column justify-center align-center">
            <v-card v-if="authorInfo.picture && !pictureValid" flat width="250" height="350">
              <v-card-text style="height: 350px; border: 1px solid lightgrey;" class="d-flex align-center justify-center">
                <div style="width: 120px; height: 120px; border: 4px solid lightgrey;" class="d-flex align-center justify-center subtitle-1 rounded-circle text-center">
                  Invalid URI
                </div>
              </v-card-text>
            </v-card>
            <v-img v-else-if="authorInfo.picture"
              :src="authorInfo.picture" 
              width="250" 
              height="350" 
              position="top center"
            ></v-img>
            <v-card v-else flat width="250" height="350">
              <v-card-text style="height: 350px; border: 1px solid lightgrey;" class="d-flex align-center justify-center">
                <div style="width: 120px; height: 120px; border: 4px solid lightgrey;" class="d-flex align-center justify-center subtitle-1 rounded-circle text-center">
                  No Image Available
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="authorInfo.name"
                  outlined
                  label="Name"
                  placeholder=" "
                  :rules="rules.name"
                  @input="checkFields()"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-menu
                  v-model="picker.birth"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="authorInfo.birthDate"
                      label="Date of birth"
                      placeholder=" "
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      outlined 
                      clearable
                      v-bind="attrs"
                      v-on="on"
                      @input="checkFields()"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="authorInfo.birthDate"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1900-01-01"
                    @input="picker.birth = false"
                    @change="checkFields()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="authorInfo.birthPlace"
                  outlined
                  label="Place of birth"
                  placeholder=" "
                  :rules="rules.birthPlace"
                  @input="checkFields()"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-menu
                  v-model="picker.death"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="authorInfo.deathDate"
                      label="Date of death"
                      placeholder=" "
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      outlined 
                      clearable
                      v-bind="attrs"
                      v-on="on"
                      @input="checkFields()"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="authorInfo.deathDate"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1900-01-01"
                    @input="picker.death = false"
                    @change="checkFields()"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="authorInfo.deathPlace"
                  outlined
                  label="Place of death"
                  placeholder=" "
                  :rules="rules.deathPlace"
                  @input="checkFields()"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="authorInfo.picture" 
                  outlined
                  label="Paste the image uri" 
                  placeholder=" " 
                  @input="checkFields()"
                  @change="validateImageUrl"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="authorInfo.shortBiography" 
              outlined
              label="A short biography"
              placeholder=" "
              auto-grow
              :counter="1000"
              :rules="rules.shortBiography"
              @input="checkFields()"
            >
            </v-textarea>
          </v-col>
          <pre>{{ pictureValid }}</pre>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-4 pb-5">
        <v-btn large icon @click="reset()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <div class="ml-auto">
          <v-btn large text @click="cancel()">cancel</v-btn>
          <v-btn large text class="ml-2" 
            :class="!valid || !touched ? '' : (isNew ? 'primary' : 'success')" 
            :disabled="!valid || !touched" 
            @click="submit()">
            <span v-if="isNew">Create</span>
            <span v-else>Update</span>
            <v-icon v-if="isNew" small class="ml-2">mdi-plus-circle-outline</v-icon>
            <v-icon v-else small class="ml-2">mdi-content-save</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { entities, enums, authorValidator, imageUrlExists } from '@/common';
const { Author } = entities;

export default {
  name: 'AppAuthorForm',
  props: {
    author: {
      type: Object,
      required: false,
      default: null,
      validator: author => authorValidator(author)
    }
  },
  data() {
    return {
      valid: false,
      touched: false,
      picker: {
        birth: false,
        death: false
      },
      pictureValid: false,
      authorInfo: {
        name: null,
        picture: null,
        birthDate: null,
        deathDate: null,
        birthPlace: null,
        deathPlace: null,
        shortBiography: null
      },
      rules: {
        name: [],
        picture: [],
        birthDate: [],
        deathDate: [],
        birthPlace: [],
        deathPlace: [],
        shortBiography: []
      }
    }
  },
  computed: {
    isNew() {
      return this.author === null;
    }
  },
  methods: {
    reset() {
      if (this.$refs.authorForm) {
        this.$refs.authorForm.reset();
      }
      this.$nextTick(() => {
        this.authorInfo.name = this.author && this.author.name || '';
        this.authorInfo.picture = this.author && this.author.picture || '';
        this.authorInfo.birthDate = this.author && this.author.birthDate || '';
        this.authorInfo.deathDate = this.author && this.author.deathDate || '';
        this.authorInfo.birthPlace = this.author && this.author.birthPlace || '';
        this.authorInfo.deathPlace = this.author && this.author.deathPlace || '';
        this.authorInfo.shortBiography = this.author && this.author.shortBiography || '';
        this.touched = false;
      });
    },
    equals(a, b) {
      return JSON.stringify(a) === JSON.stringify(b);
    },
    checkFields() {
      this.touched = this.isNew 
          || !this.equals(this.authorInfo.name, this.author.name)
          || !this.equals(this.authorInfo.picture, this.author.picture)
          || !this.equals(this.authorInfo.birthDate, this.author.birthDate)
          || !this.equals(this.authorInfo.deathDate, this.author.deathDate)
          || !this.equals(this.authorInfo.birthPlace, this.author.birthPlace)
          || !this.equals(this.authorInfo.deathPlace, this.author.deathPlace)
          || !this.equals(this.authorInfo.shortBiography, this.author.shortBiography)
    },
    async validateImageUrl(url) {
      
      return this.pictureValid = await imageUrlExists(url);
    },
    cancel() {
      this.reset();
      this.$emit('cancel');
    },
    submit() {
      if (this.isNew) {
        this.$emit('add', this.authorInfo);
      } else {
        this.$emit('update', this.authorInfo);        
      }
    }
  },
  mounted() {
    this.reset();
    this.rules.name = this.$createRules('required|minLength:5|maxLength:50');
    this.rules.picture = [() => this.pictureValid || 'Picture URI is invalid'];
    this.rules.birthPlace = this.$createRules('maxLength:50');
    this.rules.deathPlace = this.$createRules('maxLength:50');
    this.rules.shortBiography = this.$createRules('maxLength:1000');
  }
}
</script>