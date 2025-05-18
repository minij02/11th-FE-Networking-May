import { useEffect, useState } from "react";
import CloseIcon from "@/assets/icons/close-icon.png";
import Clouds from "@/assets/icons/clouds-morning.png";
import SearchIcon from "@/assets/icons/search-icon.png";
import CheckIcon from "@/assets/icons/check-icon.png";
import ModalPortal from "@/shared/ui/ModalPortal";

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
  address: string;
}

const AddLocationModal = ({ isOpen, onClose }: AddLocationModalProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  // 검색어 변경 시 검색 요청
  useEffect(() => {
    if (!searchKeyword) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers: Marker[] = data.map((place) => {
          const position = {
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
          };
          bounds.extend(new kakao.maps.LatLng(position.lat, position.lng));

          return {
            position,
            content: place.place_name,
            address: place.road_address_name || place.address_name,
          };
        });

        setMarkers(newMarkers);
      } else {
        console.warn(`검색 결과가 없습니다: ${status}`);
        setMarkers([]);
      }
    });
  }, [searchKeyword]);

  // 검색어 입력 처리
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // 체크 아이콘 토글 기능
  const handleLocationClick = (marker: Marker) => {
    setSelectedLocation((prev) =>
      prev === marker.content ? null : marker.content
    );
  };

  // 확인 버튼 클릭 시
  const handleConfirm = () => {
    if (selectedLocation) {
      const selectedPlace = markers.find(
        (marker) => marker.content === selectedLocation
      );
      console.log("선택된 위치:", selectedPlace);
    }
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[50] p-[36px_72px] bg-[#FFFFFF] rounded-[16px] shadow-[4px_4px_4px_3px_rgba(0,0,0,0.25)]">
        <button
          className="absolute right-[16px] top-[16.5px] w-[24px] h-[24px] aspect-square filter drop-shadow-[-2px_2px_2px_rgba(0,0,0,0.1)] cursor-pointer bg-transparent border-none outline-none"
          onClick={onClose}
        >
          <img src={CloseIcon} alt="Close" className=" w-[24px] h-[24px]" />
        </button>

        <div className="flex flex-col gap-[48px]">
          <div className="flex items-center gap-[16px] w-[480px]">
            <div
              className="flex justify-center items-center w-[80px] h-[80px] aspect-square flex-shrink-0 bg-lightgray bg-cover bg-center"
              style={{ backgroundImage: `url(${Clouds})` }}
            ></div>

            <h2 className="text-[#292E2E] font-pretendard text-[32px] font-bold leading-none">
              장소 검색 및 추가
            </h2>
          </div>

          <div className="flex flex-col items-start gap-[32px] self-stretch">
            <div className="flex flex-col items-start gap-[8px] self-stretch">
              <div className="text-[#292E2E] font-pretendard text-[24px] font-[600] leading-none">
                장소 이름
              </div>

              <div className="flex items-center justify-between p-[4px_8px] self-stretch border-b border-[#292E2E]">
                <input
                  type="text"
                  placeholder="장소를 입력하세요"
                  value={searchKeyword}
                  onChange={handleSearchChange}
                  className="flex-1 bg-transparent border-none outline-none placeholder:text-[#A4A4A4] placeholder:font-pretendard placeholder:text-[16px] placeholder:font-normal placeholder:leading-none"
                />
                <div
                  className="w-[24px] h-[24px] aspect-square bg-lightgray bg-cover bg-center"
                  style={{ backgroundImage: `url(${SearchIcon})` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[16px] p-[8px_16px] h-[240px] overflow-y-auto border border-[#A4A4A4] rounded-[8px]">
            {markers.length > 0 ? (
              markers.map((marker) => (
                <div
                  key={`${marker.position.lat}-${marker.position.lng}`}
                  className={`relative flex items-center p-[8px_12px] gap-[4px] cursor-pointer border-b border-[#A4A4A4] ${
                    selectedLocation === marker.content ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleLocationClick(marker)}
                >
                  <div className="flex flex-col gap-[4px] flex-1">
                    <div className="text-[#000000] font-pretendard text-[16px] font-[500] leading-none">
                      {marker.content}
                    </div>
                    <div className="text-[#A4A4A4] font-pretendard text-[12px] font-[400] leading-none">
                      {marker.address}
                    </div>
                  </div>

                  {selectedLocation === marker.content && (
                    <div
                      className="absolute right-[8px] bottom-[7.5px] w-[36px] h-[36px] bg-cover bg-center"
                      style={{ backgroundImage: `url(${CheckIcon})` }}
                    ></div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-[#A4A4A4] font-pretendard text-[16px]">
                검색 결과가 없습니다.
              </div>
            )}
          </div>

          <div className="flex justify-end mt-[16px]">
            <button
              onClick={handleConfirm}
              className="bg-[#292E2E] text-[#FFFFFF] px-[30px] py-[6px] rounded-[6px] font-pretendard text-[20px] font-[600]"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default AddLocationModal;
