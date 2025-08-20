import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);

  // mock function to generate random short code
  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleClick = () => {
    if (!inputValue) {
      alert("Please enter a URL");
      return;
    }

    const createdAt = new Date();
    const expiryAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days expiry

    const newEntry = {
      originalUrl: inputValue,
      shortUrl: `https://short.ly/${generateShortCode()}`,
      createdAt: createdAt.toLocaleString(),
      expiryAt: expiryAt.toLocaleString(),
      clickCount: 0,
      clicks: [],
    };

    setShortenedUrls([...shortenedUrls, newEntry]);
    setInputValue("");
  };

  // mock adding a click (for testing)
  const addClick = (index) => {
    const newUrls = [...shortenedUrls];
    const clickData = {
      time: new Date().toLocaleString(),
      referrer: ["google.com", "facebook.com", "twitter.com", "direct"][
        Math.floor(Math.random() * 4)
      ],
      location: ["India", "USA", "Germany", "Canada"][
        Math.floor(Math.random() * 4)
      ],
    };
    newUrls[index].clicks.push(clickData);
    newUrls[index].clickCount += 1;
    setShortenedUrls(newUrls);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ marginBottom: "25px", color: "#333", textAlign: "center" }}>
          URL Shortener
        </h1>

        {/* Input Box */}
        <input
          type="text"
          placeholder="Enter URL here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: "12px 15px",
            width: "100%",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <button
          onClick={handleClick}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
            transition: "0.3s",
            marginBottom: "20px",
          }}
        >
          Shorten URL
        </button>

        {/* Display Shortened URLs */}
        {shortenedUrls.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#f9f9f9",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "20px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <p>
              <b>Original URL:</b> {item.originalUrl}
            </p>
            <p>
              <b>Shortened URL:</b>{" "}
              <a href={item.originalUrl} target="_blank" rel="noreferrer">
                {item.shortUrl}
              </a>
            </p>
            <p>
              <b>Created At:</b> {item.createdAt}
            </p>
            <p>
              <b>Expiry At:</b> {item.expiryAt}
            </p>
            <p>
              <b>Total Clicks:</b> {item.clickCount}
            </p>

            <button
              onClick={() => addClick(index)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                borderRadius: "8px",
                border: "none",
                background: "#667eea",
                color: "white",
                cursor: "pointer",
              }}
            >
              Simulate Click
            </button>

            {/* Click Details */}
            {item.clicks.length > 0 && (
              <div style={{ marginTop: "15px" }}>
                <h4>Click Details:</h4>
                <ul>
                  {item.clicks.map((c, i) => (
                    <li key={i}>
                      {c.time} | Referrer: {c.referrer} | Location: {c.location}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;