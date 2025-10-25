<!-- src/pages/Tasks.vue -->
<template>
  <div>
   <div class="flex flex-wrap gap-2 items-center justify-between mb-4">
  <div class="flex-1 min-w-[200px]">
    <h2 class="text-2xl font-semibold">Tasks</h2>
    <p class="text-sm text-gray-500">Manage your tasks easily.</p>
  </div>

  <div class="flex flex-wrap gap-2 justify-end">
    <input
      v-model="q"
      @input="onSearch"
      placeholder="Search..."
      class="border p-2 rounded w-48 md:w-60"
    />
    <select v-model="filters.status" @change="applyFilters" class="border p-2 rounded">
      <option value="">All status</option>
      <option value="open">Open</option>
      <option value="on_progress">On Progress</option>
      <option value="done">Done</option>
    </select>
    <select v-model="filters.priority" @change="applyFilters" class="border p-2 rounded">
      <option value="">All priority</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <select v-model="sort" @change="applyFilters" class="border p-2 rounded">
      <option value="due_date">Due ↑</option>
      <option value="-due_date">Due ↓</option>
      <option value="created_at">Created ↑</option>
      <option value="-created_at">Created ↓</option>
    </select>
    <router-link
      to="/tasks/create"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      + Add
    </router-link>
  </div>
</div>


    <TaskTable :tasks="taskStore.tasks" :meta="taskStore.meta" :loading="taskStore.loading"
               @delete="onDelete" @page-change="fetch" />

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useTask } from "../stores/task";
import TaskTable from "../components/TaskTable.vue";
import { toast } from "../main";
const taskStore = useTask();
const q = ref("");
const filters = ref({ status: "", priority: "" });
const sort = ref("due_date");

let searchTimer = null;

function buildParams(page = 1) {
  return {
    page,
    limit: 10,
    q: q.value || undefined,
    status: filters.value.status || undefined,
    priority: filters.value.priority || undefined,
    sort: sort.value, // bisa "due_date" atau "-due_date"
  };
}


async function fetch(page = 1) {
  await taskStore.fetchTasks(buildParams(page));
}

function onSearch() {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => fetch(1), 350);
}

function applyFilters() {
  fetch(1);
}

async function onDelete(id) {
  if (!confirm("Delete task permanently?")) return;
  try {
    await taskStore.deleteTask(id);
    toast.success("Task deleted");
  } catch (e) {
    toast.error("Failed to delete");
  }
}

onMounted(() => fetch());
</script>
