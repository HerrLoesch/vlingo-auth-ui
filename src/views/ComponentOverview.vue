<template>
    <v-container>
        <v-card>
            <v-card-title>
                <h2>EditUserDetails</h2>
            </v-card-title>
            <v-card-text>
                <EditUserDetails user="{}"></EditUserDetails>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-title>
                <h2>EditCredentialDetails</h2>
            </v-card-title>
            <v-card-text>
                <EditCredentialDetails credential="{}"></EditCredentialDetails>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import EditUserDetails from '../components/EditUserDetails'
    import EditCredentialDetails from '../components/EditCredentialDetails'
    export default {
        name: "component-overview",
        components: {
            EditUserDetails,
            EditCredentialDetails
        }
    }
</script>

<style scoped>

</style>