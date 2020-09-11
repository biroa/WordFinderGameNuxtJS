<template>
  <!-- Scoreboard Modals -->
  <b-modal id="modal-1" :title="projectTitle">
    <p class="my-4">Hello from TheScoreBoardModal!</p>
  </b-modal>
</template>

<script>
export default {
  props: ['projectTitle']
}
</script>
