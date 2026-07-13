import { Box, Flex, Grid, Heading, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useMemo, useState } from "react";
import { BookOpen, Bug, Check, ChevronDown, Clock, FileText, KeyRound, Layers, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { AnimatedGradientBg } from "@/components/layout/AnimatedGradientBg";
import { GradientText } from "@/components/common/primitives";
import { BlogThumb } from "@/components/common/BlogThumb";
import { BLOG_POSTS } from "@/constant/site.constant";
import { gradients } from "@/theme";
import { ROUTES } from "@/constant/routes.constant";

const CATEGORIES = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

const stats = [
  { icon: BookOpen, label: `${BLOG_POSTS.length} articles` },
  { icon: Layers, label: `${CATEGORIES.length - 1} categories` },
  { icon: Sparkles, label: "Updated weekly" },
];

const FLOATING_ICONS: { icon: LucideIcon; top: string; left?: string; right?: string; size: number; color: string; duration: number; delay: number }[] = [
  { icon: ShieldCheck, top: "14%", left: "8%", size: 30, color: "#2FBF70", duration: 7, delay: 0 },
  { icon: FileText, top: "62%", left: "14%", size: 24, color: "#9D8CFF", duration: 8, delay: 1.2 },
  { icon: KeyRound, top: "20%", right: "10%", size: 26, color: "#9D8CFF", duration: 6.5, delay: 0.6 },
  { icon: Bug, top: "58%", right: "7%", size: 28, color: "#2FBF70", duration: 7.5, delay: 1.8 },
];

/** Faint floating security + article icons — a lighter, blog-appropriate
 * alternative to the "live scan" hacking backdrop used on the main hero. */
function FloatingSecurityIcons() {
  return (
    <Box position="absolute" inset={0} pointerEvents="none" display={{ base: "none", md: "block" }} overflow="hidden">
      {FLOATING_ICONS.map(({ icon: Icon, top, left, right, size, color, duration, delay }, i) => (
        <Box
          key={i}
          position="absolute"
          top={top}
          left={left}
          right={right}
          opacity={0.16}
          sx={{ animation: `floaty ${duration}s ease-in-out infinite`, animationDelay: `${delay}s` }}
        >
          <Icon size={size} color={color} />
        </Box>
      ))}
    </Box>
  );
}

export default function BlogPage() {
  const [category, setCategory] = useState("All");

  const posts = useMemo(() => {
    return BLOG_POSTS.filter((p) => category === "All" || p.category === category);
  }, [category]);

  return (
    <>
      <Box as="section" position="relative" overflow="hidden">
        <AnimatedGradientBg />
        <FloatingSecurityIcons />
        <Section position="relative" zIndex={1} py={{ base: "48px", md: "72px" }} pb={{ base: "24px", md: "36px" }}>
          <Box textAlign="center" maxW="760px" mx="auto">
            <Flex
              display="inline-flex"
              align="center"
              gap="9px"
              pl="11px"
              pr="14px"
              py="7px"
              borderRadius="pill"
              border="1px solid"
              borderColor="rgba(47,191,112,0.35)"
              bg="rgba(47,191,112,0.08)"
              mb="22px"
            >
              <Box w="7px" h="7px" borderRadius="50%" bg="brand.green" boxShadow="0 0 0 4px rgba(47,191,112,0.18)" />
              <Text fontSize="12.5px" letterSpacing="1px" color="brand.mint" fontWeight={500}>
                INSIGHTS &amp; FIELD NOTES
              </Text>
            </Flex>

            <Heading as="h1" fontWeight={800} fontSize={{ base: "36px", md: "56px" }} lineHeight="1.05" letterSpacing="-0.5px">
              From the <GradientText>blog</GradientText>
            </Heading>
            <Text fontSize={{ base: "16px", md: "18px" }} color="wa.60" mt="20px" lineHeight="1.6">
              Field notes from our red team — practical guides on offensive security, DevSecOps and
              AI-assisted testing.
            </Text>

            <Flex justify="center" gap={{ base: "16px", md: "26px" }} mt="30px" color="wa.45" fontSize="13px" flexWrap="wrap">
              {stats.map(({ icon: Icon, label }) => (
                <Flex key={label} align="center" gap="7px">
                  <Icon size={15} color="#2FBF70" />
                  {label}
                </Flex>
              ))}
            </Flex>
          </Box>
        </Section>
      </Box>

      <Section pt={{ base: "8px", md: "16px" }}>
        {/* mobile/tablet: custom-styled dropdown (not the native OS picker) */}
        <Box display={{ base: "block", md: "none" }} maxW="280px" mx="auto" mb="36px">
          <Menu matchWidth>
            {({ isOpen }) => (
              <>
                <MenuButton
                  w="100%"
                  h="46px"
                  px="16px"
                  bg="inputBg"
                  border="1px solid"
                  borderColor={isOpen ? "brand.green" : "wa.12"}
                  borderRadius="12px"
                  color="white"
                  fontSize="14px"
                  fontWeight={600}
                  textAlign="left"
                  transition="all .15s ease"
                  _hover={{ borderColor: "wa.18" }}
                >
                  <Flex align="center" justify="space-between">
                    {category}
                    <ChevronDown
                      size={17}
                      color="rgba(255,255,255,0.5)"
                      style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .15s ease" }}
                    />
                  </Flex>
                </MenuButton>
                <MenuList bg="surfaceAlt" borderColor="wa.12" borderRadius="12px" p="6px" minW="0" boxShadow="0 20px 44px rgba(0,0,0,0.45)">
                  {CATEGORIES.map((c) => {
                    const active = category === c;
                    return (
                      <MenuItem
                        key={c}
                        onClick={() => setCategory(c)}
                        bg={active ? "rgba(47,191,112,0.1)" : "transparent"}
                        color={active ? "white" : "wa.65"}
                        fontWeight={active ? 600 : 500}
                        fontSize="14px"
                        borderRadius="8px"
                        px="12px"
                        py="10px"
                        mb="2px"
                        _last={{ mb: 0 }}
                        _hover={{ bg: active ? "rgba(47,191,112,0.14)" : "wa.5" }}
                        _focus={{ bg: active ? "rgba(47,191,112,0.14)" : "wa.5" }}
                      >
                        <Flex align="center" justify="space-between" w="100%">
                          {c}
                          {active && <Check size={15} color="#2FBF70" />}
                        </Flex>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </>
            )}
          </Menu>
        </Box>

        {/* desktop: full pill row */}
        <Flex display={{ base: "none", md: "flex" }} justify="center" gap="10px" flexWrap="wrap" mb="36px">
          {CATEGORIES.map((c) => {
            const active = category === c;
            return (
              <Box
                key={c}
                as="button"
                onClick={() => setCategory(c)}
                h="36px"
                px="16px"
                borderRadius="pill"
                fontSize="13px"
                fontWeight={600}
                color={active ? "white" : "wa.60"}
                border="1px solid"
                borderColor={active ? "transparent" : "wa.12"}
                sx={{ background: active ? gradients.brand : "transparent" }}
                _hover={{ color: "white" }}
              >
                {c}
              </Box>
            );
          })}
        </Flex>

        {posts.length === 0 ? (
          <Box textAlign="center" py="80px" color="wa.45">
            <Text fontSize="18px">No articles in "{category}" yet.</Text>
          </Box>
        ) : (
          <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3,1fr)" }} gap="22px">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.05}>
                <Link
                  as={RouterLink}
                  to={ROUTES.blogPost(post.slug)}
                  display="block"
                  h="100%"
                  bg="surface"
                  border="1px solid"
                  borderColor="wa.8"
                  borderRadius="20px"
                  overflow="hidden"
                  transition="all .25s ease"
                  _hover={{ borderColor: "rgba(47,191,112,0.4)", transform: "translateY(-4px) scale(1.02)" }}
                >
                  <BlogThumb gradient={post.gradient} image={post.thumbnail} alt={post.title} h="160px" />
                  <Box p="24px">
                    <Flex justify="space-between" align="center" mb="10px">
                      <Text fontSize="11px" letterSpacing="1px" color={post.categoryColor}>
                        {post.category}
                      </Text>
                      <Flex align="center" gap="5px" fontSize="12px" color="wa.40">
                        <Clock size={13} /> {post.readMins} min
                      </Flex>
                    </Flex>
                    <Heading as="h3" fontWeight={700} fontSize="18px" mb="8px">
                      {post.title}
                    </Heading>
                    <Text fontSize="13.5px" color="wa.50" lineHeight="1.6" mb="16px">
                      {post.excerpt}
                    </Text>
                    <Text fontSize="12px" color="wa.40">{post.date}</Text>
                  </Box>
                </Link>
              </Reveal>
            ))}
          </Grid>
        )}
      </Section>
    </>
  );
}
