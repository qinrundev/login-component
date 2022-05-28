<template>
  <v-app>
    <v-main>
      <v-container v-if="!renderErrorPage" fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm6 md3>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{ appinfo.name }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="login()">
                  <v-text-field
                    v-model="username"
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="username"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                    required
                  ></v-text-field>
                  <div class="mt-4 mb-4">
                    登陆即表示您已同意《服务协议》和《隐私政策》
                  </div>
                  <v-btn
                    type="submit"
                    class="mt-4"
                    color="primary"
                    value="log in"
                    block
                    >Login</v-btn
                  >
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container v-if="renderErrorPage">
        <li v-for="err in errs" :key="err">{{ err }}</li>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      renderErrorPage: false,
      username: "",
      password: "",
      errs: [],
      appinfo: {},
    };
  },
  props: {
    appId: {
      type: String,
      required: true,
    },
    serverUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    login() {
      console.log("username", this.username);
      console.log("password", this.password);
      console.log("appId", this.appId);
      console.log("client_id", this.appinfo.clientId);
    },
  },
  mounted() {
    console.log("mounted");
    console.log("appId", this.appId);
    console.log("serverUrl", this.serverUrl);

    if (!this.appId) {
      this.errs.push("缺少必须的参数“appId”");
    }
    if (!this.serverUrl) {
      this.errs.push("缺少必须的参数'serverUrl'");
    }
    if (this.errs.length > 0) {
      this.renderErrorPage = true;
      return;
    }

    this.$http
      .get(`${this.serverUrl}/applications/${this.appId}/info`)
      .then((res) => {
        this.appinfo = res.data;
      })
      .catch((err) => {
        this.errs.push(err.message);
        this.renderErrorPage = true;
      });
  },
};
</script>