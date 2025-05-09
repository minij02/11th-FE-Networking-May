import { create } from 'zustand';

interface PlaceStore {
  placeId: string;
  setPlaceId: (id: string) => void;
}

export const usePlaceStore = create<PlaceStore>((set) => ({
  placeId: '',
  setPlaceId: (id) => set({ placeId: id }),
}));