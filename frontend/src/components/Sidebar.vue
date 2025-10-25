
<template>
  <!-- Desktop sidebar -->
  <aside
    class="hidden md:flex flex-col w-64 bg-white border-r shadow-sm"
  >
    <div class="p-4 text-2xl font-bold text-blue-600">TaskApp</div>
    <nav class="flex flex-col flex-1">
      <router-link
        to="/tasks"
        class="px-4 py-2 hover:bg-blue-50 transition-colors"
        active-class="bg-blue-100 text-blue-700 font-semibold"
      >
        📝 Tasks
      </router-link>
    </nav>
  </aside>

  <!-- Mobile sidebar overlay -->
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 bg-black bg-opacity-40 z-40"
      @click="$emit('close')"
    ></div>
  </transition>

  <!-- Mobile drawer -->
  <transition name="slide">
    <aside
      v-if="open"
      class="fixed z-50 inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col"
    >
      <div class="p-4 flex justify-between items-center border-b">
        <div class="text-xl font-bold text-blue-600">TaskApp</div>
        <button @click="$emit('close')" class="text-gray-500 text-2xl leading-none">&times;</button>
      </div>
      <nav class="flex flex-col flex-1">
        <router-link
          to="/tasks"
          class="px-4 py-2 hover:bg-blue-50 transition-colors"
          active-class="bg-blue-100 text-blue-700 font-semibold"
          @click="$emit('close')"
        >
          📝 Tasks
        </router-link>
      </nav>
    </aside>
  </transition>
</template>

<script setup>
defineProps({ open: Boolean });
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.25s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
</style>
