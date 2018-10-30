<template>
    <v-app id="inspire">


        <div v-if="adminView">
            <AdminNavigationView></AdminNavigationView>
        </div>
        <div v-else-if="tenantView">
            <TenantavigationView></TenantavigationView>
        </div>
        <div v-else>
            <v-container justify-center>
                <v-btn @click="adminView=true">Admin View</v-btn>
                <v-btn @click="tenantView=true">Tenant View</v-btn>
            </v-container>
        </div>
    </v-app>
</template>

<script>
    import AdminNavigationView from "./views/AdminNavigationView"
    import TenantavigationView from "./views/TenantNavigationView"

    export default {
        components: {
            AdminNavigationView,
            TenantavigationView
        },
        data: () => ({
            adminView: false,
            tenantView: false
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
