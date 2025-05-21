import { useEffect } from "react";
import ThunderIcon from "@/assets/thunder-icon.png";
import ModalPortal from "@/shared/ui/ModalPortal";
import { deleteLocation } from "@/entities/location/api/locationApi";
import useLocationStore from "@/shared/store/useLocationStore";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteTargetId: number | null;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  deleteTargetId,
}: DeleteConfirmModalProps) => {
  const { removeLocation } = useLocationStore();

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

  if (!isOpen || deleteTargetId === null) return null;

  const handleDelete = async () => {
    try {
      await deleteLocation(deleteTargetId);
      removeLocation(deleteTargetId);
      alert("위치가 삭제되었습니다.");
      console.log(`위치 ID ${deleteTargetId} 삭제 성공`);
      onClose();
    } catch (error) {
      alert("위치 삭제에 실패했습니다.");
      console.error("위치 삭제 실패:", error);
    }
  };

  return (
    <ModalPortal>
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[50] p-[36px_108px] flex flex-col justify-center items-center gap-[24px] rounded-[16px] bg-[#FFFFFF] shadow-[4px_4px_4px_3px_rgba(0,0,0,0.25)] w-[330px]">
        <div className="text-[#292E2E] font-pretendard text-[32px] font-[700] leading-none">
          정말로 삭제하시겠습니까?
        </div>

        <div
          className="w-[160px] h-[160px] flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: `url(${ThunderIcon})` }}
        ></div>

        <div className="flex justify-center gap-[16px] mt-[16px]">
          <button
            className="px-[24px] py-[6px] rounded-[6px] border border-[#292E2E] bg-[#FFFFFF] text-[#292E2E] font-pretendard text-[20px] font-[600]"
            onClick={onClose}
          >
            취소하기
          </button>
          <button
            className="px-[24px] py-[6px] rounded-[6px] bg-[#292E2E] text-[#FFFFFF] font-pretendard text-[20px] font-[600]"
            onClick={handleDelete}
          >
            삭제하기
          </button>
        </div>
      </div>
    </ModalPortal>
  );
};

export default DeleteConfirmModal;
