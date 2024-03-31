import React, { useState } from 'react';

const SearchBar = ({ handleSearch }: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('symbol');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(event.target.value);

    };

    return (
        <div className='d-flex'>
            <div>
                <span>Filtrar por:</span>
                <select value={filterType} onChange={handleFilterChange} className='searchbar-select'>Filter by:
                    <option value="exchange">Exchange</option>
                    <option value="symbol">Símbolo</option>
                </select>
            </div>

            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleInputChange}
                className='searchbar-input'
            />
            <button className='btn btn-secondary ml-2' onClick={() => handleSearch(filterType, searchTerm)}>Buscar</button>
        </div>
    );
};

export default SearchBar;
