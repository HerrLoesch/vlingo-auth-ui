<template>
    <v-container>
        <v-form v-model="valid">
            <v-card>
                <v-card-text>
                    <v-subheader>User Info</v-subheader>
                    <edit-user-details :user="user"></edit-user-details>

                    <v-divider></v-divider>

                    <v-subheader>Credential</v-subheader>
                    <edit-credential-details :credential="credential"></edit-credential-details>
                </v-card-text>
                <v-card-actions>
                    <v-btn :disabled="!valid" @click="register()">Register</v-btn>
                    <v-btn @click="cancel()">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
    import EditUserDetails from "../components/EditUserDetails"
    import EditCredentialDetails from "../components/EditCredentialDetails"
    import {CREATE_USER} from "../store/user.module"

    export default {
        name: "register-user",
        components: {
            EditUserDetails,
            EditCredentialDetails
        },
        data: () => ({
            user: {},
            credential: {},
            valid: false
        }),
        methods: {
            register() {
                this.$store.dispatch(CREATE_USER, this.user)
                this.$emit("registered", this.user)
            },
            cancel() {
                this.user = {}
                this.credential = {}
                this.$emit("canceled")
            }
        }
    }
</script>
