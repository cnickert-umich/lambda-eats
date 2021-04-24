import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBCol,
} from "mdb-react-ui-kit";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { OrderDO } from "../../CustomTypes";
import useSound from "use-sound";
import uniqolor from "uniqolor";

// sound retreived from https://notificationsounds.com/notification-sounds
import notificationSfx from "../../assets/notification_sound_1.mp3";
import { useReactToPrint } from "react-to-print";

function ViewOrders() {
  const [playSound] = useSound(notificationSfx);

  const { shopId } = useParams() as { shopId: string };

  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<OrderDO[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<OrderDO>();


  const fetchAllOrders = async (shopId: string) => {
    setLoading(true);

    const response: OrderDO[] = await (
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/shops/${shopId}/orders`
      )
    ).json();

    setOrders(response);
    setLoading(false);
  };

  const archiveOrder = async (orderId: string) => {
    setLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/shops/${shopId}/orders/${orderId}`, {
      method: 'DELETE'
    }
    );

    if (response.ok) {
      const newOrders = [...orders];
      for (const i in newOrders) {
        if (newOrders[i].id == orderId) {
          newOrders.splice(parseInt(i), 1);
          break;
        }
      }

      setOrders(newOrders);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAllOrders(shopId);
  }, [shopId]);

  const [toPrint, setToPrint] = useState<OrderDO>();
  const ticketRef = useRef();
  const handlePrint = useReactToPrint({
    // @ts-ignore
    content: () => ticketRef.current,
  });

  useEffect(() => {
    if (toPrint && handlePrint) {
      handlePrint();
    }
  }, [toPrint]);

  const webSocketEvent = (event: MessageEvent): void => {
    const webSocketMessage = JSON.parse(event.data);
    const dataName: "NEW_ORDER" = webSocketMessage.dataName;
    console.log("DATA_NAME", dataName);
    if (dataName == "NEW_ORDER") {
      const newOrder: OrderDO = webSocketMessage.data;
      newOrder.isNew = true;
      setOrders(orders.concat([newOrder]));

      setToPrint(newOrder);
      playSound();
    }
  };

  const socketUrl = `${process.env.REACT_APP_WS_BASE_URL}?shopId=${shopId}`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: webSocketEvent,
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 10,
    reconnectInterval: 500,
    retryOnError: true,
  });

  return (
    <div>
      <div className="mt-3 d-flex w-100 justify-content-between">
        <h1 className="pb-0 mb-0">Orders</h1>{" "}
        <div>
          <WebSocketStatus readyState={readyState} />
          <MDBBtn
            color="light"
            onClick={() => {
              setLoading(true);
              window.location.reload();
            }}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <i className="fas fa-sync"></i>
            )}
          </MDBBtn>
        </div>
      </div>
      <MDBRow>
        {orders.length > 0 ?
          orders.map((order, index) => {
            return (
              <OrderTile
                key={order.id}
                order={order}
                openModal={() => {
                  order.isNew = false;
                  const newOrders = [...orders];
                  newOrders[index] = order;
                  setOrders(newOrders);
                  setSelectedOrder(order);
                }}
              />
            );
          })
          : <p>There are currently no active orders.</p>
        }
      </MDBRow>
      <OrderModal
        selectedOrder={selectedOrder}
        closeModal={() => {
          setSelectedOrder(undefined);
        }}
        archiveOrder={archiveOrder}
      />
      <div className="invisible">
        {toPrint ? <Ticket ref={ticketRef} order={toPrint as OrderDO} /> : <></>}
      </div>
    </div>
  );
}

export default ViewOrders;

function WebSocketStatus(props: { readyState: ReadyState }) {
  switch (props.readyState) {
    case ReadyState.OPEN:
      return (
        <span className="me-3 text-success">
          Connected <i className="fas fa-plug"></i>
        </span>
      );
    case ReadyState.CONNECTING:
      return (
        <span className="me-3 text-info">
          Connecting <i className="fas fa-satellite-dish"></i>
        </span>
      );
    case ReadyState.CLOSING:
    case ReadyState.CLOSED:
    case ReadyState.UNINSTANTIATED:
    default:
      return (
        <span className="me-3 text-danger">
          Disconnected <i className="fas fa-exclamation-triangle"></i>
        </span>
      );
  }
}

