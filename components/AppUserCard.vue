<template>
  <v-hover v-slot="{ hover }">
    <v-card 
      class="pa-4"
      :dark="active"
      min-width="350"
      max-width="550"
      :elevation="hover ? 6 : 2" 
    >
      <div class="d-flex flex-column justify-center" style="cursor: pointer;" @click="$emit('click')">
        <div class="d-flex flex-row align-center">
          <v-avatar size="60">
            <v-img :src="user.picture"></v-img>
          </v-avatar>
          <div>
            <v-card-title>{{ user.collectionName }}</v-card-title>
            <v-card-subtitle>{{ user.name }}</v-card-subtitle>
          </div>
        </div>
      </div>
      <div class="ma-2" style="position: absolute; top: 0; right: 0;">
        <v-icon small :color="active ? 'white' : 'grey'" :title="'member since ' + $moment(user.createdAt).fromNow()">mdi-clock</v-icon>
      </div>
      <div class="ma-2" style="position: absolute; bottom: 0; right: 0;">
        <v-menu
          v-model="show.details"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon :dark="active" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-card width="350" class="pa-4" color="brown lighten-5">
            <v-card-text>
              <v-avatar class="float-left mr-4">
                <v-img :src="user.picture"></v-img>
              </v-avatar>
              <div class="text-body-2">
                <span v-if="user.birthDate">I am {{ $moment().diff(user.birthDate, 'years') }} years old. </span>
                <span>Joined <b>Our Shelf</b> community {{ $moment(user.createdAt).fromNow() }}. </span>
                {{ user.description }}
                <span v-if="interests">
                  <span> My main interests lie in <span class="font-weight-bold">{{ interests }}</span>.</span>
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import { propsValidators } from '@/common';

export default {
  name: 'AppUserCard',
  props: {
    user: {
      type: Object,
      required: true,
      validator: user => propsValidators.user(user)
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: {
        details: false
      }
    }
  },
  computed: {
    gradient() {
      return `to top right, rgba(62, 39, 35, .9), rgba(93, 64, 55, .4)`;
    },    
    interests() {
      if (!this.user.interests || this.user.interests.length === 0) {
        return null;
      }
      let s = this.user.interests.join(', ');
      let index = s.lastIndexOf(',');
      if (index < 0) {
        return s;
      } 
      return s.substr(0, index + 1) + ' and ' + s.substr(index + 2);
    }
  }
}
</script>