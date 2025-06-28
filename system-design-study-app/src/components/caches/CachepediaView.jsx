// src/components/caches/CachepediaView.jsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '../common/Card';
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
import { parseTextForGlossaryLinks, getDefinitionSnippet } from '../../../utils/textProcessing'; // Adjusted path
import { glossaryData } from '../../../data/glossaryData'; // Adjusted path

// Helper component to render processed text (strings and links)
const RenderProcessedText = ({ textParts }) => {
  if (!textParts) return null;
  return (
    <>
      {textParts.map((part, index) => {
        if (part.type === 'link') {
          return (
            <RouterLink
              key={`${part.displayText}-${index}`}
              to={`/glossary?search=${encodeURIComponent(part.term.term)}`}
              className="glossary-link text-blue-600 hover:text-blue-800 hover:underline"
              title={getDefinitionSnippet(part.term.definition)}
            >
              {part.displayText}
            </RouterLink>
          );
        }
        return <React.Fragment key={`text-${index}`}>{part.content}</React.Fragment>;
      })}
    </>
  );
};

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
  const [chartKey, setChartKey] = useState(0);

  const cacheTypes = appData.cachepedia ? Object.keys(appData.cachepedia) : [];
  const overviewText = "An encyclopedia of cache types. Explore different categories of caches, their key characteristics, advantages, disadvantages, and common use cases. Use the selector to switch between types and see their details. Example: {{Client-Side Caching}} vs {{Distributed Caches}}.";
  const multiLevelCacheText = "Complex systems often employ multiple layers of caching to optimize performance at different stages. For example, a request might first check a local {{In-Memory Caches (Local)}}, then a shared {{Distributed Cache}}, and finally the origin data store. This layered approach balances speed, capacity, and cost.";


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
            label: selectedCache.name || Object.keys(appData.cachepedia).find(key => appData.cachepedia[key] === selectedCache),
            data: [
              characteristics.latency,
              characteristics.consistency,
              characteristics.scalability,
              characteristics.complexity,
              characteristics.cost,
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      };
      setChartData(data);
      setChartKey(prevKey => prevKey + 1);
    }
  }, [selectedCache, appData.cachepedia]);

  const handleSelectCache = (cacheKey) => {
    setSelectedCache(appData.cachepedia[cacheKey]);
  };

  const generateSlug = (title) => {
    if (!title) return '';
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
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
        angleLines: { display: true, color: 'rgba(150, 150, 150, 0.2)' },
        suggestedMin: 0,
        suggestedMax: 5,
        pointLabels: { font: { size: 10 } },
        grid: { color: 'rgba(150, 150, 150, 0.2)' },
        ticks: {
            display: true,
            stepSize: 1,
            backdropColor: 'rgba(0,0,0,0)',
        }
      },
    },
    plugins: {
      legend: { position: 'top', labels: { font: { size: 12 } } },
      tooltip: { enabled: true, titleFont: {size: 12}, bodyFont: {size: 10} }
    },
    maintainAspectRatio: false,
  };


  return (
    <div className="p-1 md:p-4 space-y-6">
      <div className="prose max-w-none dark:prose-invert">
        <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-6">Cachepedia</h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <RenderProcessedText textParts={parseTextForGlossaryLinks(overviewText, glossaryData)} />
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
          <div
            id={generateSlug(Object.keys(appData.cachepedia).find(key => appData.cachepedia[key] === selectedCache))}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start pt-4"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-secondary dark:text-secondary-light">
                {Object.keys(appData.cachepedia).find(key => appData.cachepedia[key] === selectedCache)}
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-400">
                <strong className="font-semibold text-neutral-700 dark:text-neutral-200">Category:</strong> {selectedCache.type}
              </p>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <RenderProcessedText textParts={parseTextForGlossaryLinks(selectedCache.description, glossaryData)} />
              </p>
              <div>
                <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Pros:</h3>
                <ul className="list-disc list-inside text-base text-neutral-600 dark:text-neutral-400 space-y-1">
                  {selectedCache.pros.map((pro, i) => (
                    <li key={i}><RenderProcessedText textParts={parseTextForGlossaryLinks(pro, glossaryData)} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Cons:</h3>
                <ul className="list-disc list-inside text-base text-neutral-600 dark:text-neutral-400 space-y-1">
                  {selectedCache.cons.map((con, i) => (
                    <li key={i}><RenderProcessedText textParts={parseTextForGlossaryLinks(con, glossaryData)} /></li>
                  ))}
                </ul>
              </div>
              <p className="text-base text-neutral-600 dark:text-neutral-400">
                <strong className="font-semibold text-neutral-700 dark:text-neutral-200">Ideal Use Cases:</strong> <RenderProcessedText textParts={parseTextForGlossaryLinks(selectedCache.whenToUse, glossaryData)} />
              </p>
            </div>

            <Card
              padding="p-3"
              border={true}
              rounded="lg"
              shadow="lg"
              className="h-80 md:h-96 lg:h-[400px]"
            >
              {chartData ? (
                <Radar key={chartKey} data={chartData} options={chartOptions} />
              ) : (
                <p className="text-center text-neutral-500 dark:text-neutral-400 pt-10">
                  Select a cache type to view characteristics chart. (Requires Chart.js to be installed)
                </p>
              )}
            </Card>
          </div>
        )}
      </Card>

      <Card className="mt-8" padding="p-6">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Multi-Level Caches</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
            <p>
              <RenderProcessedText textParts={parseTextForGlossaryLinks(multiLevelCacheText, glossaryData)} />
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
         </div>
      </Card>
    </div>
  );
};

export default CachepediaView;
