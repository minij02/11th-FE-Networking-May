import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@/assets/icons/close-icon.png";
import Clouds from "@/assets/icons/clouds-morning.png";
import SearchIcon from "@/assets/icons/search-icon.png";
import CheckIcon from "@/assets/icons/check-icon.png";

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleLocations = [
  { id: "1", name: "KFC 광화문점", address: "서울 종로구 세종로 161-1" },
  { id: "2", name: "KFC 부산서면점", address: "부산 부산진구 부전동 241-17" },
  { id: "3", name: "KFC 홍익대점", address: "서울 마포구 동교동 165-8" },
];

const AddLocationModal = ({ isOpen, onClose }: AddLocationModalProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // 검색어 필터링
  const filteredLocations = sampleLocations.filter((location) =>
    location.name.includes(searchKeyword)
  );

  // 체크 아이콘 토글
  const handleLocationClick = (id: string) => {
    setSelectedLocation((prev) => (prev === id ? null : id));
  };

  // 확인 버튼 클릭 시
  const handleConfirm = () => {
    if (selectedLocation) {
      console.log("선택된 위치:", selectedLocation);
      // 이후 메인 화면과 연결 예정
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

  return createPortal(
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
            날씨 위치 추가
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
                onChange={(e) => setSearchKeyword(e.target.value)}
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
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <div
                key={location.id}
                className={`relative flex items-center p-[8px_12px] gap-[4px] cursor-pointer border-b border-[#A4A4A4] ${
                  selectedLocation === location.id ? "bg-gray-100" : ""
                }`}
                onClick={() => handleLocationClick(location.id)}
              >
                <div className="flex flex-col gap-[4px] flex-1">
                  <div className="text-[#000000] font-pretendard text-[16px] font-[500] leading-none">
                    {location.name}
                  </div>
                  <div className="text-[#A4A4A4] font-pretendard text-[12px] font-[400] leading-none">
                    {location.address}
                  </div>
                </div>

                {selectedLocation === location.id && (
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
    </div>,
    document.body
  );
};

export default AddLocationModal;
