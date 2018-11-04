<template>
    <v-container>
        <v-form v-model="valid">
            <v-card class="elevation-0">
                <v-card-text>
                    <edit-user-details :user="user"></edit-user-details>
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
    import {UPDATE_USER} from "../store/user.module"

    export default {
        components: {},
        props:{
            user: {
                type: Object,
                default: () => ({})
            }
        },
        data: () => ({
            valid: false
        }),
        methods: {
            save() {
                this.$store.dispatch(UPDATE_USER, this.user)
                    .then(() => this.$emit("saved", this.user))
            },
            cancel() {
                this.user = {}
                this.$emit("canceled")
            }
        }
    }
</script>
