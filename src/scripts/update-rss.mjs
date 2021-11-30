// 参考：https://zenn.dev/nikaera/articles/hugo-react-dev
import { writeFileSync } from "fs"
import Parser from "rss-parser"
const parser = new Parser()

const rssFeed = {
  Zenn: {
    rss_url: 'https://zenn.dev/prog24/feed?include_scraps=1&all=1',
    profile_url: 'https://zenn.dev/prog24'
  },
  note: {
    rss_url: 'https://note.com/Prog24/rss',
    profile_url: 'https://note.com/Prog24'
  },
  Blog: {
    // rss_url: 'https://old.prog24.com/rss',
    rss_url: 'https://suzuki.dev/rss/feed.xml',
    profile_url: 'https://old.prog24.com'
  }
}

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

  jsonFeed['items'].sort((a,b) => {
    const aTime = new Date(a.date)
    const bTime = new Date(b.date)
    aTime > bTime ? -1 : 1
  })

  writeFileSync('./src/static/rss.json', JSON.stringify(jsonFeed))
} catch(err) {
  console.error(err)
}
