<template>
  <v-app>
    <navbar />

    <v-content>
      <groceries/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Groceries from './components/Groceries'

export default {
  name: 'App',
  components: {
    Navbar,
    Groceries
  }
}
</script>
