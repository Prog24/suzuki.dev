import Link from "next/link"
import matter from "gray-matter"
import BasePage from "src/components/BasePage"
import { List, ListItem, ListItemButton, ListItemText, Breadcrumbs, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import formatDate from "src/utils/formatDate"

const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "underline",
  cursor: "pointer",
}))

const Index = (props: any) => {
  return (
    <BasePage>
      <>
        <Breadcrumbs aria-label="breadcrumb">
          <CustomLink href="/">HOME</CustomLink>
          <Typography color="textPrimary">blog</Typography>
        </Breadcrumbs>
        <List>
          {props.blogs.map((item: any, index: any) => {
            const postDate = formatDate(item.frontmatter.date)
            return (
              <ListItem key={index} disablePadding divider>
                <ListItemButton disableGutters component={Link} href={`/blog/${item.frontmatter.slug}`}>
                  <ListItemText primary={item.frontmatter.title} secondary={postDate} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </>
    </BasePage>
  )
}

export default Index

export async function getStaticProps() {
  const blogs = ((context: any) => {
    const keys_tmp = context.keys()
    const keys = keys_tmp.slice(0, keys_tmp.length / 2)
    const values = keys.map(context)
    const data = keys.map((key: any, index: any) => {
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3)
      const value = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        slug: slug,
      }
    })
    return data
  })(require.context("src/data", true, /\.md$/))

  const sortingArticles = blogs.sort((a: any, b: any) => {
    const aTime = new Date(a.frontmatter.date)
    const bTime = new Date(b.frontmatter.date)
    if (aTime > bTime) {
      return -1
    } else {
      return 1
    }
  })

  return {
    props: {
      blogs: JSON.parse(JSON.stringify(sortingArticles)),
    },
  }
}
