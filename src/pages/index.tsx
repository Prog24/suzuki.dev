import type { NextPage } from "next"
import Posts from "src/components/Posts"
import BasePage from "src/components/BasePage"
import generatedRssFeed from "src/scripts/create-rss"
import updateRss from "src/scripts/updateRss"

const Home: NextPage = () => {
  return (
    <BasePage>
      <Posts />
    </BasePage>
  )
}

export default Home

export async function getStaticProps() {
  generatedRssFeed()
  updateRss()
  return {
    props: {
      //
    },
  }
}
