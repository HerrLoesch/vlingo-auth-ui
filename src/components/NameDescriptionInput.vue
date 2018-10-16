<template>
    <v-container>
        <v-text-field
                v-model="value.name"
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
            }
        }
    }
</script>
