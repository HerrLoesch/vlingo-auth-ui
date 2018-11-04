<template>
    <v-container>
        <v-data-table :headers="headers" :items="users" class="elevation-1" :loading="isLoading">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.userName }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                            small
                            class="mr-2"
                            @click="showEditDialog(props.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                            small
                            @click="askToDelete(props.item)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>
        </v-data-table>

        <!-- Delete confirmation -->
        <v-dialog v-model="deleteConfirmationVisible" width="400">
            <v-card>
                <v-card-title class="headline" primary-title>
                    Delete?
                </v-card-title>
                <v-card-text>
                    Do you realy want to delete user <b>{{selectedItem.userName}}</b>?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" flat @click="deleteItem()">Yes</v-btn>
                    <v-btn flat @click="closeConfirmation()">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Edit dialog -->
        <v-dialog v-model="editDialogVisible" width="800">
            <v-card>
                <v-card-title class="headline" primary-title>
                    Edit
                </v-card-title>
                <v-card-text>
                    <edit-user-details :user="this.editableItem"></edit-user-details>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" flat @click="saveEditedItem()">Change</v-btn>
                    <v-btn flat @click="closeEditDialog()">Cancel</v-btn>
                </v-card-actions>
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
    import {INITIALIZE_USER_MODULE, DELETE_USER, UPDATE_USER, USER_MODULE} from "../store/user.module"

    export default {
        created() {
            this.$store.dispatch(INITIALIZE_USER_MODULE)
        },
        methods: {
            showEditDialog(item) {
                this.selectedItem = item

                // deep copy to prevent direct edit of the actual list item.
                this.editableItem = JSON.parse(JSON.stringify(item))

                this.editDialogVisible = true
            },
            askToDelete(item) {
                this.deleteConfirmationVisible = true
                this.selectedItem = item
            },
            deleteItem() {
                this.$store.dispatch(DELETE_USER, this.selectedItem)

                this.showNotification("User \"" + this.selectedItem.userName + "\" was deleted.")
                this.closeConfirmation()
            },
            closeConfirmation() {
                this.deleteConfirmationVisible = false
            },
            closeEditDialog() {
                this.editDialogVisible = false
            },
            showNotification(text) {
                this.notificationText = text
                this.notificationVisible = true
            },
            saveEditedItem() {
                this.$store.dispatch(UPDATE_USER, this.editableItem)

                this.closeEditDialog()
                this.showNotification("Changes are saved.")
                this.editableItem = {}
            }
        },
        computed: mapState(USER_MODULE, ["users", "isLoading"]),
        data: () => ({
            showLoadingBar: false,
            editableItem: {},
            selectedItem: {},
            deleteConfirmationVisible: false,
            editDialogVisible: false,
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
                    text: 'Actions',
                    align: 'Center',
                    sortable: false
                }
            ]
        })
    }
</script>
