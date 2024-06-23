import React from "react";
import Select from "react-select";

const agents = [
    { value: 1, label: "Sathish Sekar" },
    { value: 2, label: "Umar Mohamad" },
    { value: 4, label: "Thamim" },
    { value: 5, label: "Kp Naveen" },
    { value: 6, label: "Sarath" },
    { value: 6, label: "Wasim" },
    { value: 1, label: "Sathish Sekar" },
    { value: 2, label: "Umar Mohamad" },
    { value: 4, label: "Thamim" },
    { value: 5, label: "Kp Naveen" },
    { value: 6, label: "Sarath" },
    { value: 6, label: "Wasim" },
    
    

  ];
  

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "1.5px",
      border: state.isFocused ? "2px solid var(--second)" : "2px solid #e2e8f0",
      borderRadius: state.isFocused ? "8px" : "8px", // Rounded when focused
      borderColor: "var(--second)", // Border color
      boxShadow: "none",
      "&:hover": {
        border: "2px solid var(--second)",
      },
       border: "2px solid var(--second)",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "8px 12px", // Adjust padding here
      backgroundColor: state.isSelected ? "var(--second)" : "transparent",
      color: state.isSelected ? "#ffffff" : "#333333",
      "&:hover": {
        backgroundColor: "var(--second)",
        color: "#ffffff",
      },
      borderRadius: state.isFocused ? "8px" : "8px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--second)",
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: "200px", // Set maximum height for scroll
      overflowY: "auto", // Add vertical scroll
    }),
  };
  
  

  
  

function CustomSelect() {
  return (
    <Select
      options={agents}
      styles={customStyles}
      placeholder="Select an agent"
      isSearchable={false}
      isClearable={true}
      onChange={(selectedOption) => {
        console.log("Selected option:", selectedOption);
      }}
    />
  );
}

export default CustomSelect;
