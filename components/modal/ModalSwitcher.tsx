// ModalSwitcher.tsx
"use client";
import React from "react";
import { useSelector } from "react-redux";

import { modalStore } from "@/store/modalSlice";
import { ModalIdList } from "./ModalIdList";
import AddNewStudentModal from "./student/AddNewStudentModal";

const ModalSwitcher: React.FC = () => {
  const modal = useSelector(modalStore);

  // Switch statement to render different modals based on the modal ID
  const renderModal = () => {
    switch (modal?.modal_id) {
      case ModalIdList.ADD_NEW_STUDENT_MODAL:
        return <AddNewStudentModal />;

      default:
        return null; // Render nothing if no matching modal
    }
  };

  return <>{renderModal()}</>;
};

export default ModalSwitcher;
