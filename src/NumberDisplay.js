import React, { useState, useEffect } from 'react';

function NumberDisplay() {
  const [numbers, setNumbers] = useState([]);

  const fetchData = async () => {
    const urls = [
      'http://20.244.56.144/numbers/primes',
      'http://20.244.56.144/numbers/fibo',
      'http://20.244.56.144/numbers/odd',
      'http://20.244.56.144/numbers/rand'
    ];

    try {
      const responses = await Promise.all(
        urls.map(url => fetch(url).then(response => response.json()).catch(error => ({ numbers: [] })))
      );

      const validResponses = responses.filter(response => response.numbers && Array.isArray(response.numbers));

      const mergedNumbers = validResponses.flatMap(item => item.numbers);
      const uniqueNumbers = Array.from(new Set(mergedNumbers));
      const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

      setNumbers(sortedNumbers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div>
      <div>
        <pre>{JSON.stringify({ numbers }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default NumberDisplay;
