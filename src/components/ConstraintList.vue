<template>
    <v-card>
        <v-toolbar dense card class="secondary">
            Constraints

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon color="primary" @click="createConstraint">add_circle_outline</v-icon>
            </v-btn>

        </v-toolbar>
        <v-list two-line dense>
            <template v-for="constraint in constraints">
                <v-list-tile :key="constraint.id">
                    <v-list-tile-content>
                        <v-list-tile-title>{{constraint.name}}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn icon @click="editCredential(constraint)">
                            <v-icon small>edit</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action>
                        <v-btn icon @click="askForConstraintDeletion(constraint)">
                            <v-icon small>delete</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>


            </template>
        </v-list>

        <!-- Edit credential dialog -->
        <v-dialog v-model="editConstraintDialogVisible" width="800">
            <v-card>
                <v-card-title class="headline teal darken-3 white--text" primary-title>
                    {{inputMode}} constraint
                </v-card-title>
                <edit-permission-constraints-details
                                 :constraint="selectedConstraint"
                                 v-on:canceled="editConstraintDialogVisible = false"
                                 v-on:saved="editConstraintDialogVisible = false"></edit-permission-constraints-details>


                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="cancel()">Cancel</v-btn>
                    <v-btn color="accent" flat @click="save()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Delete confirmation -->
        <v-dialog v-model="deleteConfirmationVisible" width="400">
            <v-card>
                <v-card-title class="headline" primary-title>
                    Delete?
                </v-card-title>
                <v-card-text>
                    Do you really want to delete constraint <b>{{selectedConstraint.name}}</b>?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="deleteConfirmationVisible = false">No</v-btn>
                    <v-btn color="error" flat @click="deleteConstraint()">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
    // import {DELETE_CREDENTIAL_OF_USER} from "../store/user.module"
    import EditPermissionConstraintsDetails from "./EditPermissionConstraintsDetails";

    export default {
        components: {
            EditPermissionConstraintsDetails,
        },
        props: {
            constraints: {
                type: Array,
                default: () => ([])
            },
            permission: {
                type: Object,
                default: () => ({})
            }
        },
        computed: {
            selectedPermission() {
                return this.permission
            }
        },
        data: () => ({
            editConstraintDialogVisible: false,
            deleteConfirmationVisible: false,
            selectedConstraint: {},
            inputMode: ""
        }),
        methods: {
            createConstraint() {
                this.inputMode = "create"
                this.selectedConstraint = {}
                this.editConstraintDialogVisible = true
            },
            editCredential(credential) {
                // deep copy to prevent direct edit of the actual list item.
                this.inputMode = "update"
                this.selectedConstraint = JSON.parse(JSON.stringify(credential))
                this.editConstraintDialogVisible = true
            },
            askForConstraintDeletion(constraint) {
                this.selectedConstraint = constraint
                this.deleteConfirmationVisible = true
            },
            deleteConstraint() {
                this.deleteConfirmationVisible = false
                // this.$store.dispatch(DELETE_CREDENTIAL_OF_USER, {user: this.user, credential: this.selectedConstraint})
            },
            save() {
                this.editConstraintDialogVisible = false
                // this.$store.dispatch(UPDATE_CONSTRAINT {permission: this.selectedPermission, constraint: this.selectedConstraint})
            },
            cancel() {
                this.editConstraintDialogVisible = false
            }
        }
    }
</script>

<style scoped>

</style>