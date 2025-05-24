import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";

const app = mount(App, {
  // biome-ignore lint/style/noNonNullAssertion: This element needs to be there
  target: document.getElementById("app")!,
});

export default app;
