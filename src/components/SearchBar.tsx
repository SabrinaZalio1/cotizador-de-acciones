import React, { useState } from 'react';

const SearchBar = ({ handleSearch }:any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('exchange'); 

console.log('filterType',filterType)

  const handleInputChange = (event:any) => {
    setSearchTerm(event.target.value);
    // handleSearch(filterType, searchTerm);
  };

  const handleFilterChange = (event:any) => {
    setFilterType(event.target.value);

  };

  return (
    <div>
      <select value={filterType} onChange={handleFilterChange}>
        <option value="exchange">Nombre</option>
        <option value="symbol">Símbolo</option>
      </select>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={()=> handleSearch(filterType, searchTerm)}>Buscar</button>
    </div>
  );
};

export default SearchBar;
