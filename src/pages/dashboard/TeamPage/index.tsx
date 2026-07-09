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
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
import { PageHeader } from "@/components/dashboard/PageHeader";
import {
  DashCard,
  GradientAvatar,
  StatusPill,
  type PillTone,
} from "@/components/dashboard/primitives";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { gradients } from "@/theme";

type Role = "Owner" | "Admin" | "Member" | "Viewer";

interface Member {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: Role;
  status: "Active" | "Invited";
}

const ROLE_TONE: Record<Role, PillTone> = {
  Owner: "violet",
  Admin: "blue",
  Member: "green",
  Viewer: "muted",
};

const INITIAL_MEMBERS: Member[] = [
  {
    id: "1",
    name: "John K.",
    email: "John.k@gmail.co",
    initials: "SK",
    role: "Owner",
    status: "Active",
  },
  {
    id: "2",
    name: "Priya Nair",
    email: "priya@acmecorp.io",
    initials: "PN",
    role: "Admin",
    status: "Active",
  },
  {
    id: "3",
    name: "Marcus Vaughn",
    email: "marcus@northwind.com",
    initials: "MV",
    role: "Member",
    status: "Active",
  },
  {
    id: "4",
    name: "Elena Rossi",
    email: "elena@fintechly.dev",
    initials: "ER",
    role: "Member",
    status: "Active",
  },
  {
    id: "5",
    name: "Dev Patel",
    email: "dev@paylink.app",
    initials: "DP",
    role: "Viewer",
    status: "Invited",
  },
];

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Member");

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

  const closeModal = () => {
    onClose();
    setEmail("");
    setRole("Member");
  };

  const invite = () => {
    const addr = email.trim();
    if (!addr) return;
    const namePart = addr.split("@")[0];
    const initials = namePart.slice(0, 2).toUpperCase();
    setMembers((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: namePart,
        email: addr,
        initials,
        role,
        status: "Invited",
      },
    ]);
    toast({
      title: `Invite sent to ${addr}`,
      status: "success",
      duration: 1800,
      position: "bottom-right",
    });
    closeModal();
  };

  const columns: Column<Member>[] = [
    {
      key: "member",
      header: "Member",
      width: "minmax(180px, 1.4fr)",
      cell: (r) => (
        <Flex gap="12px" align="center" minW={0}>
          <GradientAvatar initials={r.initials} size="38px" />
          <Box minW={0}>
            <Text fontSize="14px" fontWeight={600} isTruncated>
              {r.name}
            </Text>
            <Text fontSize="12.5px" color="wa.45" isTruncated>
              {r.email}
            </Text>
          </Box>
        </Flex>
      ),
    },
    {
      key: "role",
      header: "Role",
      width: "120px",
      cell: (r) => <StatusPill label={r.role} tone={ROLE_TONE[r.role]} />,
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      hideBelow: "sm",
      cell: (r) => (
        <StatusPill
          label={r.status}
          tone={r.status === "Active" ? "green" : "muted"}
          dot
        />
      ),
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      align: "right",
      cell: (r) => (
        <IconButton
          aria-label={`Manage ${r.name}`}
          icon={<MoreHorizontal size={17} />}
          size="sm"
          variant="ghost"
          color="wa.40"
          isDisabled={r.role === "Owner"}
          _hover={{ bg: "wa.5", color: "white" }}
        />
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Team"
        subtitle={`${members.length} members in your workspace.`}
        actions={
          <Button
            leftIcon={<UserPlus size={16} />}
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
            Invite member
          </Button>
        }
      />

      <Reveal>
        <DashCard p={{ base: "8px", md: "10px" }}>
          <DataTable
            columns={columns}
            rows={members}
            rowKey={(r) => r.id}
            minWidth="620px"
          />
        </DashCard>
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
            Invite member
          </ModalHeader>
          <ModalCloseButton color="wa.50" _hover={{ bg: "wa.5" }} />
          <ModalBody>
            <FormControl mb="16px">
              <FormLabel fontSize="13px" color="wa.60" fontWeight={600}>
                Email address
              </FormLabel>
              <Input
                autoFocus
                type="email"
                h="44px"
                placeholder="teammate@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={inputSx}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="13px" color="wa.60" fontWeight={600}>
                Role
              </FormLabel>
              <Select
                h="44px"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                sx={inputSx}
              >
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
                <option value="Viewer">Viewer</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter gap="10px">
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
              onClick={invite}
              isDisabled={!email.trim()}
            >
              Send invite
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
