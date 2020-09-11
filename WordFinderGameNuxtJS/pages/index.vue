
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
          <b-card class="text-left">
            <div class="bg-secondary text-light p-3">
              <b-form>
                <b-row class="m-3">
                  <b-form ref="form" @submit.stop.prevent="handleSubmit">
                  <b-col cols="12" md="9" sm="6">
                    <b-form-group id="input-group-2" label-for="input-2">
                      <!--v-model="test"-->
                      <b-form-input id="input-2" v-model="searchedWord">
                        required placeholder="Type the word you want to find">
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
                  </b-form>
                </b-row>
              </b-form>
            </div>
          </b-card>
          <b-card class="text-left mt-2">
            <div class="bg-secondary text-light p-3">
              <p>Your searches:</p>
              <ul>
                <li v-for="(item, index) in lookUpWords" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </b-card>
        </b-col>
        <b-col cols="12" md="6" lg="8">
          <b-card class="text-left">
            <div class="bg-secondary text-light p-3">
              Table
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <!-- Container -->
    <nuxt-content :document="words" />
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const words = await $content('dictionary', params.slug).fetch()
    const charsOfWord = []
    for (const word of words.dictionary) {
      const chars = word.split('')
      charsOfWord.push(chars)
      // console.log(chars, typeof chars)
    }
    console.log(charsOfWord)
    return { words, charsOfWord }
  },
  data () {
    return {
      searchedWord: '',
      charsOfWord: [],
      lookUpWords: [],
      currentTime: undefined,
      username: undefined
    }
  },
  mounted () {
    const sanitized = []
    for (let i = 0; i < this.charsOfWord.length; i++) {
      const word = this.$_.unique(this.charsOfWord[i])
      sanitized.push({ word: word.toString(), point: word.length })
    }
    console.log(sanitized)

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
    getDate () {
      const today = new Date()
      const month = today.getMonth() + 1
      const date = today.getFullYear() + '-' + (month < 10 ? '0' + month : '' + month) + '-' + today.getDate()
      return date
    },
    handleSubmit () {
      // Push the name to submitted names
      this.lookUpWords.push(this.searchedWord)
      this.searchedWord = ''
      console.log(this.lookUpWords)
    }
  },
  cron: {
    time: 1000,
    method: 'load'
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