function OrderTile({
  order,
  openModal,
}: {
  order: OrderDO;
  openModal: Function;
}) {
  return (
    <div className="col-6 fs-6">
      <MDBCardHeader
        className={`${order.isNew ? "visible" : "invisible"
          } text-white bg-danger w-25 ms-1 py-0 mt-n1`}
      >
        <span>New</span>
      </MDBCardHeader>
      <MDBCard
        className={`mb-4 border hover-shadow pe-auto ${order.isNew ? "border-danger" : ""
          }`}
        tabIndex={0}
        onClick={openModal}
        style={{ cursor: "pointer" }}
        role="button"
      >
        <MDBCardBody>
          <MDBCardTitle className="fs-6 d-flex justify-content-between">
            <span>{order.customer.customerName}<br />
              <span className="small text-muted">{order.id}</span></span>
            <span style={{ color: uniqolor(order.id).color }}>
              <i className="fas fa-circle"></i>
            </span>
          </MDBCardTitle>
          <MDBCardText>
            <span>
              Ordered At:{" "}
              <strong>{new Date(order.createdAt).toLocaleTimeString()}</strong>
            </span>
            <br />
            <span>
              Estimated Pickup: ~
              <strong>
                {new Date(
                  order.createdAt + order.shopSnapshot.waitTime
                ).toLocaleTimeString()}
              </strong>
            </span>
            <br />
            <span className="d-flex justify-content-between">
              <span>
                Order Total: $
                <strong>{(order.totalAmount / 100).toFixed(2)}</strong>
              </span>
              <span>
                <i className="fas fa-hand-holding-usd"></i> $
                {(order.tipAmount / 100).toFixed(2)}
              </span>
            </span>
          </MDBCardText>
        </MDBCardBody>
        {/* <MDBCardFooter className='text-muted'>3:45 PM</MDBCardFooter> */}
      </MDBCard>
    </div>
  );
}

function OrderModal({
  selectedOrder,
  closeModal,
  archiveOrder
}: {
  selectedOrder: OrderDO | undefined,
  closeModal: Function,
  archiveOrder: Function
}) {

  const archiveClicked = () => {
    closeModal();
    archiveOrder(selectedOrder?.id);
  }

  const ticketRef = useRef();
  const handlePrint = useReactToPrint({
    // @ts-ignore
    content: () => ticketRef.current,
  });

  return (
    <MDBModal show={selectedOrder ? true : false} staticBackdrop tabIndex="-1">
      <MDBModalDialog centered size="xl">
        <MDBModalContent className="h-100">
          <MDBModalHeader>
            <MDBModalTitle>Order Details <span className="small" style={{ color: selectedOrder ? uniqolor(selectedOrder.id).color : "" }}>{selectedOrder?.id}</span></MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={closeModal}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            {selectedOrder ? (
              <MDBRow>
                <MDBCol>
                  <span>
                    Name:{" "}
                    <strong>
                      {selectedOrder.customer.customerName}
                    </strong>
                  </span>
                  <br />
                  <span>
                    Phone:{" "}
                    <strong>
                      {selectedOrder.customer.customerPhone}
                    </strong>
                  </span>
                  <br />
                  <span>
                    Email:{" "}
                    <strong>
                      {selectedOrder.customer.customerEmail}
                    </strong>
                  </span>
                  <br />
                  <span>
                    Ordered At:{" "}
                    <strong>
                      {new Date(selectedOrder.createdAt).toLocaleTimeString()}
                    </strong>
                  </span>
                  <br />
                  <span>
                    Estimated Pickup: ~
                  <strong>
                      {new Date(
                        selectedOrder.createdAt +
                        selectedOrder.shopSnapshot.waitTime
                      ).toLocaleTimeString()}
                    </strong>
                  </span>
                  <br />
                  <span>
                    Order Total: $
                    <strong>
                      {(selectedOrder.totalAmount / 100).toFixed(2)}
                    </strong>
                  </span>
                  <br />
                  <span>
                    Tip: $
                  <strong>
                      {(selectedOrder.tipAmount / 100).toFixed(2)}
                    </strong>
                  </span>
                </MDBCol>
                <MDBCol className="text-end">
                  <Ticket ref={ticketRef} order={selectedOrder} />
                </MDBCol>
              </MDBRow>
            ) : (
              <></>
            )}
          </MDBModalBody>

          <MDBModalFooter className="d-flex justify-content-between">
            <MDBBtn color="danger" onClick={archiveClicked}>Archive<i className="fas fa-archive ms-1"></i></MDBBtn>
            <MDBBtn color="info" onClick={handlePrint}>Print<i className="fas fa-print ms-1"></i></MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

const Ticket = React.forwardRef((props: { order: OrderDO }, ref) => (
  // @ts-ignore
  <div ref={ref}>
    {props.order.lineItems.map((lineItem, lineNumber) => {
      return <p key={`${props.order.id}-${lineNumber}`}>
        <strong>{lineItem.name}</strong><br />
        ${(lineItem.amount / 100).toFixed(2)}<br />
      </p>
    })}
  </div>
));
