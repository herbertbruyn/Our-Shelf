<template>
  <v-app style="background: transparent;">
    <app-topbar
      :title="title"
      :background-image-url="imageUrl"
      :nav-items="items"
      @login="login()"
      @logout="logout()"
    ></app-topbar>
    <v-main>
      <v-container fill-height fluid class="main-content">
        <nuxt />
        <v-snackbar v-model="show" :color="color" top right>
          {{ message }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="show = false">close</v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default { 
  data() {
    return {
      title: 'Our Shelf',
      imageUrl: require('~/assets/banner.jpg'),
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
          icon: 'fountain-pen-tip',
          title: 'Browse Authors',
          to: '/authors'
        },
        {
          icon: 'domain',
          title: 'Browse Publishers',
          to: '/publishers'
        },
        {
          icon: 'tools',
          title: 'Tools',
          to: '/tools'
        },
        {
          icon: 'comma',
          title: 'Famous Quotes',
          to: '/quotes'
        }
      ]
    }
  },
  computed: {
    color() {
      return this.$store.state.notification.color;
    },
    message() {
      return this.$store.state.notification.message;
    },
    show: {
      get() {
        return this.$store.state.notification.show;
      },
      set(status) {
        this.$store.commit('notification/SET_STATUS', status); 
      }
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

<style>
  html {
    background-image: url("~assets/background.png");
    background-repeat: repeat;
  }
  .main-content {
    background: rgba(121, 85, 72, 0.2);
  }
</style>