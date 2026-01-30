import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Función para desplazar al final del chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

  const enviarMensaje = () => {
    const texto = input.trim();
    if (!texto) return;

    // Añade el mensaje del usuario
    setMensajes((prev) => [...prev, { texto, tipo: "usuario" }]);
    setInput("");

    // Llamada al backend
    fetch("http://localhost:8080/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(texto),
    })
      .then((res) => res.text())
      .then((respuesta) => {
        setMensajes((prev) => [...prev, { texto: respuesta, tipo: "bot" }]);
      })
      .catch((err) => {
        console.error("Error al enviar mensaje:", err);
        setMensajes((prev) => [
          ...prev,
          { texto: "Error al enviar mensaje", tipo: "error" },
        ]);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") enviarMensaje();
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="btn btn-primary shadow"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          zIndex: 2001,
        }}
      >
        <strong>Chat</strong>
      </button>

      {/* Ventana del chat */}
      {chatOpen && (
        <div
          className="shadow p-3 mb-5 bg-white rounded-4"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "380px",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="card-header bg-primary text-white text-center  mb-2 rounded-4">
            Chat
          </div>

          <div
            className="card-body"
            style={{ flex: 1, overflowY: "auto" }}
          >
            {mensajes.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.tipo === "usuario"
                    ? "text-end"
                    : msg.tipo === "bot"
                    ? "text-start"
                    : "text-start"
                }`}
              >
                <span
                    className={`badge ${
                        msg.tipo === "usuario"
                        ? "bg-primary"
                        : msg.tipo === "bot"
                        ? "bg-secondary"
                        : "bg-danger"
                    }`}
                    style={{
                        display: "inline-block",      
                        maxWidth: "90%",               
                        whiteSpace: "normal",          
                        wordBreak: "break-word",       
                        textAlign: "start",
                    }}
                    >
                  {msg.texto}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="card-footer">
            <div className="input-group shadow">
              <input
                type="text"
                className="form-control"
                placeholder="Escribe..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="btn btn-primary" onClick={enviarMensaje}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
