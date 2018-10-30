<template>
    <v-container>
        <v-form v-model="valid">
            <v-card>
                <v-card-text>
                    <v-subheader>Permission Info</v-subheader>
                    <name-and-description-input :value="permission"></name-and-description-input>

                    <v-divider></v-divider>

                    <v-subheader>Constraint</v-subheader>
                    <edit-permission-constraints-details :constraint="constraint"></edit-permission-constraints-details>
                </v-card-text>
                <v-card-actions>
                    <v-btn :disabled="!valid" @click="provision()">Provision</v-btn>
                    <v-btn @click="cancel()">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
    import NameAndDescriptionInput from "../components/NameDescriptionInput"
    import EditPermissionConstraintsDetails from "../components/EditPermissionConstraintsDetails"

    export default {
        components: {
            NameAndDescriptionInput,
            EditPermissionConstraintsDetails
        },
        name: "provision-permission",
        data: () => ({
            permission: {},
            constraint: {},
            valid: false
        }),
        methods: {
            provision() {
                let data = 'permission: ' + JSON.stringify(this.permission) + ' constraint: ' + JSON.stringify(this.constraint)
                alert(data)
            },
            cancel() {
                this.permission = {}
                this.constraint = {}
            }
        }
    }
</script>
