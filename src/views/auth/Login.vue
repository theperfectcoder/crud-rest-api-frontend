<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen">
    <span class="px-2 py-2 mb-4 text-red-600 rounded shadow" v-if="validation.message">
      {{ validation.message }}
    </span>
    <div class="w-full p-6 shadow bg-gray-50 lg:max-w-md">
      <h1 class="text-3xl font-semibold text-center text-purple-700">LOGO</h1>
      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <label for="email" class="block text-sm text-gray-800">Email</label>
          <input
              type="email"
              name="email"
              v-model="email"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label for="password" class="block text-sm text-gray-800"
          >Password</label
          >
          <input
              type="password"
              name="password"
              v-model="password"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <button
              type="submit"
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Login
          </button>
        </div>
      </form>
      <p class="mt-8 text-xs font-light text-center text-gray-700">
        Don't have an account?
        <RouterLink
            to="/register"
            class="font-medium text-purple-600 hover:underline"
        >Register
        </RouterLink
        >
      </p>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const validation = ref([]);
    const submit = async () => {
      await axios.post('/login', {
        email: email.value,
        password: password.value,
      })
          .then(async (response) => {
            localStorage.setItem('token', response.data.authorisation.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            await router.push({path: '/'});
          })
          .catch((error) => {
            validation.value = error.response.data;
          });
    };

    return {
      email,
      password,
      submit,
      validation
    };
  },
};
</script>
