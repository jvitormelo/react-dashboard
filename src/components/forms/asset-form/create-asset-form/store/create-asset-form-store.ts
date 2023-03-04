import { create } from "zustand";
import { AssetSchema } from "../../schema";

enum CreateAssetSteps {
  AssetInfo,
  Image,
  Users,
}

interface State {
  assetInfo: null | AssetSchema;
  image: null | File;
  users: null | number[];
  currentStep: CreateAssetSteps;
  showNextButton: () => boolean;
  showPrevButton: () => boolean;
  setAssetInfo: (assetInfo: AssetSchema) => void;
  setImage: (image: File) => void;
  setUsers: (users: number[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  clear: () => void;
}

// <3 zustand && react-query
export const useCreateAssetFormStore = create<State>((set, get) => ({
  assetInfo: null,
  image: null,
  users: null,
  currentStep: CreateAssetSteps.AssetInfo,
  setAssetInfo: (assetInfo: AssetSchema) => {
    set({ assetInfo });
  },
  setImage: (image: File) => {
    set({ image });
  },
  setUsers: (users: number[]) => {
    set({ users });
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
  showNextButton() {
    return (
      get().currentStep === CreateAssetSteps.AssetInfo &&
      get().assetInfo !== null
    );
  },
  showPrevButton() {
    return get().currentStep !== CreateAssetSteps.AssetInfo;
  },
  clear: () => {
    set({
      assetInfo: null,
      image: null,
      users: null,
      currentStep: CreateAssetSteps.AssetInfo,
    });
  },
}));
