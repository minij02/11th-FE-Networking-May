import { useEffect } from "react";
import { createPortal } from "react-dom";
import ThunderIcon from "@/assets/thunder-icon.png";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteConfirmModalProps) => {
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
    <>
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
            onClick={onDelete}
          >
            삭제하기
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default DeleteConfirmModal;
