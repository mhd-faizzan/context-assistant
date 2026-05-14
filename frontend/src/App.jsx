import { useAuth0 } from "@auth0/auth0-react"
import Profile from "./components/Profile"
import Chat from "./components/Chat"

export default function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  if (isLoading) return <div>Loading...</div>

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Context Assistant</h1>
        <button onClick={() => loginWithRedirect()}>Login</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Hey, {user.name} 👋</h1>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Logout
      </button>
      <Profile />
      <Chat />
    </div>
  )
}