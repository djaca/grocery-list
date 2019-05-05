<template>
  <v-app>
    <navbar
      @settings="openSettingsModal"
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
    Settings: () => import('./components/dialogs/Settings')
  },

  data () {
    return {
      settingsDialog: false
    }
  },

  methods: {
    openSettingsModal () {
      this.settingsDialog = true
    }
  }
}
</script>
