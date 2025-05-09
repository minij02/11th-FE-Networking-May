import { Outlet } from "react-router-dom";
import LocationSidebar from "@/widgets/LocationSidebar/LocationSidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <LocationSidebar />

      <main className="flex-1 ml-[15vw] p-[4vh] flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
