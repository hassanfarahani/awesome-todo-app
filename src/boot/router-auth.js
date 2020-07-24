import { LocalStorage } from 'quasar'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('loggedIn')
    if(!loggedIn && to.name !== 'auth' ) {
      next({name: 'auth'})
    } else {
      next()
    }

  })
}
