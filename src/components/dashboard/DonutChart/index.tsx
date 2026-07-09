import { Box, chakra, Flex, Text } from "@chakra-ui/react";

const SEV_DIST: { label: string; value: number; color: string }[] = [
  { label: "Critical", value: 12, color: "#FF5C5C" },
  { label: "High", value: 34, color: "#EC7272" },
  { label: "Medium", value: 78, color: "#FFA85C" },
  { label: "Low", value: 63, color: "#FFD66B" },
];

export function DonutChart() {
  const size = 176;
  const stroke = 22;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = SEV_DIST.reduce((a, b) => a + b.value, 0);
  let offset = 0;

  return (
    <Flex align="center" gap="24px" wrap="wrap" justify="center">
      <Box position="relative" w={`${size}px`} h={`${size}px`}>
        <chakra.svg viewBox={`0 0 ${size} ${size}`} w="100%" h="100%">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
          />
          {SEV_DIST.map((s) => {
            const len = (s.value / total) * c;
            const dash = `${len} ${c - len}`;
            const el = (
              <circle
                key={s.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={stroke}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            );
            offset += len;
            return el;
          })}
        </chakra.svg>
        <Flex
          position="absolute"
          inset={0}
          direction="column"
          align="center"
          justify="center"
        >
          <Text
            fontFamily="heading"
            fontWeight={800}
            fontSize="30px"
            lineHeight="1"
          >
            {total}
          </Text>
          <Text fontSize="12px" color="wa.50" mt="4px">
            open issues
          </Text>
        </Flex>
      </Box>

      <Flex direction="column" gap="12px" flex="1" minW="150px">
        {SEV_DIST.map((s) => (
          <Flex key={s.label} align="center" gap="10px">
            <Box w="10px" h="10px" borderRadius="3px" bg={s.color} />
            <Text fontSize="13px" color="wa.72" flex="1">
              {s.label}
            </Text>
            <Text fontSize="13px" fontWeight={700} color="wa.85">
              {s.value}
            </Text>
            <Text fontSize="12px" color="wa.40" w="40px" textAlign="right">
              {Math.round((s.value / total) * 100)}%
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
