<template>
  <div>
    <b-table
      :striped="striped"
      :bordered="bordered"
      :borderless="borderless"
      :outlined="outlined"
      :small="small"
      :hover="hover"
      :dark="dark"
      :fixed="fixed"
      :foot-clone="footClone"
      :no-border-collapse="noCollapse"
      :items="items"
      :fields="fields"
      :head-variant="headVariant"
      :table-variant="tableVariant"
      :sticky-header="height"
      responsive
    ></b-table>
  </div>
</template>

<script>
export default {
  props: {
    dataSrc: {
      type: Array
    },
    height: {
      type: String,
      default: '510px'
    }
  },
  data () {
    return {
      fields: [
        { key: 'username', sortable: true },
        'time',
        'word',
        { key: 'point', sortable: true }
      ],
      items: this.$store.state.localStorage.ranks,
      tableVariants: [
        'primary',
        'secondary',
        'info',
        'danger',
        'warning',
        'success',
        'light',
        'dark'
      ],
      striped: true,
      bordered: true,
      borderless: false,
      outlined: false,
      small: false,
      hover: true,
      dark: true,
      fixed: false,
      footClone: true,
      headVariant: null,
      tableVariant: '',
      noCollapse: false
    }
  }
}
</script>
