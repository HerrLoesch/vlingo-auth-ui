<template>
    <v-container>
        <v-data-table :headers="headers" :items="tenants" class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.description }}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                            small
                            class="mr-2"
                            @click="showEditDialog(props.item)"
                    >
                        fas fa-pen
                    </v-icon>
                    <v-icon
                            small
                            @click="askToDelete(props.item)"
                    >
                        fas fa-trash-alt
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
                    Do you realy want to delete tenant <b>{{selectedItem.name}}</b>?
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" @click="deleteItem()">Yes</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="closeConfirmation()">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Edit dialog -->
        <v-dialog v-model="editDialogVisible" >
            <v-card>
                <v-card-title class="headline" primary-title>
                    Edit
                </v-card-title>
                <v-card-text>
                    <name-description-input :value="this.editableItem"></name-description-input>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" @click="saveEditedItem()">Change</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="closeEditDialog()">Cancel</v-btn>
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

    import NameDescriptionInput from "../components/NameDescriptionInput";

    export default {
        components: {NameDescriptionInput},
        methods: {
            showEditDialog(item) {
                this.selectedItem = item
                this.editableItem = JSON.parse(JSON.stringify(item))

                this.editDialogVisible = true
            },
            askToDelete(item) {
                this.deleteConfirmationVisible = true
                this.selectedItem = item
            },
            deleteItem() {
                const index = this.tenants.indexOf(this.selectedItem)
                this.tenants.splice(index, 1)

                this.showNotification("Tenant \"" + this.selectedItem.name + "\" was deleted.")
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
                this.selectedItem.name = this.editableItem.name
                this.selectedItem.description = this.editableItem.description

                this.closeEditDialog()
                this.showNotification("Changes are saved.")
                this.editableItem = {}

            }
        },
        data: () => ({
            editableItem: {},
            selectedItem: {},
            deleteConfirmationVisible: false,
            editDialogVisible: false,
            notificationVisible: false,
            notificationText: false,
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
                    sortable: false,
                    value: 'description'
                },
                {
                    text: 'Actions',
                    align: 'Center',
                    sortable: false
                }
            ],
            tenants: [
                {
                    name: 'TENANT 1',
                    description: 'Description of Tenant 1'
                },
                {
                    name: 'TENANT 2',
                    description: 'Description of Tenant 2'
                },
                {
                    name: 'TENANT 3',
                    description: 'Description of Tenant 3'
                },
                {
                    name: 'TENANT 4',
                    description: 'Description of Tenant 4'
                },
                {
                    name: 'TENANT 5',
                    description: 'Description of Tenant 5'
                },
                {
                    name: 'TENANT 6',
                    description: 'Description of Tenant 6'
                }
            ]
        })
    }
</script>
