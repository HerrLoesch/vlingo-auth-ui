import Vue from 'vue'
import Router from 'vue-router'
import TenantSubscriptionList from './components/TenantSubscriptionList'
import NewUser from './components/NewUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: TenantSubscriptionList
    },
    {
        path: '/subscriptions',
        name: 'subscriptions',
        component: TenantSubscriptionList
    },
    {
        path: '/newUser',
        name: 'newUser',
        component: NewUser
    }
  ]
})
