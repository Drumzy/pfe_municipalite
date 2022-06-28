import { useState } from "react";
import { Modal, Button, Group, Image, AspectRatio } from "@mantine/core";

const Modall = (props: { image: string | number }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        size="70%"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        {
          <AspectRatio ratio={1920/1080}>
          <Image
            src={`http://localhost:5000/files_api/v1/vehicule/attachements/${props.image}`}
          />
          </AspectRatio>
        }
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>View</Button>
      </Group>
    </>
  );
};
export default Modall;
