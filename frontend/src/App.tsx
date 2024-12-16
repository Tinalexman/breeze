import React from "react";
import Navigation from "./components/Navigation";
import Overview from "./components/overview/Overview";
import Models from "./components/models/Models";
import Controllers from "./components/controllers/Controllers";
import Routes from "./components/routes/Routes";
import Middlewares from "./components/middlewares/Middlewares";
import Global from "./components/global/Global";
import Events from "./components/events/Events";
import Settings from "./components/settings/Settings";
import { useGlobalData } from "./stores/global";
import { Toaster } from "react-hot-toast";

function App() {
  const children: React.ReactNode[] = [
    <Overview key={"overview"} />,
    <Models key={"models"} />,
    <Controllers key={"controllers"} />,
    <Routes key={"routes"} />,
    <Middlewares key={"middlewares"} />,
    <Global key={"global"} />,
    <Events key={"events"} />,
    <Settings key={"settings"} />,
  ];

  const currentIndex = useGlobalData((state) => state.currentIndex);

  return (
    <>
      <Toaster />
      <div className="w-full h-full flex">
        <Navigation />
        <div className="px-10 py-5 w-full h-full overflow-x-hidden overflow-y-auto">
          {children[currentIndex]}
        </div>
      </div>
    </>
  );
}

export default App;
