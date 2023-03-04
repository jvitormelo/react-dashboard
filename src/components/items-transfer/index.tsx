import { Transfer } from "antd";

export interface ItemTransfer {
  key: string;
  title: string;
  description: string;
}

interface Props {
  titles: [string, string];
  source: ItemTransfer[];
  target: string[];
  setTarget: (target: string[]) => void;
}

// TODO - FIND a folder for this component
export const ItemsTransfer = ({ source, target, titles, setTarget }: Props) => {
  const handleChange = (newTargetKeys: string[]) => {
    setTarget(newTargetKeys);
  };

  const filterOption = (inputValue: string, option: ItemTransfer) =>
    option.description.indexOf(inputValue) > -1;

  return (
    <Transfer
      dataSource={source}
      onChange={handleChange}
      titles={titles}
      showSearch
      filterOption={filterOption}
      targetKeys={target}
      listStyle={{
        width: 250,

        height: 300,
      }}
      render={(item) => (
        <div>
          {item.title} - {item.description}
        </div>
      )}
    />
  );
};
