<template>
  <b-modal id="modal-scrollable" scrollable title="Scrollable Content">
    <p class="my-3" v-for="i in 15" :key="i">
      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    </p>
  </b-modal>
</template>
