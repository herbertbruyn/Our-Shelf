<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form ref="userForm" v-model="valid">
          <v-card max-width="1200" class="mx-auto brown--text text--darken-1" :loading="updating" :disabled="updating">
            <v-card-title class="headline brown lighten-5 brown--text text--darken-4">
              <v-icon large class="mr-1">mdi-account-box-outline</v-icon>
              My Profile
              <v-btn v-if="editMode" small text color="error" class="ml-auto" @click="show.confirmation = true">delete account</v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="px-8">
              <v-row>
                <v-col cols="12" md="4" lg="5" class="d-flex flex-column flex-sm-row flex-md-column flex-lg-row align-center justify-center">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-avatar ref="avatar" tile size="150" class="rounded">
                        <img :src="$auth.user.picture" crossorigin="anonymous" />
                        <div v-if="formData.color && formData.palette" style="position: absolute; right: 0; bottom: 0">
                          <v-btn class="ma-1" x-small fab @click="show.palette = true" title="show palette">
                            <v-icon small color="purple">mdi-palette</v-icon>
                          </v-btn>
                        </div>
                        <v-overlay v-else-if="hover && editMode" absolute opacity="0.7">
                          <v-btn x-small color="primary" @click="getColorPalette">get color palette</v-btn>
                        </v-overlay>
                      </v-avatar>
                    </template>
                  </v-hover>
                  <div class="d-flex flex-column text-center text-sm-left text-md-center text-lg-left">
                    <v-card-title>{{ $auth.user.name }}</v-card-title>
                    <v-card-subtitle>{{ $auth.user.email }}</v-card-subtitle>
                    <small class="text-center text-sm-left text-md-center text-lg-left px-4">
                      <v-icon small class="mr-1">mdi-check-bold</v-icon>
                      <span>Joined {{ $moment($auth.user.createdAt).fromNow() }}</span><br>
                    </small>
                    <small class="text-center text-sm-left text-md-center text-lg-left px-4">
                      <v-icon small class="mr-1">mdi-clock</v-icon>
                      <span>Last update {{ $moment($auth.user.updatedAt).fromNow() }}</span>
                    </small>
                  </div>
                </v-col>
                <v-col cols="12" md="8" lg="7">
                  <v-row align="center">
                    <v-col class="py-0">
                      <v-text-field
                        v-model="formData.collectionName"
                        :background-color="editMode ? 'blue lighten-5' : ''"
                        outlined
                        dense
                        label="Your collection's name" 
                        placeholder=" "
                        :rules="rules.collectionName"
                        :readonly="!editMode"
                        autocomplete="off"
                        @input="checkForm()"
                      ></v-text-field>
                    </v-col>
                    <v-col class="py-0">
                      <app-date-picker
                        v-model="formData.birthDate"
                        :background-color="editMode ? 'blue lighten-5' : ''"
                        label="Birth date"
                        placeholder=" "
                        min="1900-01-01"
                        :max="new Date().toJSON().slice(0, 10)"
                        :rules="rules.birthDate"
                        :readonly="!editMode"
                        @input="checkForm()"
                      ></app-date-picker>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0">
                      <v-textarea 
                        v-model="formData.description" 
                        :background-color="editMode ? 'blue lighten-5' : ''"
                        outlined
                        no-resize
                        dense
                        label="Give us a brief description of yourself"
                        placeholder=" "
                        :counter="1000"
                        rows="5"
                        :rules="rules.description"
                        :readonly="!editMode"
                        @input="checkForm()"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0">
                      <v-combobox
                        v-model="formData.interests"
                        :background-color="editMode ? 'blue lighten-5' : ''"
                        outlined
                        dense
                        label="What are your interests?"
                        placeholder=" "
                        multiple
                        chips
                        deletable-chips
                        :rules="rules.interests"
                        :readonly="!editMode"
                        @input="checkForm()"
                      ></v-combobox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="px-8 pb-8">
              <v-btn v-if="!editMode" x-large depressed class="ml-auto primary" @click="editMode = true">
                edit
                <v-icon class="ml-2">mdi-pencil</v-icon>
              </v-btn>
              <v-btn v-if="editMode" large icon @click="reset()">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <div v-if="editMode" class="ml-auto">
                <v-btn x-large outlined class="mr-4" color="grey" @click="cancel()">cancel</v-btn>
                <v-btn x-large depressed class="ml-2" 
                  :class="!valid || !touched ? '' : 'success'" 
                  :disabled="!valid || !touched" 
                  @click="update()">
                  update
                  <v-icon class="ml-2">mdi-content-save</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
          <v-dialog v-if="formData.color && formData.palette" v-model="show.palette" max-width="500">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-card-title>Dominant Color</v-card-title>
                      <v-avatar size="32" class="mx-4" :color="`rgba(${formData.color[0]}, ${formData.color[1]}, ${formData.color[2]}, 1)`">
                      </v-avatar>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-card-title>Palette</v-card-title>
                      <div class="d-flex flex-wrap">
                        <v-avatar v-for="color in formData.palette" 
                          :key="color.join('')" 
                          size="32"
                          class="ml-4 mb-4"
                          :color="`rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`"
                        ></v-avatar>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="px-8 pb-8">
                <v-btn x-large outlined color="red" class="px-4" @click="eraseColorPalette()">
                  erase palette
                  <v-icon class="ml-2">mdi-delete</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn x-large text color="grey" class="px-4" @click="show.palette = false">close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <app-confirmation-dialog v-model="show.confirmation" :confirmation-text="$auth.user.collectionName" @accept="deleteHandler($event)">
            <p class="text-body-1">
              Are you sure you want to delete your account along with all books associated with it in the database? <u>You may not be able to reverse this operation in the future.</u>
            </p>
            <p class="font-weight-bold text-body-1 red--text">In order to confirm the operation, please write your collection's name below.</p>
          </app-confirmation-dialog>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ColorThief from 'colorthief';
