<template>
  <div>
<!-- List the submitted words -->
  <!-- <div class="mt-3">
      Submitted Names:
      <div
        v-if="submittedNames.length === 0"
      >
        --
      </div>
      <ul v-else class="mb-0 pl-3">
        <li
          v-for="submittedName in submittedNames"
          :key="submittedName"
        >
          {{ submittedName }}
        </li>
      </ul>
    </div>
  -->
    <b-modal
      ok-only
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      id="modal-prevent-closing"
      ref="modal"
      :title="projectTitle"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Your Username"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            placeholder="Give me your name"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['projectTitle'],
  data () {
    return {
      name: '',
      nameState: null,
      submittedNames: []
    }
  },
  mounted () {
    this.$bvModal.show('modal-prevent-closing')
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal () {
      this.name = ''
      this.nameState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name)
      console.log(this.submittedNames)
      this.$root.$emit('eventing', this.submittedNames)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>
