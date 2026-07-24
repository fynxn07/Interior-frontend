import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";


function CustomerLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      
    </>
  );
}

export default CustomerLayout;