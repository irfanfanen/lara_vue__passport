export default function (Vue) {
	Vue.auth = {
		setToken (token) {
			localStorage.setItem('token', token)
		},
		getToken () {
			var token = localStorage.getItem('token')
			if(!token || token == 'undefined') {
				return null;
			} else {
				return token
			}
		},
		destroyToken () {
			localStorage.removeItem('token')
		},
		isAuthenticated () {
			if(this.getToken())
				return true
			else
				return false
		}
	}

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get () {
				return Vue.auth
			}
		}
	})
}