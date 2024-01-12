export const allCountries = async () =>{
    const res = await fetch(
        `https://restcountries.com/v3.1/all`
      );
      const json = await res.json();
      return json;
}