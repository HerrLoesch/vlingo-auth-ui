<template>
    <v-container fluid>
        <v-card>
            <v-toolbar class="teal darken-3 white--text">
                <span class="headline">Users</span>

                <v-spacer></v-spacer>
                <v-text-field dark
                              v-model="search"
                              append-icon="search"
                              label="Search"
                              single-line
                              hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn @click="registerDialogVisible = true"
                       color="teal darken-1"
                       dark
                       small
                       absolute
                       bottom
                       right
                       fab
                >
                    <v-icon>add</v-icon>
                </v-btn>
            </v-toolbar>

            <!-- user list -->
            <v-data-table :headers="headers" :items="users" :loading="isLoading" :search="search">
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
                <template slot="items" slot-scope="props">
                    <tr @click="props.expanded = !props.expanded">
                        <td>{{ props.item.userName }}</td>
                        <td class="text-xs-left">{{ props.item.email }}</td>
                        <td class="text-xs-left">{{ props.item.givenName }}</td>
                        <td class="text-xs-left">{{ props.item.familyName }}</td>
                        <td class="text-xs-left">{{ props.item.phone }}</td>
                        <td class="justify-center layout px-0">
                            <v-icon small
                                    class="mr-2"
                                    @click="showEditDialog(props.item)">
                                edit
                            </v-icon>
                            <v-icon small
                                    @click="askToDelete(props.item)"
                            >
                                delete
                            </v-icon>
                        </td>
                    </tr>
                </template>

                <!-- Expanded View-->
                <template slot="expand" slot-scope="props">
                    <v-card flat class="grey lighten-3">
                        <v-card-text>
                            <v-layout>
                                <v-flex xs4>
                                    <v-card>
                                        <v-card-text>
                                            <v-subheader>Credentials
                                                <v-btn icon>
                                                    <v-icon small @click="createCredential">add_circle_outline</v-icon>
                                                </v-btn>
                                            </v-subheader>
                                            <v-list two-line>
                                                <template v-for="(credential) in props.item.credentials">
                                                    <v-list-tile :key="credential.id">
                                                        <v-list-tile-content>
                                                            <v-list-tile-title>{{credential.id}}</v-list-tile-title>
                                                            <v-list-tile-sub-title>{{credential.authority}}
                                                            </v-list-tile-sub-title>
                                                        </v-list-tile-content>

                                                        <v-list-tile-action>
                                                            <v-btn icon @click="editCredential(credential)">
                                                                <v-icon small>edit</v-icon>
                                                            </v-btn>
                                                        </v-list-tile-action>
                                                        <v-list-tile-action>
                                                            <v-btn icon>
                                                                <v-icon small>delete</v-icon>
                                                            </v-btn>
                                                        </v-list-tile-action>
                                                    </v-list-tile>
                                                </template>
                                            </v-list>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                                <v-flex xs4>
                                    <v-card>
                                        <v-card-text>
                                            This part is still under construction and currently broken!
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>

                </template>
            </v-data-table>
        </v-card>

        <!-- Delete confirmation -->
        <v-dialog v-model="deleteConfirmationVisible" width="400">
            <v-card>
                <v-card-title class="headline" primary-title>
                    Delete?
                </v-card-title>
                <v-card-text>
                    Do you realy want to delete user <b>{{selectedUser.userName}}</b>?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" flat @click="deleteItem()">Yes</v-btn>
                    <v-btn flat @click="closeConfirmation()">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Register dialog -->
        <v-dialog v-model="registerDialogVisible" width="800">
            <v-card>
                <register-user v-on:canceled="registerDialogVisible=false"
                               v-on:registered="registeredUser"></register-user>
            </v-card>
        </v-dialog>

        <!-- Edit user dialog -->
        <v-dialog v-model="editUserDialogVisible" width="800">
            <v-card>
                <edit-user :user="this.editableUser"
                           v-on:canceled="closeEditUserDialog"
                           v-on:saved="savedEditedUser"></edit-user>
            </v-card>
        </v-dialog>

        <!-- Edit credential dialog -->
        <v-dialog v-model="editCredentialDialogVisible" width="800">
            <v-card>
                <edit-credential :user="editableUser"
                                 :credential="selectedCredential"
                                 v-on:canceled="editCredentialDialogVisible = false"
                                 v-on:saved="saveEditCredential"></edit-credential>
            </v-card>
        </v-dialog>

        <!-- notification -->
        <v-snackbar
                v-model="notificationVisible"
                :right="true"
                :timeout="3000"
                :top="true"
        >
            {{ notificationText }}
            <v-btn
                    color="red"
                    flat
                    @click="notificationVisible = false"
            >
                Close
            </v-btn>
        </v-snackbar>

    </v-container>
