import React from 'react'
import { Box } from "@chakra-ui/react";


const ScanLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <Box
        px={{
          base: 4,
          md: 6,
          lg:20,
          xl: 48,
        }}
      >
        {children}
      </Box>
    );
  };

export default ScanLayout
