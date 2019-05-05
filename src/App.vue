<template>
  <v-app>
    <navbar
      @settings="openSettingsModal"
      @lists="openListsModal"
    />

    <groceries/>

    <v-dialog
      v-model="settingsDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <settings
        @close="settingsDialog = false"
      />
    </v-dialog>

    <v-dialog
      v-model="listsDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <lists
        @close="listsDialog = false"
      />
    </v-dialog>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Groceries from './components/Groceries'

export default {
  name: 'App',

  components: {
    Navbar,
    Groceries,
    Settings: () => import('./components/dialogs/Settings'),
    Lists: () => import('./components/dialogs/Lists')
  },

  data () {
    return {
      settingsDialog: false,
      listsDialog: false
    }
  },

  methods: {
    openSettingsModal () {
      this.settingsDialog = true
    },

    openListsModal () {
      this.listsDialog = true
    }
  }
}
</script>
