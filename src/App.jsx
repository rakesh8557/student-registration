import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./components/About"
import Navbar from "./components/Navbar"
import Login from "./components/Signin"
import Signup from "./components/Signup"
import AddnewStudent from "./components/AddNewStudent"
import EditStudent from "./components/EditStudent"

const Home = lazy(() => import("./components/Home"));


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={
            <Suspense fallback={<div>Loading ...</div>}>
              <Home />
            </Suspense>
          } />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Login />} />
          <Route exact path="/addNewStudent" element={<AddnewStudent />} />
          <Route path="/editStudent/:id" element={<EditStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
