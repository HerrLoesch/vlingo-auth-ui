<template>
    <v-container>
        <v-text-field
                v-model="permission.name"
                label="Name*"
                required
                :rules="[v => !!v || 'Please, enter a name.']"
        ></v-text-field>
        <v-textarea
                boxstyle
                v-model="permission.description"
                label="Description">
        </v-textarea>
    </v-container>
</template>

<script>
    export default {
        name: "edit-permission-details",
        props: ["permission"]
    }
</script>
