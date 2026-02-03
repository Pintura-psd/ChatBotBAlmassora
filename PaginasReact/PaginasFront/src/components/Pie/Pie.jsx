import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

export default function Pie() {
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/estadisticas"
        );

        if (!response.ok) {
          throw new Error("Error al obtener estadísticas");
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);
        setEstadisticas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);

  if (loading) {
    return <p>Cargando estadísticas...</p>;
  }

  if (!estadisticas) {
    return <p>No hay datos disponibles</p>;
  }

  const data = {
    labels: [
        `Preguntas respondidas (${estadisticas.preguntasBien})`,
        `Preguntas sin respuesta (${estadisticas.preguntasSinRespuesta})`,
        `Total de preguntas (${estadisticas.totalPreguntas})`
      
    ],
    datasets: [
      {
        label: "Estado de las preguntas",
        data: [
            estadisticas.preguntasBien,
            estadisticas.preguntasSinRespuesta,
            estadisticas.totalPreguntas,
        ],

        backgroundColor: [
            "rgba(40, 167, 69, 0.6)", // verde para respondidas
            "rgba(255, 193, 7, 0.6)", // amarillo para sin respuesta
            "rgba(0, 123, 255, 0.6)"    // azul para total
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-6">
            <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
