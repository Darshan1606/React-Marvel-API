import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBIcon
} from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import "./marvelseries.css";
import { Button, Card, CardMedia,CardContent,Typography, CardActions} from "@mui/material";
import axios from "axios";
import Search from "../Search";

//967780d831a3680144c23bf9c5fa53af
const hash = "967780d831a3680144c23bf9c5fa53af";

export default function Marvelseries() {
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
            `http://gateway.marvel.com/v1/public/series?orderBy=modified&limit=50&ts=1&apikey=239623db6bb1e571ce3329638b9145dc&hash=${hash}`
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
          `http://gateway.marvel.com/v1/public/series?nameStartsWith=${query}&ts=1&apikey=239623db6bb1e571ce3329638b9145dc&hash=${hash}`
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
        <h1 style={{margin:'2rem'}}>Marvel Series</h1>
    </MDBCardTitle>
    <div className="container">
      
      {items.map((item) => (
        <div className="row">
          <div className="cards">
          <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.thumbnail.path + "/landscape_xlarge.jpg"}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  <span>{item.name}</span>
                  </Typography>
                  <hr/>
                  <Typography variant="body2" color="text.secondary">
                  {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                 
                  <Button size="small" variant="outlined" color="error" style={{align:'center'}}>Read More</Button>
                </CardActions>
              </Card>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
