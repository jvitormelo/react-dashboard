import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";

interface Props {
  onUpload: (file: File) => void;
}

export const ImageUploader = ({ onUpload }: Props) => {
  return (
    <Upload.Dragger
      accept="image/*"
      customRequest={(info) => {
        onUpload(info.file as File);
      }}
      showUploadList={false}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
    </Upload.Dragger>
  );
};
