<template>
    <div style="margin-top: 50px;">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <h3>Login Page</h3>
                <form>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-show="message!=''">
                        <strong>Error!</strong> {{ message }}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input v-model="data.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input v-model="data.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary" @click.prevent="login">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            data: {
                email: '',
                password: ''
            },
            message: ''
        }
    },
    methods: {
        login() {
            let url = 'api/login'
            let data = this.data

            axios.post(url, data).then( res => {
                this.$auth.setToken(res.data.token)
                this.$router.push('/details')
                console.log('Success')
            }).catch( err => {
                 this.message = err.response.data.message
                console.log('error')
            })
        }
    }
}
</script>