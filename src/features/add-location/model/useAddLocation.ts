import { useState } from "react";
import { addLocation } from "@/entities/location/api/locationApi";
import type { Marker } from "@/entities/location/model/locationTypes";

export const useAddLocation = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLocation = async (marker: Marker) => {
    setIsLoading(true);
    setError(null);

    try {
      const placeId = await addLocation({
        placeName: marker.content,
        x: marker.position.lng,
        y: marker.position.lat,
      });

      console.log("Place ID:", placeId);
      // alert(`위치가 추가되었습니다. Place ID: ${placeId}`);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("API 요청 에러:", err);
      setError("위치 추가 중 에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return { submitLocation, isLoading, error };
};
