<template>
  <v-card>
    <v-card-title>
      <span
        class="headline"
        v-text="headline"
      ></span>
    </v-card-title>

    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="formData.name"
                :rules="[rules.required]"
                label="Name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-select
                v-model="formData.unit"
                :rules="[rules.required]"
                :items="['kom', 'kg', 'gr', 'l', 'ml']"
                label="Unit"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="formData.category"
                :rules="[rules.required]"
                label="Category"
              ></v-text-field>
            </v-flex>
          </v-form>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        flat
        @click="close"
      >
        Cancel
      </v-btn>
      <v-btn
        :disabled="!valid"
        color="blue darken-1"
        flat
        @click="save"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'GroceryForm',

  props: ['item', 'headline', 'show'],

  data () {
    return {
      valid: true,
      formData: {
        name: '',
        unit: '',
        category: ''
      },
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  watch: {
    item (val) {
      this.formData = val
    },

    show (val) {
      if (!val) {
        this.resetValidation()
      }
    }
  },

  methods: {
    save () {
      if (this.$refs.form.validate()) {
        this.$emit('save', this.formData)

        this.resetValidation()
      }
    },

    close () {
      this.$emit('close')
    },

    resetValidation () {
      setTimeout(() => {
        this.$refs.form.resetValidation()
      }, 300)
    }
  }
}
</script>
