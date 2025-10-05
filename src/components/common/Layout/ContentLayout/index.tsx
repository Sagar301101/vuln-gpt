import { Box } from "@chakra-ui/react";

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      px={{
        base: 4,
        sm: 6,
        md: 10,
        lg: 20,
      }}
    >
      {children}
    </Box>
  );
};
export default ContentLayout;
