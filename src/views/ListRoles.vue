<template>
    <v-container fluid id="roles-list">
        <v-card>
            <v-toolbar class="teal darken-1 white--text">

                <span class="headline">Roles</span>

                <v-spacer></v-spacer>
                <v-text-field dark
                              v-model="search"
                              append-icon="search"
                              label="Search"
                              single-line
                              hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn @click="addDialogVisible = true"
                       color="teal darken-1"
                       dark
                       small
                       absolute
                       bottom
                       right
                       fab
                       id="addRoleButton"
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
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.description }}</td>
                        <td class="justify-center layout px-0">
                            <v-icon small
                                    class="mr-2"
                                    @click="showEditDialog(props.item)">
                                edit
                            </v-icon>
                            <v-icon small
                                    @click="askToDelete(props.item)">
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
                                <v-flex xs6>
                                   <!-- <credential-list :credentials="props.item.credentials"
                                                     :user="props.item"></credential-list> -->
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
                    Do you really want to delete role <b>{{selectedRole. name}}</b>?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="closeConfirmation()">No</v-btn>
                    <v-btn color="error" flat @click="deleteItem()">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Register dialog -->
        <v-dialog v-model="addDialogVisible" width="800">
            <v-card fluid>
                <v-card-title class="headline teal darken-1 white--text" primary-title>
                    Add Role
                </v-card-title>
                <!-- <register-user fluid v-on:canceled="addDialogVisible=false"
                               v-on:registered="registeredUser"></register-user> -->
            </v-card>
        </v-dialog>

        <!-- Edit role dialog -->
        <v-dialog v-model="editRoleDialogVisible" width="800">
            <v-card>
                <v-card-title class="headline teal darken-1 white--text" primary-title>Edit Role</v-card-title>
                <!-- <edit-user :user="this.editableRole"
                           v-on:canceled="closeEditUserDialog"
                           v-on:saved="savedEditedUser"></edit-user> -->
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import {mapState} from "vuex"

    export default {
        components: {
        },
        created() {
          //  this.$store.dispatch(INITIALIZE_USER_MODULE)
        },
        methods: {
            registeredUser() {
                this.addDialogVisible = false
            },
            showEditDialog(item) {
                // deep copy to prevent direct edit of the actual list item.
                this.editableRole = JSON.parse(JSON.stringify(item))
                this.editRoleDialogVisible = true
            },
            askToDelete(item) {
                this.deleteConfirmationVisible = true
                this.selectedRole = item
            },
            deleteItem() {
            //    this.$store.dispatch(DELETE_USER, this.selectedRole)
                this.closeConfirmation()
            },
            closeConfirmation() {
                this.deleteConfirmationVisible = false
            },
            closeEditUserDialog() {
                this.editRoleDialogVisible = false
            },
            savedEditedUser() {
                this.closeEditUserDialog()
                this.editableRole = {}
            }
        },
     /*   computed: mapState(USER_MODULE, {
            users: state => state.users,
            isLoading: state => state.isLoading
        }),*/
        data: () => ({
            search: "",
            showLoadingBar: false,
            editableRole: {},
            selectedRole: {},
            deleteConfirmationVisible: false,
            addDialogVisible: false,
            editRoleDialogVisible: false,
            headers: [{
                text: 'Name',
                align: 'left',
                sortable: true,
                value: 'name'
            },
            {
                 text: 'Description',
                 align: 'left',
                 sortable: true,
                 value: 'description'
            }]
        })
    }
</script>
