<template>
    <v-container>
        <v-text-field
                :disabled="isInEditMode"
                v-model="name"
                label="Name*"
                required
                :rules="[v => !!v || 'Please, enter a name.']"
        ></v-text-field>
        <v-textarea
                boxstyle
                v-model="value.description"
                label="Description">
        </v-textarea>
    </v-container>
</template>

<script>
    export default {
        props: {
            value: {
                type: Object,
                default: () => ({})
            },
            mode: {
                type: String
            }
        },
        data:() => ({
           name: "",
           isInEditMode: false
        }),
        watch: {
            value: function(newValue) {
                this.isInEditMode = false
                this.name = newValue.name
                this.isInEditMode = this.mode === 'edit'
            }
        }
    }
</script>
