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
    import {UPDATE_CREDENTIAL_OF_USER} from "../store/user.module"

    export default {
        data: () => ({
            valid: false
        }),
        props: {
            credential: {
                type: Object,
                default: () => ({}),
                required: true
            },
            user: {
                type: Object,
                default: () => ({}),
                required: true
            }
        },
        methods: {
            save() {
                this.$store.dispatch(UPDATE_CREDENTIAL_OF_USER, this.user, this.credential)
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