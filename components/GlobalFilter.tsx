import React from 'react';
import { GlobalFilterProps } from '../lib/types';



const GlobalFilter: React.FC<GlobalFilterProps> = ({ filter, setFilter }) => {
    const optionValues = ['all', 'Hot', 'Active', 'Cold', 'Passed', 'Closed', 'null'];
    const optionLabels = ['All', 'Hot', 'Active', 'Cold', 'Passed', 'Closed', 'Not Set'];

    const options = optionValues.map((value, index) => ({
        value,
        label: optionLabels[index],
    }));

    return (
        <div className="mb-2 p-2 bg-white bg-opacity-30 backdrop-blur-md border border-gray-200 rounded-lg shadow-sm flex items-center">
            <label htmlFor="global-filter" className="text-m font-sans font-medium text-gray-800 mr-2">
                Filter by Pipeline Status:
            </label>
            <select
                id="global-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md p-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GlobalFilter;
