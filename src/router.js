import Vue from 'vue'
import Router from 'vue-router'
import TenantSubscriptionList from './views/TenantSubscriptionList'
import ComponentOverview from './views/ComponentOverview'
import RegisterUser from './views/RegisterUser'
import EditUser from './views/EditUser'
import ProvisionPermission from './views/ProvisionPermission'
import RegisterTenant from './views/RegisterTenant'
import ProvisionGroup from './views/ProvisionGroup'

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
        },
        {
            path: '/editUser',
            name: 'editUser',
            component: EditUser
        },
        {
            path: '/provisionPermission',
            name: 'provisionPermission',
            component: ProvisionPermission
        },
        {
            path: '/registerTenant',
            name: 'registerTenant',
            component: RegisterTenant
        },
        {
            path: '/provisionGroup',
            name: 'provisionGroup',
            component: ProvisionGroup
        }

    ]
})
