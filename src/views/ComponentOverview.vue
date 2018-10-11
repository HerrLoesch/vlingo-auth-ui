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
        <v-card>
            <v-card-title>
                <h2>EditPermissionDetails</h2>
            </v-card-title>
            <v-card-text>
                <EditPermissionDetails permission="{}"></EditPermissionDetails>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-title>
                <h2>EditPermissionConstraintsDetails</h2>
            </v-card-title>
            <v-card-text>
                <EditPermissionConstraintsDetails constraint="{}"></EditPermissionConstraintsDetails>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import EditUserDetails from '../components/EditUserDetails'
    import EditCredentialDetails from '../components/EditCredentialDetails'
    import EditPermissionDetails from '../components/EditPermissionDetails'
    import EditPermissionConstraintsDetails from '../components/EditPermissionConstraintsDetails'

    export default {
        name: "component-overview",
        components: {
            EditUserDetails,
            EditCredentialDetails,
            EditPermissionDetails,
            EditPermissionConstraintsDetails
        }
    }
</script>

<style scoped>

</style>