<template>
    <v-container>
        <v-form v-model="valid">
            <v-card>
                <v-card-text>
                    <v-text-field
                            v-model="loginData.tenantId"
                            label="Tenant Id"
                            required
                            :rules="[v => !!v || 'Please, enter an id of a tenant.']"
                    ></v-text-field>
                    <v-layout>
                        <v-flex md9>
                            <v-text-field
                                    v-model="loginData.username"
                                    label="Username"
                                    required
                                    :rules="[v => !!v || 'Please, enter a username.']"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md3>
                            <v-btn @click="userNameAsCredentialId()">as credential</v-btn>
                        </v-flex>
                    </v-layout>

                    <v-text-field
                            v-model="loginData.credentialId"
                            label="Credential Id"
                            required
                            :rules="[v => !!v || 'Please, enter the id of the credentials.']"
                    ></v-text-field>

                    <v-text-field
                            v-model="loginData.secret"
                            label="Secret"
                            required
                            type="password"
                            :rules="[v => !!v || 'Please, enter the secret.']"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" @click="signOn()">Sign On</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            loginData: {
                tenantId: null,
                username: null,
                credentialId: null,
                secret: null
            }
        }),
        methods: {
            userNameAsCredentialId() {
                this.credentialId = this.username
            },
            signOn() {
                this.$store.dispatch("applicationState/logIn", this.loginData)
            }
        }
    }
</script>

<style scoped>

</style>