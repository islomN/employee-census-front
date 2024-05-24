<template>
    <div class="col-md-10 offset-1">
        <header-menu/>
        
        <b-table striped hover :items="items"></b-table>
    </div>
</template>


<script>
import Header from "@/components/Header.vue";
export default {
    name: "Department",
    components: {
        "header-menu" : Header
    },
    data(){
        return {
            items: []
        }
    },
    created() {
        this.get();
    },
    methods:{
        get() {
            this.$api.get("department/get")
            .then(res => {
                this.items = res.data;
            })
        },
    }
}
</script>

<style scoped>

</style>