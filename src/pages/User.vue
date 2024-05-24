<template>
    <div class="col-md-10 offset-1 mb-5">
        <header-menu/>
        <b-form @submit.prevent="add"
                class="col-md-12 text-lg-right">
            <b-form-input 
				v-model="model.username"
			 	placeholder="Enter username"
			    class="col-md-3 float-left m-2">
            </b-form-input>
            <b-form-input
                v-model="model.password"
                type="password"
                placeholder="Enter password"
                class="col-md-3 float-left m-2">
            </b-form-input>
            <b-button
                type="submit"
                variant="primary"
				class="col-md-3 float-left m-2">
                Add User
            </b-button>
        </b-form>
        <b-table class="mt-5" striped hover :items="items" :fields="fields">
			
			<template #cell(role)="data">
				{{data.item.role == 10 ? 'Admin' : 'General'}}
			</template>
		</b-table>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
    name: "User",
    components: {
        "header-menu" : Header
    },
    data(){
        return {
            fields: ['id', 'username', 'role'],
            items: [],
            model: {
                username: null,
                password: null
            }
        }
    },
    created() {
        this.get();
    },
    methods:{
        get() {
            this.$api.get("user/get")
                .then(res => {
                    this.items = res.data;
                })
        },
        add(){
            this.$api.post("user/add", this.model)
                .then(res => {
					this.get();					
                }, res => {
					console.log(res.data);
                    alert(res.message)
                })
                .catch(()=>{
                    alert("Please, try again")
                })
        }
    }
}
</script>

<style scoped>

</style>