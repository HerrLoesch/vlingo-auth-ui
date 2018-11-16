<template>
    <!-- notification -->
    <v-snackbar
            v-model="notificationVisible"
            :right="true"
            :timeout="3000"
            :top="true"
    >
        {{ notificationText }}
        <v-btn
                color="red"
                flat
                @click="notificationVisible = false"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
    import {EventBus} from "../plugins/EventBus";

    export default {
        name: "NotificationsHub",
        data: () => ({
            notifications: [],
            notificationVisible: false,
            notificationText: ""
        }),
        watch: {
            notificationText() {
                this.notificationVisible = true
            }
        },
        mounted() {
            EventBus.$on("notification", data => {
                this.notifications.push(data)
                this.notificationText = data
            });
        }
    }
</script>

<style scoped>

</style>