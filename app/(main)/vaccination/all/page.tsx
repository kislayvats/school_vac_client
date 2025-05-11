"use client";
import { TextInput } from "@/components/input";
import { generateAvatarFromName, QUERY_KEY_LIST } from "@/config";
import { getAllVaccinationDrivesAPI } from "@/functions";
import { SearchIcon } from "@/icons";
import { schoolAdminStore } from "@/store/schoolAdminSlice";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Pagination, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function AllVaccinationDrives() {
  const adminUser = useSelector(schoolAdminStore);
  // local state
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterValue, setFilterValue] = React.useState("");
  const [status, setStatus] = React.useState("");

  const {
    data: vaccinationDrivesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      QUERY_KEY_LIST.VACCINATION_DRIVE,
      page,
      rowsPerPage,
      filterValue,
      status,
    ],
    queryFn: () =>
      getAllVaccinationDrivesAPI(
        page,
        rowsPerPage,
        filterValue,
        status,
        adminUser?.token
      ),
  });

  return (
    <div>
      <div className="mx-auto max-w-md sm:max-w-3xl">
        <div>
          <div className="text-center">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
              aria-hidden="true"
              className="mx-auto size-12 text-gray-400"
            >
              <path
                d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="mt-2 text-base font-semibold text-gray-900">
              Vaccination Drives
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Search for vaccination drives by vaccine name
            </p>
          </div>

          <TextInput
            name="filterValue"
            type="text"
            placeholder="Search by vaccine name"
            aria-label="Search by vaccine name"
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
            className="mt-4"
            variant="bordered"
            size="lg"
            startContent={<SearchIcon className="size-4" />}
          />
        </div>
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-500">
            Total {vaccinationDrivesData?.totalCounts} Vaccination Drives
          </h3>

          <ul
            role="list"
            className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {isLoading && (
              <li className="flex justify-center items-center h-full">
                <Spinner size="sm" />
                Loading...
              </li>
            )}

            {Array.isArray(vaccinationDrivesData?.vaccination_drives) &&
              vaccinationDrivesData?.vaccination_drives?.map(
                (vaccinationDrive: any, vaccinationDriveIdx: any) => (
                  <li key={vaccinationDriveIdx}>
                    <Link
                      href={`/vaccination/${vaccinationDrive._id}?mode=view`}
                      className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="flex min-w-0 flex-1 items-center space-x-3">
                        <span className="block shrink-0">
                          <img
                            alt=""
                            src={generateAvatarFromName(
                              vaccinationDrive.vaccine_name
                            )}
                            className="size-10 rounded-full"
                          />
                        </span>
                        <span className="block min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-gray-900">
                            {vaccinationDrive.vaccine_name}
                          </span>
                          <span className="block truncate text-sm font-medium text-gray-500">
                            {vaccinationDrive.status}
                          </span>
                        </span>
                      </span>
                      <span className="inline-flex size-10 shrink-0 items-center justify-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 text-gray-400 group-hover:text-gray-500"
                        />
                      </span>
                    </Link>
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
      <div className="py-2 px-2 flex justify-center items-center my-10">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={vaccinationDrivesData?.totalPages}
          onChange={setPage}
        />
      </div>
    </div>
  );
}
