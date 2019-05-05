<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Groceries</span>
    </v-toolbar-title>

    <v-toolbar-title>
      <v-btn
        flat
        icon
        small
        @click="$emit('settings')"
      >
        <v-icon>settings</v-icon>
      </v-btn>

      <v-btn
        flat
        icon
        small
        @click="$emit('lists')"
      >
        <v-icon>list</v-icon>
      </v-btn>
    </v-toolbar-title>

    <template v-if="hasSelected">
      <v-toolbar-title>
        <v-btn
          flat
          icon
          small
          color="success"
          @click="save"
        >
          <v-icon>check</v-icon>
        </v-btn>

        <v-btn
          flat
          icon
          small
          color="error"
          @click="unselect"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar-title>
    </template>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',

  computed: {
    ...mapGetters('groceries', ['hasSelected'])
  },

  methods: {
    ...mapActions('lists', ['save']),

    ...mapMutations('groceries', ['unselect'])
  }
}
</script>

<style scoped>

</style>
