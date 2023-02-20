import React, { useState, useEffect } from "react";
import { Country, ENDPOINT } from "../../types/types";
import CalendarWrapper from "../calendar/CalendarWrapper";

const Main: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${ENDPOINT}/AvailableCountries`);
      const data = await response.json();
      setCountries(data);
    }
    fetchData();
  }, []);

  return <CalendarWrapper countries={countries}></CalendarWrapper>;
};

export default Main;
