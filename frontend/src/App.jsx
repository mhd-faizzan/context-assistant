import { useAuth0 } from "@auth0/auth0-react"
import Profile from "./components/Profile"
import Chat from "./components/Chat"

export default function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  if (isLoading) return <div>Loading...</div>

  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <h1>Context Assistant</h1>
        <p>Your AI assistant that knows who you are</p>
        <button onClick={() => loginWithRedirect()}>Login</button>
      </div>
    )
  }

  return (
    <div>
      <button className="logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Logout
      </button>
      <h1>Hey, {user.name} 👋</h1>
      <Profile />
      <Chat />
    </div>
  )
}