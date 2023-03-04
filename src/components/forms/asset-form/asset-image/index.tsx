import { ImageUploader } from "@/components/upload/image-uploader";
import { useTheme } from "@/hooks/use-theme";
import { imageUtils } from "@/utils";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Image, Space } from "antd";
import { useState } from "react";

export interface AssetImageForm {
  image?: string;
  saveImage: (file: File) => Promise<boolean>;
}

export const AssetImageForm = ({ image, saveImage }: AssetImageForm) => {
  const { theme } = useTheme();

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
          style={{
            justifyContent: "center",
            width: "100%",
          }}
          align="center"
          direction="vertical"
        >
          <Button
            loading={loading}
            onClick={() => saveImageHandler(uploadedFIle)}
            type="primary"
            size="large"
          >
            Save Image!
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
      {uploadedFIle && (
        <Button
          danger
          color={theme.colorError}
          onClick={cancelUpload}
          style={{
            display: "flex",
            marginLeft: "auto",
          }}
        >
          <CloseCircleOutlined
            style={{
              fontSize: 20,
            }}
          />
        </Button>
      )}

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
