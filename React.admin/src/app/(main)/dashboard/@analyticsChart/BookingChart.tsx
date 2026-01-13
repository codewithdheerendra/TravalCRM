"use client"

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
// import { ArrowUp } from 'lucide-react';

// --- PROPS INTERFACE ---
// Defines the shape of the data and props the component expects.
export interface ChartDataPoint {
    name: string;
    success: number;
    cancel: number;
}

interface BookingChartProps {
    chartData: ChartDataPoint[];
    totalBooking: string;
    bookingLabel: string;
    percentageChange: number;
    percentageLabel: string;
}

const CustomLegend = () => {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-sm text-gray-700">Success</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-red-500">Cancel</span>
            </div>
        </div>
    );
};

const BookingChart: React.FC<BookingChartProps> = ({
    chartData,
    totalBooking,
    bookingLabel,
    percentageChange,
    percentageLabel,
}) => {
    const referenceDataPoint = chartData[4];

    return (
        <div className="border border-gray-200 p-2 rounded-2xl w-full max-w-2xl mx-auto font-sans">
            <div >
                <CustomLegend />
            </div>

            <div style={{ width: '100%', height: 100 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 20, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={false} />
                        <YAxis axisLine={false} tickLine={false} tick={false} />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                border: '1px solid #e5e7eb',
                            }}
                            labelStyle={{ fontWeight: 'bold' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="success"
                            stroke="#1d4ed8"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="cancel"
                            stroke="#ef4444"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
                        />
                        {referenceDataPoint && (
                            <>
                                <ReferenceDot x={referenceDataPoint.name} y={referenceDataPoint.success} r={6} fill="#fff" stroke="#1d4ed8" strokeWidth={2} />
                                <ReferenceDot x={referenceDataPoint.name} y={referenceDataPoint.cancel} r={6} fill="#fff" stroke="#ef4444" strokeWidth={2} />
                            </>
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between items-end pt-1 border-t border-gray-200">
                <div>
                    <p className="text-2xl font-bold text-gray-800">{totalBooking}</p>
                    <p className="text-sm text-gray-500">{bookingLabel}</p>
                </div>
                <div className="flex items-center space-x-2">
                    {/* <ArrowUp className="text-green-500" size={20} /> */}
                    <div>
                        <p className="text-lg font-bold text-green-500">{percentageChange.toFixed(2)} %</p>
                        <p className="text-sm text-gray-500">{percentageLabel}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingChart;


// --- EXAMPLE USAGE ---
// This App component demonstrates how to use the BookingChart.
// const App = () => {
//     // Sample data for the chart. In a real app, this would come from an API.
//     const sampleChartData: ChartDataPoint[] = [
//         { name: 'Jan', success: 400, cancel: 240 },
//         { name: 'Feb', success: 600, cancel: 220 },
//         { name: 'Mar', success: 800, cancel: 290 },
//         { name: 'Apr', success: 850, cancel: 200 },
//         { name: 'May', success: 700, cancel: 400 },
//         { name: 'Jun', success: 950, cancel: 300 },
//         { name: 'Jul', success: 1100, cancel: 350 },
//         { name: 'Aug', success: 1000, cancel: 320 },
//         { name: 'Sep', success: 900, cancel: 380 },
//         { name: 'Oct', success: 1050, cancel: 450 },
//     ];

//     return (
//         <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
//             <BookingChart
//                 chartData={sampleChartData}
//                 totalBooking="$27K"
//                 bookingLabel="Booking this year"
//                 percentageChange={10.23}
//                 percentageLabel="Since last year"
//             />
//         </div>
//     );
// };
