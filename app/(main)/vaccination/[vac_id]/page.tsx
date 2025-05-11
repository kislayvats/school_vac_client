"use client";

import { QUERY_KEY_LIST } from "@/config";
import {
  getVaccinationDriveByIdAPI,
  updateVaccinationDriveStatusForStudentAPI,
} from "@/functions";
import { schoolAdminStore } from "@/store/schoolAdminSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Spinner,
  Pagination,
  Select,
  SelectItem,
} from "@heroui/react";
import moment from "moment";
import { Empty, message } from "antd";
import { IconList } from "@/config";
import { IconOnlyButton } from "@/components/buttons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page({
  params,
}: {
  params: {
    vac_id: string;
  };
}) {
  const { vac_id } = params;
  const adminUser = useSelector(schoolAdminStore);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("all");

  const { data: vaccinationDrive, isLoading } = useQuery({
    queryKey: [
      QUERY_KEY_LIST.GET_SINGLE_VACCINATION_DRIVE,
      vac_id,
      page,
      limit,
      status,
    ],
    queryFn: () =>
      getVaccinationDriveByIdAPI(vac_id, page, limit, status, adminUser.token),
    enabled: !!vac_id,
  });

  const handleMarkVaccinated = async (studentId: string) => {
    // TODO: Implement API call to mark student as vaccinated
    console.log("Mark vaccinated for student:", studentId);
  };

  const { mutate: updateStatusMutation, isPending: isUpdating } = useMutation({
    mutationFn: (values: any) =>
      updateVaccinationDriveStatusForStudentAPI(values, adminUser.token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_LIST.GET_SINGLE_VACCINATION_DRIVE],
      });
      message.success("Status updated successfully");
    },
    onError: (error: any) => {
      console.log(error);
      message.error("Failed to update status");
    },
  });

  const getVaccinationStats = () => {
    const totalEligible = vaccinationDrive?.students?.length || 0;
    const vaccinatedCount =
      vaccinationDrive?.students?.filter((student: any) =>
        student.vaccination_drives.includes(
          vaccinationDrive?.vaccination_drive?._id
        )
      ).length || 0;
    return { totalEligible, vaccinatedCount };
  };

  const stats = getVaccinationStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Vaccination Drive Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Vaccination Drive Details
          </h2>
          <IconOnlyButton
            Icon={IconList.PencilSquareIcon}
            iconClass="h-5 w-5 text-primary"
            variant="light"
            onPress={() =>
              router.push(`/vaccination/create?vacId=${vac_id}&mode=edit`)
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Vaccine Name</p>
            <p className="text-lg font-semibold">
              {vaccinationDrive?.vaccination_drive?.vaccine_name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Drive Date</p>
            <p className="text-lg font-semibold">
              {moment(vaccinationDrive?.vaccination_drive?.drive_date).format(
                "MMMM D, YYYY"
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Available Doses</p>
            <p className="text-lg font-semibold">
              {vaccinationDrive?.vaccination_drive?.available_doses}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <Chip
              color={
                vaccinationDrive?.vaccination_drive?.status === "scheduled"
                  ? "warning"
                  : "success"
              }
              variant="flat"
            >
              {vaccinationDrive?.vaccination_drive?.status}
            </Chip>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Applicable Classes</p>
            <div className="flex gap-2 mt-1">
              {vaccinationDrive?.vaccination_drive?.applicable_classes.map(
                (className: string) => (
                  <Chip key={className} variant="flat" color="primary">
                    {className}
                  </Chip>
                )
              )}
            </div>
          </div>
          <div className="md:col-span-2 mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Eligible Students</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalEligible}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Students Vaccinated</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.vaccinatedCount}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {(
                    (stats.vaccinatedCount / stats.totalEligible) *
                    100
                  ).toFixed(1)}
                  % completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Eligible Students
          </h2>
          <Select
            className="max-w-xs"
            selectedKeys={[status]}
            onChange={(e) => setStatus(e.target.value)}
            size="sm"
          >
            <SelectItem key="all">All Students</SelectItem>
            <SelectItem key="completed">Completed</SelectItem>
            <SelectItem key="scheduled">Scheduled</SelectItem>
          </Select>
        </div>
        <Table aria-label="Eligible students table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Student ID</TableColumn>
            <TableColumn>Class</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Mobile</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {vaccinationDrive?.students?.map((student: any) => {
              const isVaccinated = student.vaccination_drives.includes(
                vaccinationDrive?.vaccination_drive?._id
              );
              return (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.mobile_number}</TableCell>
                  <TableCell>
                    <Chip
                      color={isVaccinated ? "success" : "warning"}
                      variant="flat"
                    >
                      {isVaccinated ? "Vaccinated" : "Not Vaccinated"}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {!isVaccinated ? (
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        className="border border-primary"
                        onPress={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to mark this student as vaccinated?"
                            )
                          ) {
                            updateStatusMutation({
                              student_id: student._id,
                              vaccination_drive_id: vac_id,
                            });
                          }
                        }}
                        isLoading={isUpdating}
                        isDisabled={isUpdating}
                      >
                        Mark Vaccinated
                      </Button>
                    ) : (
                      "--"
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            {vaccinationDrive?.students?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  <Empty description="No students found" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="py-2 px-2 flex justify-center items-center mt-4">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={vaccinationDrive?.totalPages}
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
