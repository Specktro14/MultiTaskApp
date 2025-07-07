import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CustomSelectWithCheckboxesProps, } from "../Types";

export const CustomSelectWithCheckboxes: React.FC<CustomSelectWithCheckboxesProps> = ({
  filters,
  setFilters,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleFilter = (filter: string) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const toggleCustomFilter = (filter: string) => {
    setFilters((prev) => ({
      ...prev,
      customFilters: {
        ...prev.customFilters,
        [filter]: !prev.customFilters[filter],
      },
    }));
  }

  return (
    <div className="relative inline-block text-left">
      {/* Botón para abrir/cerrar el menú */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex flex-row gap-1.5 bg-white/10 text-white rounded-md p-2"
      >
        Select Filters <ChevronDown size={25}/>
      </button>

      {/* Menú desplegable */}
      {isDropdownOpen && (
        <div className="absolute mt-2 p-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
          <div>
            <h5 className="text-[1.12rem]">By priority</h5>
            <div className="flex items-center gap-2 px-1 py-0.5 rounded-lg hover:bg-gray-700">
              <input
                type="checkbox"
                id="low"
                checked={filters.low}
                onChange={() => toggleFilter("low")}
                className="w-4 h-3.75 accent-correct peer"
              />
              <label htmlFor="low" className="text-white   peer-checked:text correct">
                Low
              </label>
            </div>
            <div className="flex items-center gap-2 px-1 py-0.5 rounded-lg hover:bg-gray-700">
              <input
                type="checkbox"
                id="medium"
                checked={filters.medium}
                onChange={() => toggleFilter("medium")}
                className="w-4 h-3.75 accent-gray-500"
              />
              <label htmlFor="medium" className="text-white">
                Medium
              </label>
            </div>
            <div className="flex items-center gap-2 px-1 py-0.5 rounded-lg hover:bg-gray-700">
              <input
                type="checkbox"
                id="high"
                checked={filters.high}
                onChange={() => toggleFilter("high")}
                className="w-4 h-3.75 accent-gray-500"
              />
              <label htmlFor="high" className="text-white">
                High
              </label>
            </div>
          </div>
          {Object.keys(filters.customFilters).length > 0 && (
            <div>
              <h5 className="text-[1.12rem]">Custom filters</h5>
              <div className="max-h-30 [&::-webkit-scrollbar-track]:bg-white/20  [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-[5px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-[5px] overflow-y-auto">
              {Object.entries(filters.customFilters).map(([key]) => (
                <div key={key} className="flex items-center gap-2 px-1 py-0.5 rounded-lg hover:bg-gray-700">
                  <input
                    type="checkbox"
                    id={key}
                    checked={filters.customFilters[key]}
                    onChange={() => toggleCustomFilter(key)}
                    className="w-4 h-3.75 accent-gray-500"
                  />
                  <label htmlFor={key} className="text-white">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </div>
              ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 