import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import Heart from "./Heart"
import Brain from "./Brain"
import QuestionAnswering from "./QuestionAnswering"
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import Profile from "./components/Profile"
import Lungs from "./Lungs";
import ChatBot from "./chatBot";

function App() {
  return (
    <div className="App">
      <LoginButton />
      <LogoutButton />
      <Profile />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="heart" element={<Heart />} />
        <Route path="brain" element={<Brain />} />
        <Route path="Qn" element={<QuestionAnswering />} />
        <Route path="lungs" element={<Lungs />} />
        <Route path="chatBot" element={<ChatBot />} />
      </Routes>
    </div>
  )
}

export default App

/*Changes*/