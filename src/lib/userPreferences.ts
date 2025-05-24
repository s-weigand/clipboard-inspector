import { persistedState } from "svelte-persisted-state";
import { type BundledTheme } from "shiki";

interface UserPreferences {
  theme: "light" | "dark";
  syntaxTheme: BundledTheme;
}

export const userPreferences = persistedState<UserPreferences>(
  "userPreferences",
  {
    theme: "dark",
    syntaxTheme: "github-dark-default",
  },
  {
    storage: "local",
    syncTabs: true,
    beforeWrite: (value) => {
      console.log("Saving preferences:", value);
      return value;
    },
    onWriteError: (error) => {
      console.error("Failed to save preferences:", error);
    },
  }
);
