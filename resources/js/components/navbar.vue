<template>
    <div>
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          User
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Logout</a>
        </div>
      </li>
    </ul>
  </div>
</nav>       
    </div>
</template>

<script>
import axios from 'axios'
import vue from 'vue';

export default {
    data() {
        return {
            data: {
                email: '',
                name: ''
            }
        }
    },
    created() {
        this.details();
    },
    methods: {
        details() {
            let url = 'api/details'
            let key = {
                headers: { Authorization: 'Bearer '+ vue.auth.getToken() }
            }

            axios.get(url, key).then( res => {
                this.data = {
                    email: res.data.data.email,
                    name: res.data.data.name,
                }
                console.log('Success')
            }).catch( err => {
                 this.message = err.response.data.message
                console.log('error')
            })
        },
        logout() {
            this.$auth.destroyToken()
            this.$router.go('/')
        }
    }      
}
</script>
