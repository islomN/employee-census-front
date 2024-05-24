<template>
	<div class="col-md-10 offset-1">
		<h1 v-if="id > 0">№ {{id}}</h1>
		<b-form @submit.prevent="save" class="col-md-4 offset-md-4">
			<b-form-group
				label="Enter Firstname"
				label-for="first-name"
			>
				<b-form-input
					id="first-name"
					v-model="model.firstName"
					list="name-list"
					placeholder="Enter Firstname"
					class="mb-2"
				>
				</b-form-input>
				
				<datalist id="name-list">
					<option v-for="name in names" v-bind:key="name">
						{{ name }}
					</option>
				</datalist>
			</b-form-group>
			
			<b-form-group
				label="Enter Lastname"
				label-for="last-name">
				<b-form-input
					id="last-name"
					v-model="model.lastName"
					placeholder="Enter Lastname"
					class="mb-2">
				</b-form-input>
			</b-form-group>
			
			<b-form-group
				label="Enter Age"
				label-for="age">
				<b-form-input
					id="age"
					v-model="model.age"
					type="number"
					placeholder="Enter Age"
					class="mb-2">
				</b-form-input>
			</b-form-group>
			
			<b-form-group
				label="Select Gender"
				label-for="gender">
				<b-form-select
					id="gender"
					class="mb-2"
					v-model="model.gender"
					:options="genderTypes">
				</b-form-select>
			</b-form-group>
			
			<b-form-group
				label="Select Department"
				label-for="department">
				<b-form-select
					id="department"
					class="mb-2"
					v-model="model.departmentID"
					:options="departments">
				</b-form-select>
			</b-form-group>
			
			<b-form-group
				label="Select Experience"
				label-for="pl">
				<b-form-select
					id="pl"
					class="mb-2"
					multiple
					v-model="model.programmingLanguageIDs"
					:options="programmingLanguages">
				</b-form-select>
			</b-form-group>
			
			<b-button type="submit" variant="primary"> Submit</b-button>
		</b-form>
	</div>
</template>

<script>
export default {
	name: "EmployeeEditor",
	props: {
		id: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			model: {
				firstName: null,
				lastName: null,
				age: 0,
				gender: 1,
				departmentID: 0,
				programmingLanguageIDs: []
			},
			names: [],
			genderTypes: [
				{value: null, text: "Select Gender"},
				{value: 1, text: "Male"},
				{value: 2, text: "Female"}
			],
			departments: [],
			programmingLanguages: []
		}
	},
	created() {
		this.getDepartments();
		this.getProgrammingLanguages();
		
		if (this.id > 0){
			this.get();
		}	
	},
	methods: {
		get(){
			this.$api.get("employee/get/"+this.id)
				.then((res) => {
					this.model = res.data;
					this.model.programmingLanguageIDs = this.model.experiences.map(x => x.id);
				});	
		},
		save() {
			if (this.id > 0) {
				this.edit();
			} else {
				this.add();
			}
		},
		add() {
			this.$api.post("employee/add", this.model)
				.then(res => {
					this.$router.push({name: "home"});
				}, res => {
					alert(res.message)
				})
				.catch(() => {
					alert("Please, try again")
				})
		},
		edit() {
			this.$api.put("employee/edit/" + this.id, this.model)
				.then(res => {
					this.$router.push({name: "home"});
				}, res => {
					alert(res.message)
				})
				.catch(() => {
					alert("Please, try again")
				})
		},
		getNames() {
			this.$api.get("employee/getNames", {params: {key: this.model.firstName}})
				.then(res => {
					this.names = res.data;
				})
		},
		getDepartments() {
			this.$api.get("department/get", {})
				.then(res => {
					this.departments = res.data.map(item => ({
						"value": item?.id,
						"text": item?.name
					}));
					
					this.departments.push({"value":0, "text": "Select department"});
					this.departments.sort((a,b)=> a.value > b.value ? 1 : -1);
				})
		},
		getProgrammingLanguages() {
			this.$api.get("programmingLanguage/get", {})
				.then(res => {
					this.programmingLanguages = res.data.map(item => ({
						"value": item?.id,
						"text": item?.name
					}));
					
					this.programmingLanguages.sort((a,b)=> a.value > b.value ? 1 : -1);
				})
		}
	},
	watch: {
		'model.firstName': function () {
			this.getNames();
		}
	}
}
</script>

<style scoped></style>
