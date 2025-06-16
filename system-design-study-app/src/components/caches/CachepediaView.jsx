// src/components/caches/CachepediaView.jsx
import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
// For potential future actions (Button is currently unused)
// import Button from '../common/Button';
// Radar Chart related imports - these will cause errors if chart.js and react-chartjs-2 are not installed
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
// This registration should ideally happen once, e.g. in App.js or a chart specific setup file,
// but for component modularity, it's sometimes placed here if the chart is only used in this component.
// However, if this component rerenders often, it might lead to multiple registrations.
// For now, placing it here for self-containment, assuming this view doesn't rapidly rerender.
try {
    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
    );
} catch (e) {
    console.warn("Chart.js components might have already been registered or an error occurred:", e);
}


const CachepediaView = ({ appData }) => {
  const [selectedCache, setSelectedCache] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [chartKey, setChartKey] = useState(0); // To force re-render of chart

  const cacheTypes = appData.cachepedia ? Object.keys(appData.cachepedia) : [];

  useEffect(() => {
    if (cacheTypes.length > 0 && !selectedCache) {
      setSelectedCache(appData.cachepedia[cacheTypes[0]]);
    }
  }, [appData.cachepedia, cacheTypes, selectedCache]);

  useEffect(() => {
    if (selectedCache && selectedCache.characteristics) {
      const characteristics = selectedCache.characteristics;
      const labels = ['Latency', 'Consistency', 'Scalability', 'Complexity', 'Cost'];
      const data = {
        labels: labels,
        datasets: [
          {
            label: selectedCache.name || Object.keys(appData.cachepedia).find(key => appData.cachepedia[key] === selectedCache), // Find name if not in object
            data: [
              characteristics.latency,
              characteristics.consistency,
              characteristics.scalability,
              characteristics.complexity,
              characteristics.cost,
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Example: primary-light with opacity
            borderColor: 'rgba(54, 162, 235, 1)', // Example: primary
            borderWidth: 1,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      };
      setChartData(data);
      setChartKey(prevKey => prevKey + 1); // Update key to force re-render
    }
  }, [selectedCache, appData.cachepedia]);

  const handleSelectCache = (cacheKey) => {
    setSelectedCache(appData.cachepedia[cacheKey]);
  };

  if (!appData) {
    return <p className="p-4 text-neutral-600 dark:text-neutral-400">Loading Cachepedia data...</p>;
  }

  if (!appData.cachepedia || Object.keys(appData.cachepedia).length === 0) {
    return <p className="p-4 text-neutral-500 dark:text-neutral-400">No Cachepedia entries available.</p>;
  }

  const chartOptions = {
    scales: {
      r: {
        angleLines: { display: true, color: 'rgba(150, 150, 150, 0.2)' }, // Neutral color for lines
        suggestedMin: 0,
        suggestedMax: 5, // Assuming characteristics are rated 1-5
        pointLabels: { font: { size: 10 } }, // Smaller font for point labels
        grid: { color: 'rgba(150, 150, 150, 0.2)' }, // Neutral color for grid
        ticks: {
            display: true,
            stepSize: 1,
            backdropColor: 'rgba(0,0,0,0)', // Transparent backdrop for ticks
        }
      },
    },
    plugins: {
      legend: { position: 'top', labels: { font: { size: 12 } } },
      tooltip: { enabled: true, titleFont: {size: 12}, bodyFont: {size: 10} }
    },
    maintainAspectRatio: false, // Important for responsiveness
  };


  return (
    <div className="p-1 md:p-4 space-y-6">
      {/* Reminder: @tailwindcss/typography plugin is recommended for prose styling */}
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">Cachepedia</h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          An encyclopedia of cache types. Explore different categories of caches, their key characteristics, advantages, disadvantages, and common use cases. Use the selector to switch between types and see their details.
        </p>
      </div>

      <Card>
        <div className="mb-4">
          <label htmlFor="cacheTypeSelect" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Select Cache Type:</label>
          <select
            id="cacheTypeSelect"
            value={selectedCache ? Object.keys(appData.cachepedia).find(key => appData.cachepedia[key] === selectedCache) : ''}
            onChange={(e) => handleSelectCache(e.target.value)}
            className="w-full max-w-md p-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary"
          >
            {cacheTypes.map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        {selectedCache && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4"> {/* Increased spacing */}
              <h2 className="text-3xl font-bold text-secondary dark:text-secondary-light">
                {Object.keys(appData.cachepedia).find(key => appData.cachepedia[key] === selectedCache)}
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-400"><strong className="font-semibold text-neutral-700 dark:text-neutral-200">Category:</strong> {selectedCache.type}</p>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">{selectedCache.description}</p>
              <div>
                <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Pros:</h3>
                <ul className="list-disc list-inside text-base text-neutral-600 dark:text-neutral-400 space-y-1">
                  {selectedCache.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Cons:</h3>
                <ul className="list-disc list-inside text-base text-neutral-600 dark:text-neutral-400 space-y-1">
                  {selectedCache.cons.map((con, i) => <li key={i}>{con}</li>)}
                </ul>
              </div>
              <p className="text-base text-neutral-600 dark:text-neutral-400"><strong className="font-semibold text-neutral-700 dark:text-neutral-200">Ideal Use Cases:</strong> {selectedCache.useWhen}</p>
            </div>

            <div className="h-80 md:h-96 lg:h-[400px] p-3 border rounded-lg bg-white dark:bg-neutral-800 shadow-lg"> {/* Adjusted height and shadow */}
              {chartData ? (
                // Ensure chart.js and react-chartjs-2 are installed for this to work
                <Radar key={chartKey} data={chartData} options={chartOptions} />
              ) : (
                <p className="text-center text-neutral-500 dark:text-neutral-400 pt-10">
                  Select a cache type to view characteristics chart. (Requires Chart.js to be installed)
                </p>
              )}
            </div>
          </div>
        )}
      </Card>
      {/* Reminder about typography and chartjs plugin */}
      {/* <Card><p className="text-xs text-warning">Note: For charts, ensure 'chart.js' and 'react-chartjs-2' are installed.</p></Card> */}

      <Card className="mt-8" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Multi-Level Caches</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
            <p>
                Complex systems often employ multiple layers of caching to optimize performance at different stages.
                For example, a request might first check a local in-process cache, then a shared distributed cache,
                and finally the origin data store. This layered approach balances speed, capacity, and cost.
            </p>
        </div>
        <div className="my-4 p-4 border border-neutral-300 dark:border-neutral-600 rounded-md bg-neutral-100 dark:bg-neutral-800/60 shadow-sm">
             <p className="font-semibold text-center text-xl text-neutral-700 dark:text-neutral-200 mb-3">Visual: Multi-Level Cache Flow</p>
             <div className="space-y-2 text-base text-neutral-600 dark:text-neutral-300 font-mono">
                 <div className="p-2 bg-white dark:bg-neutral-700 rounded shadow-sm">App Server --&gt; L1 Cache (In-Process/Memory)</div>
                 <div className="pl-4">|</div>
                 <div className="pl-4">V</div>
                 <div className="p-2 bg-white dark:bg-neutral-700 rounded shadow-sm">L1 Cache --&gt; L2 Cache (Distributed, e.g., Redis/Memcached)</div>
                 <div className="pl-10">|</div>
                 <div className="pl-10">V</div>
                 <div className="p-2 bg-white dark:bg-neutral-700 rounded shadow-sm">L2 Cache --&gt; Origin Database</div>
             </div>
             {/* TODO: Add detailed diagram for multi-level cache architecture */}
         </div>
      </Card>
    </div>
  );
};

export default CachepediaView;
