<template>
  <!-- Header Nav -->
  <b-navbar toggleable="lg" type="dark" variant="secondary">
    <b-navbar-brand href="#">{{ projectTitle }}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse-top"></b-navbar-toggle>

    <b-collapse id="nav-collapse-top" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" v-b-modal.modal-prevent-closing>Dashboard</b-nav-item>
        <b-nav-item href="#" v-b-modal.modal-scoreboard>Scoreboard</b-nav-item>
        <b-nav-item href="#" v-b-modal.modal-scrollable>Rules</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  props: ['projectTitle']
}
</script>
