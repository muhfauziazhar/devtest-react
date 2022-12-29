import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartData }) => {
    return (
        <div className="chart-container">
            <Bar
                data={chartData}
                height={"100px"}
                width={"100px"}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Compliance Percentage for every Product in every Province",
                        },
                        legend: {
                            display: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default BarChart;
