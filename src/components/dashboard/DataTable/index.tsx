import { Box, Flex, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

export interface Column<Row> {
  key: string;
  header: string;
  /** cell renderer */
  cell: (row: Row) => ReactNode;
  /** min column width */
  width?: string;
  align?: "left" | "right" | "center";
  hideBelow?: "sm" | "md" | "lg";
}

/**
 * Lightweight, on-brand table. Renders as a CSS grid so columns stay aligned
 * and the whole thing scrolls horizontally on small screens.
 */
export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  onRowClick,
  minWidth = "720px",
}: {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row, i: number) => string;
  onRowClick?: (row: Row) => void;
  minWidth?: string;
}) {
  const template = columns
    .map((c) => c.width ?? "minmax(120px, 1fr)")
    .join(" ");

  return (
    <Box overflowX="auto" overflowY="hidden" mx={{ base: "-4px", md: 0 }}>
      <Box minW={minWidth}>
        {/* header */}
        <Box
          display="grid"
          gridTemplateColumns={template}
          gap="16px"
          px="14px"
          py="11px"
          borderBottom="1px solid"
          borderColor="wa.8"
        >
          {columns.map((c) => (
            <Text
              key={c.key}
              fontSize="11px"
              fontWeight={700}
              letterSpacing="0.8px"
              textTransform="uppercase"
              color="wa.40"
              textAlign={c.align ?? "left"}
              display={
                c.hideBelow ? { base: "none", [c.hideBelow]: "block" } : undefined
              }
            >
              {c.header}
            </Text>
          ))}
        </Box>

        {/* rows */}
        {rows.map((row, i) => (
          <Box
            key={rowKey(row, i)}
            display="grid"
            gridTemplateColumns={template}
            gap="16px"
            px="14px"
            py="13px"
            alignItems="center"
            borderBottom="1px solid"
            borderColor="wa.4"
            cursor={onRowClick ? "pointer" : "default"}
            transition="background .14s ease"
            _hover={{ bg: "wa.3" }}
            _last={{ borderBottom: "none" }}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
          >
            {columns.map((c) => (
              <Flex
                key={c.key}
                minW={0}
                justify={
                  c.align === "right"
                    ? "flex-end"
                    : c.align === "center"
                      ? "center"
                      : "flex-start"
                }
                display={
                  c.hideBelow
                    ? { base: "none", [c.hideBelow]: "flex" }
                    : "flex"
                }
              >
                {c.cell(row)}
              </Flex>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
