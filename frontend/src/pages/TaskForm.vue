<!-- src/pages/TaskForm.vue -->
<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white shadow rounded p-6">
        <div class="flex items-center justify-between gap-3 mb-4">
                         <h2 class="text-xl font-semibold mb-4">{{ isEdit ? "Edit Task" : "Create Task" }}</h2>

        <button @click="router.back()" 
                class="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
        </button>


    </div>

      <form @submit.prevent="submit" class="space-y-3">
        <div>
          <label class="block text-sm font-medium mb-1">Title</label>
          <input v-model="form.title" type="text" class="border p-2 w-full rounded" />
          <p v-if="errors?.title" class="text-sm text-red-600 mt-1">{{ errors.title[0] }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea v-model="form.description" rows="4" class="border p-2 w-full rounded"></textarea>
          <p v-if="errors?.description" class="text-sm text-red-600 mt-1">{{ errors.description[0] }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="block text-sm font-medium mb-1">Priority</label>
            <select v-model="form.priority" class="border p-2 w-full rounded">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <p v-if="errors?.priority" class="text-sm text-red-600 mt-1">{{ errors.priority[0] }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Status</label>
            <select v-model="form.status" class="border p-2 w-full rounded">
              <option value="open">Open</option>
              <option value="on_progress">On Progress</option>
              <option value="done">Done</option>
            </select>
            <p v-if="errors?.status" class="text-sm text-red-600 mt-1">{{ errors.status[0] }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Due Date</label>
            <input v-model="form.due_date" type="date" class="border p-2 w-full rounded" />
            <p v-if="errors?.due_date" class="text-sm text-red-600 mt-1">{{ errors.due_date[0] }}</p>
          </div>
        </div>

        <div class="flex gap-2">
          <button type="submit" :disabled="submitting" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {{ submitting ? (isEdit ? "Updating…" : "Creating…") : (isEdit ? "Update" : "Create") }}
          </button>
          <router-link to="/tasks" class="bg-gray-200 px-4 py-2 rounded">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTask } from "../stores/task";
import { toast } from "../main";

const route = useRoute();
const router = useRouter();
const taskStore = useTask();

const id = route.params.id;
const isEdit = Boolean(id);
const submitting = ref(false);
const errors = ref(null);

const form = ref({
  title: "",
  description: "",
  priority: "medium",
  status: "open",
  due_date: "",
});

onMounted(async () => {
  if (isEdit) {
    const t = await taskStore.getTask(id);
    if (!t) {
      toast.error("Task not found");
      router.push("/tasks");
      return;
    }
    form.value = {
      title: t.title || "",
      description: t.description || "",
      priority: t.priority || "medium",
      status: t.status || "open",
      due_date: t.due_date ? t.due_date.split("T")[0] : (t.dueDate ? t.dueDate.split("T")[0] : ""),
    };
  }
});

async function submit() {
  submitting.value = true;
  errors.value = null;
  try {
    if (isEdit) {
      await taskStore.updateTask(id, form.value);
      toast.success("Task updated");
    } else {
      await taskStore.createTask(form.value);
      toast.success("Task created");
    }
    router.push("/tasks");
  } catch (err) {
    if (err.response?.status === 422) {
      errors.value = err.response.data.errors || err.response.data;
    } else {
      toast.error("Failed to save task");
    }
  } finally {
    submitting.value = false;
  }
}
</script>
