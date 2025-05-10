import { useState } from "react";
import useLocationStore from "../../shared/store/useLocationStore";

// PNG 파일 import
import MapPinIcon from "@/assets/icons/map-pin-front-color.png";
import PlusIcon from "@/assets/icons/plus-front-clay.png";
import PinIcon from "@/assets/icons/pin-front-clay.png";
import ColorPinIcon from "@/assets/icons/pin-front-color.png";
import TrashIcon from "@/assets/icons/trash-can-front-color.png";

const LocationSidebar = () => {
  const { locations, removeLocation } = useLocationStore();
  const [activeIcon, setActiveIcon] = useState<{ [key: string]: boolean }>({});

  // 위치 삭제
  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeLocation(id);
  };

  // 아이콘 클릭 시 ColorPinIcon으로 토글 (고정 기능)
  const handleIconClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIcon((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

      <div className="flex items-center gap-[16px] cursor-pointer">
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
          >
            <img
              className="w-[24px] h-[24px] aspect-square cursor-pointer"
              src={activeIcon[loc.id] ? ColorPinIcon : PinIcon}
              alt="Pin"
              onClick={(e) => handleIconClick(loc.id, e)}
            />

            <div className="overflow-hidden text-gray-60 text-ellipsis font-pretendard text-[16px] font-[600] leading-none">
              {loc.name}
            </div>

            <div
              className="ml-auto p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => handleRemove(loc.id, e)}
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
