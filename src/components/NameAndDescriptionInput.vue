<template>
    <v-container>
        <v-text-field
                v-model="name"
                label="Name*"
                required
                :rules="[v => !!v || 'Please, enter a name.']"
        ></v-text-field>
        <v-textarea
                boxstyle
                v-model="description"
                label="Description">
        </v-textarea>
    </v-container>
</template>

<script>
    export default {
        name: "name-description-input",
        props: ["name", "description"]
    }
</script>
