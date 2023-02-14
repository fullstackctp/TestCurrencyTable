import axios from 'axios';
import { useEffect, useState } from 'react';

export interface currency {
  symbol: string;
  currency: string;
}
export default function TableData() {
  const [currency, setCurrency] = useState<currency[]>([]);

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currency.length === 0) fetchData();
  }, [currency]);

  return (
    <>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Currency Symbol</th>
              <th>Currency</th>
            </tr>
            {currency &&
              currency.map((currencyData) => {
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
