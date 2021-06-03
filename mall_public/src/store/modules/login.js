export default {
    state: {
        userId: "",
        loginState: false
    },
    mutations: {
        setUserId(state, id) {
            state.userId = id;
        },
        changeLogin(state) {
            state.loginState = true;
        },
        changeLogout(state) {
            state.loginState = false;
        }
    },
    actions: {
        setUserId (context, payload) {
            context.commit('setUserId', payload);
            context.commit('changeLogin', payload);
        },

    }

}
