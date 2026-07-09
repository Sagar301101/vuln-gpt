import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { useDemoModal } from "@/context/DemoModalContext";
import { gradients } from "@/theme";

const MotionBox = motion(Box);

/** Animated radar-style motif: rotating scan sweep + pulsing rings around a
 * shield core — replaces the plain static concentric circles. */
function RadarMotif() {
  return (
    <Box
      position="absolute"
      right="40px"
      top="50%"
      transform="translateY(-50%)"
      w="340px"
      h="340px"
      display={{ base: "none", md: "block" }}
      pointerEvents="none"
    >
      {/* static rings */}
      <Box
        position="absolute"
        inset={0}
        borderRadius="50%"
        border="2.5px solid rgba(255,255,255,0.35)"
      />
      {[0.76, 0.52, 0.28].map((scale) => (
        <Box
          key={scale}
          position="absolute"
          inset={0}
          m="auto"
          w={`${scale * 100}%`}
          h={`${scale * 100}%`}
          borderRadius="50%"
          border="2.5px solid rgba(255,255,255,0.35)"
        />
      ))}

      {/* rotating scan sweep, clipped to the circle */}
      <Box position="absolute" inset={0} borderRadius="50%" overflow="hidden">
        <MotionBox
          position="absolute"
          inset="-20%"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.35) 26deg, transparent 60deg)",
          }}
        />
      </Box>

      {/* pulsing rings from the core */}
      {[0, 1.3].map((delay) => (
        <MotionBox
          key={delay}
          position="absolute"
          inset={0}
          m="auto"
          w="56px"
          h="56px"
          borderRadius="50%"
          border="2.5px solid rgba(255,255,255,0.45)"
          animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay }}
        />
      ))}

      {/* detected "blips" on the rings */}
      {[
        { top: "10%", left: "68%", delay: 0 },
        { top: "72%", left: "82%", delay: 0.8 },
        { top: "80%", left: "30%", delay: 1.6 },
        { top: "28%", left: "12%", delay: 2.2 },
      ].map((blip, i) => (
        <Box key={i} position="absolute" top={blip.top} left={blip.left}>
          <MotionBox
            position="absolute"
            inset="-8px"
            borderRadius="50%"
            bg="#2FBF70"
            animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: blip.delay }}
          />
          <Box w="8px" h="8px" borderRadius="50%" bg="#2FBF70" boxShadow="0 0 8px #2FBF70" />
        </Box>
      ))}

      {/* shield core */}
      <Box
        position="absolute"
        inset={0}
        m="auto"
        w="56px"
        h="56px"
        borderRadius="50%"
        bg="#2FBF70"
        boxShadow="0 8px 22px rgba(0,0,0,0.3)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ShieldCheck size={24} color="white" strokeWidth={2} />
      </Box>
    </Box>
  );
}

export function CtaBand() {
  const { openDemoModal } = useDemoModal();
  return (
    <Section id="cta" py={{ base: "40px", md: "40px" }} pb={{ base: "64px", md: "96px" }}>
      <Reveal>
        <Box position="relative" borderRadius="28px" overflow="hidden" p={{ base: "40px", md: "64px" }} px={{ base: "28px", md: "60px" }} sx={{ background: gradients.cta }}>
          <RadarMotif />

          <Box position="relative" maxW="560px">
            <Text fontSize="16px" color="rgba(255,255,255,0.85)" mb="14px">
              Want to know more about us?
            </Text>
            <Heading as="h2" fontWeight={800} fontSize={{ base: "32px", md: "48px" }} lineHeight="1.05" color="white" mb="30px">
              Feel free to schedule your free demo
            </Heading>
            <Button
              onClick={() => openDemoModal()}
              h="56px"
              px="30px"
              borderRadius="14px"
              bg="#0A0A0E"
              color="white"
              fontWeight={700}
              fontSize="15px"
              letterSpacing="0.5px"
              rightIcon={<ArrowRight size={17} />}
              _hover={{ bg: "#16161C" }}
            >
              Schedule a free demo call
            </Button>
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
