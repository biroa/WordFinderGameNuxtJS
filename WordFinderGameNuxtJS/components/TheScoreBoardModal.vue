<template>
  <!-- Scoreboard Modals -->
  <b-modal id="modal-scoreboard" :title="projectTitle">
    <p class="my-4">
      <TheRankTable :height="250 + 'px'" />
    </p>
    <template v-slot:modal-footer="{}">
      <b-button-group>
        <b-button variant="secondary" @click="$bvModal.hide('modal-scoreboard'), $bvModal.show('modal-prevent-closing')">
          <b-icon icon="play"></b-icon> Play Again
        </b-button>
        <b-button variant="secondary" @click="$bvModal.hide('modal-scoreboard'), $bvModal.show('modal-scrollable')" >
          <b-icon icon="info-circle-fill"></b-icon> Rules
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
