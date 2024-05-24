<template>
    <div class="mb-5">
        <b-navbar type="dark" variant="dark" class="align-content-center">
            <b-navbar-nav >
                <b-nav-item :to="{name: 'home'}"><b>Home</b></b-nav-item>
                <b-nav-item :to="{name: 'department'}"><b>Department</b></b-nav-item>
                <b-nav-item :to="{name: 'programming-language'}"><b>Programming language</b></b-nav-item>
                <b-nav-item v-if="role == 10" :to="{name: 'user'}"><b>Users</b></b-nav-item>
                <b-button class="ml-1" @click="logout">Logout</b-button>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
import TokenService from "@/services/TokenService";
export default {
    name: "Header",
    methods: {
        logout(){
            TokenService.removeToken();
            this.$router.push({ path: 'login' })
        }
    },
	computed:{
		role(){
			return TokenService.getRole()
		},
		username(){
			return TokenService.getUsername()
		}
	}
}
</script>

<style scoped>

</style>