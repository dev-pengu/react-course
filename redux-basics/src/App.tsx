import { useSelector } from "react-redux";
import Counter from "./components/Counter"
import type { RootState } from "./store";
import UserProfile from "./components/UserProfile";
import Auth from "./components/Auth";
import Header from "./components/Header";


function App() {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Header />
      {
        isAuthenticated ?
        <UserProfile /> :
        <Auth />
      }
      <Counter />
    </>
  )
}

export default App
