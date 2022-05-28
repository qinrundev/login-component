<template>
  <v-app>
    <v-main>
      <LoginComponent
        appId="ca4bokvkobjnpresapjg"
        serverUrl="http://127.0.0.1:3001"
      />
    </v-main>
  </v-app>
</template>

<script>
import LoginComponent from "./components/LoginComponent";

export default {
  name: "App",

  components: {
    LoginComponent,
  },

  data: () => ({
    //
  }),
};
</script>
