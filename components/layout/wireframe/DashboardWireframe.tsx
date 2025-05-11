"use client";
import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { SideDrawer, TopNavMobile } from "@/components/nav";
import { useSelector } from "react-redux";
import { schoolAdminStore } from "@/store/schoolAdminSlice";
import { generateAvatarFromName } from "@/config";
import Image from "next/image";
import { ModalSwitcher } from "@/components/modal";
import withAuth from "@/hoc/withAuth";

function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminUser = useSelector(schoolAdminStore);

  // MAIN JSX
  return (
    <div>
      <ModalSwitcher />
      {/* this is the top nav for mobile */}
      <TopNavMobile setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      {/* this is the side drawer for desktop */}
      <SideDrawer />

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-indigo-200 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-sm/6 font-semibold text-white">
          Dashboard
        </div>
        <a href="#">
          <span className="sr-only">Your profile</span>
          <Image
            alt="admin avatar"
            src={generateAvatarFromName(adminUser?.name ?? "")}
            className="size-8 rounded-full bg-indigo-700"
            width={32}
            height={32}
          />
        </a>
      </div>

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* {JSON.stringify(adminUser, null, 2)} */}
          {children}
        </div>
      </main>
    </div>
  );
}

export default withAuth(DashboardWrapper);
