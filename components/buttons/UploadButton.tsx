import { IconList } from "@/config";

const UploadButton = ({ loading }: { loading: boolean }) => {
  return (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
      className="w-full !h-full flex-center flex-col"
    >
      {loading ? (
        <IconList.CloudArrowUpIcon className="h-8 text-primary-500" />
      ) : (
        <IconList.PlusIcon className="h-8 text-primary-500" />
      )}
      <p style={{ marginTop: 8 }} className="text-primary-500 text-base">
        Upload
      </p>
    </button>
  );
};

export default UploadButton;
