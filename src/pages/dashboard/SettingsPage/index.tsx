import {
  Box,
  Button,
  Grid,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { Bell, Save, ShieldCheck, User } from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { Field } from "@/components/dashboard/Field";
import { ToggleRow } from "@/components/dashboard/ToggleRow";
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

export default function SettingsPage() {
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
