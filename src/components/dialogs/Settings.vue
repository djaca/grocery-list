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
      <v-toolbar-title>Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          dark
          flat
          @click="dialog = true"
        >
          New Item
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <template>
      <div>
        <v-toolbar
          flat
          color="white"
        >
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            clearable
          ></v-text-field>
        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          :rows-per-page-items="[5]"
          :search="search"
        >
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>

        <v-dialog
          v-model="dialog"
          @input="closeDialog"
          max-width="500px"
        >
          <grocery-form
            @close="closeDialog"
            @save="save"
            :item="editedItem"
            :headline="formTitle"
            :show="dialog"
          ></grocery-form>
        </v-dialog>
      </div>
    </template>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Settings',

  components: {
    GroceryForm: () => import('@/components/GroceryForm')
  },

  data: () => ({
    search: '',
    dialog: false,
    headers: [
      {
        text: 'Name',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      {
        text: 'Actions',
        align: 'center',
        value: 'name',
        sortable: false
      }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      unit: '',
      category: ''
    },
    defaultItem: {
      name: '',
      unit: '',
      category: ''
    }
  }),

  computed: {
    ...mapGetters('groceries', {
      groceries: 'items'
    }),

    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.items = this.groceries
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.id = item.id
      this.dialog = true
    },

    deleteItem (item) {
      confirm('Are you sure you want to delete this item?') && this.$store.dispatch('groceries/delete', item.id)
    },

    closeDialog () {
      this.dialog = false

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        this.$store.dispatch('groceries/update', this.editedItem)
      } else {
        this.$store.dispatch('groceries/add', this.editedItem)
      }

      this.closeDialog()
    },

    close () {
      this.$emit('close')

      this.search = ''
    }
  }
}
</script>
