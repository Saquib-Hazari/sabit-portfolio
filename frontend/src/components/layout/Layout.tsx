import { Box } from "@chakra-ui/react";

import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
