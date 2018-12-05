<template>
    <v-container fluid>
        <v-toolbar app fixed prominent clipped-left>
            <v-toolbar-side-icon @click="drawer = !drawer">
                <v-icon>dehaze</v-icon>
            </v-toolbar-side-icon>
            <v-toolbar-title>
                <img height="75px" src="../assets/logo.png">
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <notifications-hub></notifications-hub>
                <v-menu offset-y offset-x>
                    <v-toolbar-title slot="activator">
                        <v-btn icon>
                            <v-icon>person</v-icon>
                        </v-btn>
                    </v-toolbar-title>

                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title>
                                <v-icon left>person</v-icon>
                                Profile
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile @click="logOut()">
                            <v-list-tile-title>
                                <v-icon left>power_settings_new</v-icon>
                                Logout
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-menu offset-y offset-x>
                    <v-toolbar-title slot="activator">
                        <v-btn icon>
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                    </v-toolbar-title>

                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title>
                                <v-icon left>code</v-icon>
                                Code
                            </v-list-tile-title>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile>
                            <v-list-tile-title>
                                <v-icon left>help</v-icon>
                                Documentation
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
        <v-navigation-drawer
                width="200"
                clipped
                app
                class="elevation-2"
                v-model="drawer"
        >
            <v-list>

                <v-subheader>Users</v-subheader>
                <v-list-tile v-for="(userView, i) in userViews" :key="i" @click="goTo(userView.name)">
                    <v-list-tile-action>
                        <v-icon>{{userView.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title v-text="userView.title"></v-list-tile-title>
                </v-list-tile>

                <v-divider></v-divider>
                <v-subheader>Groups</v-subheader>
                <v-list-tile v-for="(groupView, i) in groupViews" :key="i+10" @click="goTo(groupView.name)">
                    <v-list-tile-action>
                        <v-icon>{{groupView.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title v-text="groupView.title"></v-list-tile-title>
                </v-list-tile>

                <v-divider></v-divider>
                <v-subheader>Roles</v-subheader>
                <v-list-tile v-for="(roleView, i) in roleViews" :key="i+100" @click="goTo(roleView.name)">
                    <v-list-tile-action>
                        <v-icon outline class="outlined">{{roleView.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title v-text="roleView.title"></v-list-tile-title>
                </v-list-tile>

                <v-divider></v-divider>
                <v-subheader>Permissions</v-subheader>
                <v-list-tile v-for="(permissionView, i) in permissionViews" :key="i+1000"
                             @click="goTo(permissionView.name)">
                    <v-list-tile-action>
                        <v-icon>{{permissionView.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title v-text="permissionView.title"></v-list-tile-title>
                </v-list-tile>

                <v-divider></v-divider>
                <v-list-tile v-for="(miscView, i) in miscViews" :key="i+10000"
                             @click="goTo(miscView.name)">
                    <v-list-tile-action>
                        <v-icon>{{miscView.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title v-text="miscView.title"></v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="logOut">
                    <v-list-tile-action>
                        <v-icon>power_settings_new</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Log Out</v-list-tile-title>
                </v-list-tile>


            </v-list>
        </v-navigation-drawer>

        <v-content>
            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>
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
                    icon: "supervisor_account"
                },
                {
                    title: "Add User",
                    name: "/registerUser",
                    icon: "person_add"
                }
            ],
            groupViews: [
                {
                    title: "Groups",
                    name: "/listGroups",
                    icon: "group"
                },
                {
                    title: "Add Group",
                    name: "/dummy",
                    icon: "group_add"
                }
            ],
            permissionViews: [
                {
                    title: "Permissions",
                    name: "/dummy",
                    icon: "list"
                },
                {
                    title: "Add Permission",
                    name: "/dummy",
                    icon: "lock"
                }
            ],
            roleViews: [
                {
                    title: "Roles",
                    name: "/dummy",
                    icon: "people_outline"
                },
                {
                    title: "Add Role",
                    name: "/dummy",
                    icon: "person_outline"
                }
            ],
            miscViews: []
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