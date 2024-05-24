<template>
    <div class="col-md-10 offset-1">
        <header-menu/>

        <b-button
            variant="success"
            class="mb-2"
            :to="{name:'employee-add'}">
            Add Employee
        </b-button>
        <b-table striped hover :items="items" :fields="fields">
            <template #cell(id)="data">
                {{ data.index + 1 }}
            </template>

            <template #cell(gender)="data">
                {{ gender[data.value] }}
            </template>

            <template #cell(experiences)="data">
                <b v-for="val in data.value" v-bind:key="val.id">{{val.name}}, </b>
            </template>

            <template #cell(action)="data">
                <b-button
                    variant="warning"
                    :to="{name:'employee-edit', params: {id: data.item.id}}">
                    Change
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
    name: "Index",
    components: {
        "header-menu" : Header
    },
    data() {
        return {
            items: [],
            fields: ["id", "firstName", "lastName", "age", "gender", "department", "experiences", "action"],
            gender: {1 : "Male", 2 : "Female"}
        }
    },
    created() {
        this.get();
    },
    methods: {
        get() {
            this.$api.get("employee/get")
                .then(res => {
                    this.items = res.data;
              })
        },
        delete(id) {
            this.$api.delete("employee/delete", {params: {id}})
                .then(() => {
                    this.get();
                })
        },
    }
}
</script>

<style scoped>

</style>