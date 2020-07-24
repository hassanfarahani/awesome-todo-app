<template>
    <q-page padding>
      <q-card class="auth-tabs">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <loginRegister :tab="tab" />
          </q-tab-panel>

          <q-tab-panel name="register">
            <loginRegister :tab="tab" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-page>
</template>

<script>
import loginRegister from 'components/Auth/LoginRegister'

export default {
  data () {
    return {
      tab: 'register'
    }
  },
  components: {
      loginRegister
  }
}
</script>

<style>
    .auth-tabs {
        max-width: 500px;
        margin: 0 auto;
    }
</style>