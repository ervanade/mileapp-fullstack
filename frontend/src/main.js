import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style.css";

// 1. Import plugin sebagai default (beri nama bebas, e.g., 'ToastContainer')
import ToastContainer from "vue3-toastify";
// 2. Import helper toast sebagai named export (atau cek dokumentasi untuk default)
// Biasanya, ia diexport sebagai 'toast' atau sebagai named export.
import { toast } from "vue3-toastify";

import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);

// Gunakan nama yang telah didefinisikan (ToastContainer)
app.use(ToastContainer, { autoClose: 2500, position: "top-right" });
app.mount("#app");

export { toast };