const TOKEN_KEY = 'Authorization';
const USERNAME_KEY = 'username';
const ROLE_KEY = 'role';

const TokenService = {
	getToken() {
		return localStorage.getItem(TOKEN_KEY);
	},
	getRole() {
		return localStorage.getItem(ROLE_KEY) * 1;
	},
	getUsername() {
		return localStorage.getItem(USERNAME_KEY);
	},
	saveToken(token) {
		localStorage.setItem(TOKEN_KEY, token);
	},
	saveRole(role) {
		localStorage.setItem(ROLE_KEY, role);
	},
	saveUsername(username) {
		localStorage.setItem(USERNAME_KEY, username);
	},
    removeToken() {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(USERNAME_KEY);
		localStorage.removeItem(ROLE_KEY);
		localStorage.clear();
	},
};

export default TokenService;