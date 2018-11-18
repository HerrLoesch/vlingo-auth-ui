import Vue from "vue"
import Router from "vue-router"
import RegisterUser from "./views/RegisterUser"
import EditUser from "./views/EditUser"
import ProvisionPermission from "./views/ProvisionPermission"
import ProvisionGroup from "./views/ProvisionGroup"
import DummyView from "./views/DummyView"
import SignOn from "./views/SignOn"
import ListUsers from "./views/ListUsers"
import ListGroups from "./views/ListGroups"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: ListUsers
        },
        {
            path: "/registerUser",
            name: "registerUser",
            component: RegisterUser
        },
        {
            path: "/listUsers",
            name: "listUsers",
            component: ListUsers
        },
        {
            path: "/editUser",
            name: "editUser",
            component: EditUser
        },
        {
            path: "/listGroups",
            name: "listGroups",
            component: ListGroups
        },
        {
            path: "/dummy",
            name: "dummy",
            component: DummyView
        },
        {
            path: "/provisionPermission",
            name: "provisionPermission",
            component: ProvisionPermission
        },
        {
            path: "/signOn",
            name: "signOn",
            component: SignOn
        },
        {
            path: "/provisionGroup",
            name: "provisionGroup",
            component: ProvisionGroup
        }
    ]
})
