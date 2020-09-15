export const state = () => ({
  ranks: []
})

export const mutations = {
  set: (state, payload) => {
    state.ranks.push({
      point: payload.point,
      username: payload.username,
      time: payload.time,
      word: payload.word
    }
    )
    console.log(state.ranks)
  }
}
