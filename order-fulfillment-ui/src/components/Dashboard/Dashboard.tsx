import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopDO } from '../../CustomTypes';
import Header from '../Header';
import OrderTable from '../Orders/ViewOrders';

function Dashboard() {

  const { shopId } = useParams() as { shopId: string };

  const [shopInfo, setShopInfo] = useState<ShopDO>();

  const fetchShopInfo = async (shopId: string) => {
    //could create a fetch orders hook and have this interval call the fetch function every 30 seconds
    const response: ShopDO = await (await fetch(`${process.env.REACT_APP_API_BASE_URL}/shops/${shopId}`)).json();

    setShopInfo(response);
  }

  useEffect(() => {
    if (shopId) {
      fetchShopInfo(shopId);
    }
  }, [shopId]);

  return (
    <>
      <Header {...shopInfo as ShopDO} />
      <MDBContainer fluid>
        <div className="row">
          <div className="col-md-9 mx-auto">
            <OrderTable />
          </div>
        </div>
      </MDBContainer>
    </>
  );
}

export default Dashboard;
