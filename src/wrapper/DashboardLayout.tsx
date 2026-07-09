import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { X } from "lucide-react";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { TopBar } from "@/components/dashboard/TopBar";

const SIDEBAR_W = "260px";

export function DashboardLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" bg="bg">
      {/* fixed sidebar (lg+) */}
      <Box
        as="aside"
        display={{ base: "none", lg: "block" }}
        position="fixed"
        top={0}
        left={0}
        w={SIDEBAR_W}
        h="100vh"
        bg="surfaceAlt"
        borderRight="1px solid"
        borderColor="wa.7"
        zIndex={30}
      >
        <SidebarNav />
      </Box>

      {/* mobile drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay backdropFilter="blur(6px)" />
        <DrawerContent bg="surfaceAlt" maxW={SIDEBAR_W}>
          <Flex
            justify="flex-end"
            position="absolute"
            top="18px"
            right="14px"
            zIndex={2}
          >
            <IconButton
              aria-label="Close navigation"
              icon={<X size={20} />}
              variant="ghost"
              color="white"
              size="sm"
              onClick={onClose}
              _hover={{ bg: "wa.5" }}
            />
          </Flex>
          <SidebarNav onNavigate={onClose} />
        </DrawerContent>
      </Drawer>

      {/* main column */}
      <Flex
        direction="column"
        flex="1"
        minW={0}
        ml={{ base: 0, lg: SIDEBAR_W }}
      >
        <TopBar onOpenSidebar={onOpen} />
        <Box as="main" flex="1">
          <Box
            maxW="1280px"
            mx="auto"
            w="100%"
            p={{ base: "20px", md: "32px" }}
          >
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default DashboardLayout;
