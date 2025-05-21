import { useState, useEffect } from "react";
import useLocationStore from "../../shared/store/useLocationStore";
import { togglePinLocation } from "@/entities/location/api/locationApi";

// PNG 파일 import
import MapPinIcon from "@/assets/icons/map-pin-front-color.png";
import PlusIcon from "@/assets/icons/plus-front-clay.png";
import PinIcon from "@/assets/icons/pin-front-clay.png";
import ColorPinIcon from "@/assets/icons/pin-front-color.png";
import TrashIcon from "@/assets/icons/trash-can-front-color.png";

interface LocationSidebarProps {
  openModal: () => void;
  openDeleteModal: (id: number) => void;
}

const LocationSidebar = ({
  openModal,
  openDeleteModal,
}: LocationSidebarProps) => {
  const { locations, togglePin, selectLocation, selectedLocationId } =
    useLocationStore();
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  useEffect(() => {
    console.log("현재 선택된 ID (사이드바):", selectedLocationId);
  }, [selectedLocationId]);

  const handleIconClick = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();

    // 중복 요청 방지
    if (loadingIds.includes(id)) return;
    setLoadingIds((prev) => [...prev, id]);

    const location = locations.find((loc) => loc.id === id);
    const wasPinned = location?.pinned;

    try {
      await togglePinLocation(id); // 서버 API 요청
      togglePin(id); // 로컬 상태 변경

      const message = wasPinned
        ? "장소 고정이 해제되었습니다."
        : "장소가 고정되었습니다.";

      alert(message);
      console.log(`${message} (ID: ${id})`);
    } catch {
      alert("핀 상태 변경에 실패했습니다.");
      console.error("핀 상태 변경 실패");
    } finally {
      setLoadingIds((prev) => prev.filter((pid) => pid !== id));
    }
  };

  return (
    <div className="absolute flex flex-col items-start gap-[40px] w-[248px] h-[1200px] p-[48px_16px] aspect-[31/150] bg-white rounded-tr-[48px] rounded-br-[48px] shadow-[2px_0px_4px_rgba(0,0,0,0.10)]">
      <div className="flex items-center gap-[16px] cursor-pointer">
        <img
          className="w-[40px] h-[40px] aspect-square"
          src={MapPinIcon}
          alt="Map Pin"
        />
        <div className="text-gray-60 font-pretendard text-[20px] font-[700] leading-none">
          위치 목록
        </div>
      </div>

      <div
        className="flex items-center gap-[16px] cursor-pointer"
        onClick={openModal}
      >
        <img
          className="w-[40px] h-[40px] aspect-square"
          src={PlusIcon}
          alt="Plus"
        />
        <div className="text-gray-60 font-pretendard text-[20px] font-[700] leading-none">
          추가하기
        </div>
      </div>

      <div className="flex flex-col items-start gap-[8px] px-[8px] self-stretch">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className={`relative flex p-[8px] items-center gap-[12px] flex-[1_0_0] self-stretch cursor-pointer rounded-[12px] transition-all hover:bg-[#F2F2F2] hover:shadow-[-2px_2px_2px_1px_rgba(0,0,0,0.1)] group`}
            onClick={() => {
              console.log("선택한 위치 ID:", loc.id);
              selectLocation(loc.id);
            }}
          >
            <img
              className="w-[24px] h-[24px] aspect-square cursor-pointer"
              src={loc.pinned ? ColorPinIcon : PinIcon}
              alt="Pin"
              onClick={(e) => handleIconClick(loc.id, e)}
            />

            <div className="overflow-hidden text-gray-60 text-ellipsis font-pretendard text-[16px] font-[600] leading-none">
              {loc.placeName}
            </div>

            <div
              className="ml-auto p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                openDeleteModal(loc.id); // ID 전달
              }}
            >
              <img
                src={TrashIcon}
                alt="Trash"
                className="w-[24px] h-[24px] aspect-square"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSidebar;
