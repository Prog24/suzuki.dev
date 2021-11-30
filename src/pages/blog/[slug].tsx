/* eslint-disable */
import { useContext } from 'react'
import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import {
  CodeComponent,
  ReactMarkdownNames,
} from 'react-markdown/lib/ast-to-react'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import { Tweet } from 'react-twitter-widgets'
import { Typography, Breadcrumbs, Box } from '@mui/material'
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
    <SyntaxHighlighter style={dark} language={match[1]} PreTag='div'>
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
  return (
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
        <Typography color='textPrimary'>{props.frontmatter.title}</Typography>
      </Breadcrumbs>
      <Box sx={{ m: 2 }} />
      <ReactMarkdown
        children={props.markdownBody}
        components={components}
      />
    </BasePage>
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
