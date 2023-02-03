<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen">
    <div class="overflow-x-auto">
      <div class="relative flex flex-col items-center justify-center">
        <span class="px-2 py-2 text-green-600" v-if="successMsg">
          {{ successMsg }}
        </span>
        <span class="px-2 py-2  text-red-600" v-if="errorMsg">
          {{ errorMsg }}
        </span>
      </div>
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
                Name
              </th>
              <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Email
              </th>
              <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Phone
              </th>
              <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Payed
              </th>
              <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
              >
                Edit
              </th>
              <th
                  scope="col"
                  class="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase"
              >
                Delete
              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr  v-for="(item,i) in items" :key="i">
              <td
                  class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
              >
                {{item.id}}
              </td>
              <td
                  class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
              >
                {{ item.name }}
              </td>
              <td
                  class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
              >
                {{ item.email }}
              </td>
              <td
                  class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
              >
                {{ item.phone }}
              </td>
              <td
                  class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
              >
                {{ item.payed }}
              </td>
              <td
                  class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
              >
                <a
                    class="text-green-500 hover:text-green-700"
                    :href="'/edit-user/' + item.id">

                  Edit
                </a>
              </td>
              <td
                  class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
              >
                <a
                    class="text-red-500 hover:text-red-700"
                    href="#"
                    @click="deleteRow(i, item.id)"
                >
                  Delete
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "AllUsers",
  data() {
    return {
      items: [],
      successMsg: '',
      errorMsg: '',
    }
  },
  mounted() {
    this.getUsersData();
  },
  methods: {
    getUsersData() {
      axios.get('/users')
          .then(async (response) => {
            this.items = response.data
          })
          .catch((error) => {
            this.errorMsg = error.response.data
            setTimeout(() => this.errorMsg = '', 1500)
          });
    },
    deleteRow(index, id) {
      axios.delete('/user/'+id)
          .then(async (response) => {
            this.items.splice(index, 1)
            this.successMsg = "Deleted successfully"
            setTimeout(() => this.successMsg = '', 1500)
          })
          .catch((error) => {
            this.errorMsg =  error.response.data
            setTimeout(() => this.errorMsg = '', 1500)
          });
    },
  }
}
</script>

<style scoped>

</style>