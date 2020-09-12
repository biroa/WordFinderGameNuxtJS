<template>
  <b-modal id="one-match-is-found" hide-footer>
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
    <b-button class="mt-3" block @click="$bvModal.hide('one-match-is-found'), $bvModal.show('modal-prevent-closing')">Play Again</b-button>
    <div>
      <p class="h4 mb-2">
        <b-icon class="left-0" icon="exclamation-circle-fill"></b-icon>
        <b-icon class="right-0" icon="exclamation-circle-fill"></b-icon>
      </p>
    </div>
  </b-modal>
</template>
<script>
export default {
  props: ['projectTitle']
}
</script>
