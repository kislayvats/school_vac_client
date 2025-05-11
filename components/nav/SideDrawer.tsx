"use client";
import { generateAvatarFromName } from "@/config";
import { navigation, teams } from "@/config/navigationOptions";
import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { schoolAdminStore, logoutUser } from "@/store/schoolAdminSlice";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function SideDrawer() {
  const adminUser = useSelector(schoolAdminStore);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6">
        <div className="flex h-16 shrink-0 items-center">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
            className="h-8 w-auto"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-indigo-700 text-white"
                          : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={classNames(
                          item.current
                            ? "text-white"
                            : "text-indigo-200 group-hover:text-white",
                          "size-6 shrink-0"
                        )}
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {teams?.length > 0 && (
              <li>
                <div className="text-xs/6 font-semibold text-indigo-200">
                  Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams?.map((team: any) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className={classNames(
                          team.current
                            ? "bg-indigo-700 text-white"
                            : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        )}
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            <li className="-mx-6 mt-auto">
              <Dropdown placement="top-end">
                <DropdownTrigger>
                  <button className="flex w-full items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-indigo-700">
                    <Image
                      alt="admin avatar"
                      src={generateAvatarFromName(adminUser?.name ?? "")}
                      className="size-8 rounded-full bg-indigo-700"
                      width={32}
                      height={32}
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{adminUser?.name}</span>
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions">
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    startContent={
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    }
                    onPress={handleLogout}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
