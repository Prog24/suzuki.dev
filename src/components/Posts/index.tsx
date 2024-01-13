import Link from "next/link"
import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import RssFeed from "@mui/icons-material/RssFeed"
import { ZennIcon } from "src/assets/ZennIcon"
import { NoteIcon } from "src/assets/NoteIcon"
import rssData from "src/static/rss.json"

const PostMeta = styled(Typography)(({ theme }) => ({
  display: "inline-flex",
  verticalAlign: "text-bottom",
  boxSizing: "inherit",
  alignItems: "center",
}))

const Posts = () => {
  const formatDate = (date: any, format: string) => {
    format = format.replace(/yyyy/g, date.getFullYear())
    format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2))
    format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2))
    return format
  }
  return (
    <List>
      {rssData.map((data, key) => {
        const date = new Date(data.date)
        const hoge = formatDate(date, "yyyy.MM.dd")
        return (
          <ListItem key={key} disablePadding divider>
            {data.site === "Blog" ? (
              <ListItemButton disableGutters component="a" href={data.url}>
                <ListItemText
                  disableTypography
                  primary={<Typography color="textPrimary">{data.title}</Typography>}
                  secondary={
                    <PostMeta color="textSecondary">
                      <RssFeed fontSize="small" color="primary" />
                      {data.site} / {hoge}
                    </PostMeta>
                  }
                />
              </ListItemButton>
            ) : (
              <ListItemButton rel="noopener noreferrer" disableGutters component="a" href={data.url} target="_blank">
                <ListItemText
                  disableTypography
                  primary={<Typography color="textPrimary">{data.title}</Typography>}
                  secondary={
                    <PostMeta color="textSecondary">
                      {data.site === "Zenn" ? (
                        <ZennIcon fontSize="small" sx={{ color: "#1DA1F2" }} />
                      ) : data.site === "note" ? (
                        <NoteIcon fontSize="small" sx={{ color: "#41C9B4" }} />
                      ) : (
                        <RssFeed fontSize="small" color="primary" />
                      )}
                      {data.site} / {hoge}
                    </PostMeta>
                  }
                />
              </ListItemButton>
            )}
          </ListItem>
        )
      })}
    </List>
  )
}

export default Posts
