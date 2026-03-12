import { Outlet } from "react-router-dom";
import Header from "./Components/UI/Header/Header";
import Navbar from "./Components/UI/Navbar/Navbar";
import Footer from "./Components/UI/footer/Footer";
import AuthValidator from "./Components/AuthValidator";

const IndexPage = () => {
  return (
    <AuthValidator>
      <div className="min-h-screen bg-white font-ubuntu flex flex-col">
        <div className="fixed top-0 left-0 w-full z-[100] bg-white shadow-sm">
          <Header />
          <Navbar />
        </div>

        <main className="w-full flex-grow pt-[64px] lg:pt-[120px]">
          <Outlet />
        </main>

        <Footer />
      </div>
    </AuthValidator>
  );
};

export default IndexPage;
