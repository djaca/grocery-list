<template>
  <v-layout
    align-content-space-between
    align-center
  >
    <v-checkbox
      v-model="selected"
      :label="item.name"
    ></v-checkbox>

    <div style="width: 9rem">
      <v-text-field
        v-if="selected"
        v-model="quantity"
        min="1"
        type="number"
        append-outer-icon="add"
        @click:append-outer="incrementQuantity"
        prepend-icon="remove"
        @click:prepend="decrementQuantity"
        :suffix="quantitySuffix"
      ></v-text-field>
    </div>
  </v-layout>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'GroceryItem',

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      val: null
    }
  },

  computed: {
    ...mapGetters('groceries', ['isSelected']),

    selected: {
      set () {
        this.toggleSelect(this.item.name)
      },

      get () {
        return this.isSelected(this.item.name)
      }
    },

    quantity: {
      get () {
        return this.val < 1000 ? this.val : this.val / 1000
      },

      set (val) {
        this.val = val ? parseInt(val) : this.step

        this.setQuantity({ name: this.item.name, qty: this.val })
      }
    },

    isSmallUnit () {
      return ['gr', 'ml'].includes(this.item.unit)
    },

    quantitySuffix () {
      let unit = this.item.unit

      if (this.isSmallUnit && this.val >= 1000) {
        return unit === 'gr' ? 'kg' : 'l'
      }

      return unit
    },

    step () {
      return this.isSmallUnit ? 100 : 1
    }
  },

  methods: {
    ...mapMutations('groceries', ['setQuantity', 'toggleSelect']),

    incrementQuantity () {
      this.val += this.step
    },

    decrementQuantity () {
      if (this.val > this.step) {
        this.val -= this.step
      }
    },

    setVal () {
      this.val = this.step
    }
  },

  watch: {
    selected (isSelected) {
      isSelected
        ? this.setQuantity({ name: this.item.name, qty: this.quantity })
        : this.setVal()
    },

    val (value) {
      if (this.selected) {
        this.setQuantity({ name: this.item.name, qty: value })
      }
    }
  },

  mounted () {
    this.setVal()
  }
}
</script>
