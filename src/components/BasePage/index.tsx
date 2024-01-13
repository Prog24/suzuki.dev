import type { NextPage } from "next"
import { styled } from "@mui/material/styles"
import { Container, Paper } from "@mui/material"
import Profile from "src/components/Profile"

const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}))
const Content = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))
const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}))

const BasePage = ({ children }: { children: JSX.Element }) => {
  return (
    <Root>
      <Profile />
      <Content maxWidth="md">
        <CustomPaper>{children}</CustomPaper>
      </Content>
    </Root>
  )
}

export default BasePage
