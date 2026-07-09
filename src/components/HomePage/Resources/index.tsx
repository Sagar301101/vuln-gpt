import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { BlogThumb } from "@/components/common/BlogThumb";
import { Carousel } from "@/components/common/Carousel";
import { BLOG_POSTS } from "@/constant/site.constant";
import { ROUTES } from "@/constant/routes.constant";

function BlogCard({ post }: { post: (typeof BLOG_POSTS)[number] }) {
  return (
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
        <Link as={RouterLink} to={ROUTES.BLOG} color="brand.violetText" fontSize="14px" fontWeight={600} display="inline-flex" alignItems="center" gap="6px" _hover={{ color: "white" }}>
          View all <ArrowRight size={15} />
        </Link>
      </Flex>

      <Box display={{ base: "block", lg: "none" }}>
        <Carousel>
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.07}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </Carousel>
      </Box>
      <Grid display={{ base: "none", lg: "grid" }} templateColumns="repeat(3,1fr)" gap="22px">
        {BLOG_POSTS.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.07}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
}
