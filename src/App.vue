<template>
    <v-app id="inspire">
        <v-toolbar app fixed clipped-left>
            <v-toolbar-title>
                Vlingo
            </v-toolbar-title>
        </v-toolbar>
        <v-navigation-drawer
                app
                clipped
                permanent
        >
            <v-list>
                <v-list-group>
                    <v-list-tile slot="activator">
                        <v-list-tile-title>Tenants</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile v-for="(tenantView, i) in tenantViews" :key="i" @click="goTo(tenantView.name)">
                        <v-list-tile-title v-text="tenantView.title"></v-list-tile-title>
                        <v-list-tile-action>
                            <v-icon>{{tenantView.icon}}</v-icon>

                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>

                <v-list-group>
                    <v-list-tile slot="activator">
                        <v-list-tile-title>Users</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile v-for="(userView, i) in userViews" :key="i" @click="goTo(userView.name)">
                        <v-list-tile-title v-text="userView.title"></v-list-tile-title>
                        <v-list-tile-action>
                            <v-icon>{{userView.icon}}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>

                <v-list-goup>
                    <v-list-tile v-for="(devView, i) in devViews" :key="i" @click="goTo(devView.name)">
                        <v-list-tile-title v-text="devView.title"></v-list-tile-title>
                    </v-list-tile>
                </v-list-goup>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <v-flex>
                        <router-view></router-view>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app fixed>
            <span>&copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            drawer: true,
            tenantViews: [
                {
                    title: "Subscriptions",
                    name: "/subscriptions",
                    icon: ""
                },
                {
                    title: "Register Tenant",
                    name: "/registerTenant",
                    icon: ""
                }
            ],
            userViews: [
                {
                    title: "Register User",
                    name: "/registerUser",
                    icon: "far fa-check-circle"
                },
                {
                    title: "Edit User",
                    name: "/editUser",
                    icon: "far fa-check-circle"

                },
                {
                    title: "Edit Credentials",
                    name: "/editCredentials"
                },
                {
                    title: "List Users",
                    name: "/listUsers"
                }
            ],
            devViews: [
                {
                    title: "Component Overview",
                    name: "/components",
                }
            ]
        }),
        methods: {
            goTo(route) {
                this.$router.push(route)
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
