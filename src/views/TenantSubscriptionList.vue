<template>
<v-container>
    <v-data-table :headers="headers" :items="tenants" class="elevation-1">
        <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.description }}</td>
            <td>{{ props.item.active }}</td>
        </template>
    </v-data-table>
</v-container>
</template>

<script>
    export default {
        name: "tenant-subscription-list",
        data: () => ({
            headers: [
                {
                    text: 'Name',
                    align: 'center',
                    sortable: true,
                    value: 'name'
                },
                {
                    text: 'Description',
                    align: 'left',
                    sortable: false,
                    value: 'description'
                },
                {
                    text: 'Active',
                    align: 'center',
                    sortable: true,
                    value: 'active'
                }
            ],
            tenants: [
                {
                    name: 'TENANT 1',
                    description: 'Description of Tenant 1',
                    active: true
                },
                {
                    name: 'TENANT 2',
                    description: 'Description of Tenant 2',
                    active: true
                },
                {
                    name: 'TENANT 3',
                    description: 'Description of Tenant 3',
                    active: false
                },
                {
                    name: 'TENANT 4',
                    description: 'Description of Tenant 4',
                    active: false
                },
                {
                    name: 'TENANT 5',
                    description: 'Description of Tenant 5',
                    active: true
                },
                {
                    name: 'TENANT 6',
                    description: 'Description of Tenant 6',
                    active: false
                }
            ]
        })
    }
</script>

<style scoped>

</style>