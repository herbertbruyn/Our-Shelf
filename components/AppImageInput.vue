<template>
  <div>
    <v-card flat :height="height" :width="width" class="picture-container" :class="{ invalid: $refs.validationInput && $refs.validationInput.validationState === 'error' }">
      <v-img v-if="value"
        :src="value"
        width="100%" 
        height="100%"
        position="top center"
      >
        <v-btn small fab class="ma-2 link-button" @click.stop="openDialog">
          <v-icon>mdi-link</v-icon>
        </v-btn>
      </v-img>
      <div v-else class="no-image-container">
        <div class="no-image-label body-1 text-center grey--text">{{ `NO ${label.toUpperCase()} IS AVAILABLE` }}</div>
          <v-btn small fab class="link-button ma-2" @click.stop="openDialog">
            <v-icon>mdi-link</v-icon>
          </v-btn>
      </div>
      <v-dialog v-model="open" max-width="550" persistent>
        <v-card class="py-12 px-8">
          <v-card-text>
            <v-fade-transition>
              <v-img v-if="pictureExists"
                class="mx-auto"
                :src="url"
                max-width="150"
                max-height="200"
                contain
              ></v-img>
              <v-text-field v-else ref="textField"
                clearable
                :class="{ hidden: pictureExists }"
                label="Paste the image's URL..."
                :rules="extendedRules"
                autocomplete="off"
                @input="check"
              ></v-text-field>
            </v-fade-transition>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large outlined color="grey" class="mr-4 px-8" @click="cancel">cancel</v-btn>
            <v-btn large outlined color="primary" class="px-8" :disabled="!pictureExists" @click="submit">confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
    <v-text-field ref="validationInput"
      class="textfield-hidden"
      hide-details
      :value="value"
      :rules="isRequired"
    >
    </v-text-field>
    <div class="v-text-field__details mb-2">
      <div class="v-messages theme--light error--text" role="alert">
        <div class="v-messages__wrapper">
          <div class="v-messages__message">
            <v-slide-y-transition group mode="out-in">
              <span v-if="$refs.validationInput && $refs.validationInput.validationState === 'error'" key="error">
                {{ $refs.validationInput.errorBucket[0] }}
              </span>
              <span v-else key="valid">&nbsp;</span>
            </v-slide-y-transition>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import { patterns, imageUrlExists } from '@/common';

export default {
  name: 'AppImageInput',
  props: {
    value: {
      type: String,
      required: false,
      default: null
    },
    label: {
      type: String,
      default: 'Image'
    },
    height: {
      type: String,
      default: '400'
    },
    width: {
      type: String,
      default: 'auto'
    },
    rules: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: true,
      open: false,
      pictureExists: false,
      url: null,
      isRequired: [],
      extendedRules: []
    }
  },
  methods: {
    openDialog() {
      this.pictureExists = false;
      this.open = true;
    },
    async check(val) {
      this.url = null;
      this.pictureExists = false;
      if (val && (patterns.URL.test(val) || patterns.DATA_URL.test(val))) {
        this.pictureExists = await imageUrlExists(val);
        if (this.pictureExists) {
          this.url = val;
        }
      }
    },
    validate(el) {
      const input = el.querySelector('input');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    },
    cancel() {
      if (this.$refs.textField) {
        this.$refs.textField.reset();
      }
      this.validate(this.$refs.validationInput.$el);
      this.open = false;
    },
    submit() {
      this.$refs.validationInput.reset();
      this.$emit('input', this.url);
      this.open = false;
    }
  },
  mounted() {
    this.extendedRules = [ ...this.rules ];
    this.extendedRules.push((val) => !!val && this.pictureExists || 'Picture not found');
    if (this.required) this.isRequired.push((val) => !!val || 'This field is required')
  }
}
</script>

<style scoped>

.picture-container {
  border: 1px solid rgba(0, 0, 0, 0.42);
  margin-bottom: 4px;
}

.picture-container.invalid {
  border: 2px solid rgb(255, 82, 82);
  margin-bottom: 4px;
}

.textfield-hidden {
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
}

.no-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.no-image-label {
  border: 4px solid lightgrey;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center
}

.link-button {
  position: absolute;
  right: 0;
  bottom: 0;
}

</style>