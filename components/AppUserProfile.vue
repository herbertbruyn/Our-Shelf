<template>
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
            <v-avatar tile size="150" class="rounded">
              <v-img :src="$auth.user.picture" position="top center"></v-img>
            </v-avatar>
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
    <app-confirmation-dialog v-model="show.confirmation" :confirmation-text="$auth.user.collectionName" @accept="deleteHandler($event)">
      <p class="text-body-1">
        Are you sure you want to delete your account along with all books associated with it in the database? <u>You may not be able to reverse this operation in the future.</u>
      </p>
      <p class="font-weight-bold text-body-1 red--text">In order to confirm the operation, please write your collection's name below.</p>
    </app-confirmation-dialog>
  </v-form>
</template>

<script>
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
        confirmation: false
      },
      picker: false,
      confirmation: false,
      formData: {
        collectionName: '',
        interests: [],
        description: '',
        birthDate: ''
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
      let { collectionName, interests, description, birthDate } = this.$auth.user;
      this.initial = { collectionName, interests, description, birthDate };
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
