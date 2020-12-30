<template>
  <v-form ref="publisherForm">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="publisherInfo.name"
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
            <v-text-field
              v-model="publisherInfo.country"
              outlined
              label="Country"
              placeholder=" "
              :rules="rules.country"
              @input="checkFields()"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="publisherInfo.city"
              outlined
              label="City"
              placeholder=" "
              :rules="rules.city"
              @input="checkFields()"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-4 pb-5">
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
import { entities, enums, publisherValidator } from '@/common';
const { Publisher } = entities;

export default {
  name: 'AppPublisherForm',
  props: {
    publisher: {
      type: Object,
      required: false,
      default: null,
      validator: publisher => publisherValidator(publisher)
    }
  },
  data() {
    return {
      valid: false,
      touched: false,
      publisherInfo: {
        name: null,
        country: null,
        city: null
      },
      rules: {
        name: [],
        country: [],
        city: []
      }
    }
  },
  computed: {
    isNew() {
      return this.publisher === null;
    }
  },
  methods: {
    reset() {
      if (this.$refs.publisherForm) {
        this.$refs.publisherForm.reset();
      }
      this.$nextTick(() => {
        this.publisherInfo.name = this.publisher.name || '';
        this.publisherInfo.country = this.publisher.country || '';
        this.publisherInfo.city = this.publisher.city || '';
        this.touched = false;
      });
    },
    equals(a, b) {
      return JSON.stringify(a) === JSON.stringify(b);
    },
    checkFields() {
      this.touched = this.isNew 
          || !this.equals(this.publisherInfo.name, this.publisher.name)
          || !this.equals(this.publisherInfo.country, this.publisher.country)
          || !this.equals(this.publisherInfo.city, this.publisher.city)
    },
    cancel() {
      this.reset();
      this.$emit('cancel');
    },
    submit() {
      if (this.isNew) {
        this.$emit('add', this.publisherInfo);
      } else {
        this.$emit('update', this.publisherInfo);        
      }
    }
  },
  mounted() {
    this.reset();
    this.rules.name = this.$createRules('required|minLength:5|maxLength:30');
    this.rules.country = this.$createRules('required|minLength:5|maxLength:50');
    this.rules.city = this.$createRules('required|minLength:5|maxLength:50');
  }
}
</script>