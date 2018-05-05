const store = {
  state: {
    type:'white'
  },
  mutations: {
    increment (state) {
      console.log(state.type)
    }
  }
}

module.export = store;
