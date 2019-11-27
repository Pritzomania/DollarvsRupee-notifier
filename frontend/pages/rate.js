import React, { useState, useEffect } from 'react';
import { formatDistance } from 'date-fns';
import axios from 'axios';
import styled from 'styled-components';

const StyledRate = styled.div`
  color: #93a3b1;
  font-size: 5em;
`;

const StyledRatePage = styled.div`
  margin: auto;
  text-align: center;
  padding-top: 5em;
  color: white;
  font-size: 2em;
`;

export default function about() {
  const [data, setExchange] = useState({});

  useEffect(() => {
    (async () => {
      const exchange = await axios.get('http://localhost:3100/fetch');
      console.log(exchange.data);
      setExchange(exchange.data);
    })();
  }, []);
  if (!data) return <p>No data available yet!</p>;
  if (data.data && data.data.rate)
    return (
      <StyledRatePage>
        the rate is <StyledRate>{data.data.rate}</StyledRate> dated -{' '}
        {formatDistance(data.data.timestamp, new Date(), { suffix: true })}
      </StyledRatePage>
    );
  return <p>Hello This is Rate page</p>;
}
