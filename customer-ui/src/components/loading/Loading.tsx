import React from 'react';

export default function Loading() {
    return (
        <div className="m-auto d-flex">
            <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            </div>
            <span className="ms-3 my-auto">LOADING...</span>
        </div>
    );
}