<template>
    <div style="margin-top: 50px;">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <h3>Details Page</h3>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input v-model="data.name" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" disabled>
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input v-model="data.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" disabled>
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <!-- <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button> -->
                </form>
            </div>
        </div>
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
            },
            message: ''
        }
    },
    created() {
      this.details()
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
        }
    }
}
</script>