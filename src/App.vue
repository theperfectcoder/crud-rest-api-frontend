<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

</script>

<template>
  <div>
    <Navbar :key="$route.fullPath"/>
  </div>
  <RouterView class="container flex justify-around py-8 mx-auto bg-white border"/>
</template>