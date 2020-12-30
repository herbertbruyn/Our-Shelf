<template>
  <v-app style="background: transparent;">
    <app-topbar></app-topbar>
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