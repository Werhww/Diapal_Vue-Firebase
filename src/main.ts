import { createApp } from 'vue'
import { createStore } from 'vuex'

export const store = createStore({
    state: {
        user: {}
    },
    mutations: {
        loggedIn (state, user) {
            state.user = { user }
        },
        
        loggedOut (state) {
            state.user = {}
        },
    }

})


import content from './App.vue'
import router from './router'

createApp(content).use(router).use(store).mount('#app')