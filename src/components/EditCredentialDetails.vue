<template>
    <v-container>
        <v-select
                v-model="credential.authority"
                :items="authorities"
                label="Authority*"
                reguired
                :rules="[v => !!v || 'Please, select an authority.']"
        ></v-select>
        <v-text-field
                v-model="credential.id"
                label="Id*"
                required
                :rules="[v => !!v || 'Please, enter an id.']"
        ></v-text-field>
        <v-text-field
                v-model="credential.secret"
                label="Secret*"
                type="password"
                required
                :rules="[v => !!v || 'Please, enter a secret.']"
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
