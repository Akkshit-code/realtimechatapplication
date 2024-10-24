import React, { useState } from "react";
import { XIcon } from "lucide-react"; // Import the X icon from lucide-react or any other icon library

const MultipleSelector = ({ options = [], onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  // Filter options based on input value
  const filteredOptions = options.filter((option) =>
    option.label && option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleItemSelect = (item) => {
    // Check if the item is already selected
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.value === item.value
    );

    // If not selected, add it to the selected items
    if (!isSelected) {
      const newSelectedItems = [...selectedItems, item];
      setSelectedItems(newSelectedItems);
      onChange?.(newSelectedItems); // Call the onChange callback with the new selected items
    }
    setInputValue(""); // Clear the input after selection
  };

  const handleItemRemove = (item) => {
    // Remove the item from the selected items
    const newSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem.value !== item.value
    );
    setSelectedItems(newSelectedItems);
    onChange?.(newSelectedItems); // Call the onChange callback with the updated selected items
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Contacts"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="rounded-lg p-2 bg-[#2c2e3b] text-white border-none"
      />
      {inputValue && filteredOptions.length > 0 && (
        <div className="absolute z-10 bg-purple-600 rounded-lg mt-1 w-full">
          {filteredOptions.map(option => (
            <div
              key={option.value}
              onClick={() => handleItemSelect(option)}
              className="p-2 text-white hover:bg-purple-700 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      <div className="mt-2">
        {selectedItems.map(item => (
          <div key={item.value} className="flex items-center text-white cursor-pointer">
            {item.label}
            <XIcon
              className="ml-2 h-4 w-4 cursor-pointer"
              onClick={() => handleItemRemove(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleSelector;