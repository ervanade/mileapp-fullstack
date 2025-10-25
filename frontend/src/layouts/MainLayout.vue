<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <Navbar @toggleSidebar="sidebarOpen = !sidebarOpen" />

      <main class="p-4 md:p-6 overflow-y-auto flex-1">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";

const sidebarOpen = ref(false);
</script>
