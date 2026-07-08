import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { colors } from "../../../config/color";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const bgcolor = useColorModeValue(colors.light.bgImage,colors.dark.bgImage);

  return (
    <Box bgImage={bgcolor} display={"flex"} flexDirection={"column"}>
      {children}
    </Box>
  );
};
export default MainLayout;
