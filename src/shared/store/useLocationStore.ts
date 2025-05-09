// 임시 데이터
import { create } from "zustand";

interface Location {
  id: string;
  name: string;
  lat: string;
  lon: string;
}

interface LocationState {
  locations: Location[];
  selectedLocation: string | null;
  addLocation: (location: Location) => void;
  removeLocation: (id: string) => void;
  selectLocation: (id: string) => void;
}

const useLocationStore = create<LocationState>((set) => ({
  locations: [
    { id: "1", name: "서울역", lat: "37.5563", lon: "126.9725" },
    { id: "2", name: "강남역", lat: "37.4979", lon: "127.0276" },
  ],
  selectedLocation: null,

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
      selectedLocation: id,
    })),
}));

export default useLocationStore;
export type { Location };
