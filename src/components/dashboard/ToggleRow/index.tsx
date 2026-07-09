import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { useState } from "react";
import { gradients } from "@/theme";

export function ToggleRow({
  title,
  desc,
  defaultChecked,
}: {
  title: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <Flex
      justify="space-between"
      align="center"
      gap="16px"
      py="14px"
      borderBottom="1px solid"
      borderColor="wa.5"
      _last={{ borderBottom: "none", pb: 0 }}
      _first={{ pt: 0 }}
    >
      <Box>
        <Text fontSize="14px" fontWeight={600}>
          {title}
        </Text>
        <Text fontSize="12.5px" color="wa.50" mt="2px">
          {desc}
        </Text>
      </Box>
      <Switch
        isChecked={on}
        onChange={(e) => setOn(e.target.checked)}
        colorScheme="green"
        sx={{
          "& .chakra-switch__track[data-checked]": {
            background: gradients.brand,
          },
        }}
      />
    </Flex>
  );
}
