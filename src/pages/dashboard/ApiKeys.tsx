import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Check, Copy, KeyRound, Plus, Trash2 } from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DashCard, StatusPill } from "@/components/dashboard/primitives";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { gradients } from "@/theme";

interface ApiKey {
  id: string;
  name: string;
  masked: string;
  scopes: string[];
  created: string;
  lastUsed: string;
  status: "Active" | "Revoked";
}

const INITIAL_KEYS: ApiKey[] = [
  {
    id: "1",
    name: "Production CI",
    masked: "vs_live_••••4a71",
    scopes: ["scan:write", "read"],
    created: "Mar 4, 2026",
    lastUsed: "2 min ago",
    status: "Active",
  },
  {
    id: "2",
    name: "Staging pipeline",
    masked: "vs_test_••••9c02",
    scopes: ["scan:write"],
    created: "Feb 18, 2026",
    lastUsed: "1 hr ago",
    status: "Active",
  },
  {
    id: "3",
    name: "Grafana integration",
    masked: "vs_live_••••1f88",
    scopes: ["read"],
    created: "Jan 22, 2026",
    lastUsed: "Yesterday",
    status: "Active",
  },
  {
    id: "4",
    name: "Legacy exporter",
    masked: "vs_live_••••7b30",
    scopes: ["read"],
    created: "Nov 9, 2025",
    lastUsed: "3 months ago",
    status: "Revoked",
  },
];

function randomKey() {
  const seg = () =>
    Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
  return `vs_live_${seg()}${seg()}`;
}

