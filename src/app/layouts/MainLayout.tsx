import { useState } from "react";
import { Outlet } from "react-router-dom";
import LocationSidebar from "@/widgets/LocationSidebar/LocationSidebar";
import AddLocationModal from "@/features/add-location/ui/AddLocationModal";

const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 위치 추가 모달 열기/닫기
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative flex h-screen">
      <LocationSidebar openModal={openModal} />

      <main className="flex-1 ml-[248px] p-4 relative z-[10]">
        <Outlet />
      </main>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(41,46,46,0.40)] z-[30] w-full h-full"
          onClick={closeModal}
        />
      )}

      <AddLocationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default MainLayout;
