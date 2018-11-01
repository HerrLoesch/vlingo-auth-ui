<template>
    <v-app id="inspire" >

        <v-container>
            <div v-if="isLoggedIn">
                <TenantavigationView></TenantavigationView>
            </div>
            <div v-else-if="register">
                <v-container>
                <img src="./assets/logo.png">
                <RegisterUser v-on:canceled="register=false" v-on:registered="isLoggedIn=true"></RegisterUser>
                </v-container>
            </div>
            <div v-else>
                <v-container>
                    <img src="./assets/logo.png">
                    <SignOn v-on:signedOn="isLoggedIn=true"></SignOn>
                        <v-btn flat @click="register=true">register</v-btn>
                        <v-btn flat @click="isLoggedIn=true">Debug Shortcut</v-btn>
                </v-container>
            </div>
        </v-container>
    </v-app>
</template>

<script>
    import TenantavigationView from "./views/TenantNavigationView"
    import RegisterUser from "./views/RegisterUser"
    import SignOn from "./views/SignOn"

    export default {
        components: {
            TenantavigationView,
            RegisterUser,
            SignOn
        },
        data: () => ({
            register: false,
            isLoggedIn: false
        })
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
