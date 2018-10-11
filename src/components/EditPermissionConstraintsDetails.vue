<template>
    <v-container>
        <v-select
                v-model="constraint.baseConstraint"
                :items="constraintNames"
                label="Constraint*"
                reguired
                :rules="[v => !!v || 'Please, select a constraint.']"
        ></v-select>
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
        name: "edit-permission-constraints-details",
        props: ["constraint"],
        data: () => ({
            constraintNames: [
                "Name1",
                "Name2",
                "Name3"
            ],
            types: [
                "String",
                "Integer",
                "Double",
                "Boolean"
            ]
        })
    }
</script>