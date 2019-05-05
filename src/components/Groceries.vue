<template>
  <v-content>
    <v-container>
      <v-layout
        text-xs-center
        wrap
      >
        <v-flex xs12>
          <v-expansion-panel
            v-model="panel"
            popout
            expand
          >
            <v-expansion-panel-content
              v-for="(items, category) in groceries"
              :key="category"
            >
              <div slot="header">
                {{ category }}
              </div>

              <v-card>
                <v-card-text>
                  <v-flex
                    v-for="(item, i) in items"
                    :key="i"
                    xs12
                  >
                    <grocery-item :item="item"></grocery-item>
                  </v-flex>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Groceries',

  components: {
    GroceryItem: () => import('./GroceryItem')
  },

  data () {
    return {
      panel: []
    }
  },

  watch: {
    hasSelected (val) {
      if (!val) {
        this.panel = []
      }
    }
  },

  computed: {
    ...mapGetters('groceries', ['items', 'hasSelected']),

    groceries () {
      return this.items.reduce((r, a) => {
        r[a.category] = r[a.category] || []

        r[a.category].push(a)

        return r
      }, Object.create(null))
    }
  }
}
</script>
