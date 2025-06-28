import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const TradeoffRadar = (props) => {
  if (!props.data || props.data.length === 0) {
    return <p>No data available for radar chart.</p>;
  }

  // Assuming props.data is an array of objects like:
  // { criterion: "Consistency", optionA: 5, optionB: 3, fullMark: 5 }
  // Add fullMark if not present, default to 5 or max of optionA/optionB
  const processedData = props.data.map(item => ({
    ...item,
    fullMark: item.fullMark || Math.max(5, item.optionA || 0, item.optionB || 0) // Ensure fullMark accommodates data values
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={processedData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="criterion" />
        <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
        <Radar name={props.optionAName || "Option A"} dataKey="optionA" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        {props.data.some(d => d.optionB !== undefined) && // Conditionally render Option B radar if data exists
          <Radar name={props.optionBName || "Option B"} dataKey="optionB" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        }
        <Legend />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default TradeoffRadar;
