import Chart from 'react-apexcharts'

export type ApexChartProps = {
    data: number[]
}

const ApexChart = ({ data }: ApexChartProps) => {
    const options = {
        chart: { id: 'apex-chart' },
        xaxis: { categories: data.map((_, idx) => idx + 1) }
    }
    const series = [{ name: 'Value', data }]

    return <Chart options={options} series={series} type="line" width="100%" height="100%" />
}

export default ApexChart
