<template>
    <div>
        <b-form @submit.prevent="login"
                class="col-md-4 offset-md-4">
            <b-form-input v-model="auth.username"
                          placeholder="Enter username"
                          class="mb-2">
            </b-form-input>
            <b-form-input
                v-model="auth.password"
                type="password"
                placeholder="Enter password"
                class="mb-2">
            </b-form-input>
            <b-button
                type="submit"
                variant="primary">
                Submit
            </b-button>
        </b-form>
    </div>
</template>

<script>
import TokenService from "@/services/TokenService";

export default {
    name: "Login",
    data(){
        return {
            auth: {
                username: null,
                password: null,
            }
        }
    },
    created() {

    },
    methods:{
        login(){
            this.$api
                .post("auth/login", this.auth)
                .then(res => {
					TokenService.saveToken(btoa(this.auth.username + ":" + this.auth.password));
					TokenService.saveRole(res.data.role);
					TokenService.saveUsername(this.auth.username);
                    this.$router.push({name: "home"})
                }, (res) => {
                    alert(res.data.message)
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