import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/data/site";
import { useDemoModal } from "@/hooks/useDemoModal";
import { useHeroVisible } from "@/hooks/useHeroVisible";
import { gradients, layout } from "@/theme";

const MotionButton = motion(Button);

export function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { openDemoModal } = useDemoModal();
  const heroVisible = useHeroVisible();

  return (
    <Box
      as="header"
      position="relative"
      backdropFilter="blur(14px)"
      bg="rgba(8,8,11,0.72)"
      borderBottom="1px solid"
      borderColor="rgba(255,255,255,0.07)"
      transition="all .3s ease"
    >
      {/* Logo pinned to the start, everything else (links, CTA, menu icon) pinned
          together to the end — keeps the links from reflowing when the CTA
          mounts/unmounts on scroll. */}
      <Flex
        as="nav"
        maxW={layout.maxW}
        mx="auto"
        h="72px"
        px={layout.px}
        align="center"
        justify="space-between"
        gap="24px"
        transition="all .3s ease"
      >
        <Logo />

        <HStack spacing={{ base: "16px", md: "36px" }} transition="all .3s ease">
          <HStack spacing="6px" display={{ base: "none", lg: "flex" }}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                as={RouterLink}
                to={l.to}
                fontSize="14px"
                fontWeight={500}
                color="wa.72"
                px="14px"
                py="8px"
                borderRadius="pill"
                transition="all .2s ease"
                _hover={{ color: "white", bg: "rgba(47,191,112,0.12)" }}
                style={{
                  textTransform: "uppercase",
                }}
              >
                {l.label}
              </Link>
            ))}
          </HStack>

          <AnimatePresence initial={false}>
            {!heroVisible && (
              <MotionButton
                key="nav-demo-cta"
                onClick={() => openDemoModal()}
                variant="brand"
                h="38px"
                px="16px"
                display={{ base: "none", md: "inline-flex" }}
                alignItems="center"
                justifyContent="center"
                fontSize="13px"
                fontWeight={700}
                letterSpacing="0.5px"
                lineHeight="1"
                whiteSpace="nowrap"
                rightIcon={<ArrowRight size={15} />}
                sx={{ background: gradients.brand }}
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                BOOK A FREE DEMO
              </MotionButton>
            )}
          </AnimatePresence>

          <IconButton
            aria-label="Open menu"
            icon={<Menu size={22} />}
            variant="ghost"
            color="white"
            display={{ base: "inline-flex", lg: "none" }}
            onClick={onOpen}
            _hover={{ bg: "wa.5" }}
          />
        </HStack>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay backdropFilter="blur(6px)" />
        <DrawerContent bg="surface" borderLeft="1px solid" borderColor="wa.8">
          <Flex justify="space-between" align="center" p="20px">
            <Logo  />
            <IconButton
              aria-label="Close menu"
              icon={<X size={22} />}
              variant="ghost"
              color="white"
              onClick={onClose}
              _hover={{ bg: "wa.5" }}
            />
          </Flex>
          <DrawerBody>
            <Stack spacing="4px">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  as={RouterLink}
                  to={l.to}
                  onClick={onClose}
                  fontSize="17px"
                  fontWeight={500}
                  color="wa.82"
                  py="12px"
                  borderBottom="1px solid"
                  borderColor="wa.5"
                  _hover={{ color: "white" }}
                >
                  {l.label}
                </Link>
              ))}
              <Button
                onClick={() => {
                  onClose();
                  openDemoModal();
                }}
                variant="brand"
                mt="20px"
                h="50px"
                rightIcon={<ArrowRight size={16} />}
                sx={{ background: gradients.brand }}
              >
                Book a free demo
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
