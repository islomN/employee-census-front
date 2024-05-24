<template>
    <div class="col-md-10 offset-1">
        <header-menu/>

        <employee-editor></employee-editor>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import EmployeeEditor from "@/components/EmployeeEditor";
export default {
    name: "EmployeeAdd",
    components: {
        "employee-editor": EmployeeEditor,
        "header-menu": Header
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>

</style>