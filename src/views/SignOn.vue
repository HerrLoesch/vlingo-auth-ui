<template>
    <v-container id="SignOn">
        <v-form v-model="valid">
            <v-card width="400">
                <v-card-text>
                    <v-text-field
                            id="username"
                            v-model="loginData.username"
                            label="Username"
                            required
                            :rules="[v => !!v || 'Please, enter a username.']"
                    ></v-text-field>

                    <v-text-field
                            id="credentialId"
                            v-model="loginData.credentialId"
                            label="Credential Id"
                            required
                            :rules="[v => !!v || 'Please, enter the id of the credentials.']"
                    ></v-text-field>

                    <v-text-field
                            id="secret"
                            v-model="loginData.secret"
                            label="Secret"
                            required
                            type="password"
                            :rules="[v => !!v || 'Please, enter the secret.']"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn id="loginButton"
                           :disabled="!valid" @click="signOn()">Sign On
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
    import {LOGIN} from "../store/applicationState.module"

    export default {
        name: "SignOn",
        data: () => ({
            valid: false,
            loginData: {
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
                this.$store.dispatch(LOGIN, this.loginData)
            }
        }
    }
</script>

<style scoped>

</style>