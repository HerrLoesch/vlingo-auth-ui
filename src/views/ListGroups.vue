<template>
    <v-container fluid>
        <v-card>
            <v-toolbar class="teal darken-4 white--text">
                <span class="headline">Groups</span>

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
                >
                    <v-icon>add</v-icon>
                </v-btn>
            </v-toolbar>

            <!-- group list -->
            <v-data-table :headers="headers" :items="groups" :loading="isLoading" :search="search">
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
                <template slot="items" slot-scope="props">
                    <tr @click="props.expanded = !props.expanded">
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.description }}</td>
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
            </v-data-table>
        </v-card>

        <!-- Delete confirmation -->
        <v-dialog v-model="deleteConfirmationVisible" width="400">
            <v-card>
                <v-card-title class="headline" primary-title>
                    Delete?
                </v-card-title>
                <v-card-text>
                    Do you really want to delete group <b>{{selectedGroup.name}}</b>?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="closeConfirmation()">No</v-btn>
                    <v-btn color="error" flat @click="deleteItem()">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Create group dialog -->
        <v-dialog v-model="createDialogVisible" width="400">
            <v-card fluid>
                <v-card-title class="headline teal darken-4 white--text" primary-title>
                    Create Group
                </v-card-title>
                <CreateOrEditGroup mode="create"
                                   v-on:canceled="closeEditGroupDialog"
                                   v-on:saved="savedEditedGroup"></CreateOrEditGroup>
            </v-card>
        </v-dialog>

        <!-- Edit group dialog -->
        <v-dialog v-model="editGroupDialogVisible" width="400">
            <v-card>
                <v-card-title class="headline teal darken-4 white--text" primary-title>Edit Group</v-card-title>
                <CreateOrEditGroup mode="edit" :value="this.editableGroup"
                           v-on:canceled="closeEditGroupDialog"
                           v-on:saved="savedEditedGroup"></CreateOrEditGroup>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    import {mapState} from "vuex"
    import {GROUP_MODULE, INITIALIZE_GROUPS, DELETE_GROUP} from "../store/group.module"
    import CreateOrEditGroup from "./CreateOrEditGroup";

    export default {
        components: {
            CreateOrEditGroup
        },
        created() {
            this.$store.dispatch(INITIALIZE_GROUPS)
        },
        methods: {
            createGroup() {
                this.createDialogVisible = false
            },
            showEditDialog(item) {
                this.selectedGroup = item

                // deep copy to prevent direct edit of the actual list item.
                this.editableGroup = JSON.parse(JSON.stringify(item))
                this.editGroupDialogVisible = true
            },
            askToDelete(item) {
                this.deleteConfirmationVisible = true
                this.selectedGroup = item
            },
            deleteItem() {
                this.$store.dispatch(DELETE_GROUP, this.selectedGroup)
                this.closeConfirmation()
            },
            closeConfirmation() {
                this.deleteConfirmationVisible = false
            },
            closeEditGroupDialog() {
                this.editGroupDialogVisible = false
            },
            savedEditedGroup() {
                this.closeEditGroupDialog()
                this.editableGroup = {}
            }
        },
        computed: mapState(GROUP_MODULE, {
            groups: state => state.groups,
            isLoading: state => state.isLoading
        }),
        data: () => ({
            search: "",
            showLoadingBar: false,
            editableGroup: {},
            selectedGroup: {},
            deleteConfirmationVisible: false,
            createDialogVisible: false,
            editGroupDialogVisible: false,
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
        })
    }
</script>
