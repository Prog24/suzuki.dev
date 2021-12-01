import { writeFileSync } from "fs"
import Parser from "rss-parser"
import matter from 'gray-matter'

const baseUrl = process.env.BASE_URL

const getPosts = async () => {
  const blogs = ((context) => {
    const keys_tmp = context.keys()
    const keys = keys_tmp.slice(0, keys_tmp.length / 2)
    const values = keys.map(context)
    const data = keys.map((key, index) => {
      const value = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        slug: document.data.slug
      }
    })
    return data
  })(require.context('src/data', true, /\.md$/))
  const sortingArticles = blogs.sort((a, b) => {
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

const updateRss = async () => {
  const rssFeed = {
    Zenn: {
      rss_url: 'https://zenn.dev/prog24/feed?include_scraps=1&all=1',
      profile_url: 'https://zenn.dev/prog24'
    },
    note: {
      rss_url: 'https://note.com/Prog24/rss',
      profile_url: 'https://note.com/Prog24'
    }
  }
  const parser = new Parser()

  try {
    const jsonFeed = {
      items: []
    }
    for (const [site, info] of Object.entries(rssFeed)) {
      const feed = await parser.parseURL(info.rss_url)
      const items = feed.items.map((i) => {
        return {
          title: i.title,
          url: i.link,
          date: i.pubDate,
          site: site
        }
      })
      jsonFeed['items'] = jsonFeed['items'].concat(items)
    }
    // Add Blog RSS
    getPosts().then(posts => {
      const items = posts.map((post) => {
        const url = `${baseUrl}/blog/${post.slug}`
        return {
          title: post.frontmatter.title,
          url: url,
          date: post.frontmatter.date,
          site: 'Blog'
        }
      })
      jsonFeed['items'] = jsonFeed['items'].concat(items)
      // Sort
      jsonFeed['items'].sort((a, b) => {
        const aTime = new Date(a.date)
        const bTime = new Date(b.date)
        aTime > bTime ? -1 : 1
      })
      // write file
      writeFileSync('./src/static/rss.json', JSON.stringify(jsonFeed))
    })
  } catch(err) {
    console.error(err)
  }
}

export default updateRss
