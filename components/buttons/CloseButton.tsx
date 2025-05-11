"use client";
import { CloseIcon } from "@/icons";
import { resetModal } from "@/store/modalSlice";
import { Button } from "@heroui/react";
import React from "react";
import { useDispatch } from "react-redux";

export default function CloseButton() {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(resetModal());
  };
  return (
    <Button
      size="sm"
      isIconOnly
      onPress={closeModal}
      className="absolute right-2 top-2"
    >
      <CloseIcon />
    </Button>
  );
}
