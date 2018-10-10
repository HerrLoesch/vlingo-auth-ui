<template>
    <v-container id="edit-credential-details">
        <v-card>
            <v-card-text>
                <v-select
                        v-model="authority"
                        :items="authorities"
                        label="Authority"
                ></v-select>
                <v-text-field
                        v-model="id"
                        label="Id"
                ></v-text-field>
                <v-text-field
                        v-model="secret"
                        label="Secret"
                        type="password"
                        hint="At least 8 characters"
                        counter
                ></v-text-field>
            </v-card-text>
        </v-card>

    </v-container>
</template>

<script>
    export default {
        name: "edit-credential-details",
        data: () => ({
            authority: '',
            id: '',
            secret: '',
            authorities: [
                'vlingo',
                'oAuth'
            ]
        })
    }
</script>

<style scoped>

</style>