<template>
    <v-container fluid id="permissions-list">
        <v-card>
            <v-toolbar class="teal darken-4 white--text">
                <span class="headline">Permissions</span>

                <v-spacer></v-spacer>
                <v-text-field dark
                              v-model="search"
                              append-icon="search"
                              label="Search"
                              single-line
                              hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn @click="createDialogVisible = true"
                       color="teal darken-2"
                       dark
                       small
                       absolute
                       bottom
                       right
                       fab
                       id="addGroupButton"
                >
                    <v-icon>add</v-icon>
                </v-btn>
            </v-toolbar>

            <!-- permission list -->
            <v-data-table :headers="headers" :items="permissions" :loading="isLoading" :search="search">
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
                <template slot="items" slot-scope="props">
                    <tr @click="props.expanded = !props.expanded">
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.description }}</td>
                        <td class="justify-center layout px-0">
                            <v-icon small
                                    id="editGroupButton"
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
                                    <constraint-list :constraints="props.item.constraints"
                                                     :permission="props.item"></constraint-list>
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
                    Do you really want to delete permission <b>{{editablePermission.name}}</b>?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="closeConfirmation()">No</v-btn>
                    <v-btn color="error" flat @click="deleteItem()">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Create permission dialog -->
        <v-dialog v-model="createDialogVisible" width="400">
            <v-card fluid>
                <CreateOrEditPermission mode="create"
                                   v-on:canceled="createDialogVisible = false"
                                   v-on:saved="createDialogVisible = false"></CreateOrEditPermission>
            </v-card>
        </v-dialog>

        <!-- Edit permission dialog -->
        <v-dialog v-model="editDialogVisible" width="400" scrollable>
            <CreateOrEditPermission mode="edit" :group="editablePermission"
                               v-on:canceled="closeEditDialogs"
                               v-on:saved="closeEditDialogs"></CreateOrEditPermission>
        </v-dialog>

    </v-container>
</template>

<script>

    import CreateOrEditPermission from "./CreateOrEditPermission"
    import ConstraintList from "../components/ConstraintList";

    export default {
        components: {
            ConstraintList,
            CreateOrEditPermission
        },
        name: "ListPermissions",
        data: () => ({
            isLoading: false,
            search: '',
            showLoadingBar: false,
            editablePermission: {},
            deleteConfirmationVisible: false,
            createDialogVisible: false,
            editDialogVisible: false,
            permissions: [
                {
                    name: "Permission 1",
                    description: "First permission",
                    id: 1,
                    constraints: [
                        {
                            name: "Constraint 1",
                            description: "First constraint",
                            type: "vlingo",
                            value: "1"
                        },
                        {
                            name: "Constraint 2",
                            description: "Second constraint",
                            type: "vlingo",
                            value: "1"
                        }
                    ]
                },
                {
                    name: "Permission 2",
                    description: "Second permission",
                    id: 2,
                    constraints: [
                        {
                            name: "Constraint 3",
                            description: "Third constraint",
                            type: "vlingo",
                            value: "1"
                        },
                        {
                            name: "Constraint 4",
                            description: "Fourth constraint",
                            type: "vlingo",
                            value: "1"
                        }
                    ]
                }
            ],
            headers: [
                {
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
                },
                {
                    text: 'Actions',
                    align: 'Center',
                    sortable: false
                }]
        }),
        methods: {
            setEditableGroupToClone(item) {
                // deep copy to prevent direct edit of the actual list item.
                this.editablePermission = JSON.parse(JSON.stringify(item))
            },
            showEditDialog(item) {
                this.setEditableGroupToClone(item)
                this.editDialogVisible = true
            },
            askToDelete(item) {
                this.editablePermission = item
                this.deleteConfirmationVisible = true
            },
            deleteItem() {
                // this.$store.dispatch(DELETE_GROUP, this.editablePermission)
                this.closeConfirmation()
            },
            closeConfirmation() {
                this.deleteConfirmationVisible = false
            },
            closeEditDialogs() {
                this.editDialogVisible = false
                this.editablePermission = {}
            }
        }
    }
</script>

<style scoped>

</style>