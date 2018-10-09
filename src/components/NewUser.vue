<template>
    <v-container>
        <v-card>
            <v-card-text>
        <v-form>
                <v-text-field
                        v-model="userName"
                        label="Username"
                ></v-text-field>
                <v-checkbox
                        v-model="sameNameAsEmail"
                        label="Same as Email Address"
                ></v-checkbox>
                <v-text-field
                        v-model="givenName"
                        label="Given Name"
                ></v-text-field>
                <v-text-field
                        v-model="secondName"
                        label="Second Name"
                ></v-text-field>
                <v-text-field
                        v-model="familyName"
                        label="Family Name"
                ></v-text-field>
                <v-text-field
                        v-model="email"
                        label="Email Address"
                ></v-text-field>
                <v-text-field
                        v-model="phone"
                        label="Phone"
                ></v-text-field>

                <v-card>
                    <v-card-text>
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
                                hint="At least 8 characters"
                                counter
                        ></v-text-field>
                    </v-card-text>
                </v-card>
            <v-btn @click="register">Register</v-btn>
            <v-btn @click="cancel">Cancel</v-btn>
            </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "new-user",
        data: () => ({
            userName: '',
            sameNameAsEmail: false,
            givenName: '',
            secondName: '',
            familyName: '',
            phone: '',
            authorities: [
                'vlingo',
                'oAuth'
            ],
            credential: {
                authority: '',
                id: '',
                secret: ''
            }
        }),
        methods: {
            register() {
                alert('register')
            },
            cancel() {
                alert('cancel')
            }
        }
    }
</script>

<style scoped>

</style>