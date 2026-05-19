import * as React from "react";
import {
  AppBar,
  Button,
  Box,
  Stack,
  Toolbar,
  Typography,
  Container,
  Paper,
  styled,
} from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";

const Item = styled(Paper)(() => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function AppShell() {
  const headerFooterStyle = {
    textAlign: "center",
    height: 50,
  };

  const mainStyle = {
    padding: "8px 16px",
    cursor: "pointer",
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ display: "block", minHeight: "100vh" }}>
      <AppBar position="sticky">
        <Item sx={headerFooterStyle}>
          <Typography variant="h5" sx={mainStyle} onClick={() => navigate("/")}>
            Inventory Maintainance
          </Typography>
        </Item>
      </AppBar>
      <Container maxWidth="lg" sx={{py: 3}}>
        <Outlet/>
      </Container>
    </Box>
  );
}
