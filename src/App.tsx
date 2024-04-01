import { useEffect, useState } from 'react';
import './App.css';
import { IStock, getAllStocks, getStockByParams } from './service/stocks.service';
import { Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Paginator from './components/Paginator';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allStocks, setAllStocks] = useState<IStock[]>([]);
  const itemsPerPage = 50;

  useEffect(() => {
    getAllStocks().then(res => {
      setAllStocks(res.data);
      setCurrentPage(1); 
    });
  }, []);

  const handleSearch = (filterType: 'exchange' | 'symbol', value: string) => {
    getStockByParams(filterType, value).then(res => {
      setAllStocks(res.data);
      setCurrentPage(1);
    });
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginateStocks = (items: IStock[], pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  };

  const displayedStocks = paginateStocks(allStocks, currentPage, itemsPerPage);

  return (
    <div className="App">
      <h1 className='mt-3 mb-5 text-center'>Cotización de acciones en tiempo real</h1>
      <div className='c-stocks'>
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
            {displayedStocks.map((stock, i) => (
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
      <Paginator
        currentPage={currentPage}
        totalPages={Math.ceil(allStocks.length / itemsPerPage)}
        onPageChange={onPageChange}
      />
    </div>
  );
}
