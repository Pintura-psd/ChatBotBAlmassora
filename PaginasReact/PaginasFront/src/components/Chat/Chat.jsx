import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatWindow.css";

const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Función para desplazar al final del chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //Funcion de abertura y cierre del chat.

    const [closing, setClosing] = useState(false);

    const toggleChat = () => {
    if (chatOpen) {
    setClosing(true);
    setTimeout(() => {
    setChatOpen(false);
    setClosing(false);
    }, 400); // Debe coincidir con la animación CSS
    } else {
    setChatOpen(true);
    }
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

    // Mensaje de loading
    const loadingId = Date.now(); // ID único
    setMensajes((prev) => [...prev, { id: loadingId, tipo: "loading" }]);
    
    // Llamada al backend
    fetch("http://localhost:8080/api/chat_fast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(texto),
    })
      .then((res) => res.text())
      .then((respuesta) => {
        // Reemplaza el mensaje de loading por la respuesta
        setMensajes((prev) => 
             prev.map((m) =>
                    m.id === loadingId ? { id: loadingId, texto: respuesta, tipo: "bot" } : m
            )  
        );
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
        onClick={toggleChat}
        className="btn btn-dark shadow"
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
        <div className={`chat-offcanvas ${chatOpen ? "open" : ""} ${closing ? "closing" : ""} p-3 bg-white rounded-4 border border-dark`}
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "350px",
            height: "420px",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="card-header bg-dark text-white text-center  mb-2 rounded-4">
            <strong>Ayuntamiento de Almassora</strong>
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
                        : msg.tipo === "bot" || msg.tipo === "loading"
                        ? "text-start"
                        : "text-start"
                    }`}
                >
                    <span
                    className={`badge ${
                        msg.tipo === "usuario"
                        ? "bg-dark"
                        : msg.tipo === "bot"
                        ? "bg-secondary"
                        : msg.tipo === "error"
                        ? "bg-danger"
                        : "bg-light text-dark"
                    }`}
                    style={{
                        display: "inline-block",
                        maxWidth: "90%",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        textAlign: "start",
                    }}
                    >
                    {msg.tipo === "loading" ? (
                        <span className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                        </span>
                    ) : (
                        msg.texto
                    )}
                    </span>
                </div>
                ))}
            <div ref={chatEndRef} />
          </div>

          <div className="card-footer">
              <label htmlFor="mensaje" className="visually-hidden">
                  Mensaje
              </label>
              <div className="input-group border border-dark rounded-3">



                  <input
                      id="mensaje"
                      type="text"
                      className="form-control border-dark"
                      placeholder="Escribe..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                  />
                  <button className="btn btn-dark" onClick={enviarMensaje}>
                      Enviar
                  </button>
              </div>
          </div>
        </div>
    </>
  );
};

export default ChatBot;
