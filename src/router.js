import Vue from 'vue'
import Router from 'vue-router'
import TenantSubscriptionList from './components/TenantSubscriptionList'
import EditUserDetails from './components/EditUserDetails'
import EditCredentialDetails from './components/EditCredentialDetails'

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
        path: '/editUser',
        name: 'editUser',
        component: EditUserDetails
    },
    {
        path: '/editCredential',
        name: 'editCredential',
        component: EditCredentialDetails
    }
  ]
})
