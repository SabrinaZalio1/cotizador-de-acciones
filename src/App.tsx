import { useEffect, useState } from 'react';
import './App.css';
import { IStock, getAllStocks, getStockByParams } from './service/stocks.service';
// import Paginator from './components/Paginator';
// import StockDetails from './components/StockDetail';
import { Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';

const ITEMS_PER_PAGE = 25;

export default function App() {
  const [stocks, setStocks] = useState<IStock[]>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [filteredStocks, setFilteredStocks] = useState<IStock[]>([]);
  // const [selectedFilter, setSelectedFilter] = useState<string>('Name');
  // const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    getAllStocks().then(res => {
      return setStocks(res.data);
      // setFilteredStocks(res.data); 
    });
  }, []);

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  const handleSearch = (filterType:'exchange' | 'symbol', value:string) => {
    getStockByParams(filterType, value).then(res => {
      return setStocks(res.data);
    });

  };

  return (
    <div className="App">
      <h1 className='mt-3 mb-5 text-center'>Cotización de acciones en tiempo real</h1>
      <div className='c-stocks'>
        {/* <div>
          <div className="btn-group">
            <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filter by: {selectedFilter}
            </button>
            <div className="dropdown-menu">
              <button className="dropdown-item" type="button" onClick={() => handleFilter('Name')}>Name</button>
              <button className="dropdown-item" type="button" onClick={() => handleFilter('Symbol')}>Symbol</button>
            </div>
          </div>
        </div>
        <input type="text" value={filterValue} onChange={handleInputChange} /> */}
         <SearchBar handleSearch={handleSearch} />
        <table className='c-stocks__table'>
          <thead>
            <tr>
              <th>Símbolo</th>
              <th>Nombre</th>
              <th>Exchange</th>
              <th>Moneda</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {stocks?.map((stock, i) => (
              <tr key={i}>
                <td>
                  <Link to={{
                    pathname: `/stock-details/${stock.symbol}`,
                    state: { stockData: stock }
                  }}>{stock.symbol}</Link>
                </td>
                <td>{stock.name}</td>
                <td>{stock.exchange}</td>
                <td>{stock.currency}</td>
                <td>{stock.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
    </div>
  );
}
