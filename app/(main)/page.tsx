"use client";

import { useQuery } from "@tanstack/react-query";
import { getPageStatsAPI } from "@/functions";
import { useSelector } from "react-redux";
import { schoolAdminStore } from "@/store/schoolAdminSlice";
import { QUERY_KEY_LIST } from "@/config";
import { Card, CardBody } from "@heroui/react";
import {
  UserGroupIcon,
  CheckCircleIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import { Empty, Spin } from "antd";

export default function HomePage() {
  const adminUser = useSelector(schoolAdminStore);

  const { data: pageStats, isLoading } = useQuery({
    queryKey: [QUERY_KEY_LIST.GET_PAGE_STATS],
    queryFn: () => getPageStatsAPI(adminUser?.token),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (!pageStats) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Empty description="No data available" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          School Vaccination Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {`Welcome back! Here's an overview of your school's vaccination status
          and upcoming drives.`}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-md">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {pageStats.totalStudents}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white shadow-md">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Vaccinated Students
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {pageStats.vaccinatedStudents}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white shadow-md">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Vaccination Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {pageStats.vaccinationPercentage}%
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Vaccination Progress */}
      <Card className="bg-white shadow-md">
        <CardBody className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Vaccination Progress
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${pageStats.vaccinationPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {pageStats.vaccinatedStudents} out of {pageStats.totalStudents}{" "}
            students vaccinated
          </p>
        </CardBody>
      </Card>

      {/* Upcoming Drives */}
      <Card className="bg-white shadow-md">
        <CardBody className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Vaccination Drives
          </h2>
          {pageStats.upcomingDrives.length === 0 ? (
            <Empty description="No upcoming drives scheduled" />
          ) : (
            <div className="space-y-4">
              {pageStats.upcomingDrives.map((drive: any) => (
                <div
                  key={drive._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-50 rounded-full">
                      <CalendarIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {drive.vaccine_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {moment(drive.drive_date).format("MMMM D, YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {drive.available_doses} doses
                      </p>
                      <p className="text-xs text-gray-600">
                        {drive.applicable_classes.length} classes
                      </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                      {drive.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
