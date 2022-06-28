import { Button, Group, Modal } from "@mantine/core";
import React, { useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { themePlugin } from "@react-pdf-viewer/theme";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PDFView = (props: { pdf: any }) => {
  const [opened, setOpened] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const themePluginInstance = themePlugin();
  return (
    <>
      <Modal size="70%" opened={opened} onClose={() => setOpened(false)}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
          <Viewer
            plugins={[defaultLayoutPluginInstance]}
            fileUrl={`http://localhost:5000/files_api/v1/vehicule/attachements/${props.pdf}`}
          />
        </Worker>
      </Modal>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>View</Button>
      </Group>
    </>
  );
};
export default PDFView;
