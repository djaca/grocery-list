<template>
  <v-card>
    <v-toolbar
      dark
      dense
      color="primary"
    >
      <v-btn
        icon
        dark
        @click="close"
      >
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Lists</v-toolbar-title>
    </v-toolbar>

    <v-expansion-panel
      v-model="panel"
    >
      <v-expansion-panel-content
        v-for="(item, i) in items"
        :key="i"
      >
        <template v-slot:header>
          <div v-text="item.date"></div>
        </template>

        <v-card>
          <v-card-text>
            <ul>
              <li
                v-for="(groceries, category) in item.items"
                :key="category"
              >
                <span v-text="category"></span>

                <ul>
                  <li
                    v-for="(grocery, index) in groceries"
                    :key="index"
                    @click="toggleComplete({ listId: item.id, index })"
                  >
                    <span
                      :class="{ 'completed': grocery.completed }"
                    >
                      {{ grocery.name }} - {{ grocery.qty }}{{ grocery.unit }}
                    </span>
                  </li>
                </ul>
             </li>
            </ul>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat small color="info" @click="load(item.id)">Load</v-btn>
            <v-btn flat small color="error" @click="doRemove(item.id)">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Lists',

  data () {
    return {
      panel: null
    }
  },

  computed: {
    ...mapGetters('lists', ['items'])
  },

  methods: {
    ...mapActions('groceries', ['setSelected']),
    ...mapActions('lists', ['toggleComplete', 'remove']),

    load (id) {
      this.setSelected(id)

      this.close()
    },

    doRemove (id) {
      this.remove(id)

      this.panel = null
    },

    close () {
      this.$emit('close')

      setTimeout(() => {
        this.panel = null
      }, 300)
    }
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
  }

  .completed {
    text-decoration: line-through;
  }
</style>
