import { useEffect, useState } from 'react';
import './App.css';
import { IStock, getAllStocks } from './service/stocks.service';
import Paginator from './components/Paginator';
import StockDetails from './components/StockDetail';
import { Link, Route } from 'react-router-dom';

const ITEMS_PER_PAGE = 25;

export default function App() {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllStocks().then(res => {
      setStocks(res.data);
    });
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStocks = stocks.slice(startIndex, endIndex);

  const totalPages = Math.ceil(stocks.length / ITEMS_PER_PAGE);

  return (
    <div className="App">
      <h1 className='my-3 text-center'>Cotización de acciones en tiempo real</h1>
      <div className='c-stocks'>
        <table className='c-stocks__table'>
          <thead>
            <tr>
              <th>Símbolo</th>
              <th>Nombre</th>
              <th>Moneda</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {currentStocks?.map(stock => (
              <tr key={stock.symbol}>
                <td>
                  {/* <Link to={`/stock-details/${stock.symbol}`}>{stock.symbol}</Link> */}
                  <Link to={{
                    pathname: `/stock-details/${stock.symbol}`,
                    state: { stockData: stock }
                  }}>{stock.symbol}</Link>
                </td>
                <td>{stock.name}</td>
                <td>{stock.currency}</td>
                <td>{stock.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}


