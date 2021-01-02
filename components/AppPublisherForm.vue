<template>
  <v-form ref="publisherForm" v-model="valid">
    <v-card>
      <v-card-title class="headline brown lighten-5 brown--text text--darken-4">
        <v-icon large class="mr-1">mdi-domain</v-icon>
        <span v-if="isNew">Insert New Publisher</span>
        <span v-else>Edit Publisher</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-12">
        <v-row>
          <v-col cols="12" md="4" class="py-0">
            <app-image-input 
              required 
              label="Logo"
              height="235" 
              width="235"
              v-model="formData.logo"
              :rules="rules.logo"
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
                  label="Publisher's Name"
                  placeholder=" "
                  :rules="rules.name"
                  autocomplete="off"
                  @input="checkForm()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" class="py-0">
                <v-select
                  v-model="formData.country"
                  :items="countries"
                  dense
                  outlined
                  clearable
                  label="Country"
                  placeholder=" "
                  :rules="rules.country"
                  autocomplete="off"
                  @input="checkForm()"
                  @change="formData.province = null"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" class="py-0">
                <v-select
                  v-model="formData.province"
                  :items="formData.country ? provinces[formData.country] : []"
                  dense
                  outlined
                  clearable
                  label="Province"
                  placeholder=" "
                  :rules="rules.province"
                  autocomplete="off"
                  @input="checkForm()"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0">
                <v-text-field 
                  v-model="formData.city" 
                  dense
                  outlined
                  label="City"
                  placeholder=" "
                  :rules="rules.city"
                  autocomplete="off"
                  @input="checkForm()"
                ></v-text-field>
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
const { Publisher } = entities;

export default {
  name: 'AppPublisherForm',
  props: {
    publisher: {
      type: Object,
      required: false,
      default: null,
      validator: publisher => propsValidators.publisher(publisher)
    }
  },
  data() {
    return {
      valid: false,
      touched: false,
      formData: { ...Publisher },
      initial: { ...Publisher },
      rules: formRules.publisher,
      countries: Object.keys(enums.COUNTRY),
      provinces: enums.COUNTRY
    }
  },
  watch: {
    publisher(val) {
      this.setInitial();
      this.reset();
    }
  },
  computed: {
    isNew() {
      return this.publisher === null;
    }
  },
  methods: {
    setInitial() {
      this.initial = this.publisher === null ? { ...Publisher } : cropClone(this.publisher, Publisher);
    },
    resetFormData() {
      this.formData = this.isNew ? { ...Publisher } : { ...this.initial };
    },
    reset() {
      if (this.$refs.publisherForm) this.$refs.publisherForm.reset();
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
      this.$refs.publisherForm.validate();
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