import { Box, Button, Divider, Flex, Grid, Heading, IconButton, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Section } from "@/components/layout/Section";
import { BlogThumb } from "@/components/common/BlogThumb";
import { CtaBand } from "@/components/HomePage/CtaBand";
import { BLOG_POSTS } from "@/constant/site.constant";
import { ROUTES } from "@/constant/routes.constant";
import { layout } from "@/theme";
import { BLOG_CONTENT, type BlogContent, type BlogContentBlock } from "@/data/blog";

// Fallback body for posts that don't have a dedicated entry in src/data/blog yet.
const FALLBACK_BODY: BlogContentBlock[] = [
  { type: "p", text: "Security is a moving target. In this piece we walk through the practical side of the topic — what we look for during engagements, the mistakes we see most often, and the concrete steps a team can take this week." },
  { type: "h", text: "Why it matters" },
  { type: "p", text: "Attackers don't read your architecture diagram; they probe behavior. That's why our testing models real user journeys and real execution rather than trusting configuration alone." },
  { type: "h", text: "How we test it" },
  { type: "ul", items: ["Map the surface with recon and enumeration.", "Reproduce the issue deterministically with request replay.", "Validate impact safely, within agreed rules of engagement.", "Hand back a prioritized, reproducible report."] },
  { type: "h", text: "What to do next" },
  { type: "p", text: "Bake these checks into CI so regressions surface on every pull request — and retest after remediation to confirm the fix actually holds. If you'd like a hand, our team is one demo call away." },
];

