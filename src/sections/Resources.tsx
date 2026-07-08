import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { BLOG_POSTS } from "@/data/site";

/** Dot-grid gradient thumbnail used for blog cards (no raster images in design). */
export function BlogThumb({ gradient, h = "170px" }: { gradient: string; h?: string }) {
  return (
    <Box h={h} position="relative" style={{ background: gradient }}>
      <Box
        position="absolute"
        inset={0}
        backgroundImage="radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)"
        backgroundSize="18px 18px"
      />
    </Box>
  );
}

export function Resources() {
  return (
    <Section id="resources">
      <Flex align="flex-end" justify="space-between" mb="44px" flexWrap="wrap" gap="16px">
        <Box>
          <Heading as="h2" fontWeight={800} fontSize={{ base: "30px", md: "46px" }} m={0}>
            From the blog
          </Heading>
        </Box>
        <Link as={RouterLink} to="/blog" color="brand.violetText" fontSize="14px" fontWeight={600} display="inline-flex" alignItems="center" gap="6px" _hover={{ color: "white" }}>
          View all <ArrowRight size={15} />
        </Link>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap="22px">
        {BLOG_POSTS.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.07}>
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
              <BlogThumb gradient={post.gradient} />
              <Box p="24px">
                <Text fontSize="11px" letterSpacing="1px" color={post.categoryColor}>
                  {post.category}
                </Text>
                <Heading as="h4" fontWeight={700} fontSize="18px" mt="10px" mb="8px">
                  {post.title}
                </Heading>
                <Text fontSize="13.5px" color="wa.50" lineHeight="1.6">
                  {post.excerpt}
                </Text>
              </Box>
            </Link>
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
}
