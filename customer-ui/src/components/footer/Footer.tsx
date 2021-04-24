import { MDBFooter, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";
import logo from "./LambdaEatsLogo.png";

export default function Footer() {


    return (
        <MDBFooter className='text-center text-lg-left mt-5' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <MDBContainer className='p-4'>
                <MDBRow>
                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0 mx-auto d-flex justify-content-center'>
                        <h5 className='text-uppercase mx-2 my-auto'>Powered by</h5>
                        <img src={logo} style={{ height: "5em" }} className="mx-2" />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <div className='text-center p-3 bg-dark text-white' >
                <MDBContainer className='p-4'>
                    <MDBRow>
                        <MDBCol lg='6' md='12' className='mb-4 mb-md-0 mx-auto'>
                            <p className="small">&copy; 2021 <em>Lambda Eats</em> is a fictional software product name intended to represent an online ordering system. At the time of this project (April 2021), <em>Lambda Eats</em> was not a real product. This product is solely used to demonstate how to create an online ordering system using <a href="https://aws.amazon.com/lambda/" target="_blank">AWS Lambda</a> technology. It is not affiliated with any existing products and was used solely for educational purposes.</p>
                            <hr />
                Cameron Michael Nickert<br />
                            <a href="https://umdearborn.edu/cecs/departments/computer-and-information-science/graduate-programs/ms-software-engineering" target="_blank">
                                University of Michigan-Dearborn
                </a>
                            <br />
                2021 - CIS 695 - M.S. Software Engineering Project<br />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </MDBFooter>
    )


}
