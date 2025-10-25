<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="submit" class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-center text-xl font-semibold mb-4">Login MileApp Test</h2>
      <input
        v-model="form.email"
        placeholder="Email"
        class="border p-2 w-full mb-3"
      />
      <input
        v-model="form.password"
        placeholder="Password"
        type="password"
        class="border p-2 w-full mb-3"
      />
      <button class="bg-blue-600 text-white w-full p-2 rounded">Login</button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../stores/auth";

const router = useRouter();
const auth = useAuth();
const form = ref({ email: "test@mile.app", password: "password" });

async function submit() {
  await auth.login(form.value);
  router.push("/tasks");
}
</script>
