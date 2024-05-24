<template>
    <div class="col-md-10 offset-1">
        <header-menu/>
        
        <employee-editor :id="id"></employee-editor>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import EmployeeEditor from "@/components/EmployeeEditor";
export default {
    name: "EmployeeEdit",
    components:{
        "employee-editor": EmployeeEditor,
        "header-menu" : Header
    },
    data(){
        return {
            id: null
        }
    },
    created(){
        this.id = this.$route.params.id * 1;
    }
}
</script>

<style scoped>

</style>