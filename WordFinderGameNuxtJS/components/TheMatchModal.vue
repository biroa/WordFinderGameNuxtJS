<template>
  <b-modal id="one-match-is-found" hide-footer hide-header-close no-close-on-backdrop no-close-on-esc>
    <template v-slot:modal-title>
      {{projectTitle}}
    </template>
    <div class="d-block text-center">
      <b-alert show variant="success">
        <h3>Congratulations!!!</h3>
        <h5>You found a match!!</h5>
      </b-alert>
      <div>
        <b-iconstack font-scale="5" animation="cylon">
          <b-icon
            stacked
            icon="info-circle-fill"
            animation=""
            variant="success"
            scale="0.45"
          ></b-icon>
          <b-icon
            stacked
            icon="gear-wide"
            animation="spin-reverse"
            variant="success"
          ></b-icon>
        </b-iconstack>
      </div>
    </div>
    <div class="d-block text-center mt-2">
      <b-button-group>
        <b-button variant="success" @click="$bvModal.hide('one-match-is-found'), $bvModal.show('modal-prevent-closing')">
          <b-icon icon="play"></b-icon> Play Again
        </b-button>
        <b-button variant="danger" @click="$bvModal.hide('one-match-is-found'), $bvModal.show('modal-scoreboard')" >
          <b-icon icon="bullseye"></b-icon> Scoreboard
        </b-button>
        <b-button variant="warning" @click="$bvModal.hide('one-match-is-found'), $bvModal.show('modal-scrollable')" >
          <b-icon icon="info-circle-fill"></b-icon> Rules
        </b-button>
      </b-button-group>
    </div>
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
