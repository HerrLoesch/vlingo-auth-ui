<template>
    <v-container>
        <v-form v-model="valid">
            <v-card>
                <v-card-text>
                    <edit-user-details :user="user"></edit-user-details>
                </v-card-text>
                <v-card-actions>
                    <v-btn :disabled="!valid" @click="save()">Save</v-btn>
                    <v-btn @click="cancel()">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        components: {},
        data: () => ({
            user: {},
            valid: false
        }),
        methods: {
            save() {
                alert(JSON.stringify(this.user))
            },
            cancel() {
                this.user = {}
            }
        }
    }
</script>
