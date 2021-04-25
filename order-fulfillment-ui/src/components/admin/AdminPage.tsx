import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../footer/LambdaEatsLogo.png";

export default function AdminPage() {

    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string>();

    const [list, setList] = useState<[{ id: string, name: string }]>();

    const fetchAllShops = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/shops`);

            console.log("yeet");

            if (response.ok) {
                setList(await response.json());
                setLoading(false);
                return;
            }
        } catch (e) {
            console.error(e);
        }

        setError("Something went wrong with the fetch request. Make sure you set the REACT_APP_API_BASE_URL correctly in your .env file.");
        setLoading(false);
    }

    const generateTestData = async () => {
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/shops/generate-test-shop`,
            { method: "POST" }
        );

        if (response.ok) {
            await fetchAllShops();
        } else {
            setError("Something went wrong trying to generate the data. Refresh the page and retry.");
        }
    }

    useEffect(() => {
        fetchAllShops();
    }, []);

    return (
        <div className="container text-center mt-5">
            {error ? <div className="alert alert-danger" role="alert">
                {error}
            </div> : <></>}
            <div className="d-flex justify-content-center">
                <img src={logo} style={{ height: "5em" }} className="me-1 my-auto" />
                <h1 className="my-auto"><span className="visually-hidden">Lambda Eats </span>Admin Page</h1>
            </div>
            <p className="text-muted small">The admin tool to create shops through a GUI is under construction.</p>
            <hr />
            <p>You can either use this page to generate test data or use the suite of API endpoints.</p>
            {loading ? <div className="w-100 d-flex mt-5 pt-5">
                <div className="spinner-border mx-auto" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : <>
                <div className="mt-3">
                    <MDBBtn className="mb-3" onClick={generateTestData}><i className="fas fa-cogs me-2"></i>Generate More Test Data</MDBBtn>
                </div>


                <div className="card py-3 bg-dark mt-3">
                    {list != undefined && list.length > 0 ?
                        <>
                            <h2 className="text-white">Order Fulfilment Pages</h2>
                            {list.map((shop) => {
                                return <div className="m-2"><Link to={shop.id} target="_blank"><MDBBtn color="light"><i className="fas fa-external-link-alt me-2"></i><strong>{shop.name}</strong><br /><span className="small">{shop.id}</span></MDBBtn></Link></div>
                            })}
                        </>
                        :
                        <h2 className="text-white">There are currently no shops. Generate some test data above.</h2>
                    }
                </div>
            </>}
        </div>
    );
}
