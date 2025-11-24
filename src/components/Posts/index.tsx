import Link from "next/link"
import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import RssFeed from "@mui/icons-material/RssFeed"
import { ZennIcon } from "src/assets/ZennIcon"
import { NoteIcon } from "src/assets/NoteIcon"
import rssData from "src/static/rss.json"
import formatDate from "src/utils/formatDate"

const PostMeta = styled(Typography)(({ theme }) => ({
  display: "inline-flex",
  verticalAlign: "text-bottom",
  boxSizing: "inherit",
  alignItems: "center",
}))

const Posts = () => {
  return (
    <List>
      {rssData.map((data, key) => {
        const formattedDate = formatDate(data.date)
        return (
          <ListItem key={key} disablePadding divider>
            {data.site === "Blog" ? (
              <ListItemButton disableGutters component={Link} href={data.url}>
                <ListItemText
                  disableTypography
                  primary={<Typography color="textPrimary">{data.title}</Typography>}
                  secondary={
                    <PostMeta color="textSecondary">
                      <RssFeed fontSize="small" color="primary" />
                      {data.site} / {formattedDate}
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
                      {data.site} / {formattedDate}
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
