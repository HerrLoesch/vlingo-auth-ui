<template>
    <v-container>
        <v-form v-model="valid">
            <v-card>
                <v-card-text>
                    <name-description-input :value="group"></name-description-input>
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
    export default {
        data: () => ({
            group: {},
            valid: false
        }),
        methods: {
            provision() {
                let data = 'group: ' + JSON.stringify(this.group)
                alert(data)
            },
            cancel() {
                this.group = {}
            }
        }
    }
</script>

<style scoped>

</style>