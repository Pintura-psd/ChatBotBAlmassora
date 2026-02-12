import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import LoadingDisc from "../LoadingDisc.jsx";

export default function Pie() {
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let timer = null;
    let mounted = true;

    const fetchEstadisticas = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/estadisticas");

        if (!response.ok) {
          throw new Error("Error al obtener estadísticas");
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);

        if (!mounted) return;

        setEstadisticas(data);

        // Preparar etiquetas y colores
        const labels = [
          `Preguntas respondidas (${data.preguntasBien})`,
          `Preguntas sin respuesta (${data.preguntasSinRespuesta})`,
          `Total de preguntas (${data.totalPreguntas})`,
        ];

        const baseDataset = {
          label: "Estado de las preguntas",
          backgroundColor: [
            "rgba(40, 167, 69, 0.6)", // verde
            "rgba(255, 193, 7, 0.6)", // amarillo
            "rgba(0, 123, 255, 0.6)", // azul
          ],
          borderWidth: 1,
        };

        // Mostrar gráfico vacío primero (ceros)
        setChartData({
          labels,
          datasets: [{ ...baseDataset, data: [0, 0, 0] }],
        });

        // Después de 1 segundo, actualizar con los datos reales para que se vea la animación
        timer = setTimeout(() => {
          if (!mounted) return;
          setChartData({
            labels,
            datasets: [
              {
                ...baseDataset,
                data: [
                  data.preguntasBien || 0,
                  data.preguntasSinRespuesta || 0,
                  data.totalPreguntas || 0,
                ],
              },
            ],
          });
        }, 100);
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchEstadisticas();

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "350px" }}>
        <LoadingDisc />
      </div>
    );
  }

  if (!chartData) {
    return <p>No hay datos disponibles</p>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    animation: {
      duration: 1800,
      easing: "easeOutQuart",
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
