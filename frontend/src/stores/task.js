// src/stores/task.js
import { defineStore } from "pinia";
import api from "../services/api";

export const useTask = defineStore("task", {
    state: () => ({
        tasks: [],
        meta: { total: 0, page: 1, last_page: 1, per_page: 10 },
        loading: false,
        errors: null,
    }),
    actions: {
        async fetchTasks(params = {}) {
            try {
                this.loading = true;
                const res = await api.get("/tasks", { params });
                // expect API returns { data: [], meta: {...} }
                this.tasks = res.data.data;
                this.meta = res.data.meta || { total: 0, page: 1, last_page: 1, per_page: params.limit || 10 };
            } finally {
                this.loading = false;
            }
        },

        async getTask(id) {
            // backend may not have show endpoint, so fetch proxied via list
            const res = await api.get("/tasks", { params: { limit: 1000 } });
            return res.data.data.find((t) => (t._id || t.id) === id) || null;
        },

        async createTask(payload) {
            this.errors = null;
            try {
                const res = await api.post("/tasks", payload);
                return res.data;
            } catch (err) {
                if (err.response?.status === 422) this.errors = err.response.data.errors || err.response.data;
                throw err;
            }
        },

        async updateTask(id, payload) {
            this.errors = null;
            try {
                const res = await api.put(`/tasks/${id}`, payload);
                return res.data;
            } catch (err) {
                if (err.response?.status === 422) this.errors = err.response.data.errors || err.response.data;
                throw err;
            }
        },

        async deleteTask(id) {
            await api.delete(`/tasks/${id}`);
            // refresh current page
            await this.fetchTasks({ page: this.meta.page, limit: this.meta.per_page });
        },
    },
});
