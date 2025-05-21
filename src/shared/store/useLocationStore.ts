import { create } from "zustand";

// 서버에서 받아오는 위치 타입
export interface Location {
  id: number;
  placeName: string;
  x: number;
  y: number;
  pinned: boolean;
}

interface LocationState {
  locations: Location[];
  selectedLocationId: number | null;

  setLocations: (locations: Location[]) => void;
  addLocation: (location: Location) => void;
  removeLocation: (id: number) => void;
  selectLocation: (id: number) => void;
}

const useLocationStore = create<LocationState>((set) => ({
  locations: [],
  selectedLocationId: null,

  setLocations: (locations) => set({ locations }),

  addLocation: (location) =>
    set((state) => ({
      locations: [...state.locations, location],
    })),

  removeLocation: (id) =>
    set((state) => ({
      locations: state.locations.filter((loc) => loc.id !== id),
    })),

  selectLocation: (id) =>
    set(() => ({
      selectedLocationId: id,
    })),
}));

export default useLocationStore;
