import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type PersistentTabsKeys = "unit-users" | "company";

type Keys = Record<PersistentTabsKeys, string>;

interface Store {
  keys?: Keys;
  onTabChange: (key: PersistentTabsKeys, activeKey: string) => void;
}

export const usePersistentTabStore = create(
  persist<Store>(
    (set) => ({
      onTabChange: (key, tabKey) => {
        set((state) => ({
          keys: {
            ...(state.keys as Keys),
            [key]: tabKey,
          },
        }));
      },
    }),
    {
      name: "persistent-tab-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
