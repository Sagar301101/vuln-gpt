import { Box, chakra, Flex, Text } from "@chakra-ui/react";

// severity-over-time (last 12 periods) — two series
const TREND_TOTAL = [42, 48, 39, 55, 61, 52, 68, 60, 74, 66, 81, 72];
const TREND_CRIT = [4, 6, 3, 7, 9, 5, 8, 6, 11, 8, 12, 9];
const TREND_LABELS = ["", "", "", "", "", "", "", "", "", "", "", "Now"];

function buildPath(
  data: number[],
  w: number,
  h: number,
  max: number,
  pad: number,
): { line: string; area: string; points: { x: number; y: number }[] } {
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const step = innerW / (data.length - 1);
  const points = data.map((v, i) => ({
    x: pad + i * step,
    y: pad + innerH - (v / max) * innerH,
  }));
  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${points[points.length - 1].x.toFixed(1)},${(
    h - pad
  ).toFixed(1)} L${pad},${(h - pad).toFixed(1)} Z`;
  return { line, area, points };
}

export function TrendChart() {
  const W = 640;
  const H = 220;
  const PAD = 16;
  const max = Math.max(...TREND_TOTAL) * 1.15;
  const total = buildPath(TREND_TOTAL, W, H, max, PAD);
  const crit = buildPath(TREND_CRIT, W, H, max, PAD);
  const gridLines = [0.25, 0.5, 0.75, 1];

  return (
    <Box>
      <chakra.svg
        viewBox={`0 0 ${W} ${H}`}
        w="100%"
        h="auto"
        preserveAspectRatio="none"
        display="block"
      >
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7B6CF6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7B6CF6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2FBF70" />
            <stop offset="100%" stopColor="#7B6CF6" />
          </linearGradient>
        </defs>

        {gridLines.map((g) => {
          const y = PAD + (H - PAD * 2) * (1 - g);
          return (
            <line
              key={g}
              x1={PAD}
              y1={y}
              x2={W - PAD}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          );
        })}

        <path d={total.area} fill="url(#trendFill)" />
        <path
          d={total.line}
          fill="none"
          stroke="url(#trendLine)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d={crit.line}
          fill="none"
          stroke="#FF6B6B"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />

        {total.points.map((p, i) =>
          i === total.points.length - 1 ? (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#18E0A0" />
          ) : null,
        )}
      </chakra.svg>

      <Flex justify="space-between" mt="8px" px="2px">
        {TREND_LABELS.map((l, i) => (
          <Text key={i} fontSize="10.5px" color="wa.32">
            {l}
          </Text>
        ))}
      </Flex>

      <Flex gap="20px" mt="14px">
        <Flex align="center" gap="7px">
          <Box w="16px" h="3px" borderRadius="pill" bg="#7B6CF6" />
          <Text fontSize="12px" color="wa.55">
            Total findings
          </Text>
        </Flex>
        <Flex align="center" gap="7px">
          <Box
            w="16px"
            h="0"
            borderTop="2px dashed"
            borderColor="#FF6B6B"
          />
          <Text fontSize="12px" color="wa.55">
            Critical
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
