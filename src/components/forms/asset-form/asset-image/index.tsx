import { Image, Upload } from "antd";

interface Props {
  image?: string;
}

export const AssetImageForm = ({ image }: Props) => {
  return (
    <div>
      <Image height={400} src={image} alt="Asset" />

      <Upload />
    </div>
  );
};
