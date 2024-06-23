<style lang="scss">
  .cache-clear-container.nav-content {
    font-family: "Noto Sans", Arial, sans-serif;
    max-width: 400px;
    overflow-y: auto;
    padding: 10px 30px;
    width: inherit;
  }

  .clear-cache-instructions {
    font-size: 18px;
  }

  .cache-clear-list {
    list-style: none;
    padding: 0;
  }

  .cache-clear-list-item + .cache-clear-list-item {
    margin: 10px 0 0 0;
  }

  .cache-clear-status {
    color: green;
    font-weight: bold;
    text-transform: uppercase;
  }

  .cache-clear-status.error {
    color: red;
  }
</style>
<template>
  <div class="cache-clear-container">
    <div v-if="results.length === 0" class="cache-clear-front">
      <h1>Clear Cache</h1>
      <p class="clear-cache-instructions">Add urls to the list whose cache should be cleared and then press the "Clear" button below.</p>
      <form @submit="clearAsset">
        <ol class="cache-clear-list">
          <li class="cache-clear-list-item" v-for="(link, index) in links" :key="index">
            <ui-textbox
              class="form-element"
              label="Url"
              type="url"
              floating-label
              v-model="links[index]"
              @blur="fieldChanged"
              @keydown-enter="clearAsset"
            ></ui-textbox>
          </li>
        </ol>
        <ui-button
          color="primary"
          buttonType="submit"
        >Clear</ui-button>
      </form>
    </div>
    <div v-else class="cache-clear-results">
      <h1>Results</h1>
      <ol class="cache-clear-list">
        <li class="cache-clear-list-item" v-for="(result, index) in results" :key="index">
          <span class="cache-clear-status" v-bind:class="result.status">{{ result.status }}</span>: <a v-bind:href="result.url" target="_blank">{{ result.url }}</a>
        </li>
      </ol>
      <ui-button
        color="primary"
        :loading="loading"
        buttonType="button"
        @click="reset"
      >Done</ui-button>
    </div>
  </div>
</template>
<script>
  'use strict';

  const purge = require('./utils/purge'),
    { MIN_LINKS_LENGTH } = require('./utils/constants'),
    {
      UiTextbox,
      UiIcon,
      UiButton
    } = window.kiln.utils.components;

  module.exports = {
    data() {
      return {
        requesting: false,
        links: ['', ''],
        results: []
      };
    },
    components: {
      UiTextbox,
      UiButton
    },
    methods: {
      /**
       * Checks whether the links count have changed or not
       */
      fieldChanged() {
        if (this.links.filter(link => !link).length < MIN_LINKS_LENGTH) this.links.push('');
      },
      /**
       * Purges cache from Fastly for each link
       * @param {Object} event
       */
      clearAsset(event) {
        const links = this.links
          .filter(link => !!link)
          .map(purge);

        event.preventDefault();

        this.requesting = true;

        Promise.all(links)
          .then(resp => resp.map(item => {
            if (!item.status) item.status = 'error';
            return item
          }))
          .then(resp => {
            this.requesting = false;
            this.results = resp;
          });
      },
      /**
       * Resets the state of the component
       */
      reset() {
        this.links = ['', ''];
        this.results = [];
      }
    }
  };
</script>
