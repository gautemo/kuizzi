<template>
  <section>
    <div id="firebaseui-auth-container"></div>
  </section>
</template>

<script>
import { firebase } from "@/firebase";
import "firebaseui";
import "firebaseui/dist/firebaseui.css";

const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig = {
  signInSuccessUrl: "/my-games",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

export default {
  mounted() {
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>

<style scoped>
section{
  margin: 100px;
}
</style>