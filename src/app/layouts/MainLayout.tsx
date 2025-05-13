import { useState } from "react";
import { Outlet } from "react-router-dom";
import LocationSidebar from "@/widgets/LocationSidebar/LocationSidebar";
import AddLocationModal from "@/features/add-location/ui/AddLocationModal";
import DeleteConfirmModal from "@/features/delete-location/ui/DeleteConfirmModal";

type ModalType = "add" | "delete" | null;

const MainLayout = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // 모달 열기
  const openModal = (type: ModalType) => setActiveModal(type);

  // 모달 닫기
  const closeModal = () => setActiveModal(null);

  const handleDelete = () => {
    console.log("삭제됨");
    closeModal();
  };

  return (
    <div className="relative flex h-screen">
      <LocationSidebar
        openModal={() => openModal("add")}
        openDeleteModal={() => openModal("delete")}
      />

      <main className="flex-1 ml-[248px] p-4 relative z-[10]">
        <Outlet />
      </main>

      {activeModal && (
        <div
          className="fixed inset-0 bg-[rgba(41,46,46,0.40)] z-[30] w-full h-full"
          onClick={closeModal}
        />
      )}

      {activeModal === "add" && (
        <AddLocationModal isOpen={true} onClose={closeModal} />
      )}
      {activeModal === "delete" && (
        <DeleteConfirmModal
          isOpen={true}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default MainLayout;
