"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { modalStore, resetModal } from "@/store/modalSlice";
import { ModalIdList } from "../ModalIdList";
import { CloseButton } from "../../buttons";
import { AddNewStudentForm } from "@/components/forms";
import { useMutation } from "@tanstack/react-query";
import { schoolAdminStore } from "@/store/schoolAdminSlice";
import { useQueryClient } from "@tanstack/react-query";
import { StudentFormValuesType } from "@/types";
import {
  addStudentsInBulkAPI,
  createStudentAPI,
  updateStudentAPI,
} from "@/functions";
import { message } from "antd";
import { useFormik } from "formik";
import { StudentValidationFormSchema } from "@/yup";
import { QUERY_KEY_LIST } from "@/config";
import { ExcelReader } from "@/components/excel";

const initialValues: StudentFormValuesType = {
  name: "",
  mobile_number: "",
  email: "",
  class: "",
};

export default function AddNewStudentModal() {
  const modal = useSelector(modalStore);
  const dispatch = useDispatch();
  const { onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const userInfo = useSelector(schoolAdminStore);
  // local state
  const [studentValues, setStudentValues] =
    useState<StudentFormValuesType>(initialValues);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  useEffect(() => {
    if (modal?.data?.mode === "edit") {
      setStudentValues(modal?.data?.student);
    }
  }, [modal?.data?.mode]);

  // Mutation hook for bulk upload
  const {
    mutate: bulkUploadMutate,
    isError,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: (file: File) => {
      return addStudentsInBulkAPI(file, userInfo?.token);
    },
    onSuccess: (data) => {
      console.log("Products uploaded successfully!");
      message.success("Products uploaded successfully!");
      setUploadFile(null);
      //   invalidate the students query
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_LIST.STUDENTS] });
      //   close the modal
      closeModal(onOpenChange);
    },
    onError: (error: any) => {
      console.error("Bulk upload failed:", error);
      message.error("Bulk upload failed!");
    },
  });

  // Handle file selection
  const handleFileUpload = React.useCallback((file: File) => {
    console.log("FILE BEFORE API CALL==>", file);
    setUploadFile(file);
  }, []);

  // Handle bulk upload when save is clicked
  const handleBulkUpload = React.useCallback(() => {
    if (!uploadFile) {
      message.error("Please select a file first");
      return;
    }
    bulkUploadMutate(uploadFile);
  }, [uploadFile, bulkUploadMutate]);

  const closeModal = (onClose: any) => {
    onClose();
    dispatch(resetModal());
  };

  const { values, handleChange, errors, touched, handleSubmit } = useFormik({
    initialValues: studentValues,
    validationSchema: StudentValidationFormSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: (values) => {
      if (modal?.data?.mode === "edit") {
        const myObj = {
          name: values.name,
          mobile_number: values.mobile_number,
          email: values.email,
          class: values.class,
        };
        updateStudentMutation.mutate({
          id: modal?.data?.student?._id,
          values: myObj,
        });
      } else {
        createStudentMutation.mutate(values);
      }
    },
  });

  const createStudentMutation = useMutation({
    mutationFn: async (values: StudentFormValuesType) => {
      return await createStudentAPI(values, userInfo.token);
    },
    onSuccess: () => {
      message.success("Student added successfully");
      //   invalidate the students query
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_LIST.STUDENTS] });
      //   close the modal
      closeModal(onOpenChange);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to add student");
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: StudentFormValuesType;
    }) => {
      return await updateStudentAPI(id, values, userInfo.token);
    },
    onSuccess: () => {
      message.success("Student updated successfully");
      //   invalidate the students query
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_LIST.STUDENTS] });
      //   close the modal
      closeModal(onOpenChange);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to update student");
    },
  });

  // MAIN JSX
  return (
    <>
      <Modal
        isOpen={modal?.modal_id === ModalIdList.ADD_NEW_STUDENT_MODAL}
        closeButton={<CloseButton />}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Student
                {modal?.data?.type === "bulk" ? "s in Bulk" : "Single"}
              </ModalHeader>
              <ModalBody>
                {modal?.data?.type === "bulk" ? (
                  <ExcelReader onFileUpload={handleFileUpload} />
                ) : (
                  <AddNewStudentForm
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="bordered"
                  onPress={() => {
                    closeModal(onClose);
                  }}
                  className="border-solid border-neutral-light-400"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (modal?.data?.type === "bulk") {
                      handleBulkUpload();
                    } else {
                      handleSubmit();
                    }
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
