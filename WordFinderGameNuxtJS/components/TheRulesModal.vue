<template>
  <b-modal id="modal-scrollable" scrollable :title="projectTitle">
    <p v-for="i in 15" :key="i" class="my-3">
      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    </p>
    <template v-slot:modal-footer="{}">
      <b-button-group>
        <b-button variant="success" @click="$bvModal.hide('modal-scrollable'), $bvModal.show('modal-prevent-closing')">
          <b-icon icon="play"></b-icon> Play Again
        </b-button>
        <b-button variant="danger" @click="$bvModal.hide('modal-scrollable'), $bvModal.show('modal-scoreboard')" >
          <b-icon icon="bullseye"></b-icon> Scoreboard
        </b-button>
      </b-button-group>
    </template>
  </b-modal>
</template>
<script>
export default {
  props: {
    projectTitle: {
      type: String,
      default: ''
    }
  }
}
</script>
