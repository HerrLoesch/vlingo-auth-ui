<template>
    <v-container>
        <v-card>
            <v-card-text>
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
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "EditUserDetails",
        data: () => ({
            userName: '',
            sameNameAsEmail: false,
            givenName: '',
            secondName: '',
            familyName: '',
            phone: '',
            email: ''
        })
    }
</script>

<style scoped>

</style>