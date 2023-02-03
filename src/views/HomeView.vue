<template>
  <div class="grid grid-cols-2 gap-2">
    <div class="relative flex flex-col items-center mt-5 min-h-screen">
      <div class="relative flex flex-col items-center justify-center">
        <span class="px-2 py-2 text-green-600" v-if="successMsg">
          {{ successMsg }}
        </span>
        <span class="px-2 py-2  text-red-600" v-if="errorMsg">
          {{ errorMsg }}
        </span>
      </div>
      <h5 class="mb-1 text-xl font-bold text-gray-900 light:text-black mb-5"> Profile Card </h5>
      <div class="w-full max-w-sm bg-white border border-light-200 rounded-lg shadow light:bg-gray-800 light:border-gray-700">
        <div class="flex flex-col items-center pb-10">
          <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg" alt="Bonnie image"/>
          <h5 class="mb-1 text-xl font-medium text-gray-900 light:text-black">{{ items.name }}</h5>
          <span class="text-md text-gray-500 dark:text-gray-400">Email: {{ items.email }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">Phone: +{{ items.phone }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">Payed: {{ items.payed }}$</span>
        </div>
      </div>
    </div>
    <div class="relative flex flex-col  mt-5 min-h-screen" v-if=" !items.is_admin">
      <h5 class="mb-1 text-xl font-bold text-gray-900 light:text-black mb-5"> Payment History </h5>
      <div class="overflow-x-auto">
        <div class="p-1.5 w-full inline-block align-middle">
          <div class="overflow-hidden border rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th
                    scope="col"
                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  ID
                </th>
                <th
                    scope="col"
                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Payed
                </th>
                <th
                    scope="col"
                    class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                >
                  Date
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr  v-for="(item,i) in items.payments" :key="i">
                <td
                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                >
                  {{item.id}}
                </td>
                <td
                    class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                >
                  {{ item.payed }}
                </td>
                <td
                    class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                >
                  {{ item.created_at }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      items: [],
      successMsg: '',
      errorMsg: '',
    }
  },
  mounted() {
    this.getPaymentData();
  },
  methods: {
    getPaymentData() {
      axios.get('/me')
          .then(async (response) => {
            this.items = response.data
          })
          .catch((error) => {
            this.errorMsg = error.response.data
            setTimeout(() => this.errorMsg = '', 1500)
          });
    },
  }
}
</script>

<style scoped>

</style>