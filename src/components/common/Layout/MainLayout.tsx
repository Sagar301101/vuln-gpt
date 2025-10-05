import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // const bgcolor = useColorModeValue("linear(to-l, #10233B, #011936,#00142C)", "linear(to-l, #7928CA, #FF0080)");
  const bgcolor = useColorModeValue("linear(to-l, #7928CA, #FF0080)", "linear(to-l, #00142C, #011936,#10233B)");

  return (
    <Box bgGradient={bgcolor} display={"flex"} flexDirection={"column"}>
      {children}
    </Box>
  );
};
export default MainLayout;