/** Renders the simple hand-built block format used by earlier posts. */
function BlockBody({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <Box>
      {blocks.map((block, i) => {
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
              {block.items.map((it) => (
                <Box as="li" key={it} color="wa.70" fontSize="16px" lineHeight="1.7" mb="8px">
                  {it}
                </Box>
              ))}
            </Box>
          );
        }
        if (block.type === "code") {
          return (
            <Box
              key={i}
              as="pre"
              fontFamily="mono"
              fontSize="13.5px"
              lineHeight="1.7"
              color="wa.70"
              bg="surfaceAlt"
              border="1px solid"
              borderColor="wa.8"
              borderRadius="12px"
              p="18px"
              mb="20px"
              overflowX="auto"
              whiteSpace="pre"
            >
              {block.text}
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
  );
}

// Chakra-styled overrides so raw Markdown (tables, callouts, nested headings, inline code/links)
// matches the rest of the article's typography instead of react-markdown's unstyled defaults.
const markdownComponents: Components = {
  h1: ({ children }) => (
    <Heading as="h2" fontSize="24px" mt="36px" mb="14px">
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" fontSize="24px" mt="36px" mb="14px">
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" fontSize="20px" mt="28px" mb="12px">
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <Text as="div" fontSize="16px" color="wa.70" lineHeight="1.8" mb="20px">
      {children}
    </Text>
  ),
  ul: ({ children }) => (
    <Box as="ul" pl="20px" mb="20px">
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box as="ol" pl="20px" mb="20px">
      {children}
    </Box>
  ),
  li: ({ children, className }) => {
    // remark-gfm task-list items ("- [ ]") render a checkbox as the first child;
    // drop the bullet marker so it doesn't show alongside the checkbox.
    const isTaskItem = typeof className === "string" && className.includes("task-list-item");
    return (
      <Box
        as="li"
        color="wa.70"
        fontSize="16px"
        lineHeight="1.7"
        mb="8px"
        sx={isTaskItem ? { listStyleType: "none", "& input[type=checkbox]": { accentColor: "#2FBF70", marginRight: "8px" } } : undefined}
      >
        {children}
      </Box>
    );
  },
  a: ({ href, children }) => (
    <Link href={href} color="brand.mint" textDecoration="underline" isExternal>
      {children}
    </Link>
  ),
  strong: ({ children }) => (
    <Box as="strong" color="wa.85" fontWeight={700}>
      {children}
    </Box>
  ),
  hr: () => <Divider borderColor="wa.8" my="32px" />,
  blockquote: ({ children }) => (
    <Box
      borderLeft="3px solid"
      borderColor="brand.mint"
      bg="rgba(47,191,112,0.06)"
      borderRadius="10px"
      px="18px"
      py="14px"
      mb="20px"
      sx={{ "& > div:last-of-type": { mb: 0 } }}
    >
      {children}
    </Box>
  ),
  pre: ({ children }) => (
    <Box
      as="pre"
      fontFamily="mono"
      fontSize="13.5px"
      lineHeight="1.7"
      color="wa.70"
      bg="surfaceAlt"
      border="1px solid"
      borderColor="wa.8"
      borderRadius="12px"
      p="18px"
      mb="20px"
      overflowX="auto"
      whiteSpace="pre"
      sx={{ "& code": { background: "none", padding: 0, border: "none", fontSize: "inherit", color: "inherit" } }}
    >
      {children}
    </Box>
  ),
  code: ({ children }) => (
    <Box as="code" fontFamily="mono" fontSize="0.9em" bg="surfaceAlt" color="wa.85" px="6px" py="2px" borderRadius="4px">
      {children}
    </Box>
  ),
  table: ({ children }) => (
    <Box overflowX="auto" mb="24px" border="1px solid" borderColor="wa.8" borderRadius="12px">
      <Box as="table" w="100%" fontSize="14px" style={{ borderCollapse: "collapse" }}>
        {children}
      </Box>
    </Box>
  ),
  thead: ({ children }) => <Box as="thead" bg="surfaceAlt">{children}</Box>,
  th: ({ children }) => (
    <Box as="th" textAlign="left" color="wa.85" fontWeight={700} px="14px" py="10px" borderBottom="1px solid" borderColor="wa.8">
      {children}
    </Box>
  ),
  td: ({ children }) => (
    <Box as="td" color="wa.70" px="14px" py="10px" borderTop="1px solid" borderColor="wa.8" verticalAlign="top">
      {children}
    </Box>
  ),
};

/** Renders raw Markdown bodies (tables, callouts, nested headings, inline formatting). */
function MarkdownBody({ markdown }: { markdown: string }) {
  return (
    <Box>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>
    </Box>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const body: BlogContent = (slug && BLOG_CONTENT[slug]) || { format: "blocks", blocks: FALLBACK_BODY };

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
      <Section innerMaxW={layout.maxW} py={{ base: "40px", md: "64px" }}>
        <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={{ base: "32px", lg: "56px" }}>
          {/* sidebar: all articles, current one highlighted */}
          <Box display={{ base: "none", lg: "block" }}>
            <Box position="sticky" top="calc(var(--sticky-header-h, 92px) + 24px)">
              <IconButton
                as={RouterLink}
                to={ROUTES.BLOG}
                aria-label="All articles"
                icon={<ArrowLeft size={17} />}
                variant="outlineSubtle"
                borderRadius="pill"
                size="sm"
                mb="20px"
              />
              <Text fontSize="12px" letterSpacing="1.5px" color="wa.40" mb="14px">
                ALL ARTICLES
              </Text>
              <Stack spacing="6px" maxH="calc(100vh - 220px)" overflowY="auto">
                {BLOG_POSTS.map((p) => {
                  const active = p.slug === post.slug;
                  return (
                    <Link
                      key={p.slug}
                      as={RouterLink}
                      to={ROUTES.blogPost(p.slug)}
                      display="block"
                      px="14px"
                      py="10px"
                      borderRadius="12px"
                      border="1px solid"
                      borderColor={active ? "rgba(123,108,246,0.4)" : "transparent"}
                      bg={active ? "rgba(123,108,246,0.1)" : "transparent"}
                      _hover={{ bg: active ? "rgba(123,108,246,0.14)" : "wa.5", textDecoration: "none" }}
                    >
                      <Text fontSize="10.5px" letterSpacing="1px" color={p.categoryColor} mb="4px">
                        {p.category}
                      </Text>
                      <Text fontSize="13.5px" fontWeight={active ? 700 : 600} color={active ? "white" : "wa.65"} lineHeight="1.4">
                        {p.title}
                      </Text>
                    </Link>
                  );
                })}
              </Stack>
            </Box>
          </Box>

          {/* article content */}
          <Box maxW="760px">
            {/* mobile: back button (sidebar is desktop-only) */}
            <IconButton
              as={RouterLink}
              to={ROUTES.BLOG}
              aria-label="All articles"
              icon={<ArrowLeft size={17} />}
              variant="outlineSubtle"
              borderRadius="pill"
              size="sm"
              mb="24px"
              display={{ base: "inline-flex", lg: "none" }}
            />

            <Text fontSize="12px" letterSpacing="1px" color={post.categoryColor} mb="14px">
              {post.category}
            </Text>
            <Heading as="h1" fontWeight={800} fontSize={{ base: "30px", md: "44px" }} lineHeight="1.1" mb="18px">
              {post.title}
            </Heading>
            <Flex align="center" gap="16px" color="wa.45" fontSize="13px" mb="28px" flexWrap="wrap">
              <Text>{post.date}</Text>
              <Flex align="center" gap="5px"><Clock size={13} /> {post.readMins} min read</Flex>
              {post.author && <Text>By {post.author}</Text>}
            </Flex>
            <Box borderRadius="20px" overflow="hidden" border="1px solid" borderColor="wa.8" mb="32px">
              <BlogThumb gradient={post.gradient} image={post.banner ?? post.thumbnail} alt={post.title} h="260px" />
            </Box>

            <Text fontSize="19px" color="wa.78" lineHeight="1.7" mb="28px">
              {post.excerpt}
            </Text>
            <Divider borderColor="wa.8" mb="28px" />
            {body.format === "markdown" ? <MarkdownBody markdown={body.markdown} /> : <BlockBody blocks={body.blocks} />}
          </Box>
        </Grid>
      </Section>

      <CtaBand />
    </>
  );
}
