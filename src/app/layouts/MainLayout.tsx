import { useState } from "react";
import { Outlet } from "react-router-dom";
import LocationSidebar from "@/widgets/LocationSidebar/LocationSidebar";
import AddLocationModal from "@/features/add-location/ui/AddLocationModal";
import DeleteConfirmModal from "@/features/delete-location/ui/DeleteConfirmModal";

const MainLayout = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 위치 추가 모달 열기/닫기
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  // 삭제 확인 모달 열기/닫기
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className="relative flex h-screen">
      <LocationSidebar
        openModal={openAddModal}
        openDeleteModal={openDeleteModal}
      />

      <main className="flex-1 ml-[248px] p-4 relative z-[10]">
        <Outlet />
      </main>

      {(isAddModalOpen || isDeleteModalOpen) && (
        <div
          className="fixed inset-0 bg-[rgba(41,46,46,0.40)] z-[30] w-full h-full"
          onClick={() => {
            closeAddModal();
            closeDeleteModal();
          }}
        />
      )}

      <AddLocationModal isOpen={isAddModalOpen} onClose={closeAddModal} />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      />
    </div>
  );
};

export default MainLayout;
