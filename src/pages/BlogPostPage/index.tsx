import { Box, Button, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { BlogThumb } from "@/components/common/BlogThumb";
import { CtaBand } from "@/components/HomePage/CtaBand";
import { BLOG_POSTS } from "@/constant/site.constant";
import { ROUTES } from "@/constant/routes.constant";

// Lightweight placeholder body shared by all posts (a real build would load MDX/CMS).
const BODY = [
  { type: "p", text: "Security is a moving target. In this piece we walk through the practical side of the topic — what we look for during engagements, the mistakes we see most often, and the concrete steps a team can take this week." },
  { type: "h", text: "Why it matters" },
  { type: "p", text: "Attackers don't read your architecture diagram; they probe behavior. That's why our testing models real user journeys and real execution rather than trusting configuration alone." },
  { type: "h", text: "How we test it" },
  { type: "ul", items: ["Map the surface with recon and enumeration.", "Reproduce the issue deterministically with request replay.", "Validate impact safely, within agreed rules of engagement.", "Hand back a prioritized, reproducible report."] },
  { type: "h", text: "What to do next" },
  { type: "p", text: "Bake these checks into CI so regressions surface on every pull request — and retest after remediation to confirm the fix actually holds. If you'd like a hand, our team is one demo call away." },
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Section py={{ base: "80px", md: "120px" }}>
        <Box textAlign="center">
          <Heading fontSize="32px" mb="12px">Article not found</Heading>
          <Text color="wa.55" mb="24px">This post may have moved or been unpublished.</Text>
          <Button as={RouterLink} to={ROUTES.BLOG} variant="outlineSubtle" leftIcon={<ArrowLeft size={16} />}>
            Back to blog
          </Button>
        </Box>
      </Section>
    );
  }

  return (
    <>
      <Section innerMaxW="760px" py={{ base: "40px", md: "64px" }} pb={{ base: "16px", md: "24px" }}>
        <Link as={RouterLink} to={ROUTES.BLOG} color="wa.55" fontSize="14px" display="inline-flex" alignItems="center" gap="6px" mb="24px" _hover={{ color: "white" }}>
          <ArrowLeft size={15} /> All articles
        </Link>
        <Text fontSize="12px" letterSpacing="1px" color={post.categoryColor} mb="14px">
          {post.category}
        </Text>
        <Heading as="h1" fontWeight={800} fontSize={{ base: "30px", md: "44px" }} lineHeight="1.1" mb="18px">
          {post.title}
        </Heading>
        <Flex align="center" gap="16px" color="wa.45" fontSize="13px" mb="28px">
          <Text>{post.date}</Text>
          <Flex align="center" gap="5px"><Clock size={13} /> {post.readMins} min read</Flex>
        </Flex>
        <Box borderRadius="20px" overflow="hidden" border="1px solid" borderColor="wa.8">
          <BlogThumb gradient={post.gradient} h="260px" />
        </Box>
      </Section>

      <Section innerMaxW="760px" py={{ base: "24px", md: "32px" }}>
        <Text fontSize="19px" color="wa.78" lineHeight="1.7" mb="28px">
          {post.excerpt}
        </Text>
        <Divider borderColor="wa.8" mb="28px" />
        <Box>
          {BODY.map((block, i) => {
            if (block.type === "h") {
              return (
                <Heading key={i} as="h2" fontSize="24px" mt="36px" mb="14px">
                  {block.text}
                </Heading>
              );
            }
            if (block.type === "ul") {
              return (
                <Box key={i} as="ul" pl="20px" mb="20px">
                  {block.items!.map((it) => (
                    <Box as="li" key={it} color="wa.70" fontSize="16px" lineHeight="1.7" mb="8px">
                      {it}
                    </Box>
                  ))}
                </Box>
              );
            }
            return (
              <Text key={i} fontSize="16px" color="wa.70" lineHeight="1.8" mb="20px">
                {block.text}
              </Text>
            );
          })}
        </Box>
      </Section>

      <CtaBand />
    </>
  );
}
