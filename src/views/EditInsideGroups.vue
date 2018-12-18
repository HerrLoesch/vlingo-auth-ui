<template>
    <v-card>
        <v-card-title class="headline teal darken-4 white--text" primary-title>Edit Inside Groups</v-card-title>
{{group.text}}
        <v-card-text style="height: 300px;">
            <v-switch :key="idx" @click="addChangedValue(insideGroup)" v-for="(insideGroup, idx) in insideGroups" v-model="insideGroup.isInsideGroup" :label="insideGroup.name"
            ></v-switch>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="cancel()">Cancel</v-btn>
            <v-btn color="accent" flat @click="save()">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {GET_ALL_GROUPS, UPDATE_INSIDE_GROUP_STATUS} from "../store/group.module"
    import _ from "lodash"

    export default {
        name: "EditGroupMembers",
        data: () => ({
            changedGroups: []
        }),
        props: {
            group: {
                type: Object,
                default: () => ({}),
                required: true
            }
        },
        methods: {
            addChangedValue(insideGroup) {
                // value was changed back, thus we have no change
                let index = this.changedGroups.indexOf(insideGroup)
                if( index <= -1){
                    this.changedGroups.splice(index, 1)
                }
                else {
                    this.changedGroups.push(insideGroup)
                }
            },
            save() {
                this.$store.dispatch(UPDATE_INSIDE_GROUP_STATUS, {parentGroup: this.group, changedInisideGroups: this.changedGroups})
                this.$emit("saved")
            },
            cancel() {
                this.$emit("canceled")
            }
        },
        computed: {
            insideGroups: function () {
                let groups = this.$store.getters[GET_ALL_GROUPS]

                let resultGroups = []
                _.forEach(groups, existingGroup => {

                    if (existingGroup.id === this.group.id) {
                        return
                    }

                    // TODO: That is not enought to protect us from circular references!
                    // TODO: We have to check if any of the children is a parent of the current group...
                    if (_.includes(existingGroup.insideGroups, this.group.id)) {
                        return
                    }

                    existingGroup.isInsideGroup = _.includes(this.group.insideGroups, existingGroup.id)

                    resultGroups.push(existingGroup)
                })

                return resultGroups
            }
        }
    }
</script>
