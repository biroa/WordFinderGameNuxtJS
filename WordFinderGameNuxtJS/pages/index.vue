<template>
  <div>
    <!-- Container -->
    <b-container fluid>
      <b-row class="pt-2">
        <b-col cols="12" md="4">
          <b-card class="text-left">
            <div class="bg-secondary text-light p-3">
              Date: <span><em>{placeholder-of-the-date}</em></span>
            </div>
          </b-card>
        </b-col>
        <b-col cols="12" md="4">
          <b-card class="text-left">
            <div class="bg-secondary text-light p-3">
              Time: <span><em>{placeholder-of-the-time}</em></span>
            </div>
          </b-card>
        </b-col>
        <b-col cols="12" md="4">
          <b-card class="text-left">
            <div class="bg-secondary text-light p-3">
              Player Name: <span><em>{placeholder-of-the-user-name}</em></span>
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
                  <b-col cols="12" md="9" sm="6">
                    <b-form-group id="input-group-2" label-for="input-2">
                      <!--v-model="test"-->
                      <b-form-input id="input-2">
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
                </b-row>
              </b-form>
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
    <!-- Container -->{{ points }}
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
      console.log(chars)
    }
    console.log(charsOfWord)
    return { words }
  },
  data () {
    return {
      points: 'test'
    }
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
