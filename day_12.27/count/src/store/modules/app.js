const state = {
    num: 1000
}

const mutations = {
    changeNum(state, { payload }) {
        state.num = payload == 'add' ? ++state.num : --state.num
    }
}
export default {
    state,
    mutations
}