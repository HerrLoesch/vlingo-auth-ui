<template>
    <v-container fluid width="400">
        <v-form v-model="valid">
            <v-card flat>
                <v-card-text>
                    <name-description-input :mode="mode" :value="group"></name-description-input>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="cancel()">Cancel</v-btn>
                    <v-btn color="accent" flat :disabled="!valid" @click="save()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
    import {ADD_GROUP, UPDATE_GROUP} from "../store/group.module";

    export default {
        props: {
            group: {
                type: Object,
                default: () => ({})
            },
            mode: {
                type: String
            }
        },
        data: () => ({
            valid: false
        }),
        methods: {
            save() {

                if (this.mode === "edit") {
                    this.$store.dispatch(UPDATE_GROUP, this.group)
                } else {
                    this.$store.dispatch(ADD_GROUP, this.group)
                }

                this.$emit("saved", this.group)
            },
            cancel() {
                this.$emit("canceled")
            }
        }
    }
</script>
