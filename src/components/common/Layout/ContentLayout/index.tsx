import { Box, useColorModeValue } from "@chakra-ui/react";
import { colors } from "../../../../config/color";
import { CSSProperties } from "react";

const ContentLayout = ({ children ,style}: { children: React.ReactNode,style?:CSSProperties }) => {
  return (
    <Box
      px={{
        base: 4,
        sm: 6,
        md: 10,
        lg: 20,
      }}
      bg={useColorModeValue(colors?.light.globalBg,colors?.dark.globalBg)}
      style={style}
    >
      {children}
    </Box>
  );
};
export default ContentLayout;
