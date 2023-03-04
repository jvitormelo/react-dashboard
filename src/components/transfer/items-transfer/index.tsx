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
  render: (item: ItemTransfer) => React.ReactElement;
}

// TODO - FIND a folder for this component
export const ItemsTransfer = ({
  source,
  target,
  titles,
  setTarget,
  render,
}: Props) => {
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
        width: 270,
        height: 300,
      }}
      render={render}
    />
  );
};
