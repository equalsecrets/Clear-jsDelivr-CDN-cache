<template>
  <nav-menu-button id="cache-clear" icon="cached" @nav-click="openNav">Clear Cache</nav-menu-button>
</template>
 <script>
  'use strict';

  const navMenuButton = window.kiln.utils.components.navMenuButton;

  module.exports = {
    data() {
      return {};
    },
    methods: {
      openNav() {
        this.$store.dispatch('openNav', 'cache-clear');
      }
    },
    components: {
      navMenuButton
    }
  };
</script>
