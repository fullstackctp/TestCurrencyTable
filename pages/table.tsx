import axios from 'axios';
import { useEffect, useState } from 'react';

export interface currency {
  symbol: string;
  currency: string;
}
export default function TableData() {
  const [currency, setCurrency] = useState<currency[]>([]);
  const [result, setResult] = useState<currency[]>([]);

  const fetchData = async () => {
    try {
      const dataFromApi = await axios.get(
        'http://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json',
      );
      let currencyData = [];
      for (let fetchCurrency in dataFromApi.data) {
        currencyData.push({
          symbol: fetchCurrency,
          currency: dataFromApi.data[fetchCurrency],
        });
      }
      setCurrency(currencyData);
      setResult(currencyData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (searchValue: string) => {
    if (!searchValue.length) {
      setResult(currency);
      return;
    }

    const searchResults = currency.filter((currencyData) => {
      if (
        currencyData.symbol.includes(searchValue) ||
        currencyData.currency.includes(searchValue)
      )
        return currencyData;
    });

    setResult(searchResults);
  };
  useEffect(() => {
    if (currency.length === 0) fetchData();
  }, [currency]);

  return (
    <>
      <div>
        <input
          style={{ margin: '10px' }}
          type="text"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        ></input>
        <table>
          <tbody>
            <tr>
              <th>Currency Symbol</th>
              <th>Currency</th>
            </tr>
            {currency &&
              result.map((currencyData) => {
                return (
                  <tr key={currencyData.symbol}>
                    <td>{currencyData.symbol}</td>
                    <td>{currencyData.currency}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
