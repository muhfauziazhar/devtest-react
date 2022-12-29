import "./App.css";
import BarChart from "./components/BarChart";
import Table from "./components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import MultipleSelectChip from "./components/MultipleSelectChip";
import DatePick from "./components/DatePick";
import Button from "@mui/material/Button";

const backgroundColor = [
    "rgba(255, 26, 104, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(103, 102, 155, 0.2)",
];

function App() {
    useEffect(() => {
        axios
            .get("http://localhost:8080/report-product")
            .then((res) => {
                setData([...res.data]);
                setAreaLabels([...new Set(res.data.map((data) => data.area_name))]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [data, setData] = useState([]);
    const [areaLabels, setAreaLabels] = useState([]);
    const [tempAreaLabels, setTempAreaLabels] = useState([]);

    const [startDate, setStartDate] = useState(null);
    const [tempStartDate, setTempStartDate] = useState(null);

    const [endDate, setEndDate] = useState(null);
    const [tempEndDate, setTempEndDate] = useState(null);

    const dataProducts = data.length === 0 ? [] : [...new Set(data.map((data) => data.product_name))];
    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log(start, end);

    const dummyDatasets = [
        {
            label: "Product A",
            data: [40, 60],
            backgroundColor: "rgba(255, 26, 104, 0.2)",
        },
        {
            label: "Product B",
            data: [30, 40],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
    ];

    const dataSets = [];
    for (let i = 0; i < dataProducts.length; i++) {
        dataSets.push({
            label: dataProducts[i],
            data: data
                ?.filter((data) => {
                    if (startDate && endDate) {
                        return (
                            data.product_name === dataProducts[i] &&
                            areaLabels.includes(data.area_name) &&
                            new Date(data.tanggal).getTime() >= start.getTime() &&
                            new Date(data.tanggal).getTime() <= end.getTime()
                        );
                    } else if (startDate) {
                        return (
                            data.product_name === dataProducts[i] &&
                            areaLabels.includes(data.area_name) &&
                            new Date(data.tanggal).getTime() >= start.getTime()
                        );
                    } else if (endDate) {
                        return (
                            data.product_name === dataProducts[i] &&
                            areaLabels.includes(data.area_name) &&
                            new Date(data.tanggal).getTime() <= end.getTime()
                        );
                    } else {
                        return data.product_name === dataProducts[i] && areaLabels.includes(data.area_name);
                    }
                })
                .map((data) => data.compliance_percentage),
            backgroundColor: backgroundColor[i],
        });
    }

    const handleClickView = (e) => {
        e.preventDefault();
        setAreaLabels(tempAreaLabels);
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
    };

    const chartData = {
        labels: areaLabels.sort(),
        datasets: dataSets,
    };

    return (
        <div>
            <div className="filter-container">
                <div>
                    <MultipleSelectChip areaLabels={tempAreaLabels} setAreaLabels={setTempAreaLabels} />
                </div>
                <div>
                    <DatePick date={tempStartDate} setDate={setTempStartDate} label={"Start Date"} />
                </div>
                <div>
                    <DatePick date={tempEndDate} setDate={setTempEndDate} label={"End Date"} />
                </div>
                <div>
                    <Button sx={{ color: "gray", borderColor: "gray" }} onClick={handleClickView} variant="outlined">
                        View
                    </Button>
                </div>
            </div>

            <div className="canvas-container">
                <BarChart chartData={chartData} />
            </div>
            <div className="table-container">
                <Table chartData={chartData} />
            </div>
        </div>
    );
}

export default App;
