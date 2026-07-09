import { FormControl, FormLabel } from "@chakra-ui/react";
import type { ReactNode } from "react";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <FormControl>
      <FormLabel fontSize="13px" color="wa.60" fontWeight={600} mb="7px">
        {label}
      </FormLabel>
      {children}
    </FormControl>
  );
}
