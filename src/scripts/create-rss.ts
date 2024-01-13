import fs from "fs"
import { Feed } from "feed"
import matter from "gray-matter"

const generatedRssFeed = () => {
  const baseUrl = process.env.BASE_URL
  const date = new Date()
  const author = {
    name: "Suzuki@Prog24",
    link: "https://suzuki.dev",
  }

  const feed = new Feed({
    title: "Suzuki@Prog24",
    description: "Suzuki@Prog24",
    id: baseUrl ? baseUrl : "http://localhost:3000",
    link: baseUrl,
    language: "ja",
    image: `${baseUrl}/icon.png`,
    copyright: `All rights reserved Suzuki@Prog24`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
    },
    author: author,
  })

  const getPosts = async () => {
    const blogs = ((context: any) => {
      const keys_tmp = context.keys()
      const keys = keys_tmp.slice(0, keys_tmp.length / 2)
      const values = keys.map(context)
      const data = keys.map((key: any, index: any) => {
        // let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
        const value = values[index]
        const document = matter(value.default)
        return {
          frontmatter: document.data,
          slug: document.data.slug,
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
    return JSON.parse(JSON.stringify(sortingArticles))
  }
  getPosts()
    .then((posts) => {
      posts.forEach((post: any) => {
        let url = `${baseUrl}/blog/${post.slug}`
        feed.addItem({
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          id: url,
          link: url,
          date: new Date(post.frontmatter.date),
        })
      })
      fs.mkdirSync("./public/rss", { recursive: true })
      fs.writeFileSync("./public/rss/feed.xml", feed.rss2())
    })
    .catch((err) => {
      console.error(err)
    })
}

export default generatedRssFeed
