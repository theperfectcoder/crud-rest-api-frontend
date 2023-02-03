<template>
  <nav class="container flex justify-around py-8 mx-auto bg-white border">
    <div>
      <h3 class="text-2xl font-medium text-blue-500">LOGO</h3>
    </div>
    <div class="flex items-center space-x-8">
      <RouterLink to="/" v-if="isLogged && !isAdmin">Profile</RouterLink>
      <RouterLink :to="{ name: 'editProfile', params: { id: userId } }" v-if="isLogged">Edit profile</RouterLink>
      <RouterLink to="/pay" v-if="isLogged && !isAdmin">Pay</RouterLink>
      <RouterLink v-if="isAdmin" to="/all-users">All users</RouterLink>
      <RouterLink to="/login" v-if="!isLogged">Login</RouterLink>
      <RouterLink to="/register" v-if="!isLogged">Register</RouterLink>
      <button @click="Logout" v-if="isLogged">Logout</button>
    </div>
  </nav>
</template>

<script>
import {useRouter} from 'vue-router';
import axios from "axios";

export default {
  setup() {
    let isAdmin = false
    let userId = null;
    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).is_admin) {
      isAdmin = true
    }
    let isLogged = localStorage.getItem('token') ?? false
    if (isLogged) {
      userId = JSON.parse(localStorage.getItem('user')).id
    }
    const router = useRouter();
    const Logout = () => {
      axios.post('/logout', {})
          .then(() => {
            localStorage.clear();
            router.push({path: '/login'});
          }).catch((error) => {
            console.log(error)
      })
    };
    return {Logout, isAdmin, isLogged, userId};
  },
};
</script>