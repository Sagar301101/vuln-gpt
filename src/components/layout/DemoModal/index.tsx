import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useDemoModal } from "@/context/DemoModalContext";
import { submitDemoRequest } from "@/services/demoRequest.service";
import { GradientText } from "@/components/common/primitives";
import { gradients } from "@/theme";

type Form = { name: string; email: string; company: string; phone: string; message: string };
type Errors = Partial<Record<keyof Form, string>>;
type Status = "idle" | "submitting" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRe = /^[^0-9]+$/;
const indianMobileRe = /^[789]\d{9}$/;

const emptyForm: Form = { name: "", email: "", company: "", phone: "", message: "" };

const fieldStyles = {
  bg: "inputBg",
  border: "1px solid",
  borderColor: "wa.12",
  color: "white",
  borderRadius: "12px",
  _placeholder: { color: "wa.40" },
  _focusVisible: { borderColor: "brand.green", boxShadow: "none" },
} as const;

/** Single shared "Schedule a free demo call" modal, opened via useDemoModal(). */
export function DemoModal() {
  const { isOpen, context, closeDemoModal } = useDemoModal();
  const toast = useToast();
  const [form, setForm] = useState<Form>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!isOpen) return;
    setForm(
      context.product ? { ...emptyForm, message: `Interested in: ${context.product}` } : emptyForm,
    );
    setErrors({});
    setStatus("idle");
  }, [isOpen, context.product]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    else if (form.name.trim().length < 2) next.name = "Name looks too short.";
    else if (!nameRe.test(form.name.trim())) next.name = "Name shouldn't contain numbers.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!emailRe.test(form.email)) next.email = "That email doesn't look right.";
    if (!form.company.trim()) next.company = "Please enter your company.";
    if (!form.phone.trim()) next.phone = "Please enter a phone number.";
    else if (!indianMobileRe.test(form.phone.trim()))
      next.phone = "Enter a valid 10-digit Indian mobile number (can't start with 1-6).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      await submitDemoRequest(form);
      toast({
        title: "Thanks! We'll contact you shortly.",
        status: "success",
        duration: 4000,
        position: "bottom-right",
      });
      closeDemoModal();
      setForm(emptyForm);
      setErrors({});
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeDemoModal} isCentered size="lg" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(6px)" />
      <ModalContent bg="surface" border="1px solid" borderColor="wa.10" borderRadius="22px" mx="16px">
        <ModalCloseButton color="wa.60" _hover={{ color: "white" }} />
        <ModalBody p={{ base: "24px", md: "36px" }}>
            <Stack as="form" spacing="20px" onSubmit={submit} noValidate>
              <Box>
                <Heading as="h2" fontSize="24px" mb="4px">
                  Schedule a <GradientText>free demo call</GradientText>
                </Heading>
                <Text fontSize="14px" color="wa.55">
                  Tell us about your stack — a security engineer will get back to you within one
                  business day.
                </Text>
              </Box>

              <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap="20px">
                <FormControl isInvalid={!!errors.name} isRequired>
                  <FormLabel fontSize="13px" color="wa.60">
                    Name
                  </FormLabel>
                  <Input value={form.name} onChange={set("name")} placeholder="Jane Doe" {...fieldStyles} />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email} isRequired>
                  <FormLabel fontSize="13px" color="wa.60">
                    Work email
                  </FormLabel>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="jane@company.com"
                    {...fieldStyles}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              </Grid>

              <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap="20px">
                <FormControl isInvalid={!!errors.company} isRequired>
                  <FormLabel fontSize="13px" color="wa.60">
                    Company
                  </FormLabel>
                  <Input value={form.company} onChange={set("company")} placeholder="Acme Inc." {...fieldStyles} />
                  <FormErrorMessage>{errors.company}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.phone} isRequired>
                  <FormLabel fontSize="13px" color="wa.60">
                    Phone
                  </FormLabel>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="9876543210"
                    maxLength={10}
                    {...fieldStyles}
                  />
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel fontSize="13px" color="wa.60">
                  What do you need? (optional)
                </FormLabel>
                <Textarea
                  value={form.message}
                  onChange={set("message")}
                  placeholder="e.g. Web app pentest before our Series A, ~30 endpoints…"
                  rows={4}
                  {...fieldStyles}
                />
              </FormControl>

              {status === "error" && (
                <Flex align="center" gap="10px" bg="rgba(255,92,92,0.1)" border="1px solid" borderColor="rgba(255,92,92,0.3)" borderRadius="12px" px="16px" py="12px">
                  <AlertTriangle size={18} color="#FF8E8E" />
                  <Text fontSize="13.5px" color="#FF8E8E">
                    Something went wrong sending your request. Please try again.
                  </Text>
                </Flex>
              )}

              <Button
                type="submit"
                variant="brand"
                h="52px"
                isLoading={status === "submitting"}
                isDisabled={status === "submitting"}
                loadingText="Sending…"
                rightIcon={<ArrowRight size={17} />}
                sx={{ background: gradients.brand }}
              >
                Request my demo
              </Button>
              <Text fontSize="12px" color="wa.40" textAlign="center">
                We respect your inbox. No spam, ever.
              </Text>
            </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
