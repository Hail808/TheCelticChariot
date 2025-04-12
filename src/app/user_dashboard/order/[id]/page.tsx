import OrderPage from '../../../../components/pages/order';

interface OrderProps {
    params: {
      id: string
    }
  };

function Order({ params }: OrderProps){
    return <OrderPage id={params.id}/>
};

export default Order;