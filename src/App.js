import { useState, useEffect } from 'react';
// import { correct } from './assets/images/index'
import { allCountries } from './service/api';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);

  async function fetchData() {
    let res = await axios(`https://restcountries.com/v3.1/all`)
    const json = await res.data;
    setCountries(json)
    console.log(json)
  }
const numbers = [1,2,3,4,5,6,7,8,9,10]
const countriesData = ['Sweden','Vietnam','Malaysia','Austria']
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='bg'>
      <div className='container'>
       <div className='header'>
       <p className='title'>Country Quiz</p>
        <div className='section-count' >
        {numbers.map((num, index) =>(
          <button key={index} className={`count-circle ${num ===1 ? 'active' : ''}`}>{num}</button>
        ))}
        </div>
       </div>
       <p className='section-questions'>Which country is Kuala Lumpar the capital</p>
       <div className='section-answers'>
          {countriesData.map((country, index) =>(
            <div className='answer-card' key={index}>
              {country}
            </div>
          ))}
       </div>
      </div>
    </div>
  );
}

export default App;
