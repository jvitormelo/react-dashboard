import { Steps } from "antd";

export const CreateAssetForm = () => {
  return (
    <div>
      <Steps
        current={1}
        items={[
          {
            title: "Asset info",
          },
          {
            title: "Image",
          },
          {
            title: "Users",
          },
        ]}
      />
    </div>
  );
};
