import { firebaseAuth } from 'boot/firebase'
import { LocalStorage, Loading } from 'quasar'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
    loggedIn: false
}

const mutations = {
    setLoggedIn(state, value) {
        state.loggedIn = value
    }
}

const actions = {
    registerUser({}, payload) {
        Loading.show()
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                console.log('response:', response)
            })
            .catch(error => { showErrorMessage(error.message)})
    },
    loginUser({}, payload) {
        Loading.show()
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                console.log('response:', response)
            })
            .catch(error => { showErrorMessage(error.message) })
    },
    logoutUser() {
        firebaseAuth.signOut()
    },
    handleAuthStateChange({ commit, dispatch }) {
        firebaseAuth.onAuthStateChanged(user => {
            Loading.hide()
            if (user) {
                commit('setLoggedIn', true)
                LocalStorage.set('loggedIn', true)
                this.$router.push({name: 'todo'}).catch(err => { console.log(err)})
                // { root: true } ==> this option will allow us to trigger this action (fbReadData) which is in a different module (tasks)
                dispatch('tasks/fbReadData', null, { root: true })
            } else {
                commit('tasks/clearTasks', null, { root: true})
                commit('tasks/setTasksDownloaded', false, { root: true})
                commit('setLoggedIn', false)
                LocalStorage.set('loggedIn', false)
                this.$router.replace({name: 'auth'}).catch(err => { console.log(err)})
            }
        })
    }
}

const getters = {

}

export default {
    namespaced: true, // this allows us to have multiple store modules within our app
    state,
    mutations,
    actions,
    getters
}