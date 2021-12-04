/* eslint-disable */
import { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import {
  CodeComponent,
  ReactMarkdownNames,
} from 'react-markdown/lib/ast-to-react'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Tweet } from 'react-twitter-widgets'
import { Typography, Breadcrumbs, Box, Chip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ThemeModeContext } from 'src/providers/ThemeModeProvider'
import BasePage from 'src/components/BasePage'

const CodeBlock: CodeComponent | ReactMarkdownNames = ({
  inline,
  className,
  children,
  ...props
}) => {
  const { mode, setMode } = useContext(ThemeModeContext)
  const match = /language-(\w+)/.exec(className || '')
  if (match![1] === 'twitter') {
    return (
      <Tweet
        tweetId={String(children).replace(/\n$/, '')}
        options={{
          theme: (mode === 'dark') && 'dark'
        }}
      />
    )
  }
  return !inline && match ? (
    <SyntaxHighlighter style={a11yDark} language={match[1]} PreTag='div'>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

const CustomLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'underline',
  cursor: 'pointer'
}))
const PageLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  cursor: 'pointer'
}))

const SingleBlog = (props: any) => {
  const components = {
    code: CodeBlock,
    img: (props: any) => <img {...props} style={{ width: '100%' }} />,
    a: (props: any) => <PageLink {...props} />,
  }
  const postDate = new Date(props.frontmatter.date)
  const postDateSlug = `${postDate.getFullYear()}.${postDate.getMonth()+1}.${postDate.getDay()}`
  return (
    <>
      <Head>
        <title>{props.frontmatter.title} - Suzuki@Prog24</title>
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
        <Breadcrumbs aria-label='breadcrumb'>
          <Link href='/'>
            <CustomLink>
            HOME
            </CustomLink>
          </Link>
          <Link href='/blog'>
            <CustomLink>
              blog
            </CustomLink>
          </Link>
          <Typography color='textPrimary'>{props.frontmatter.title} - posted {postDateSlug}</Typography>
        </Breadcrumbs>
        <Box sx={{ m: 1 }} />
        <>
          <Chip sx={{ m: 0.5 }} size='small' label={props.frontmatter.category} />
          {props.frontmatter.tags.map((tag: string) => {
            return (
              <>
                <Chip sx={{ m: 0.5 }} size='small' label={tag} />
              </>
            )
          })}
        </>
        <Box sx={{ m: 2 }} />
        <ReactMarkdown
          children={props.markdownBody}
          components={components}
        />
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
  })(require.context('src/data', true, /\.md$/))

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
  })(require.context('src/data', true, /\.md$/))
  const hoge = blogSlug.filter(Boolean)
  const filePath = hoge[0].slice(2)

  const data = await import(`src/data/${filePath}`)
  const singleDocument = matter(data.default)
  return {
    props: {
      frontmatter: singleDocument.data,
      markdownBody: singleDocument.content,
    }
  }
}
