import type { NextPage } from 'next'
import { styled } from '@mui/material/styles'
import Profile from '../src/components/Profile'
import Posts from '../src/components/Posts'

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}))

const Home: NextPage = () => {
  return (
    <Root>
      <Profile />
      <Posts />
    </Root>
  )
}

export default Home
