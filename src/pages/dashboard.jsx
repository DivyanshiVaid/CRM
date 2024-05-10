import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import { LineChartOutlined, BarChartOutlined } from '@ant-design/icons';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const { Content } = Layout;

const Dashboard = () => {
    // dummy data for the line and bar chart
    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const barChartData = {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        datasets: [
            {
                label: 'Sales',
                data: [150, 200, 120, 180],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <Content style={{ padding: '50px' }}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="Line Chart" extra={<LineChartOutlined />}>
                        <Line data={lineChartData} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Bar Chart" extra={<BarChartOutlined />}>
                        <Bar data={barChartData} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="Bar Chart" extra={<BarChartOutlined />}>
                        <Bar data={barChartData} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Line Chart" extra={<LineChartOutlined />}>
                        <Line data={lineChartData} />
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default Dashboard;
