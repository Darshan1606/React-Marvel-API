import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import './footer.css'

export default function Footer() {
  return (
    
    <MDBFooter  color="blue" className="footer pt-4 ">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Darshan Tarsariya - Marvel API</h5>
            <span>
             Here you get the details about marvel comics, stroies, series and characters.
             The project is build with Marvel API :)
            </span>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Quick Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="/characters">Characters</a>
              </li>
              <li className="list-unstyled">
                <a href="/comics">Comics</a>
              </li>
              <li className="list-unstyled">
                <a href="/series">Series</a>
              </li>
              <li className="list-unstyled">
                <a href="/stroies">Stories</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
           Devloper : <a href="https://darshantarsariya.herokuapp.com"> Darshan Tarsariya</a> &nbsp;&nbsp;&nbsp;&nbsp; Email : darshantarsariya17@gmail.com
           <br/>
           &copy; Marvel &nbsp;&nbsp; {new Date().getFullYear()}
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

