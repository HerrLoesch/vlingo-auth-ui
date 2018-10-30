<template>
    <v-container>
        <v-card>
            <v-card-title>
                <h2>edit-user-details</h2>
            </v-card-title>
            <v-card-text>
                <edit-user-details></edit-user-details>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-title>
                <h2>edit-credential-details</h2>
            </v-card-title>
            <v-card-text>
                <edit-credential-details></edit-credential-details>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-title>
                <h2>name-description-input</h2>
            </v-card-title>
            <v-card-text>
                <name-description-input></name-description-input>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-title>
                <h2>edit-permission-constraints-details</h2>
            </v-card-title>
            <v-card-text>
                <edit-permission-constraints-details></edit-permission-constraints-details>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>

    export default {
        name: "ComponentOverview",
        components: {}
    }
</script>