import { formRules, equals } from '@/common';

export default {
  name: 'AppUserProfile',
  data() {
    return {
      updating: false,
      editMode: false,
      valid: false,
      touched: false,
      show: {
        picker: false,
        confirmation: false,
        palette: false
      },
      picker: false,
      confirmation: false,
      formData: {
        collectionName: '',
        interests: [],
        description: '',
        birthDate: '',
        color: null,
        palette: []
      },
      initial: null,
      rules: formRules.user
    }
  },
  watch: {
    editMode(val) {
      this.setInitial();
      this.reset();
    }
  },
  methods: {
    setInitial() {
      let { collectionName, interests, description, birthDate, color, palette } = this.$auth.user;
      this.initial = { collectionName, interests, description, birthDate, color, palette };
      this.touched = false;
    },
    resetFormData() {
      this.formData = { ...this.initial };
    },
    reset() {
      if (this.$refs.userForm) this.$refs.userForm.reset();
      this.$nextTick(() => {
        this.resetFormData();
        this.checkForm();
      });
    },
    checkForm() {
      this.touched = !equals(this.formData, this.initial);
    },
    cancel() {
      this.reset();
      this.editMode = false;
    },
    getColorPalette() {
      this.updating = true;
      const colorThief = new ColorThief();
      const img = this.$refs.avatar.$el.querySelector('img');
      if (img.complete) {
        this.formData.color = colorThief.getColor(img);
        this.formData.palette = colorThief.getPalette(img);
        this.updating = false;
        this.show.palette = true;
        this.checkForm();
      } else {
        image.addEventListener('load', () => {
          this.formData.color = colorThief.getColor(img);
          this.formData.palette = colorThief.getPalette(img);
          this.updating = false;
          this.show.palette = true;
        this.checkForm();
        });
      }      
    },
    eraseColorPalette() {
      this.show.palette = false;
      this.formData.color = null;
      this.formData.palette = [];
      this.checkForm();
    },
    async update() {
      this.$refs.userForm.validate();
      if (!this.valid) return;
      this.updating = true;
      try { 
        await this.$store.dispatch('users/updateAccount', { ...this.formData });
        this.$notifySuccess('User successfully updated!'); 
      } catch (e) {
        this.$notifyError(e.message);
      }
      this.checkForm();
      this.updating = false;
      this.editMode = false;
    },
    async deleteHandler(yes) {
      this.show.confirmation = false;
      if (!yes) return;
      this.updating = true;
      try { 
        let response = await this.$store.dispatch('users/deleteAccount'); 
        this.$notifyInfo(response.message || 'Account deleted!'); 
      } catch (e) {
        this.$notifyError(e.message);
      }
      this.updating = false;
    }
  },
  mounted() {
    this.setInitial();
    this.reset();
  }
}
</script>
