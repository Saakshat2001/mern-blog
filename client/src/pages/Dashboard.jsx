import React, { useEffect } from "react";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import userSlice from "../redux/user/userSlice";
import DashSidebar from "../Components/DashSidebar";
import DashProfile from "../Components/DashProfile";
import Dashposts from "../Components/Dashposts";
import DashUsers from  "../Components/DashUsers";
import DashComments from "../Components/DashComments";
import DashboardComp from "../Components/DashboardComp";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    console.log(urlParams);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* { Sidebar } */}
        <DashSidebar />
      </div>

      {tab === "profile" && <DashProfile />}
      {/* { profile} */}
      {tab === 'posts' && <Dashposts />}
       {/* { users} */}
       {tab === 'users' && <DashUsers />}
        {/* { comments} */}
       {tab === 'comments' && <DashComments />}
         {/* { dashboard comp} */}
         {tab === 'dash' && <DashboardComp />}
    </div>
  );
}
