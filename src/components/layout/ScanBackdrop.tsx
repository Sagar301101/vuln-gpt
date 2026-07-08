import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

/** Ambient "live scan" log lines — purely decorative, no interactivity. */
const LOG_LINES: { text: string; color: string }[] = [
  { text: "$ vulnshields scan --target prod", color: "#7BE0A8" },
  { text: "Resolving target... 203.0.113.42", color: "#7C8794" },
  { text: "Probing open ports 22,80,443,8443", color: "#7C8794" },
  { text: "✓ TLS 1.3 negotiated", color: "#67D093" },
  { text: "Checking security headers...", color: "#7C8794" },
  { text: "✗ CSP header missing", color: "#FFA85C" },
  { text: "Fuzzing /api/v1/* endpoints", color: "#7C8794" },
  { text: "Testing auth & session handling", color: "#7C8794" },
  { text: "! SQLi payload flagged on /search", color: "#FF8E8E" },
  { text: "Testing for XSS in form inputs", color: "#7C8794" },
  { text: "✓ Input sanitization OK", color: "#67D093" },
  { text: "Scanning dependencies for CVEs", color: "#7C8794" },
  { text: "! CVE-2024-31337 in lodash@4.17.19", color: "#FF8E8E" },
  { text: "Checking CORS policy...", color: "#7C8794" },
  { text: "✓ CORS scoped correctly", color: "#67D093" },
  { text: "Generating prioritized report", color: "#7C8794" },
  { text: "3 findings · 1 critical · report ready", color: "#9D8CFF" },
];

function TerminalStream({ reverse = false }: { reverse?: boolean }) {
  const lines = reverse ? [...LOG_LINES].reverse() : LOG_LINES;
  return (
    <Box
      position="relative"
      h="100%"
      overflow="hidden"
      sx={{ maskImage: "linear-gradient(180deg,transparent,#000 18%,#000 82%,transparent)" }}
    >
      <MotionBox
        position="absolute"
        top={0}
        left={0}
        right={0}
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((copy) => (
          <Box key={copy} pb="18px">
            {lines.map((l, i) => (
              <Text
                key={`${copy}-${i}`}
                fontFamily="mono"
                fontSize="11.5px"
                lineHeight="2.1"
                color={l.color}
                whiteSpace="nowrap"
                pl="2px"
              >
                {l.text}
              </Text>
            ))}
          </Box>
        ))}
      </MotionBox>
    </Box>
  );
}

const nodes = [
  { x: "8%", y: "18%", r: 0 },
  { x: "16%", y: "62%", r: 0.4 },
  { x: "6%", y: "84%", r: 0.8 },
  { x: "92%", y: "22%", r: 1.2 },
  { x: "88%", y: "58%", r: 0.2 },
  { x: "94%", y: "80%", r: 1.6 },
];
// index of the node that periodically flags as a finding
const CRITICAL_NODE = 3;

function NetworkNodes() {
  return (
    <Box position="absolute" inset={0} pointerEvents="none" display={{ base: "none", md: "block" }}>
      {nodes.map((n, i) => {
        const critical = i === CRITICAL_NODE;
        const color = critical ? "#FF6B6B" : "#2FBF70";
        return (
          <Box key={i} position="absolute" left={n.x} top={n.y}>
            <MotionBox
              position="absolute"
              left="-10px"
              top="-10px"
              w="20px"
              h="20px"
              borderRadius="50%"
              border="1px solid"
              borderColor={color}
              animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: n.r }}
            />
            <Box w="6px" h="6px" borderRadius="50%" bg={color} boxShadow={`0 0 8px ${color}`} />
          </Box>
        );
      })}
    </Box>
  );
}

/**
 * Ambient "live security scan" visual for the hero — a sweeping scan beam,
 * pulsing network nodes and faint auto-scrolling terminal log streams along
 * the edges. Purely decorative (no inputs/buttons) so it doesn't reintroduce
 * an interactive scan demo, just sets the "this site is watching for
 * vulnerabilities" tone.
 */
export function ScanBackdrop() {
  return (
    <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none" zIndex={0}>
      <NetworkNodes />

      {/* sweeping scan beam */}
      <MotionBox
        position="absolute"
        left={0}
        right={0}
        h="140px"
        opacity={0.5}
        background="linear-gradient(180deg,transparent,rgba(47,191,112,0.16) 45%,rgba(47,191,112,0.28) 50%,rgba(47,191,112,0.16) 55%,transparent)"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      {/* ambient terminal log streams, pulled in slightly from the edges (hidden on small screens) */}
      <Box
        position="absolute"
        top="8%"
        bottom="8%"
        left={{ base: "-260px", xl: "3%" }}
        w="240px"
        opacity={0.4}
        filter="blur(0.2px)"
        display={{ base: "none", xl: "block" }}
      >
        <TerminalStream />
      </Box>
      <Box
        position="absolute"
        top="8%"
        bottom="8%"
        right={{ base: "-260px", xl: "3%" }}
        w="240px"
        opacity={0.4}
        filter="blur(0.2px)"
        textAlign="right"
        display={{ base: "none", xl: "block" }}
      >
        <TerminalStream reverse />
      </Box>
    </Box>
  );
}
