<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>
        <q-btn
          :to="{name: 'auth'}"
          flat
          icon-right="account_circle"
          :label="loggedIn ? 'Logout' : 'Login'"
          @click="loggedIn ? logoutUser() : false"
          class="absolute-right" />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab v-for="nav in navs" :key="nav.label" :icon="nav.icon" :label="nav.title" :to="nav.route" />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label
          header
          class="text-grey-8"
        >
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="nav in navs"
          :key="nav.label"
          v-bind="nav"
          class="text-grey-5"
        />
        <q-item
          v-if="$q.platform.is.electron"
          @click="quitApp"
          class="text-grey-4 absolute-bottom"
          clickable
          >
          <q-item-section avatar >
            <q-icon name="power_settings_new" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'layout',
  components: {
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          title: 'Todo',
          icon: 'list',
          route: '/'
        },
        {
          title: 'Settings',
          icon: 'settings',
          route: '/settings'
        }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    quitApp() {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Really quit Awesome-Todo?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          // send a message from vuejs app to the main-process to quit the desktop mac app
          if (this.$q.platform.is.electron) {
            require('electron').ipcRenderer.send('quit-app')
          }
        })
    }
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
  }

  .q-drawer {
    .q-router-link--exact-active {
      color: #fff !important;
    }
  }
</style>

