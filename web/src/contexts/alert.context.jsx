import { createContext, useState, useContext } from "react";

// Creamos el contexto
export const AlertContext = createContext();

// Hook personalizado para acceder al contexto
export const useAlert = () => useContext(AlertContext);

// Componente proveedor del contexto
export const AlertProvider = ({ children }) => {
  const [error, setError] = useState(null);

  // Función para mostrar la alerta
  const showAlert = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000); // Ocultar la alerta después de 5 segundos
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {error && (
        <div className="speech speech-up" role="alert">
          <i className="fa-solid fa-circle-exclamation"></i>&nbsp;&nbsp;{error}
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
};