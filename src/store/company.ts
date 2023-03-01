import { Company } from "@/types/entities/company";
import { create } from "zustand";

interface Store {
  company: Company;
  setCompany: (company: Company) => void;
}

export const useCompanyStore = create<Store>((set) => ({
  company: {
    id: 0,
    name: "",
  },
  setCompany: (company: Company) => set({ company }),
}));
