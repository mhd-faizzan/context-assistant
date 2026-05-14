import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

export default function Profile() {
  const { getAccessTokenSilently, user } = useAuth0()
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getAccessTokenSilently()
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProfile(res.data)
      } catch (err) {
        setError("Could not load profile")
      }
    }
    fetchProfile()
  }, [])

  const name = profile?.name || user?.name
  const email = profile?.email || user?.email

  if (error) return <p style={{ color: "#ef4444" }}>{error}</p>
  if (!profile) return <p>Loading profile...</p>

  return (
    <div className="profile">
      <p>Name: <span>{name}</span></p>
      <p>Email: <span>{email}</span></p>
    </div>
  )
}