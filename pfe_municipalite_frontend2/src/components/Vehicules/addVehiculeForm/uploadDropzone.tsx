import { Group, MantineTheme, Text } from "@mantine/core";
import { DropzoneStatus } from "@mantine/dropzone";
import React from "react";
import { IconType } from "react-icons";
import { ImImage, ImCross, ImUpload } from "react-icons/im";
function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<IconType> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <ImUpload {...props} />;
  }

  if (status.rejected) {
    return <ImCross {...props} />;
  }

  return <ImImage {...props} />;
}

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme
) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 100, pointerEvents: "none" }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />
    <div>
      <Text
        size="xl"
        inline
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        })}
      >
        Faites glisser des images ici ou cliquez pour sélectionner des fichiers
      </Text>
    </div>
  </Group>
);
