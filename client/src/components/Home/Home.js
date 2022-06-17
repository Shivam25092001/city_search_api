import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import InfoCard from "../InfoCard/InfoCard";

const Home = () => {
  const { keyword } = useParams();
  const [ data, setdata ] = useState([]);

  const fetchData = async (keyword) => {
    const { data } =
      (keyword !== undefined)
        ? await axios.get(`https://nomad01.herokuapp.com/api/cities?keyword=${keyword}`)
        : await axios.get(`https://nomad01.herokuapp.com/api/cities`);
    setdata(data.cityList);
  };
  useEffect(() => {
    fetchData(keyword);
  }, [keyword]);

  return (
    <div className="Rent-in">
      <div className="filter-box">
        <u> Cities Listed </u>
        <ul className="category-list">
          {data &&
            data.map((city) => (
              <li
                key={city._id}
                className="category-item"
              >
                &nbsp; &nbsp;{city.name}
              </li>
            ))}
        </ul>
        <br />
        <p style={{ fontSize: "12px"  }} > <i>&#38; many more to be added ...</i></p>
      </div>

      <div className="Featured-section">
        {
          data.length > 0 ? data.map(
            (item) => (
              <>
              <br/>
              <InfoCard city={item} key={item._id}/>
              </>
            )
          ) :
          <>
            <br />
            <p style={{ fontWeight: "lighter"  }}>&nbsp; &nbsp; <i> Oops! This city has not been addded to the database.</i></p>
          </>
        }
      </div>
        
    </div>
  );
};

export default Home;
