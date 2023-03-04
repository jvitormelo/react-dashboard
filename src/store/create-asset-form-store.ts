import { create } from "zustand";
import { AssetSchema } from "../components/forms/asset-form/schema";

enum CreateAssetSteps {
  AssetInfo,
  Image,
}

interface State {
  assetInfo: AssetSchema | null;
  image: File | null;
  currentStep: CreateAssetSteps;
  showPrevButton: () => boolean;
  setAssetInfo: (assetInfo: AssetSchema) => void;
  setImage: (image: File) => void;
  nextStep: () => void;
  prevStep: () => void;
  clear: () => void;
  assetInfoSubmit: (data: AssetSchema) => Promise<void>;
}

// <3 zustand && react-query
export const useCreateAssetFormStore = create<State>((set, get) => ({
  assetInfo: null,
  image: null,
  currentStep: CreateAssetSteps.AssetInfo,
  setAssetInfo: (assetInfo: AssetSchema) => {
    set({ assetInfo });
  },
  setImage: (image: File) => {
    set({ image });
  },
  nextStep: () => {
    set((state) => ({
      currentStep: state.currentStep + 1,
    }));
  },
  prevStep: () => {
    set((state) => ({
      currentStep: state.currentStep - 1,
    }));
  },
  showPrevButton: () => {
    return get().currentStep !== CreateAssetSteps.AssetInfo;
  },
  assetInfoSubmit: async (data: AssetSchema) => {
    set({ assetInfo: data });
    get().nextStep();
  },
  clear: () => {
    set({
      assetInfo: null,
      image: null,
      currentStep: CreateAssetSteps.AssetInfo,
    });
  },
}));
