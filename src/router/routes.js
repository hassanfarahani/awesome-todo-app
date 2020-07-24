import Store from 'src/store'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'todo', component: () => import('pages/PageTodo.vue')},
      { path: '/settings', name: 'settings', component: () => import('pages/PageSettings.vue') },
      { path: '/settings/help', name: 'help', component: () => import('pages/PageHelp.vue') },
      { path: '/auth', name: 'auth', component: () => import('pages/PageAuth.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
