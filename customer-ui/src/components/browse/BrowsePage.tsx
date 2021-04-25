import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import logo from "../footer/LambdaEatsLogo.png";

export default function BrowsePage() {

    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string>();

    const [list, setList] = useState<[{ id: string, name: string }]>();

    const fetchAllShops = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/shops`);

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

    useEffect(() => {
        fetchAllShops();
    }, []);

    return (
        <div className="container text-center mt-5">
            {error ? <div className="alert alert-danger" role="alert">
                {error}
            </div> : <></>}
            <div className="d-flex justify-content-center">
                <img src={logo} style={{ height: "7em" }} className="me-1 my-auto" />
                <h1 className="my-auto"><span className="visually-hidden">Lambda Eats</span></h1>
            </div>
            <p className="text-muted small">Select a shop below to order food from.</p>
            <hr />
            {loading ? <div className="w-100 d-flex mt-5 pt-5">
                <Loading />
            </div> : <>
                {list != undefined && list.length > 0 ?
                    <>
                        {list.map((shop) => {
                            return <div className="m-2"><Link to={shop.id} target="_blank"><MDBBtn color="light"><i className="fas fa-external-link-alt me-2"></i><strong>{shop.name}</strong><br /><span className="small">{shop.id}</span></MDBBtn></Link></div>
                        })}
                    </>
                    :
                    <h2 className="text-white">There are currently no shops. Generate some test data above.</h2>
                }
            </>
            }
        </div>
    );
}
