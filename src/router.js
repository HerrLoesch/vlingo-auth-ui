import Vue from 'vue'
import Router from 'vue-router'
import TenantSubscriptionList from './views/TenantSubscriptionList'
import ComponentOverview from './views/ComponentOverview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: TenantSubscriptionList
    },
    {
        path: '/components',
        name: 'components',
        component: ComponentOverview
    },
    {
        path: '/subscriptions',
        name: 'subscriptions',
        component: TenantSubscriptionList
    }
  ]
})
