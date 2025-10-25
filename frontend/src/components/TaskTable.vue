<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm min-w-[600px]">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-3 text-left">Title</th>
            <th class="p-3 text-left">Priority</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Due</th>
            <th class="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td class="p-4 text-center" colspan="5">Loading…</td>
          </tr>
          <tr v-else-if="tasks.length === 0">
            <td class="p-4 text-center text-gray-500" colspan="5">No tasks found.</td>
          </tr>
          <tr
            v-for="t in tasks"
            :key="t._id || t.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="p-3 font-medium">{{ t.title }}</td>
            <td class="p-3">
              <span :class="priorityClass(t.priority)" class="px-2 py-1 rounded text-xs font-semibold">
                {{ capitalize(t.priority || '-') }}
              </span>
            </td>
            <td class="p-3">
              <span :class="statusClass(t.status)" class="px-2 py-1 rounded text-xs font-semibold">
                {{ statusLabel(t.status) }}
              </span>
            </td>
            <td class="p-3 whitespace-nowrap">{{ formatDate(t.due_date || t.dueDate) }}</td>
            <td class="p-3 whitespace-nowrap">
              <router-link
                :to="`/tasks/${t._id || t.id}/edit`"
                class="text-blue-600 hover:underline mr-2"
              >
                Edit
              </router-link>
              <button @click="$emit('delete', t._id || t.id)" class="text-red-600 hover:underline">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="p-3 flex flex-col md:flex-row md:items-center justify-between gap-2 text-sm">
      <div class="text-gray-600">
        Page {{ meta.page }} / {{ meta.last_page }} — Total {{ meta.total }}
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="$emit('page-change', meta.page - 1)"
          :disabled="meta.page <= 1"
          class="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
        >Prev</button>
        <button
          @click="$emit('page-change', meta.page + 1)"
          :disabled="meta.page >= meta.last_page"
          class="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
        >Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
const props = defineProps({
  tasks: Array,
  meta: Object,
  loading: Boolean,
});
const { tasks, meta, loading } = toRefs(props);

function capitalize(s) {
  if (!s) return "-";
  return String(s).replace(/_/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());
}
function formatDate(val) {
  if (!val) return "-";
  const d = new Date(val);
  if (isNaN(d)) return "-";
  return d.toLocaleDateString();
}
function statusLabel(s) {
  if (!s) return "-";
  return s === "on_progress" ? "On Progress" : capitalize(s);
}
function statusClass(s) {
  if (s === "done") return "bg-green-100 text-green-800";
  if (s === "on_progress") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
}
function priorityClass(p) {
  if (p === "high") return "bg-red-100 text-red-800";
  if (p === "medium") return "bg-indigo-100 text-indigo-800";
  return "bg-gray-100 text-gray-800";
}
</script>
