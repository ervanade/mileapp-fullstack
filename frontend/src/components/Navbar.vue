<template>
  <header class="bg-white border-b px-4 py-3 flex justify-between items-center shadow-sm">
    <div class="flex items-center gap-3">
      <!-- Mobile sidebar toggle -->
      <button @click="$emit('toggleSidebar')" class="md:hidden text-gray-600 text-2xl">
        ☰
      </button>
      <h1 class="font-semibold text-lg text-gray-800">Dashboard</h1>
    </div>

    <button
      @click="logout"
      class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
    >
      Logout
    </button>
  </header>
</template>

<script setup>
import { useAuth } from "../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuth();
const router = useRouter();

function logout() {
  auth.logout();
  router.push("/login");
}
</script>
