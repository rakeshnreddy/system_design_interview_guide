import React, { useState, useEffect } from 'react';

const EvictionSimulator = () => {
  const [policy, setPolicy] = useState('LRU');
  const [capacity, setCapacity] = useState(3);
  const [sequenceString, setSequenceString] = useState('A,B,C,A,D,E,B,F,A,D');
  const [simulation, setSimulation] = useState(null); // To store [{ item, cacheState, message, evictedItem, isHit }]
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handlePolicyChange = (e) => {
    setPolicy(e.target.value);
    resetSimulation();
  };

  const handleCapacityChange = (e) => {
    const newCapacity = parseInt(e.target.value, 10);
    if (newCapacity > 0) {
      setCapacity(newCapacity);
      resetSimulation();
    }
  };

  const handleSequenceChange = (e) => {
    setSequenceString(e.target.value);
    resetSimulation();
  };

  const resetSimulation = () => {
    setSimulation(null);
    setCurrentStepIndex(0);
  };

  const handleSimulate = () => {
    // Logic to be implemented in step 2
    console.log("Simulating with:", { policy, capacity, sequence: sequenceString.split(',').map(s => s.trim()).filter(s => s) });
    // Placeholder for now
    const sequence = sequenceString.split(',').map(s => s.trim()).filter(s => s);
    if (sequence.length === 0) {
        setSimulation([]);
        return;
    }
    const sequence = sequenceString.split(',').map(s => s.trim()).filter(s => s);
    if (sequence.length === 0) {
      setSimulation([]); // Set to empty array to indicate simulation was "run" but had no input
      setCurrentStepIndex(0);
      return;
    }

    let cache = [];
    let accessOrder = []; // For LRU, LFU tie-breaking
    let frequencyMap = {}; // For LFU
    let insertionOrder = []; // For FIFO

    const steps = [];

    for (const item of sequence) {
      let isHit = false;
      let evictedItem = null;
      let message = '';

      // Check for hit
      if (cache.includes(item)) {
        isHit = true;
        message = `Access ${item}: HIT. Cache: [${cache.join(', ')}]`;
        // Update policy-specific metadata
        if (policy === 'LRU') {
          accessOrder = accessOrder.filter(i => i !== item);
          accessOrder.push(item);
        }
        if (policy === 'LFU') {
          frequencyMap[item] = (frequencyMap[item] || 0) + 1;
          accessOrder = accessOrder.filter(i => i !== item); // Update access order for LFU tie-breaking
          accessOrder.push(item);
        }
        // FIFO and Random do not need special updates on hit for existing items beyond cache content
      } else { // Miss
        isHit = false;
        if (cache.length >= capacity) {
          // Eviction needed
          switch (policy) {
            case 'LRU':
              evictedItem = accessOrder.shift(); // LRU item is at the beginning of accessOrder
              cache = cache.filter(i => i !== evictedItem);
              break;
            case 'LFU':
              let minFreq = Infinity;
              let candidates = [];
              for (const cacheItem of cache) {
                if (frequencyMap[cacheItem] < minFreq) {
                  minFreq = frequencyMap[cacheItem];
                  candidates = [cacheItem];
                } else if (frequencyMap[cacheItem] === minFreq) {
                  candidates.push(cacheItem);
                }
              }
              // Tie-breaking: LRU among candidates
              if (candidates.length > 1) {
                let oldestAccessTime = Infinity;
                let lruCandidate = null;
                for (const cand of candidates) {
                    const indexInAccessOrder = accessOrder.indexOf(cand);
                    if (indexInAccessOrder < oldestAccessTime) {
                        oldestAccessTime = indexInAccessOrder;
                        lruCandidate = cand;
                    }
                }
                evictedItem = lruCandidate;
              } else {
                evictedItem = candidates[0];
              }
              cache = cache.filter(i => i !== evictedItem);
              delete frequencyMap[evictedItem]; // Remove from frequency map
              accessOrder = accessOrder.filter(i => i !== evictedItem); // Remove from access order
              break;
            case 'FIFO':
              evictedItem = insertionOrder.shift(); // FIFO item is at the beginning of insertionOrder
              cache = cache.filter(i => i !== evictedItem);
              break;
            case 'Random':
              const randomIndex = Math.floor(Math.random() * cache.length);
              evictedItem = cache[randomIndex];
              cache = cache.filter(i => i !== evictedItem);
              // Also remove from policy-specific trackers if it exists there
              accessOrder = accessOrder.filter(i => i !== evictedItem);
              if (frequencyMap[evictedItem]) delete frequencyMap[evictedItem];
              insertionOrder = insertionOrder.filter(i => i !== evictedItem);
              break;
            default:
              console.error("Unknown policy:", policy);
              evictedItem = cache[0]; // Fallback, should not happen
              cache.shift();
              break;
          }
          message = `Access ${item}: MISS. Cache full. Evicted ${evictedItem}. Added ${item}.`;
        } else {
          message = `Access ${item}: MISS. Added ${item}.`;
        }
        cache.push(item);
        // Add to policy-specific metadata
        if (policy === 'LRU' || policy === 'LFU') { // LFU also uses accessOrder for tie-breaking
          accessOrder.push(item);
        }
        if (policy === 'LFU') {
          frequencyMap[item] = (frequencyMap[item] || 0) + 1;
        }
        if (policy === 'FIFO') {
          insertionOrder.push(item);
        }
      }

      steps.push({
        item: item,
        cacheState: [...cache],
        message: `${message} Cache after access: [${cache.join(', ')}]`,
        evictedItem: evictedItem,
        isHit: isHit,
        // For LFU display (optional)
        // currentFrequencies: {...frequencyMap}
      });
    }

    setSimulation(steps);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (simulation && currentStepIndex < simulation.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (simulation && currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  useEffect(() => {
    // Reset simulation if capacity or policy changes to avoid inconsistent states.
    resetSimulation();
  }, [policy, capacity]);


  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Cache Eviction Simulator</h2>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="policy" className="block text-sm font-medium text-gray-700 mb-1">Eviction Policy:</label>
          <select id="policy" value={policy} onChange={handlePolicyChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="LRU">LRU (Least Recently Used)</option>
            <option value="LFU">LFU (Least Frequently Used)</option>
            <option value="FIFO">FIFO (First-In, First-Out)</option>
            <option value="Random">Random</option>
          </select>
        </div>
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Cache Capacity:</label>
          <input type="number" id="capacity" value={capacity} onChange={handleCapacityChange} min="1" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="sequence" className="block text-sm font-medium text-gray-700 mb-1">Access Sequence (comma-separated):</label>
          <input type="text" id="sequence" value={sequenceString} onChange={handleSequenceChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., A,B,C,A,D" />
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button onClick={handleSimulate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Simulate
        </button>
        <button onClick={resetSimulation} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Reset
        </button>
      </div>

      {/* Simulation Display */}
      {simulation && simulation.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Simulation Steps:</h3>
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePreviousStep} disabled={currentStepIndex === 0} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
              Previous
            </button>
            <span className="text-sm text-gray-600">Step {currentStepIndex + 1} of {simulation.length} (Accessing: {simulation[currentStepIndex].item})</span>
            <button onClick={handleNextStep} disabled={currentStepIndex === simulation.length - 1} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
              Next
            </button>
          </div>

          {/* Cache Visualization */}
          <div className="mb-4">
            <h4 className="font-medium mb-1">Cache State (After Access):</h4>
            <div className="flex flex-wrap gap-2 h-auto min-h-[4rem] p-2 border rounded bg-gray-50">
              {simulation[currentStepIndex].cacheState.map((slotItem, index) => {
                const currentSimStep = simulation[currentStepIndex];
                const itemAccessed = currentSimStep.item;
                const isHit = currentSimStep.isHit;

                let slotClasses = 'w-14 h-14 flex items-center justify-center border rounded font-mono text-sm shadow-sm';
                if (isHit && slotItem === itemAccessed) {
                  slotClasses += ' bg-green-200 border-green-400 text-green-800 ring-2 ring-green-500'; // Hit
                } else if (!isHit && slotItem === itemAccessed) {
                  slotClasses += ' bg-yellow-200 border-yellow-400 text-yellow-800 ring-2 ring-yellow-500'; // Newly added
                } else {
                  slotClasses += ' bg-white border-gray-300'; // Standard slot
                }
                return (
                  <div key={index} className={slotClasses} title={`Item: ${slotItem}`}>
                    {slotItem}
                  </div>
                );
              })}
              {/* Fill empty slots visually */}
              {Array.from({ length: Math.max(0, capacity - simulation[currentStepIndex].cacheState.length) }).map((_, index) => (
                <div key={`empty-${index}`} className="w-14 h-14 flex items-center justify-center border border-dashed border-gray-300 rounded bg-gray-100 text-gray-400 text-xs" title="Empty slot">
                  Empty
                </div>
              ))}
            </div>
            {simulation[currentStepIndex].evictedItem && (
              <p className="text-sm text-red-600 mt-2 font-semibold">Evicted: {simulation[currentStepIndex].evictedItem}</p>
            )}
          </div>

          {/* Event Log */}
          <div>
            <h4 className="font-medium mb-1">Event Details:</h4>
            <div className={`text-sm p-3 rounded shadow ${simulation[currentStepIndex].isHit ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              <p><span className="font-semibold">Action:</span> Accessing item '{simulation[currentStepIndex].item}'</p>
              <p><span className="font-semibold">Status:</span> {simulation[currentStepIndex].isHit ? 'HIT' : 'MISS'}</p>
              {simulation[currentStepIndex].evictedItem && (
                <p><span className="font-semibold">Evicted:</span> Item '{simulation[currentStepIndex].evictedItem}' (due to {policy} policy)</p>
              )}
               {simulation[currentStepIndex].isHit && (
                <p>Item '{simulation[currentStepIndex].item}' was already in cache.</p>
              )}
              {!simulation[currentStepIndex].isHit && simulation[currentStepIndex].evictedItem && (
                 <p>Item '{simulation[currentStepIndex].item}' added to cache, replacing '{simulation[currentStepIndex].evictedItem}'.</p>
              )}
               {!simulation[currentStepIndex].isHit && !simulation[currentStepIndex].evictedItem && (
                 <p>Item '{simulation[currentStepIndex].item}' added to cache.</p>
              )}
              <p className="mt-1 pt-1 border-t border-opacity-50"><span className="font-semibold">Cache after access:</span> [{simulation[currentStepIndex].cacheState.join(', ')}]</p>
              <p className="mt-1 text-xs text-gray-500">{simulation[currentStepIndex].message}</p>
              {/* The original full message is kept for detailed debugging/info if needed, but might be redundant with above lines */}
            </div>
          </div>
        </div>
      )}
      {simulation && simulation.length === 0 && sequenceString.length > 0 && (
         <p className="text-center text-gray-500">Simulation complete (empty sequence or no items to process).</p>
      )}
       {simulation === null && (
         <p className="text-center text-gray-500">Enter a sequence and click "Simulate" to begin.</p>
      )}


    </div>
  );
};

export default EvictionSimulator;
