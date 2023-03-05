import { Avatar, AvatarProps } from "antd";

interface Props extends AvatarProps {
  email: string;
}

export const generateAvatarUrl = (email: string) =>
  `https://i.pravatar.cc/300?u=${email}`;

export const UserAvatar = ({ email, ...props }: Props) => {
  return <Avatar {...props} src={generateAvatarUrl(email)} />;
};
