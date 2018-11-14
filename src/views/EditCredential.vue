<template>
    <v-container>
        <v-form v-model="valid">
            <v-card flat>
                <v-card-text>
                    <edit-credential-details :credential="credential"></edit-credential-details>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="accent" :disabled="!valid" @click="save()">Save</v-btn>
                    <v-btn flat @click="cancel()">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
    import {UPDATE_CREDENTIAL_OF_USER, ADD_CREDENTIAL_TO_USER} from "../store/user.module"

    export default {
        data: () => ({
            valid: false,
            selectedCredential: {}
        }),
        props: {
            credential: {
                type: Object,
                default: () => ({})
            },
            user: {
                type: Object,
                default: () => ({}),
                required: true
            },
            mode: {
                type: String,
                default: () => ("create")
            }
        },
        methods: {
            save() {

                let data = { user: this.user, credential: this.credential }

                if(this.mode == "update") {
                    this.$store.dispatch(UPDATE_CREDENTIAL_OF_USER, data)
                } else {
                    this.$store.dispatch(ADD_CREDENTIAL_TO_USER, data)
                }

                this.$emit("saved", this.credential, this.user)
            },
            cancel() {
                this.credential = {}
                this.$emit("canceled")
            }
        }
    }
</script>

<style scoped>

</style>