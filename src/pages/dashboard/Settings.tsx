import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  SimpleGrid,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Bell, Save, ShieldCheck, User } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { Reveal } from "@/components/layout/Reveal";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DashCard } from "@/components/dashboard/primitives";
import { gradients } from "@/theme";

const inputSx = {
  bg: "inputBg",
  border: "1px solid",
  borderColor: "wa.12",
  borderRadius: "10px",
  fontSize: "14px",
  h: "44px",
  _placeholder: { color: "wa.40" },
  _hover: { borderColor: "wa.18" },
  _focus: {
    borderColor: "rgba(123,108,246,0.6)",
    boxShadow: "0 0 0 1px rgba(123,108,246,0.4)",
  },
};

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: ComponentType<{ size?: number | string }>;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <DashCard>
      <Flex gap="12px" align="center" mb="20px">
        <Flex
          w="40px"
          h="40px"
          borderRadius="11px"
          align="center"
          justify="center"
          bg="rgba(123,108,246,0.12)"
          color="#9D8CFF"
          flexShrink={0}
        >
          <Icon size={19} />
        </Flex>
        <Box>
          <Text fontFamily="heading" fontWeight={800} fontSize="16px">
            {title}
          </Text>
          <Text fontSize="12.5px" color="wa.50">
            {subtitle}
          </Text>
        </Box>
      </Flex>
      {children}
    </DashCard>
  );
}

function Field({
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

function ToggleRow({
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

export default function Settings() {
  return (
    <Box>
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, security, and notification preferences."
        actions={
          <Button
            leftIcon={<Save size={16} />}
            h="42px"
            px="18px"
            fontSize="13.5px"
            fontWeight={700}
            color="white"
            borderRadius="pill"
            sx={{ background: gradients.brand }}
            _hover={{ filter: "brightness(1.06)" }}
          >
            Save changes
          </Button>
        }
      />

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="16px">
        <Reveal>
          <SectionCard
            icon={User}
            title="Profile"
            subtitle="Your personal account details"
          >
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="16px">
              <Field label="Full name">
                <Input defaultValue="John K." sx={inputSx} />
              </Field>
              <Field label="Company">
                <Input defaultValue="gmail Co." sx={inputSx} />
              </Field>
              <Box gridColumn={{ sm: "1 / -1" }}>
                <Field label="Email address">
                  <Input
                    type="email"
                    defaultValue="John.k@gmail.co"
                    sx={inputSx}
                  />
                </Field>
              </Box>
            </SimpleGrid>
          </SectionCard>
        </Reveal>

        <Reveal delay={0.05}>
          <SectionCard
            icon={ShieldCheck}
            title="Security"
            subtitle="Protect access to your workspace"
          >
            <ToggleRow
              title="Two-factor authentication"
              desc="Require a verification code at sign-in."
              defaultChecked
            />
            <Box py="14px" borderBottom="1px solid" borderColor="wa.5">
              <Field label="Session timeout">
                <Select defaultValue="30" sx={inputSx}>
                  <option value="15">After 15 minutes</option>
                  <option value="30">After 30 minutes</option>
                  <option value="60">After 1 hour</option>
                  <option value="480">After 8 hours</option>
                </Select>
              </Field>
            </Box>
            <ToggleRow
              title="Login alerts"
              desc="Email me on sign-in from a new device."
              defaultChecked
            />
          </SectionCard>
        </Reveal>

        <Box gridColumn={{ lg: "1 / -1" }}>
          <Reveal delay={0.1}>
            <SectionCard
              icon={Bell}
              title="Notifications"
              subtitle="Choose what we email you about"
            >
              <ToggleRow
                title="Scan complete"
                desc="Notify when a scan finishes running."
                defaultChecked
              />
              <ToggleRow
                title="Critical finding"
                desc="Alert immediately on critical-severity issues."
                defaultChecked
              />
              <ToggleRow
                title="Weekly digest"
                desc="A summary of your security posture every Monday."
              />
            </SectionCard>
          </Reveal>
        </Box>
      </Grid>
    </Box>
  );
}
