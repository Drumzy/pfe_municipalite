import { Avatar, Group, Image, Text } from "@mantine/core";
import React from "react";
import { vehicule_attachement_mockup } from ".";
import Modall from "./shared/modal";
import PDFView from "./shared/PDFView";
import {VscFilePdf} from "react-icons/vsc";

type Props = {
  vehicules: Array<typeof vehicule_attachement_mockup>;
  
};

export const Attachements: React.FC<Props> = ({ vehicules }) => {
  return (
    <div>
      {vehicules.map((file) => (
        <Group
          sx={{ justifyContent: "space-evenly", alignItems: "center" }}
          my="lg"
          key={file.file_name}
        >
          <React.Fragment>
            {file.type.includes("image") ? (
              <Image
                width={100}
                height={100}
                fit="cover"
                src={
                  "http://localhost:5000/files_api/v1/vehicule/attachements/" +
                  file.file_name
                }
              />
            ) : (
              <VscFilePdf size={36}/>
            )}
            <Text>{file.type}</Text>
            <div>
              {file.type.includes("image") ? (
                <Modall image={file.file_name} />
              ) : (
                <PDFView pdf={file.file_name} />
              )}
            </div>
          </React.Fragment>
        </Group>
      ))}
    </div>
  );
};
