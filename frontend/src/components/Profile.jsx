import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

export default function Profile() {
  const { getAccessTokenSilently } = useAuth0()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await getAccessTokenSilently()
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProfile(res.data)
    }
    fetchProfile()
  }, [])

  if (!profile) return <p>Loading profile...</p>

  return (
    <div>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  )
}