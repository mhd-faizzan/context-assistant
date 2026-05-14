import { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

export default function Chat() {
  const { getAccessTokenSilently } = useAuth0()
  const [message, setMessage] = useState("")
  const [city, setCity] = useState("")
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = async () => {
    if (!message.trim()) return
    setLoading(true)
    setError(null)
    try {
      const token = await getAccessTokenSilently()
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        { message, city },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setResponse(res.data)
    } catch (err) {
      setError("Something went wrong. Is the backend running?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat">
      <div className="chat-inputs">
        <input
          placeholder="Ask something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <input
          placeholder="City (optional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>

      {error && <p style={{ color: "#ef4444", marginTop: "10px" }}>{error}</p>}

      {response && (
        <div className="response">
          <p>{response.response}</p>
          {response.weather && (
            <span className="weather-pill">
              {response.weather.city}: {response.weather.temp_c}°C, {response.weather.description}
            </span>
          )}
        </div>
      )}
    </div>
  )
}