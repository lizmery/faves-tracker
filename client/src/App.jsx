import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Header from "./components/Header"
import FooterComponent from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import Search from "./pages/Search"
import TrackerPage from "./pages/TrackerPage"

//TODO: create ABOUT, and CONTACT pages

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route element={<PrivateRoute />}>
              <Route path="/search" element={<Search />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tracker/:trackerId" element={<TrackerPage />} />
            </Route>
        </Routes>
        <FooterComponent />
    </BrowserRouter>
  )
}

export default App