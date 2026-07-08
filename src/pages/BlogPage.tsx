import { Box, Flex, Grid, Heading, Input, InputGroup, InputLeftElement, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useMemo, useState } from "react";
import { ChevronRight, Clock, Search } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { AnimatedGradientBg } from "@/components/layout/AnimatedGradientBg";
import { GradientText } from "@/components/ui/primitives";
import { BlogThumb } from "@/sections/Resources";
import { BLOG_POSTS } from "@/data/site";
import { gradients } from "@/theme";

const CATEGORIES = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const matchesCat = category === "All" || p.category === category;
      const matchesQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, category]);

  return (
    <>
      <Box as="section" position="relative" overflow="hidden">
        <AnimatedGradientBg />
        <Section position="relative" zIndex={1} py={{ base: "48px", md: "72px" }} pb={{ base: "24px", md: "36px" }}>
          <Flex align="center" gap="6px" fontSize="13px" color="wa.45" mb="20px" justify="center">
            <Link as={RouterLink} to="/" _hover={{ color: "white" }}>
              Home
            </Link>
            <ChevronRight size={13} />
            <Text color="wa.70">Blog</Text>
          </Flex>

          <Box textAlign="center" maxW="760px" mx="auto">
            <Heading as="h1" fontWeight={800} fontSize={{ base: "36px", md: "56px" }} lineHeight="1.05" letterSpacing="-0.5px">
              From the <GradientText>blog</GradientText>
            </Heading>
            <Text fontSize={{ base: "16px", md: "18px" }} color="wa.60" mt="20px" lineHeight="1.6">
              Field notes from our red team — practical guides on offensive security, DevSecOps and
              AI-assisted testing.
            </Text>

            <InputGroup maxW="420px" mx="auto" mt="32px" size="lg">
              <InputLeftElement pointerEvents="none" h="52px">
                <Search size={17} color="rgba(255,255,255,0.4)" />
              </InputLeftElement>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                h="52px"
                bg="inputBg"
                border="1px solid"
                borderColor="wa.12"
                color="white"
                borderRadius="14px"
                _placeholder={{ color: "wa.40" }}
                _focusVisible={{ borderColor: "brand.green", boxShadow: "none" }}
              />
            </InputGroup>
          </Box>
        </Section>
      </Box>

      <Section pt={{ base: "8px", md: "16px" }}>
        <Flex justify="center" gap="10px" flexWrap="wrap" mb="36px">
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
            <Text fontSize="18px">No articles match "{query}".</Text>
          </Box>
        ) : (
          <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3,1fr)" }} gap="22px">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.05}>
                <Link
                  as={RouterLink}
                  to={`/blog/${post.slug}`}
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
                  <BlogThumb gradient={post.gradient} h="160px" />
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
