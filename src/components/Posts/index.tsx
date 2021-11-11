import { Container, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'
import rssData from '../../../static/rss.json'

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

const Posts = () => {
  const formatDate = (date: any, format: string) => {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    return format
  }
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

export default Posts
