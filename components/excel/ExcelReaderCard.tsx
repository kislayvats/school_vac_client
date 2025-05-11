"use client";
import React, { useState } from "react";

import { IconOnlyButton } from "@/components/buttons";
import Dragger from "antd/es/upload/Dragger";
import { IconList } from "@/config/IconList";

type FileUploaderProps = {
  onFileUpload: (data: any) => void;
};

const ExcelReader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  // local state
  const [fileData, setFileData] = useState<any[]>([]); //the parsed data from the excel is stored in this
  const [fileName, setFileName] = useState<string>(""); // the name of the file is stored separately for the UI perspective

  // when clicked on upload section or file is dragged to that section
  // this function runs
  // Function to handle file upload
  const handleFileUpload = (file: any) => {
    // Check if no file is selected
    if (!file) {
      return; // Return nothing if no file is selected
    }

    setFileName(file?.name);

    // Initialize FileReader to read file content
    const reader = new FileReader();
    onFileUpload(file);
  };

  //remove the file that was previously uploaded
  const handleRemove = () => {
    if (window.confirm("Are you sure you want to remove this file?")) {
      //re-initialize the state
      setFileData([]);
      setFileName("");
    }
  };

  // JSX
  return (
    <>
      <Dragger
        className="w-full h-[30vh]"
        customRequest={(e: any) => handleFileUpload(e.file)} // Pass e.file to handleFileUpload
        accept=".xlsx, .csv"
        showUploadList={false}
      >
        <p className="ant-upload-drag-icon">
          <IconList.InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single upload. Strictly prohibited from uploading
          company data or other banned files.
        </p>
        <p>Supported files are .xlsx, .csv</p>
      </Dragger>

      {/* if any file is uploaded that means fileData will have at least one element, in that case display the already uploaded files (presently only one) */}
      {fileName && (
        <div className="flex-start gap-3 h-20 w-full px-3">
          <IconList.PaperClipIcon className="h-4 text-brand-purple" />
          <p className="flex-1 text-black"> {fileName} </p>
          <IconOnlyButton
            Icon={IconList.TrashIcon}
            iconClass="h-4 text-red-400"
            variant="light"
            onPress={handleRemove}
          />
        </div>
      )}
    </>
  );
};

export default ExcelReader;
