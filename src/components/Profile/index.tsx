import { useContext } from 'react'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import { Container, Box, IconButton, Typography, Tooltip } from '@mui/material'
// Icons
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlined from '@mui/icons-material/LightModeOutlined'
import Twitter from '@mui/icons-material/Twitter'
import GitHub from '@mui/icons-material/GitHub'
import FacebookRounded from '@mui/icons-material/FacebookRounded'
import RssFeed from '@mui/icons-material/RssFeed'
import { ZennIcon } from 'src/assets/ZennIcon'
import { NoteIcon } from 'src/assets/NoteIcon'
import { ThemeModeContext } from 'src/providers/ThemeModeProvider'

const Root = styled('div')(({ theme }) => ({
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
const ProfileImage = styled('img')(({ theme }) => ({
  borderRadius: '50%',
  width: 100,
  height: 100,
}))
const ProfileAnchor = styled('a')(({ theme }) => ({
  marginRight: 8,
  color: theme.palette.text.primary,
}))
const ProfileLink = styled('p')(({ theme }) => ({
  display: 'inline-flex',
  verticalAlign: 'text-bottom',
  boxSizing: 'inherit',
  alignItems: 'center',
}))
const CustomLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'underline',
  cursor: 'pointer',
  marginRight: 8
}))

const Profile = () => {
  const { mode, setMode } = useContext(ThemeModeContext)
  return (
    <Root>
      <Container maxWidth='md'>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 1 }}>
          <Tooltip title={(mode === 'light' ? 'Dark Mode' : 'Light Mode')} placement='bottom' >
            <IconButton
              size='large'
              color='primary'
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            >
              {mode === 'light' ? <DarkModeOutlined aria-label='Dark Mode' /> : <LightModeOutlined aria-label='Light Mode' />}
            </IconButton>
          </Tooltip>
        </Box>
        <div style={{ display: 'flex' }}>
          <div style={{ minWidth: 100 }}>
            <ProfileImage src='/icon.png' alt='Icon' />
          </div>
          <div style={{ marginLeft: 24 }}>
            <Typography color='textPrimary' sx={{ marginBottom: 1 }} variant='h5'>Suzuki@Prog24</Typography>
            <Typography color='textSecondary' variant='body1'>KSU / M2<br />情報推薦技術の研究したり、フロントエンドエンジニアしたり、UIデザイナしたり</Typography>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <ProfileLink>
            <Twitter sx={{color:'#1DA1F2'}} />
            <ProfileAnchor href='https://twitter.com/Prog24_jp' target='_blank' rel="noreferrer"> Prog24_jp</ProfileAnchor>
          </ProfileLink>
          <ProfileLink>
            <GitHub sx={{color: '#171515'}} />
            <ProfileAnchor href='https://github.com/Prog24' target='_blank' rel="noreferrer"> Prog24</ProfileAnchor>
          </ProfileLink>
          <ProfileLink>
            <NoteIcon sx={{color:'#41C9B4'}} />
            <ProfileAnchor href='https://note.com/Prog24' target='_blank' rel="noreferrer"> Prog24</ProfileAnchor>
          </ProfileLink>
          <ProfileLink>
            <ZennIcon sx={{color: '#1DA1F2'}} />
            <ProfileAnchor href='https://zenn.dev/prog24' target='_blank' rel="noreferrer"> prog24</ProfileAnchor>
          </ProfileLink>
          <ProfileLink>
            <RssFeed color='primary' />
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link href='/blog'>
              <CustomLink>
                Blog
              </CustomLink>
            </Link>
          </ProfileLink>
        </div>
      </Container>
    </Root>
  )
}

export default Profile
