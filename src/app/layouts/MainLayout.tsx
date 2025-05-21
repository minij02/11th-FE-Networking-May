import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LocationSidebar from "@/widgets/LocationSidebar/LocationSidebar";
import AddLocationModal from "@/features/add-location/ui/AddLocationModal";
import DeleteConfirmModal from "@/features/delete-location/ui/DeleteConfirmModal";
import useLocationStore from "@/shared/store/useLocationStore";
import { getAllLocations } from "@/entities/location/api/locationApi";

type ModalType = "add" | "delete" | null;

const MainLayout = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const { setLocations } = useLocationStore();

  // 컴포넌트 마운트 시 위치 데이터 요청
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locations = await getAllLocations();
        setLocations(locations);
      } catch (error) {
        console.error("위치 목록 불러오기 실패:", error);
      }
    };

    fetchLocations();
  }, [setLocations]);

  // 모달 열기
  const openModal = (type: ModalType) => setActiveModal(type);

  // 모달 닫기 및 삭제 타겟 초기화
  const closeModal = () => {
    setActiveModal(null);
    setDeleteTargetId(null);
  };

  return (
    <div className="relative flex h-screen">
      <LocationSidebar
        openModal={() => openModal("add")}
        openDeleteModal={(id: number) => {
          setDeleteTargetId(id);
          openModal("delete");
        }}
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
          deleteTargetId={deleteTargetId}
        />
      )}
    </div>
  );
};

export default MainLayout;
