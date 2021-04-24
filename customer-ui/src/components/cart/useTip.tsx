import { MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";

export default function useTip() {

    const [tipInDollars, setTip] = useState<number>(0);

    const onChange = (e: any) => {
        const inputValue = e.target.value;
        setTip(inputValue);
    }

    const tipInput = <MDBInput label='Tip Amount' id='tip' type='number' min={0} step={.01} onChange={onChange} value={`${tipInDollars ? tipInDollars : ""}`} className="mb-2" />;

    const tip = Number(Number(tipInDollars).toFixed(2)) * 100;

    return { tip, tipInput }
}
