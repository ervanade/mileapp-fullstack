import { defineStore } from "pinia";
import api from "../services/api";
import Cookies from "js-cookie";
import { toast } from "../main";

export const useAuth = defineStore("auth", {
    state: () => ({ user: null }),
    actions: {
        async login(form) {
            try {
                const { data } = await api.post("/login", form);
                Cookies.set("token", data.token);
                this.user = data.user;
                toast.success("Login successful");
            } catch (err) {
                toast.error("Invalid credentials");
                throw err;
            }
        },
        logout() {
            Cookies.remove("token");
            this.user = null;
            toast.info("Logged out");
        },
    },
});
