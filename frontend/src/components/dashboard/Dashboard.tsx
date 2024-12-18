import React from "react";

import { Global, Settings } from "iconsax-react";
import Controllers from "../controllers/Controllers";
import Events from "../events/Events";
import Middlewares from "../middlewares/Middlewares";
import Models from "../models/Models";
import Overview from "../overview/Overview";
import Navigation from "./Navigation";
import Routes from "../routes/Routes";
import { useGlobalData } from "../../stores/global";
import Services from "../services/Services";

function Dashboard() {
  const children: React.ReactNode[] = [
    <Overview key={"overview"} />,
    <Models key={"models"} />,
    <Controllers key={"controllers"} />,
    <Services key={"services"} />,
    <Routes key={"routes"} />,
    <Middlewares key={"middlewares"} />,
    <Global key={"global"} />,
    <Events key={"events"} />,
    <Settings key={"settings"} />,
  ];

  const currentIndex = useGlobalData((state) => state.currentIndex);

  return (
    <div className="w-full flex h-[100vh]">
      <Navigation />
      <div className="px-10 bg-background w-full overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-webkit">
        {children[currentIndex]}
      </div>
    </div>
  );
}

export default Dashboard;
