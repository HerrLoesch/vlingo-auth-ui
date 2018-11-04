<template>
    <v-container fluid>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-title>
                Vlingo
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-menu offset-y offset-x>
                    <v-toolbar-title slot="activator">
                        <v-btn icon>
                            <v-icon>account_circle</v-icon>
                        </v-btn>
                    </v-toolbar-title>

                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title>
                                Profile
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile @click="logOut()">
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
        <v-navigation-drawer
                app
                clipped
                permanent
        >
            <v-list>


                    <v-list-tile v-for="(userView, i) in userViews" :key="i" @click="goTo(userView.name)">
                        <v-list-tile-action>
                            <v-icon>{{userView.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title v-text="userView.title"></v-list-tile-title>
                    </v-list-tile>

                <v-list-group name="permissions">
                    <v-list-tile slot="activator">
                        <v-list-tile-title>Permissions</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile v-for="(permissionView, i) in permissionViews" :key="i"
                                 @click="goTo(permissionView.name)">
                        <v-list-tile-action>
                            <v-icon>{{permissionView.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title v-text="permissionView.title"></v-list-tile-title>
                    </v-list-tile>
                </v-list-group>

                <v-list-group name="groups">
                    <v-list-tile slot="activator">
                        <v-list-tile-title>Groups</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile v-for="(groupView, i) in groupViews" :key="i" @click="goTo(groupView.name)">
                        <v-list-tile-action>
                            <v-icon>{{groupView.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title v-text="groupView.title"></v-list-tile-title>
                    </v-list-tile>
                </v-list-group>

                <v-list-group name="roles">
                    <v-list-tile slot="activator">
                        <v-list-tile-title>Roles</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile v-for="(roleView, i) in roleViews" :key="i" @click="goTo(roleView.name)">
                        <v-list-tile-action>
                            <v-icon>{{roleView.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title v-text="roleView.title"></v-list-tile-title>
                    </v-list-tile>
                </v-list-group>


            </v-list>
        </v-navigation-drawer>

        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer app fixed>
            <span>&copy; 2018</span>
        </v-footer>
    </v-container>
</template>

<script>
    import {LOGOUT} from "../store/applicationState.module"

    export default {
        data: () => ({
            drawer: true,
            userViews: [
                {
                    title: "Users",
                    name: "/listUsers",
                    icon: "people"
                }
            ],
            groupViews: [
                {
                    title: "Add Group",
                    name: "/dummy",
                    icon: "add_circle_outline"
                },
                {
                    title: "List Groups",
                    name: "/dummy",
                    icon: "list"
                }
            ],
            permissionViews: [
                {
                    title: "Add Permission",
                    name: "/dummy",
                    icon: "add_circle_outline"
                },
                {
                    title: "List Permissions",
                    name: "/dummy",
                    icon: "list"
                }
            ],
            roleViews: [
                {
                    title: "Add Role",
                    name: "/dummy",
                    icon: "add_circle_outline"
                },
                {
                    title: "List Roles",
                    name: "/dummy",
                    icon: "list"
                }
            ]
        }),
        methods: {
            goTo(route) {
                this.$router.push(route)
            },
            logOut() {
                this.$store.dispatch(LOGOUT)
            }
        }
    }
</script>

<style scoped>

</style>