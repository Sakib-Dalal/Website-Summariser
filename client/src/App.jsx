import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [url, setUrl] = React.useState("");
  const [responseData, setResponseData] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post("http://127.0.0.1:8080/submit", { url });
      setResponseData(response.data.llm_res);
    } catch (error) {
      console.error("Error submitting URL: ", error);
    } finally {
      setLoading(false); // Reset loading state to false
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <hr />
      <img src="/assets/img.png" style={{ height: "150px", borderRadius: "50px"}}></img>
      <hr></hr>
      <h1 style={{ fontFamily: "monospace", fontWeight: "lighter" }}>
        Web Page Summarizer
      </h1>
      <hr />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Web Page URL Here"
          style={{
            padding: "10px",
            fontSize: "12px",
            width: "240px",
            borderRadius: "10px",
          }}
          disabled={loading} // Disable input during loading
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px",
            fontSize: "12px",
            cursor: "select",
            borderRadius: "10px",
            backgroundColor: loading ? "#ccc" : "", // Visual feedback for button
          }}
          disabled={loading} // Disable button during loading
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {responseData && (
        <div
          style={{
            margin: "50px 50px",
            textAlign: "left",
            fontFamily: "'Lucida Console', 'Courier New', monospace",
            fontSize: "16px",
          }}
        >
          <ReactMarkdown>{responseData}</ReactMarkdown>
        </div>
      )}
      <br></br>
      <br></br>
      <hr></hr>
    </div>
  );
}

export default App;