import Vue from 'vue'
import Router from 'vue-router'
import TenantSubscriptionList from './views/TenantSubscriptionList'
import ComponentOverview from './views/ComponentOverview'
import RegisterUser from './views/RegisterUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ComponentOverview
    },
    {
        path: '/components',
        name: 'components',
        component: ComponentOverview
    },
    {
        path: '/registerUser',
        name: 'registerUser',
        component: RegisterUser
    },
    {
        path: '/subscriptions',
        name: 'subscriptions',
        component: TenantSubscriptionList
    }
  ]
})