export default function ApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>(INITIAL_KEYS);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [name, setName] = useState("");
  const [generated, setGenerated] = useState<string | null>(null);

  const closeModal = () => {
    onClose();
    setName("");
    setGenerated(null);
  };

  const handleCreate = () => {
    const full = randomKey();
    setGenerated(full);
    setKeys((prev) => [
      {
        id: String(Date.now()),
        name: name.trim() || "Untitled key",
        masked: `vs_live_••••${full.slice(-4)}`,
        scopes: ["scan:write", "read"],
        created: "Just now",
        lastUsed: "Never",
        status: "Active",
      },
      ...prev,
    ]);
  };

  const copy = (value: string, label = "Key") => {
    navigator.clipboard?.writeText(value);
    toast({
      title: `${label} copied`,
      status: "success",
      duration: 1600,
      position: "bottom-right",
    });
  };

  const revoke = (id: string) => {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: "Revoked" as const } : k)),
    );
  };

  const inputSx = {
    bg: "inputBg",
    border: "1px solid",
    borderColor: "wa.12",
    borderRadius: "10px",
    fontSize: "14px",
    _placeholder: { color: "wa.40" },
    _hover: { borderColor: "wa.18" },
    _focus: {
      borderColor: "rgba(123,108,246,0.6)",
      boxShadow: "0 0 0 1px rgba(123,108,246,0.4)",
    },
  };

  const columns: Column<ApiKey>[] = [
    {
      key: "name",
      header: "Name",
      width: "minmax(160px, 1.2fr)",
      cell: (r) => (
        <Flex gap="11px" align="center" minW={0}>
          <Flex
            w="34px"
            h="34px"
            borderRadius="9px"
            align="center"
            justify="center"
            bg="rgba(47,191,112,0.12)"
            color="#18E0A0"
            flexShrink={0}
          >
            <KeyRound size={16} />
          </Flex>
          <Box minW={0}>
            <Text fontSize="13.5px" fontWeight={600} isTruncated>
              {r.name}
            </Text>
            <Text fontSize="12px" color="wa.45">
              {r.scopes.join(" · ")}
            </Text>
          </Box>
        </Flex>
      ),
    },
    {
      key: "key",
      header: "Key",
      width: "minmax(150px, 1fr)",
      cell: (r) => (
        <Flex align="center" gap="8px" minW={0}>
          <Text
            fontFamily="mono"
            fontSize="13px"
            color="wa.72"
            isTruncated
            opacity={r.status === "Revoked" ? 0.5 : 1}
          >
            {r.masked}
          </Text>
          <IconButton
            aria-label="Copy key"
            icon={<Copy size={14} />}
            size="xs"
            variant="ghost"
            color="wa.40"
            isDisabled={r.status === "Revoked"}
            onClick={() => copy(r.masked)}
            _hover={{ bg: "wa.5", color: "white" }}
          />
        </Flex>
      ),
    },
    {
      key: "created",
      header: "Created",
      width: "110px",
      hideBelow: "md",
      cell: (r) => (
        <Text fontSize="12.5px" color="wa.50">
          {r.created}
        </Text>
      ),
    },
    {
      key: "lastUsed",
      header: "Last used",
      width: "110px",
      hideBelow: "lg",
      cell: (r) => (
        <Text fontSize="12.5px" color="wa.50">
          {r.lastUsed}
        </Text>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "150px",
      align: "right",
      cell: (r) => (
        <Flex align="center" gap="8px">
          <StatusPill
            label={r.status}
            tone={r.status === "Active" ? "green" : "red"}
          />
          <IconButton
            aria-label="Revoke key"
            icon={<Trash2 size={15} />}
            size="sm"
            variant="ghost"
            color="wa.40"
            isDisabled={r.status === "Revoked"}
            onClick={() => revoke(r.id)}
            _hover={{ bg: "rgba(255,92,92,0.1)", color: "#FF6B6B" }}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        title="API Keys"
        subtitle="Programmatic access for CI pipelines and integrations."
        actions={
          <Button
            leftIcon={<Plus size={16} />}
            h="42px"
            px="18px"
            fontSize="13.5px"
            fontWeight={700}
            color="white"
            borderRadius="pill"
            sx={{ background: gradients.brand }}
            _hover={{ filter: "brightness(1.06)" }}
            onClick={onOpen}
          >
            Create API key
          </Button>
        }
      />

      <Reveal>
        {keys.length === 0 ? (
          <DashCard textAlign="center" py="64px">
            <Flex
              w="56px"
              h="56px"
              borderRadius="14px"
              align="center"
              justify="center"
              mx="auto"
              mb="16px"
              bg="rgba(47,191,112,0.12)"
              color="#18E0A0"
            >
              <KeyRound size={26} />
            </Flex>
            <Text fontFamily="heading" fontWeight={800} fontSize="18px">
              No API keys yet
            </Text>
            <Text fontSize="14px" color="wa.50" mt="6px" mb="20px">
              Create a key to start scanning from your pipeline.
            </Text>
            <Button
              leftIcon={<Plus size={16} />}
              h="42px"
              px="18px"
              fontSize="13.5px"
              fontWeight={700}
              color="white"
              borderRadius="pill"
              sx={{ background: gradients.brand }}
              onClick={onOpen}
            >
              Create API key
            </Button>
          </DashCard>
        ) : (
          <DashCard p={{ base: "8px", md: "10px" }}>
            <DataTable
              columns={columns}
              rows={keys}
              rowKey={(r) => r.id}
              minWidth="720px"
            />
          </DashCard>
        )}
      </Reveal>

      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay backdropFilter="blur(6px)" />
        <ModalContent
          bg="surface"
          border="1px solid"
          borderColor="wa.10"
          borderRadius="18px"
          mx="16px"
        >
          <ModalHeader fontFamily="heading" fontWeight={800} fontSize="19px">
            {generated ? "API key created" : "Create API key"}
          </ModalHeader>
          <ModalCloseButton color="wa.50" _hover={{ bg: "wa.5" }} />
          <ModalBody>
            {generated ? (
              <Box>
                <Text fontSize="14px" color="wa.55" mb="14px">
                  Copy this key now. For security, you won't be able to see it
                  again.
                </Text>
                <Flex
                  align="center"
                  gap="10px"
                  bg="codeBg"
                  border="1px solid"
                  borderColor="wa.10"
                  borderRadius="10px"
                  p="12px 14px"
                >
                  <Text
                    fontFamily="mono"
                    fontSize="13px"
                    color="brand.greenText"
                    wordBreak="break-all"
                    flex="1"
                  >
                    {generated}
                  </Text>
                  <IconButton
                    aria-label="Copy full key"
                    icon={<Copy size={16} />}
                    size="sm"
                    variant="ghost"
                    color="wa.55"
                    onClick={() => copy(generated, "API key")}
                    _hover={{ bg: "wa.5", color: "white" }}
                  />
                </Flex>
                <Flex align="center" gap="7px" mt="14px" color="brand.greenText">
                  <Check size={15} />
                  <Text fontSize="12.5px">Key added to your workspace.</Text>
                </Flex>
              </Box>
            ) : (
              <FormControl>
                <FormLabel fontSize="13px" color="wa.60" fontWeight={600}>
                  Key name
                </FormLabel>
                <Input
                  autoFocus
                  h="44px"
                  placeholder="e.g. Production CI"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={inputSx}
                />
                <Text fontSize="12px" color="wa.40" mt="10px">
                  Scopes: scan:write, read (default). Manage scopes after
                  creation.
                </Text>
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter gap="10px">
            {generated ? (
              <Button
                h="42px"
                px="20px"
                fontSize="13.5px"
                fontWeight={700}
                color="white"
                borderRadius="pill"
                sx={{ background: gradients.brand }}
                onClick={closeModal}
              >
                Done
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  h="42px"
                  fontSize="13.5px"
                  color="wa.60"
                  onClick={closeModal}
                  _hover={{ bg: "wa.5" }}
                >
                  Cancel
                </Button>
                <Button
                  h="42px"
                  px="20px"
                  fontSize="13.5px"
                  fontWeight={700}
                  color="white"
                  borderRadius="pill"
                  sx={{ background: gradients.brand }}
                  _hover={{ filter: "brightness(1.06)" }}
                  onClick={handleCreate}
                >
                  Generate key
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
