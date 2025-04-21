import OrderPage from '../../../../components/pages/order';
import React from "react";

interface OrderProps {
    params: {
      id: string
    }
  };

 async function Order({ params }: OrderProps){
  const { id } = await params
  return <OrderPage id={id}/>
};

export default Order;