</template>

<script>
    import {mapState} from "vuex"
    import {INITIALIZE_USER_MODULE, DELETE_USER, USER_MODULE} from "../store/user.module"
    import RegisterUser from "./RegisterUser"
    import EditUser from "./EditUser"
    import EditCredential from "./EditCredential";

    export default {
        components: {
            EditCredential,
            EditUser,
            RegisterUser
        },
        created() {
            this.$store.dispatch(INITIALIZE_USER_MODULE)
        },
        methods: {
            createCredential() {
                this.selectedCredential = {}
                this.editCredentialDialogVisible = true
            },
            editCredential(credential) {
                // deep copy to prevent direct edit of the actual list item.
                this.selectedCredential = JSON.parse(JSON.stringify(credential))
                this.editCredentialDialogVisible = true
            },
            saveEditCredential(credential) {
                this.editCredentialDialogVisible = false
                this.showNotification("User \"" + credential.id + "\" was registered.")
            },
            registeredUser(newUser) {
                this.registerDialogVisible = false
                this.showNotification("User \"" + newUser.userName + "\" was registered.")
            },
            showEditDialog(item) {
                this.selectedUser = item

                // deep copy to prevent direct edit of the actual list item.
                this.editableUser = JSON.parse(JSON.stringify(item))
                this.editUserDialogVisible = true
            },
            askToDelete(item) {
                this.deleteConfirmationVisible = true
                this.selectedUser = item
            },
            deleteItem() {
                this.$store.dispatch(DELETE_USER, this.selectedUser)

                this.showNotification("User \"" + this.selectedUser.userName + "\" was deleted.")
                this.closeConfirmation()
            },
            closeConfirmation() {
                this.deleteConfirmationVisible = false
            },
            closeEditUserDialog() {
                this.editUserDialogVisible = false
            },
            showNotification(text) {
                this.notificationText = text
                this.notificationVisible = true
            },
            savedEditedUser() {
                this.closeEditUserDialog()
                this.showNotification("Changes are saved.")
                this.editableUser = {}
            }
        },
        computed: mapState(USER_MODULE, {
            users: state => state.users,
            isLoading: state => state.isLoading
        }),
        data: () => ({
            search: "",
            showLoadingBar: false,
            editableUser: {},
            selectedUser: {},
            selectedCredential: {},
            deleteConfirmationVisible: false,
            registerDialogVisible: false,
            editCredentialDialogVisible: false,
            editUserDialogVisible: false,
            notificationVisible: false,
            notificationText: false,
            headers: [{
                text: 'Username',
                align: 'left',
                sortable: true,
                value: 'userName'
            },
                {
                    text: 'Email',
                    align: 'left',
                    sortable: true,
                    value: 'email'
                },
                {
                    text: 'Given Name',
                    align: 'left',
                    sortable: true,
                    value: 'givenName'
                },
                {
                    text: 'Family Name',
                    align: 'left',
                    sortable: true,
                    value: 'familyName'
                },
                {
                    text: 'Phone',
                    align: 'left',
                    sortable: true,
                    value: 'phone'
                },
                {
                    text: 'Actions',
                    align: 'Center',
                    sortable: false
                }]
        })
    }
</script>
