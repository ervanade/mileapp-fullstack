import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../stores/auth";

const Login = () => import("../pages/Login.vue");
const Tasks = () => import("../pages/Tasks.vue");
const TaskForm = () => import("../pages/TaskForm.vue");

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/login", component: Login },
        {
            path: "/",
            component: () => import("../layouts/MainLayout.vue"),
            children: [
                { path: "", redirect: "/tasks" },
                { path: "tasks", component: Tasks },
                { path: "tasks/create", component: TaskForm },
                { path: "tasks/:id/edit", component: TaskForm },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    const auth = useAuth();
    const token = document.cookie.includes("token=");
    if (!token && to.path !== "/login") next("/login");
    else next();
});

export default router;
