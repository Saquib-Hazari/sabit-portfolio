import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Homepage from "./pages/HomePage/Homepage";
import Project from "./pages/Project";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddProject from "./pages/ProjectBlog/ProjectBlog";
import { AuthProvider } from "./context/authContext";
import ProjectDetail from "./pages/ProjectBlog/ProjectDetails";
import Forgotpassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="/project" element={<Project />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/add-project" element={<AddProject />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/forgot-password" element={<Forgotpassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />{" "}
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
