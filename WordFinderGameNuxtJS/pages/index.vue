<template>
  <div>
    <!-- Container -->
    <b-container fluid>
      <b-row class="pt-2">
        <b-col cols="12" md="4">
          <b-card class="text-left">
            <div class="bg-secondary text-light p-3">
              Date: <span><em>{{ getDate() }}</em></span>
            </div>
          </b-card>
        </b-col>
        <b-col cols="12" md="4">
          <b-card class="text-left">
            <div class="bg-secondary text-light p-3">
              Time: <span><em>{{ currentTime }}</em></span>
            </div>
          </b-card>
        </b-col>
        <b-col cols="12" md="4">
          <b-card class="text-left">
            <div class="bg-secondary text-light p-3">
              Player Name: <span><em>{{ username }}</em></span>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="pt-2">
        <b-col cols="12" md="6" lg="4">
          <form ref="searchword" @submit.stop.prevent="handleSubmit" novalidate="true">
          <b-card class="text-left">
            <div class="bg-secondary text-light p-3">
                <b-row class="m-3">
                  <b-col cols="12" md="9" sm="6">
                    <b-form-group id="input-group-2" label-for="input-2">
                      <!--v-model="test"-->
                      <b-form-input
                        id="input-2"
                        v-model="searchedWord"
                        required
                        placeholder="Type the word you want to find"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12" md="3" sm="6" align="center">
                    <b-form-group>
                      <b-button type="submit" variant="success">
                        Submit
                      </b-button>
                    </b-form-group>
                  </b-col>
                </b-row>
            </div>
          </b-card>
          <div class="pt-2">
            <b-alert
              v-if="errors.length"
              show
              variant="danger"
            >
              <b>Please correct the following error(s):</b>
              <ul>
                <li>
                  {{ errors[0] }}
                </li>
              </ul>
            </b-alert>
          </div>
            <div class="pt-2">
              <b-alert
                :show="dismissCountDown"
                dismissible
                variant="warning"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged"
              >
                <p>
                  We did not find any match! {{ dismissCountDown }}
                </p>
                <b-progress
                  variant="warning"
                  :max="dismissSecs"
                  :value="dismissCountDown"
                  height="4px"
                ></b-progress>
              </b-alert>
            </div>
          <b-card class="text-left mt-2">
            <div class="bg-secondary text-light p-3">
              <p>Previous Searches:</p>
              <ul>
                <li v-for="(item, index) in lookUpWords" :key="index">
                  {{ item.toLowerCase() }}
                </li>
              </ul>
            </div>
          </b-card>
          </form>
        </b-col>
        <b-col cols="12" md="6" lg="8">
          <b-card class="text-left">
            <div class="bg-secondary text-light p-3">
              <TheRankTable />
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- Container -->
  </div>
</template>

<script>
export default {
  // get the data from the dictionary json
  async asyncData ({ $content, params }) {
    const words = await $content('dictionary', params.slug).fetch()
    const charsOfWord = []
    for (const word of words.dictionary) {
      const chars = word.split('')
      charsOfWord.push(chars) // Letters of array from the original words
    }
    return { words, charsOfWord }
  },
  data () {
    return {
      searchedWord: '', // Input field model
      errors: [], // Input data error bag
      charsOfWord: [], // Letters of array from the original words
      lookUpWords: [], // Array with the words from the the current searches
      currentTime: null,
      username: null,
      sanitized: [],
      // alert related parameters
      dismissSecs: 8,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  mounted () {
    // Remove the redundant characters from the array
    for (let i = 0; i < this.charsOfWord.length; i++) {
      const original = this.charsOfWord[i].join('').toLowerCase()
      const word = this.$_.unique(this.charsOfWord[i])
      this.sanitized.push({ word: original, sanitizedLetters: word.toString().toLowerCase(), point: word.length }) // Non redundant letters of the words with point
    }

    // Check the Event Bus solution too. It is much better !!!
    // https://stackoverflow.com/questions/38616167/communication-between-sibling-components-in-vuejs-2-0
    this.$root.$on('eventing', (data) => {
      this.username = data.shift()
    })
  },
  methods: {
    load () {
      this.currentTime = (new Date().toLocaleTimeString())
    },
    /**
     * Get the current date
     */
    getDate () {
      const today = new Date()
      const month = today.getMonth() + 1
      const date = today.getFullYear() + '-' + (month < 10 ? '0' + month : '' + month) + '-' + today.getDate()
      return date
    },
    /**
     * Write the scores in to the localStorage
     * @param actualWord
     */
    writeOutTheMatchToTheLog (actualWord) {
      for (const i in this.sanitized) {
        const currentRow = this.sanitized[i]
        if (currentRow.word === actualWord) {
          const log = currentRow
          log.username = this.username
          // Insert into the storage if we do not have it there yet
          if (this.$_.findIndex(this.$store.state.localStorage.ranks, { word: actualWord }) === -1) {
            // eslint-disable-next-line no-undef
            this.$store.commit('localStorage/set',
              {
                point: log.point,
                username: log.username,
                time: this.currentTime,
                word: log.word
              }
            )
          }
        }
      }
    },
    /**
     * Match the actual word against the words.dictionary.JSON
     * @param actualWord
     */
    matchingSearchedAndDictionaryWords (actualWord) {
      if (this.$_.findIndex(this.$store.state.localStorage.ranks, { word: actualWord }) === -1) {
        this.$bvModal.show('one-match-is-found')
        this.writeOutTheMatchToTheLog(actualWord)
      } else {
        this.showAlert()
      }
    },
    /**
     * Form Submit Handling
     * @param e
     */
    handleSubmit (e) {
      // Validate
      if (this.searchedWord === '') {
        this.errors.push('Search word can not be empty!')
      } else {
        // We store to list all the lower cased words in the lookUpWords
        this.lookUpWords.push(this.searchedWord.toLowerCase())
        // We validate only the lower cased searched words against the words in the dictionary
        this.matchingSearchedAndDictionaryWords(this.searchedWord.toLowerCase())
        this.searchedWord = ''
      }
      e.preventDefault()
    },
    /**
     * Alert countdown
     * @param dismissCountDown
     */
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    /**
     * Show alert messages
     */
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  },
  cron: {
    time: 1000,
    method: 'load'
  }
}
</script>

<style>
</style>
