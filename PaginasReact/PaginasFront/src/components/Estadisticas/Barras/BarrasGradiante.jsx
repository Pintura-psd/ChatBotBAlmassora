import { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import LoadingDisc from "../../LoadingDisc.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function LineaMensual() {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );

    gradient.addColorStop(0, "rgb(182, 17, 17)");
    gradient.addColorStop(0.5, "rgb(255, 217, 0)");
    gradient.addColorStop(1, "rgba(40, 167, 69, 0.8)");

    return gradient;
  };

  useEffect(() => {
    let timer = null;
    let mounted = true;

    const fetchBarras = async () => {
      try {
        const response = await fetch("/api/estadisticas/barras");

        if (!response.ok) {
          throw new Error("Error al obtener datos");
        }

        const data = await response.json();
        if (!mounted) return;
        

        const labels = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        const baseDataset = {
          label: "Preguntas por mes",
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
        };

        // Inicializar con ceros para la animación
        setChartData({ labels, datasets: [{ ...baseDataset, data: Array(12).fill(0), borderColor: (context) => { try { const { chart } = context; const { ctx, chartArea } = chart || {}; if (!chartArea) return "rgba(40, 167, 69, 0.6)"; return createGradient(ctx, chartArea); } catch (e) { console.error('Gradient error', e); return "rgba(40, 167, 69, 0.6)"; } }, backgroundColor: (context) => { try { const { chart } = context; const { ctx, chartArea } = chart || {}; if (!chartArea) return "rgba(40, 167, 69, 0.4)"; return createGradient(ctx, chartArea); } catch (e) { console.error('Gradient error', e); return "rgba(40, 167, 69, 0.4)"; } } }] });

        // Tras 1s actualizar con los datos reales
        timer = setTimeout(() => {
          if (!mounted) return;
          setChartData({ labels, datasets: [{ ...baseDataset, data: (data.preguntasMes || []).map(v => v || 0), borderColor: (context) => { try { const { chart } = context; const { ctx, chartArea } = chart || {}; if (!chartArea) return "rgba(40, 167, 69, 0.6)"; return createGradient(ctx, chartArea); } catch (e) { console.error('Gradient error', e); return "rgba(40, 167, 69, 0.6)"; } }, backgroundColor: (context) => { try { const { chart } = context; const { ctx, chartArea } = chart || {}; if (!chartArea) return "rgba(40, 167, 69, 0.4)"; return createGradient(ctx, chartArea); } catch (e) { console.error('Gradient error', e); return "rgba(40, 167, 69, 0.4)"; } } }] });
        }, 100);
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBarras();

    return () => { mounted = false; if (timer) clearTimeout(timer); };
  }, []);

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '350px' }}><LoadingDisc/></div>;
  if (!chartData) return <p>No hay datos</p>;

  

  // `chartData` se inicializa en el efecto (ceros) y se actualiza tras 1s para la animación
  // Usamos `chartData` en el render en lugar de construir `data` aquí.


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
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
}
