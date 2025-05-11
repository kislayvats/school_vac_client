"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Select, Button, Form, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePickerInput, TextInput } from "@/components/input";
import { parseDateSafe } from "@/config/utils";
import { VaccinationDriveStatusEnum } from "@/config/enum";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createVaccinationDriveAPI,
  getVaccinationDriveByIdAPI,
  updateVaccinationDriveAPI,
} from "@/functions";
import { useSelector } from "react-redux";
import { schoolAdminStore } from "@/store/schoolAdminSlice";
import { useSearchParams } from "next/navigation";
import { QUERY_KEY_LIST } from "@/config";
import { useRouter } from "next/navigation";

const minDriveDate = today(getLocalTimeZone()).add({ days: 15 });

const initialValues: any = {
  vaccine_name: "",
  drive_date: "",
  available_doses: 0,
  applicable_classes: [],
  status: "SCHEDULED",
};

const classOptions = [
  "1A",
  "1B",
  "2A",
  "3A",
  "3B",
  "3C",
  "4A",
  "4C",
  "5A",
  "5B",
  "6A",
  "6B",
  "6C",
  "7A",
  "8A",
  "8C",
  "9A",
  "9B",
  "10A",
  "10B",
  "10C",
  "11A",
  "11C",
  "12A",
  "12B",
].map((cls) => ({ label: cls, value: cls }));

const statusOptions = [
  { label: "SCHEDULED", value: VaccinationDriveStatusEnum.SCHEDULED },
  { label: "COMPLETED", value: VaccinationDriveStatusEnum.COMPLETED },
  { label: "CANCELLED", value: VaccinationDriveStatusEnum.CANCELLED },
];

const VaccinationDriveValidationSchema = Yup.object().shape({
  vaccine_name: Yup.string().required("Vaccine name is required"),
  drive_date: Yup.date().required("Drive date is required"),
  available_doses: Yup.number()
    .min(0, "Doses must be 0 or more")
    .required("Available doses required"),
  applicable_classes: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one class")
    .required("Applicable classes required"),
  status: Yup.string().required("Status is required"),
});

export default function AddVaccinationDriveForm() {
  const adminUser = useSelector(schoolAdminStore);
  const searchParams = useSearchParams();
  const vacId = searchParams.get("vacId");
  const mode = searchParams.get("mode");
  const router = useRouter();
  //   local state
  const [formikValues, setFormikValues] = useState(initialValues);

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: formikValues,
    validationSchema: VaccinationDriveValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      if (mode === "edit") {
        const myObj = {
          vaccine_name: values.vaccine_name,
          drive_date: values.drive_date,
          available_doses: values.available_doses,
          applicable_classes: values.applicable_classes,
          status: values.status,
        };
        updateVaccinationDriveMutation(myObj);
      } else {
        createVaccinationDriveMutation(values);
      }
    },
  });

  const {
    mutate: createVaccinationDriveMutation,
    isPending: isCreatingVaccinationDrive,
  } = useMutation({
    mutationFn: (data: any) =>
      createVaccinationDriveAPI(data, adminUser?.token),
    onSuccess: (data) => {
      console.log(data);
      message.success("Vaccination drive created successfully");
      router.push(`/vaccination/all`);
    },
    onError: (error) => {
      console.log(error);
      message.error("Vaccination drive creation failed");
    },
  });

  const {
    mutate: updateVaccinationDriveMutation,
    isPending: isUpdatingVaccinationDrive,
  } = useMutation({
    mutationFn: (data: any) =>
      updateVaccinationDriveAPI(data, vacId ?? "", adminUser?.token),
    onSuccess: (data) => {
      console.log(data);
      message.success("Vaccination drive updated successfully");
      router.push(`/vaccination/${vacId}?mode=view`);
    },
    onError: (error) => {
      console.log(error);
      message.error("Vaccination drive update failed");
    },
  });

  const { data: vaccinationDriveData } = useQuery({
    queryKey: [QUERY_KEY_LIST.GET_SINGLE_VACCINATION_DRIVE, vacId],
    queryFn: () =>
      getVaccinationDriveByIdAPI(vacId ?? "", 1, 10, "all", adminUser?.token),
    enabled: !!vacId,
  });

  useEffect(() => {
    if (vaccinationDriveData) {
      console.log("vaccinationDriveData", vaccinationDriveData);
      const formattedData = {
        ...vaccinationDriveData?.vaccination_drive,
        drive_date: vaccinationDriveData?.vaccination_drive?.drive_date
          ? new Date(vaccinationDriveData?.vaccination_drive?.drive_date)
              .toISOString()
              .split("T")[0]
          : "",
      };
      setFormikValues(formattedData);
    }
  }, [vaccinationDriveData]);

  // MAIN JSX
  return (
    <div>
      <h2 className="font-bold text-[#586782] mb-4 text-card-title-clamp">
        Add Vaccination Drive
      </h2>
      <div className="p-4 border rounded-xl bg-white">
        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <TextInput
                label="Vaccine Name"
                name="vaccine_name"
                value={values.vaccine_name}
                onChange={handleChange}
                errors={errors}
                touched={touched}
                fullWidth
              />
            </Col>
            <Col xs={24} md={12}>
              <TextInput
                label="Available Doses"
                name="available_doses"
                type="number"
                numericValue={values.available_doses}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  handleChange({
                    target: {
                      name: "available_doses",
                      value: value ? parseInt(value) : "",
                    },
                  });
                }}
                errors={errors}
                touched={touched}
                fullWidth
              />
            </Col>

            <Col xs={24} md={12}>
              <label>Applicable Classes</label>
              <Select
                mode="multiple"
                allowClear
                placeholder="Select classes"
                style={{ width: "100%" }}
                value={values.applicable_classes}
                onChange={(val) => setFieldValue("applicable_classes", val)}
                options={classOptions}
              />
              {touched.applicable_classes && errors.applicable_classes && (
                <div style={{ color: "red", marginTop: 4 }}>
                  {errors.applicable_classes as string}
                </div>
              )}
            </Col>

            <Col xs={24} md={12}>
              <label>Status</label>
              <Select
                placeholder="Select status"
                style={{ width: "100%" }}
                value={values.status}
                onChange={(val) => setFieldValue("status", val)}
                options={statusOptions}
              />
              {touched.status && errors.status && (
                <div style={{ color: "red", marginTop: 4 }}>
                  {errors.status as string}
                </div>
              )}
            </Col>
            <Col xs={24} md={12}>
              <label className="block mb-2">Drive Date</label>
              <input
                type="date"
                name="drive_date"
                value={values.drive_date}
                min={
                  new Date(new Date().setDate(new Date().getDate() + 15))
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "drive_date",
                      value: e.target.value,
                    },
                  })
                }
                className="w-full p-2 border rounded-md"
              />
              {touched.drive_date && errors.drive_date && (
                <div className="text-red-500 mt-1">
                  {errors.drive_date as string}
                </div>
              )}
            </Col>

            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                block
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
