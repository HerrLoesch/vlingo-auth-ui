<template>
    <v-container>
        <v-select
                v-model="constraint.type"
                :items="types"
                label="Type*"
                reguired
                :rules="[v => !!v || 'Please, select a type.']"
        ></v-select>
        <v-text-field
                v-model="constraint.name"
                label="Name*"
                required
                :rules="[v => !!v || 'Please, enter a name.']"
        ></v-text-field>
        <v-text-field
                v-model="constraint.value"
                label="Value*"
                required
                :rules="[v => !!v || 'Please, enter a value.']"
        ></v-text-field>
    </v-container>
</template>

<script>
    export default {
        props: {
            constraint: {
                type: Object,
                default: () => ({})
            },
            mode: "update"
        },
        data: () => ({
            selectedConstraint: {},
            types: [
                "String",
                "Integer",
                "Double",
                "Boolean"
            ]
        })
    }
</script>