<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen">
    <div class="w-full p-6 shadow bg-gray-50 lg:max-w-md">
      <div class="relative flex flex-col items-center justify-center">
        <span class="px-2 py-2 text-green-600" v-if="successMsg">
          {{ successMsg }}
        </span>
            <span class="px-2 py-2  text-red-600" v-if="validation.message">
          {{ validation.message }}
        </span>
            <span class="px-2 py-2  text-red-600" v-if="errorMsg">
          {{ errorMsg }}
        </span>
      </div>

      <h1 class="text-3xl font-semibold text-center text-purple-700">EDIT PROFILE</h1>
      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <label for="name" class="block text-sm text-gray-800">Name</label>
          <input
              v-model="name"
              name="name"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label for="email" class="block text-sm text-gray-800">Email</label>
          <input
              v-model="email"
              name="email"
              type="email"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label for="phone" class="block text-sm text-gray-800">Phone</label>
          <input
              v-model="phone"
              name="phone"
              type="number"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <button
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Edit User
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue';
import axios from 'axios';


export default {
  name: 'EditProfile',

  mounted() {
    axios.get('/me')
        .then(async (response) => {
          this.id = response.data.id
          this.name = response.data.name
          this.email = response.data.email
          this.phone = response.data.phone
        })
        .catch((error) => {
          this.errorMsg.value = error.response.data
          setTimeout(() => this.errorMsg = '', 1500)
        });
  },

  /**
   *
   * @returns {{submit: ((function(*): Promise<void>)|*), phone: Ref<UnwrapRef<string>>, name: Ref<UnwrapRef<string>>, successMsg: Ref<UnwrapRef<string>>, email: Ref<UnwrapRef<string>>, validation: Ref<UnwrapRef<*[]>>, errorMsg: Ref<UnwrapRef<string>>}}
   */
  setup() {
    let id = ref(0);
    let name = ref('');
    let email = ref('');
    let phone = ref('');
    const validation = ref([]);
    let successMsg = ref('');
    let errorMsg = ref('');
    /**
     *
     * @returns {Promise<void>}
     */
    const submit = async () => {
      await axios
          .put('/update-profile', {
            name: name.value,
            email: email.value,
            phone: phone.value,
          })
          .then((response) => {
            successMsg.value = "Successfully updated";
            setTimeout(() => successMsg.value = '', 1500)
          })
          .catch((error) => {
            validation.value = error.response.data;
            setTimeout(() => validation.value = '', 1500)
          });
    };

    return {
      id,
      name,
      email,
      phone,
      submit,
      validation,
      successMsg,
      errorMsg,
    };
  },
};
</script>