<template>
  <v-form ref="authorForm" v-model="valid">
    <v-card>
      <v-card-title class="headline brown lighten-5 brown--text text--darken-4">
        <v-icon large class="mr-1">mdi-fountain-pen-tip</v-icon>
        <span v-if="isNew">Insert New Author</span>
        <span v-else>Edit Author</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-12">
        <v-row>
          <v-col cols="12" md="4" class="py-0">
            <app-image-input 
              required 
              height="400" 
              width="auto"
              v-model="formData.picture"
              :rules="rules.picture"
            ></app-image-input>
          </v-col>
          <v-col cols="12" md="8" class="py-0">
            <v-row>
              <v-col class="py-0">
                <v-text-field
                  v-model="formData.name"
                  dense 
                  outlined
                  clearable
                  label="Author's Name"
                  placeholder=" "
                  :rules="rules.name"
                  autocomplete="off"
                  @input="checkForm()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" class="py-0">
                <v-combobox
                  v-model="formData.birthPlace"
                  :items="places"
                  dense
                  outlined
                  clearable
                  label="Birth Place"
                  placeholder=" "
                  :rules="rules.birthPlace"
                  autocomplete="off"
                  @input="checkForm()"
                ></v-combobox>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="formData.birthYear"
                  dense
                  outlined
                  label="Birth Year"
                  placeholder=" "
                  :rules="rules.birthYear"
                  autocomplete="off"
                  :suffix="formData.birthBC ? 'b.C.': 'a.C.'"
                  append-outer-icon="mdi-autorenew"
                  @click:append-outer="formData.birthBC = !formData.birthBC"
                  @input="checkForm()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" class="py-0">
                <v-combobox
                  v-model="formData.deathPlace"
                  :items="places"
                  dense
                  outlined
                  clearable
                  label="Death Place"
                  placeholder=" "
                  :rules="rules.deathPlace"
                  autocomplete="off"
                  @input="checkForm()"
                ></v-combobox>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-text-field
                  v-model="formData.deathYear"
                  dense
                  outlined
                  label="Death Year"
                  placeholder=" "
                  :rules="rules.deathYear"
                  :suffix="formData.deathBC ? 'b.C.': 'a.C.'"
                  append-outer-icon="mdi-autorenew"
                  @click:append-outer="formData.deathBC = !formData.deathBC"
                  @input="checkForm()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0">
                <v-textarea 
                  v-model="formData.shortBiography" 
                  outlined
                  no-resize
                  dense
                  label="A short biography"
                  placeholder=" "
                  rows="7"
                  :counter="5000"
                  :rules="rules.shortBiography"
                  autocomplete="off"
                  @input="checkForm()"
                ></v-textarea>
              </v-col>
            </v-row>
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
import { enums, entities, propsValidators, formRules, equals, cropClone } from '@/common';
const { Author } = entities;

export default {
  name: 'AppAuthorForm',
  props: {
    author: {
      type: Object,
      required: false,
      default: null,
      validator: author => propsValidators.author(author)
    }
  },
  data() {
    return {
      valid: false,
      touched: false,
      formData: { ...Author },
      initial: { ...Author },
      rules: formRules.author,
      places: Object.keys(enums.COUNTRY)
    }
  },
  watch: {
    author(val) {
      this.setInitial();
      this.reset();
    }
  },
  computed: {
    isNew() {
      return this.author === null;
    }
  },
  methods: {
    setInitial() {
      this.initial = this.author === null ? { ...Author } : cropClone(this.author, Author);
    },
    resetFormData() {
      this.formData = this.isNew ? { ...Author } : { ...this.initial };
    },
    reset() {
      if (this.$refs.authorForm) this.$refs.authorForm.reset();
      this.$nextTick(() => {
        this.resetFormData();
        this.checkForm();
      });
    },
    checkForm() {
      this.touched = this.isNew || !equals(this.formData, this.initial);
    },
    cancel() {
      this.$emit('cancel');
      this.reset();
    },
    submit() {
      this.$refs.authorForm.validate();
      if (this.valid) {
        let event = this.isNew ? 'add' : 'update';
        this.$emit(event, { ...this.formData });
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