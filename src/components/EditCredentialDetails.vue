<template>
    <v-container>
        <v-select
                v-model="credential.authority"
                :items="authorities"
                label="Authority"
        ></v-select>
        <v-text-field
                v-model="credential.id"
                label="Id"
        ></v-text-field>
        <v-text-field
                v-model="credential.secret"
                label="Secret"
                type="password"
        ></v-text-field>
    </v-container>
</template>

<script>
    export default {
        props: {
            credential: {
                type: Object,
                default: () => ({})
            }
        },
        data: () => ({
            authorities: [
                'vlingo',
                'oAuth'
            ]
        })
    }
</script>
