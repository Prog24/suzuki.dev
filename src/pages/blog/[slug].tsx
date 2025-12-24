/* eslint-disable */
import { useContext, useEffect, useState } from "react"
import type { ClassAttributes, HTMLAttributes } from "react"
import Head from "next/head"
import Link from "next/link"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import type { ExtraProps } from "react-markdown"
import { codeToHtml } from "shiki"
import { Tweet } from "react-twitter-widgets"
import { Typography, Breadcrumbs, Box, Chip, IconButton, Tooltip } from "@mui/material"
import { styled } from "@mui/material/styles"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import CheckIcon from "@mui/icons-material/Check"
import { ThemeModeContext } from "src/providers/ThemeModeProvider"
import BasePage from "src/components/BasePage"
import formatDate from "src/utils/formatDate"

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  HatenaShareButton,
  HatenaIcon,
  PocketShareButton,
  PocketIcon,
} from "react-share"

const CodeBlockContainer = styled("div")({
  position: "relative",
  "& pre": {
    margin: 0,
  },
})

const CopyButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "8px",
  right: "8px",
  padding: "4px",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
}))

const CodeBlock = ({
  className,
  children,
  ...props
}: ClassAttributes<HTMLPreElement> & HTMLAttributes<HTMLPreElement> & ExtraProps) => {
  const { mode, setMode } = useContext(ThemeModeContext)
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || "")

  useEffect(() => {
    if (match?.[1] && match[1] !== "twitter") {
      const code = String(children).replace(/\n$/, "")
      codeToHtml(code, {
        lang: match[1],
        theme: "github-dark",
      })
        .then((html) => setHighlightedCode(html))
        .catch(() => {
          // Fallback to plain code if language is not supported
          setHighlightedCode(`<pre><code>${code}</code></pre>`)
        })
    }
  }, [children, match])

  const handleCopy = async () => {
    const code = String(children).replace(/\n$/, "")
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  if (match?.[1] === "twitter") {
    return (
      <Tweet
        tweetId={String(children).replace(/\n$/, "")}
        options={{
          theme: mode === "dark" && "dark",
        }}
      />
    )
  }

  return match ? (
    highlightedCode ? (
      <CodeBlockContainer>
        <Tooltip title={copied ? "Copied!" : "Copy code"}>
          <CopyButton onClick={handleCopy} size="small">
            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </CopyButton>
        </Tooltip>
        <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </CodeBlockContainer>
    ) : (
      <pre>
        <code>{String(children).replace(/\n$/, "")}</code>
      </pre>
    )
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "underline",
  cursor: "pointer",
}))
const PageLink = styled("a")(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "underline",
  cursor: "pointer",
}))

const SingleBlog = (props: any) => {
  const components = {
    code: (props: any) => <CodeBlock {...props} />,
    img: (props: any) => <img {...props} style={{ width: "100%" }} />,
    a: (props: any) => <PageLink target="_blank" rel="noopener noreferrer" {...props} />,
  }
  const postDateSlug = formatDate(props.frontmatter.date)
  return (
    <>
      <Head>
        <title>{`${props.frontmatter.title} - szk`}</title>
        <meta name="description" content={props.frontmatter.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://og-image-prog24.vercel.app/${props.frontmatter.title}.png`} />
        <meta property="og:description" content={props.frontmatter.description} />
        <meta property="og:url" content={`https://suzuki.dev/blog/${props.frontmatter.slug}`} />
        <meta property="og:title" content={props.frontmatter.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Prog24_jp" />
        <meta name="twitter:creator" content="@Prog24_jp" />
      </Head>
      <BasePage>
        <>
          <Breadcrumbs aria-label="breadcrumb">
            <CustomLink href="/">HOME</CustomLink>
            <CustomLink href="/blog">blog</CustomLink>
            <Typography color="textPrimary">
              {props.frontmatter.title} - posted {postDateSlug}
            </Typography>
          </Breadcrumbs>
          <Box sx={{ m: 1 }} />
          <>
            <Chip sx={{ m: 0.5 }} size="small" label={props.frontmatter.category} />
            {props.frontmatter.tags.map((tag: string) => {
              return <Chip sx={{ m: 0.5 }} size="small" label={tag} key={tag} />
            })}
          </>
          <Box sx={{ m: 2 }} />
          <ReactMarkdown children={props.markdownBody} components={components} />
          <>
            <Typography color="textPrimary" variant="subtitle1">
              SNSでシェア
            </Typography>
            <TwitterShareButton
              url={`https://suzuki.dev/blog/${props.frontmatter.slug}`}
              title={props.frontmatter.title}
              via={"Prog24_jp のブログ"}
            >
              <TwitterIcon size={36} round />
            </TwitterShareButton>
            <FacebookShareButton url={`https://suzuki.dev/blog/${props.frontmatter.slug}`}>
              <FacebookIcon size={36} round />
            </FacebookShareButton>
            <HatenaShareButton
              url={`https://suzuki.dev/blog/${props.frontmatter.slug}`}
              title={props.frontmatter.title}
            >
              <HatenaIcon size={36} round />
            </HatenaShareButton>
            <PocketShareButton
              url={`https://suzuki.dev/blog/${props.frontmatter.slug}`}
              title={props.frontmatter.title}
            >
              <PocketIcon size={36} round />
            </PocketShareButton>
          </>
        </>
      </BasePage>
    </>
  )
}

export default SingleBlog

export async function getStaticPaths() {
  const blogSlug = ((context: any) => {
    const keys_tmp = context.keys()
    const keys = keys_tmp.slice(0, keys_tmp.length / 2)
    const values = keys.map(context)
    const data = keys.map((key: any, index: any) => {
      const value = values[index]
      const document = matter(value.default)
      return document.data.slug
    })
    return data
  })(require.context("src/data", true, /\.md$/))

  const paths = blogSlug.map((blogSlug: any) => `/blog/${blogSlug}`)

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const { slug } = context.params
  const blogSlug = ((context: any) => {
    const keys_tmp = context.keys()
    const keys = keys_tmp.slice(0, keys_tmp.length / 2)
    const values = keys.map(context)
    const data = keys.map((key: any, index: any) => {
      const value = values[index]
      const document = matter(value.default)
      if (document.data.slug === slug) {
        return key
      }
    })
    return data
  })(require.context("src/data", true, /\.md$/))
  const hoge = blogSlug.filter(Boolean)
  const filePath = hoge[0].slice(2)

  const data = await import(`src/data/${filePath}`)
  const singleDocument = matter(data.default)
  return {
    props: {
      frontmatter: singleDocument.data,
      markdownBody: singleDocument.content,
    },
  }
}
