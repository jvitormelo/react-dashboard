import { CloseIcon } from "@/components/icons/button-icons/close-icon";
import { ImageUploader } from "@/components/upload/image-uploader";
import { imageUtils } from "@/utils";
import { Button, Image, Space } from "antd";
import { useState } from "react";

export interface AssetImageForm {
  image?: string;
  saveImage: (file: File) => Promise<boolean>;
  buttonLabel?: string;
}

export const AssetImageForm = ({
  image,
  saveImage,
  buttonLabel,
}: AssetImageForm) => {
  const [imageClone, setImageClone] = useState(image);

  const [loading, setLoading] = useState(false);

  const [uploadedFIle, setUploadedFile] = useState<File | null>();

  const onUpload = (file: File) => {
    setUploadedFile(file);
    setImageClone(imageUtils.createObjectURL(file));
  };

  const saveImageHandler = async (fileValue: File) => {
    try {
      setLoading(true);

      const url = imageUtils.createObjectURL(fileValue);

      setImageClone(url);

      const uploadSuccessfully = await saveImage(fileValue);

      if (uploadSuccessfully) {
        setUploadedFile(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelUpload = () => {
    setUploadedFile(null);
    setImageClone(image);
  };

  const Content = () => {
    if (uploadedFIle) {
      return (
        <Space
          align="end"
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <CloseIcon onClick={cancelUpload} />

          <Button
            loading={loading}
            onClick={() => saveImageHandler(uploadedFIle)}
            type="primary"
            size="large"
          >
            {buttonLabel || "Save Image"}
          </Button>
        </Space>
      );
    }

    return <ImageUploader onUpload={onUpload} />;
  };

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        justifyContent: "center",
        width: "100%",
      }}
    >
      {imageClone && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image height={400} src={imageClone} alt="Asset" />
        </div>
      )}

      <Content />
    </Space>
  );
};
