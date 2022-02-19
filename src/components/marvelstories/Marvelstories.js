import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import "./marvelstories.css";
import { Button } from '@mui/material';
import axios from "axios";
import Search from "../Search";

//967780d831a3680144c23bf9c5fa53af
const hash = "967780d831a3680144c23bf9c5fa53af";

export default function Marvelstories() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (query === "") {
        // checking if favorites array is empty or does not exist
        if (
          localStorage.getItem("favorites") === "[]" ||
          !localStorage.getItem("favorites")
        ) {
          localStorage.setItem("favorites", "[]");
          const result = await axios(
            `http://gateway.marvel.com/v1/public/stories?orderBy=modified&limit=20&ts=1&apikey=239623db6bb1e571ce3329638b9145dc&hash=${hash}`
          );
          console.log(result.data.data.results);
          setItems(result.data.data.results);
          setLoading(false);
        } else {
          let favorite = JSON.parse(localStorage.getItem("favorites"));
          setItems(favorite);
          setLoading(false);
        }
      } else {
        const result = await axios(
          `http://gateway.marvel.com/v1/public/stories?nameStartsWith=${query}&ts=1&apikey=239623db6bb1e571ce3329638b9145dc&hash=${hash}`
        );
        console.log(result.data.data.results);
        setItems(result.data.data.results);
        setLoading(false);
      }
    };

    fetch();
  }, [query]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
      <>
    <Search search={(q) => setQuery(q)}></Search>
    <MDBCardTitle>
        <h1 style={{margin:'2rem'}}>Marvel Stories</h1>
    </MDBCardTitle>
    <div className="container">
      
      {items.map((item) => (
        <div className="row">
          <div className="cards">
            <MDBCard>
              <MDBCardImage
                top
                src={item.thumbnail.path + "/landscape_xlarge.jpg"}
                overlay="white-slight"
                hover
                waves
                alt="Marvel Image"
              />
              <MDBCardBody>
                <MDBCardTitle>
                  <span>{item.name}</span>
                </MDBCardTitle>
                <hr />
                <MDBCardText>{item.description}</MDBCardText>
                <Button variant="contained" color="error">Read More</Button>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
