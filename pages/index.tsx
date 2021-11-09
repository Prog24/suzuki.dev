import { useState } from 'react'
import type { NextPage } from 'next'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlined from '@mui/icons-material/LightModeOutlined'
import { styled, ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from '../src/styling/theme'
import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Container, IconButton, createTheme } from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import rssData from '../static/rss.json'

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}))
const ProfileRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: '100%',
  borderTop: `8px solid ${theme.palette.primary.main}`,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8),
    paddingTop: theme.spacing(4),
  },
}))
const PostListArea = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))
const PostLists = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}))
const ProfileImage = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  width: 100,
  height: 100,
}))
const ProfileLink = styled('a')(({ theme }) => ({
  marginRight: 8,
  color: theme.palette.text.primary,
}))



const Home: NextPage = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const theme = createTheme(mode === 'light' ? lightTheme : darkTheme)
  const Profile = () => (
    <ProfileRoot>
      <Container maxWidth='md'>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 1 }}>
          <IconButton
            size='large'
            color='primary'
            onClick={() => {setMode(mode === 'light' ? 'dark' : 'light')}}
          >
            {mode === 'light' ? <DarkModeOutlined aria-label='Dark Mode' /> : <LightModeOutlined aria-label='Light Mode' />}
          </IconButton>
        </Box>
        <div style={{ display: 'flex' }}>
          <div style={{ minWidth: 100 }}>
            <ProfileImage src='./icon.png' alt='Icon' />
          </div>
          <div style={{ marginLeft: 24 }}>
            <Typography color='textPrimary' sx={{ marginBottom: 1 }} variant='h5'>Suzuki@Prog24</Typography>
            <Typography color='textSecondary' variant='body1'>KSU / M2<br />情報推薦技術の研究したり、フロントエンドエンジニアしたり、UIデザイナしたり</Typography>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <p style={{ display: 'inline-block' }}>
            <FontAwesomeIcon width='22' icon={faTwitter} size='lg' color='#1DA1F2' />
            <ProfileLink href='https://twitter.com/Prog24_jp' target='_blank' rel="noreferrer"> Prog24_jp</ProfileLink>
          </p>
          <p style={{ display: 'inline-block' }}>
            <FontAwesomeIcon width='22' icon={faGithub} size='lg' color='#171515' />
            <ProfileLink href='https://github.com/Prog24' target='_blank' rel="noreferrer"> Prog24</ProfileLink>
          </p>
          <p style={{ display: 'inline-block' }}>
            <FontAwesomeIcon width='22' icon={faFacebook} size='lg' color='#4267B2' />
            <ProfileLink href='https://fb.me/suzuki.kenta.0808' target='_blank' rel="noreferrer"> suzuki.kenta.0808</ProfileLink>
          </p>
          <p style={{ display: 'inline-block' }}>
            <FontAwesomeIcon width='22' icon={faRss} size='lg' color='#41C9B4' />
            <ProfileLink href='https://note.com/Prog24' target='_blank' rel="noreferrer"> note.com/Prog24</ProfileLink>
          </p>
          <p style={{ display: 'inline-block' }}>
            <FontAwesomeIcon width='22' icon={faRss} size='lg' color='#3EA8FF' />
            <ProfileLink href='https://zenn.dev/prog24' target='_blank' rel="noreferrer"> zenn.dev/prog24</ProfileLink>
          </p>
        </div>
      </Container>
    </ProfileRoot>
  )
  const formatDate = (date: any, format: string) => {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    return format
  }
  const PostList = () => {
    return (
      <PostListArea maxWidth='md'>
        <PostLists>
          {rssData.items.map((data, key) => {
            const date = new Date(data.date)
            const hoge = formatDate(date, 'yyyy.MM.dd')
            return (
              <ListItem key={key} disablePadding divider>
                <ListItemButton rel='noopener noreferrer' disableGutters component='a' href={data.url} target='_blank'>
                  <ListItemText primaryTypographyProps={{color:'textPrimary'}} primary={data.title} secondary={`${hoge} - ${data.site}`} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </PostLists>
      </PostListArea>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Profile />
        <PostList />
      </Root>
    </ThemeProvider>
  )
}

export default Home
