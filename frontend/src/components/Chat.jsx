import { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

export default function Chat() {
  const { getAccessTokenSilently } = useAuth0()
  const [message, setMessage] = useState("")
  const [city, setCity] = useState("")
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    setLoading(true)
    const token = await getAccessTokenSilently()
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/chat`,
      { message, city },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setResponse(res.data)
    setLoading(false)
  }

  return (
    <div>
      <input
        placeholder="Ask something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        placeholder="City (optional)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>

      {response && (
        <div>
          <p>{response.response}</p>
          {response.weather && (
            <p>
              {response.weather.city}: {response.weather.temp_c}°C, {response.weather.description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}