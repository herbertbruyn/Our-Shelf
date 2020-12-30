<template>
  <v-form ref="userForm" v-model="valid">
    <v-card max-width="800" class="mx-auto brown--text text--darken-1" :loading="updating" :disabled="updating">
      <v-card-title class="headline">
        My Profile
        <v-btn v-if="editMode" small text color="error" class="ml-auto" @click="confirmation = true">delete account</v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="d-flex flex-column align-center justify-center">
          <v-avatar size="50">
            <v-img :src="$auth.user.picture" position="top center"></v-img>
          </v-avatar>
          <v-card-title>{{ $auth.user.name }}</v-card-title>
          <v-card-subtitle>
            {{ $auth.user.email }}
          </v-card-subtitle>
          <small class="d-flex align-center">
            <v-icon size="14" class="mr-1">mdi-clock</v-icon>
            Joined {{ $moment($auth.user.createdAt).fromNow() }}, last update {{ $moment($auth.user.updatedAt).fromNow() }}
          </small>
        </div>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="userInfo.collectionName"
              :background-color="editMode ? 'blue lighten-5' : ''"
              outlined
              label="Your collection's name" 
              placeholder=" "
              :rules="rules.collectionName"
              :readonly="!editMode"
              autocomplete="off"
              @input="checkFields()"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-menu
              v-model="picker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
              :disabled="!editMode"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="userInfo.birthDate"
                  :background-color="editMode ? 'blue lighten-5' : ''"
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
                v-model="userInfo.birthDate"
                :max="new Date().toISOString().substr(0, 10)"
                min="1900-01-01"
                @input="picker = false"
                @change="checkFields()"
          ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea 
              v-model="userInfo.description" 
              :background-color="editMode ? 'blue lighten-5' : ''"
              outlined
              label="Give us a brief description of yourself"
              placeholder=" "
              auto-grow
              :counter="1000"
              :rules="rules.description"
              :readonly="!editMode"
              @input="checkFields()"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-combobox
              v-model="userInfo.interests"
              :background-color="editMode ? 'blue lighten-5' : ''"
              outlined
              label="What are your interests?"
              placeholder=" "
              multiple
              chips
              deletable-chips
              :rules="rules.interests"
              :readonly="!editMode"
              @input="checkFields()"
            >
            </v-combobox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-4 pb-5">
        <v-btn v-if="!editMode" large text class="ml-auto primary" @click="editMode = true">
          edit
          <v-icon small class="ml-2">mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-if="editMode" large icon @click="reset()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <div v-if="editMode" class="ml-auto">
          <v-btn large text @click="cancel()">cancel</v-btn>
          <v-btn large text class="ml-2" 
            :class="!valid || !touched ? '' : 'success'" 
            :disabled="!valid || !touched" 
            @click="update()">
            update
            <v-icon small class="ml-2">mdi-content-save</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <app-confirmation-dialog v-model="confirmation" :confirmation-text="$auth.user.collectionName" @accept="deleteHandler($event)">
      <p class="text-body-1">
        Are you sure you want to delete your account along with all books associated with it in the database? <u>You may not be able to reverse this operation in the future.</u>
      </p>
      <p class="font-weight-bold text-body-1 red--text">In order to confirm the operation, please write your collection's name below.</p>
    </app-confirmation-dialog>
  </v-form>
</template>

<script>
import * as jwt from 'jsonwebtoken';

export default {
  name: 'AppUserProfile',
  data() {
    return {
      updating: false,
      editMode: false,
      valid: false,
      touched: false,
      picker: false,
      confirmation: false,
      userInfo: {
        collectionName: '',
        interests: [],
        description: '',
        birthDate: ''
      },
      rules: {
        collectionName: [],
        interests: [],
        description: []
      }
    }
  },
  methods: {
    reset() {
      if (this.$refs.userForm) {
        this.$refs.userForm.reset();
      }
      this.$nextTick(() => {
        this.userInfo.collectionName = this.$auth.user.collectionName || '';
        this.userInfo.interests = this.$auth.user.interests || [];
        this.userInfo.description = this.$auth.user.description || '';
        this.userInfo.birthDate = this.$auth.user.birthDate || '';
        this.touched = false;
      });
    },
    equals(a, b) {
      return JSON.stringify(a) === JSON.stringify(b);
    },
    checkFields() {
      this.touched = !this.equals(this.userInfo.collectionName, this.$auth.user.collectionName)
          || !this.equals(this.userInfo.birthDate, this.$auth.user.birthDate)
          || !this.equals(this.userInfo.description, this.$auth.user.description)
          || !this.equals(this.userInfo.interests, (this.$auth.user.interests || []));
    },
    cancel() {
      this.reset();
      this.editMode = false;
    },
    async update() {
      this.updating = true;
      try { 
        await this.$store.dispatch('users/updateAccount', this.userInfo);
        this.$notifySuccess('User successfully updated!'); 
      } catch (e) {
        this.$notifyError(e.message);
      }
      this.checkFields();
      this.updating = false;
      this.editMode = false;
    },
    async deleteHandler(yes) {
      this.confirmation = false;
      if (!yes) { return }
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
    this.reset();
    this.rules.collectionName = this.$createRules('required|minLength:5|maxLength:50');
    this.rules.interests = this.$createRules('eachMinLength:5|eachMaxLength:30');
    this.rules.description = this.$createRules('maxLength:1000');
  }
}
</script>
