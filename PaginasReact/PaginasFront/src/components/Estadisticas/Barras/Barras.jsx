import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LoadingDisc from "../../LoadingDisc.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Barras() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let timer = null;
    let mounted = true;

    const fetchEstadisticas = async () => {
      try {
        const response = await fetch("/api/estadisticas/barras");

        if (!response.ok) {
          throw new Error("Error al obtener estadísticas");
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);



        const labels = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];

        const baseDataset = {
          label: "Preguntas por mes",
          backgroundColor: "rgba(40, 167, 69, 0.6)",
          borderRadius: 6,
        };

        // Inicializar gráfico en 0 para animación
        setChartData({ labels, datasets: [{ ...baseDataset, data: Array(12).fill(0) }] });

        // Actualizar con datos reales tras 1s
        timer = setTimeout(() => {
          if (!mounted) return;
          setChartData({ labels, datasets: [{ ...baseDataset, data: (data.preguntasMes || []).map(v => v || 0) }] });
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

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '350px' }}><LoadingDisc/></div>;
  if (!chartData) return <p>No hay datos disponibles</p>;

  // `chartData` se gestiona en el efecto: empieza con ceros y se actualiza tras 1s para animación
  // Por tanto, usamos `chartData` en el componente en lugar de reconstruir `data` aquí.


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div style={{ height: "350px", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
