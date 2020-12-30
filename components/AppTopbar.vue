<template>
  <v-app-bar app
    prominent
    dark
    fixed
    color="brown lighten-3"
    :src="require('~/assets/banner.jpg')"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(62, 39, 35, .9), rgba(93, 64, 55, .4)"
      ></v-img>
    </template>  
    <v-toolbar-title>
      <h5 class="text-h3 font-weight-regular brown--text text--lighten-5">{{ title }}</h5>      
    </v-toolbar-title>
    <v-spacer />
    <v-menu v-if="$auth.loggedIn" offset-y offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon class="brown--text text--lighten-5">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-card tile width="400">
        <v-list tile>
          <v-list-item >
            <v-list-item-avatar>
              <v-img :src="$auth.user.picture"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ $auth.user.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $auth.user.email }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list tile>
          <v-list-item link @click="logout()">
            <v-list-item-avatar tile>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <template v-slot:extension>
      <v-tabs v-if="$auth.loggedIn" dark background-color="brown">
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="item in items" :key="item.title" :title="item.title" :to="item.to">
          <v-icon>mdi-{{ item.icon }}</v-icon>
        </v-tab>
      </v-tabs>
      <v-btn v-if="!$auth.loggedIn" class="ml-auto" small text dark @click="login()">
        <v-icon small class="mr-2">mdi-google</v-icon>
        Sign in with Google
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppTopbar',
  data () {
    return {
      title: 'Our Shelf',
      imageUrl: require('~/assets/brand.jpg'),
      items: [
        {
          icon: 'account-box-outline',
          title: 'My Profile',
          to: '/profile'
        },
        {
          icon: 'bookshelf',
          title: 'My Shelf',
          to: '/collection'
        },
        {
          icon: 'view-dashboard-outline',
          title: 'Browse Collections',
          to: '/'
        },
        {
          icon: 'comma',
          title: 'Famous Quotes',
          to: '/quotes'
        }
      ]
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('users/login');
    },
    logout() {
      this.$store.dispatch('users/logout');
    }
  }
}
</script>
