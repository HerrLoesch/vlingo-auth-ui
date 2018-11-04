<template>
    <v-app id="inspire">

        <v-container>
            <div v-if="loggedIn">
                <TenantavigationView></TenantavigationView>
            </div>
            <div v-else-if="register">
                <v-container>
                    <img src="./assets/logo.png">
                    <RegisterUser v-on:canceled="register=false" v-on:registered="logIn"></RegisterUser>
                </v-container>
            </div>
            <div v-else>
                <v-container>
                    <img src="./assets/logo.png">
                    <SignOn></SignOn>
                    <v-btn flat @click="register=true">register</v-btn>
                    <v-tooltip bottom>
                        <v-btn slot="activator" flat @click="logIn()">Debug Shortcut</v-btn>
                        <span>Click this if you don't want to enter login data.</span>
                    </v-tooltip>
                </v-container>
            </div>
        </v-container>
    </v-app>
</template>

<script>
    import TenantavigationView from "./views/TenantNavigationView"
    import RegisterUser from "./views/RegisterUser"
    import SignOn from "./views/SignOn"
    import {mapState} from "vuex"
    import {LOGIN, APPLICATION_STATE_MODULE} from "./store/applicationState.module"

    export default {
        components: {
            TenantavigationView,
            RegisterUser,
            SignOn
        },
        computed: mapState(APPLICATION_STATE_MODULE, {
            loggedIn: state => state.isLoggedIn
        }),
        data: () => ({
            register: false
        }),
        methods: {
            logIn(user) {
                this.$store.dispatch(LOGIN, user)
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
