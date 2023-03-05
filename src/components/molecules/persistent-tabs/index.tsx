import {
  PersistentTabsKeys,
  usePersistentTabStore,
} from "@/store/persistent-tab-store";
import { Tabs, TabsProps } from "antd";

type Props = TabsProps & {
  tabStoreKey: PersistentTabsKeys;
};

export const PersistentTabs = ({ tabStoreKey, ...props }: Props) => {
  const { onTabChange, keys } = usePersistentTabStore();

  return (
    <Tabs
      defaultActiveKey={keys && keys[tabStoreKey]}
      onChange={(activeKey) => {
        props.onChange && props.onChange(activeKey);
        onTabChange(tabStoreKey, activeKey);
      }}
      {...props}
    />
  );
};
