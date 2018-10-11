<template>
    <v-container>
        <v-text-field
                v-model="user.userName"
                label="Username*"
                required
                :rules="[v => !!v || 'Please, enter a user name.']"
        ></v-text-field>
        <v-layout>
            <v-flex md10>
                <v-text-field
                        v-model="user.email"
                        label="Email Address*"
                        required
                        :rules="emailRules"
                ></v-text-field>
            </v-flex>
            <v-flex md2>
                <v-btn @click="mailAsUserName()"> As user name</v-btn>
            </v-flex>
        </v-layout>

        <v-text-field
                v-model="user.givenName"
                label="Given Name*"
                required
                :rules="[v => !!v || 'Please, enter a given name.']"
        ></v-text-field>
        <v-text-field
                v-model="user.secondName"
                label="Second Name"
        ></v-text-field>
        <v-text-field
                v-model="user.familyName"
                label="Family Name*"
                required
                :rules="[v => !!v || 'Please, enter a family name.']"
        ></v-text-field>

        <v-text-field
                v-model="user.phone"
                label="Phone"
        ></v-text-field>
    </v-container>
</template>

<script>
    export default {
        name: "edit-user-details",
        props: ['user'],
        data: () => ({
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'Email must be valid'
            ]
        }),
        methods: {
            mailAsUserName() {
                this.user.userName = this.user.email
            }
        }
    }
</script>