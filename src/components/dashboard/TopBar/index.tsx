import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { Bell, Menu, Plus, Search } from "lucide-react";
import { GradientAvatar } from "@/components/dashboard/primitives";
import { gradients } from "@/theme";

export function TopBar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <Flex
      as="header"
      position="sticky"
      top={0}
      zIndex={20}
      h="72px"
      align="center"
      gap="14px"
      px={{ base: "16px", md: "28px" }}
      bg="rgba(8,8,11,0.78)"
      backdropFilter="blur(14px)"
      borderBottom="1px solid"
      borderColor="wa.7"
    >
      <IconButton
        aria-label="Open navigation"
        icon={<Menu size={22} />}
        variant="ghost"
        color="white"
        display={{ base: "inline-flex", lg: "none" }}
        onClick={onOpenSidebar}
        _hover={{ bg: "wa.5" }}
      />

      <InputGroup maxW="380px" display={{ base: "none", md: "flex" }}>
        <InputLeftElement pointerEvents="none" h="42px">
          <Search size={17} color="rgba(255,255,255,0.4)" />
        </InputLeftElement>
        <Input
          placeholder="Search targets, scans, findings…"
          h="42px"
          bg="inputBg"
          border="1px solid"
          borderColor="wa.8"
          borderRadius="11px"
          fontSize="14px"
          _placeholder={{ color: "wa.40" }}
          _hover={{ borderColor: "wa.12" }}
          _focus={{
            borderColor: "rgba(123,108,246,0.6)",
            boxShadow: "0 0 0 1px rgba(123,108,246,0.4)",
          }}
        />
      </InputGroup>

      <Flex align="center" gap={{ base: "8px", md: "12px" }} ml="auto">
        <Button
          leftIcon={<Plus size={16} />}
          h="42px"
          px="18px"
          fontSize="13.5px"
          fontWeight={700}
          color="white"
          borderRadius="pill"
          sx={{ background: gradients.brand }}
          boxShadow="0 10px 26px rgba(123,108,246,0.32)"
          _hover={{ filter: "brightness(1.06)" }}
          _active={{ filter: "brightness(0.96)" }}
        >
          <Text as="span" display={{ base: "none", sm: "inline" }}>
            New scan
          </Text>
          <Text as="span" display={{ base: "inline", sm: "none" }}>
            Scan
          </Text>
        </Button>

        <IconButton
          aria-label="Notifications"
          icon={
            <Box position="relative">
              <Bell size={19} />
              <Box
                position="absolute"
                top="-1px"
                right="-1px"
                w="7px"
                h="7px"
                borderRadius="pill"
                bg="severity.criticalText"
                border="1.5px solid"
                borderColor="bg"
              />
            </Box>
          }
          variant="ghost"
          color="wa.72"
          borderRadius="11px"
          _hover={{ bg: "wa.5", color: "white" }}
        />

        <Flex align="center" gap="10px" pl={{ base: 0, md: "4px" }}>
          <GradientAvatar initials="SK" size="38px" />
          <Box display={{ base: "none", lg: "block" }} lineHeight="1.2">
            <Text fontSize="13.5px" fontWeight={600}>
              John K.
            </Text>
            <Text fontSize="11.5px" color="wa.45">
              Owner
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
