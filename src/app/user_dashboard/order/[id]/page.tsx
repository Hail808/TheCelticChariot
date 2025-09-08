import React from "react";
import OrderPage from "../../../../components/pages/order";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Order({ params }: Props) {
  const { id } = await params;
  return <OrderPage id={id} />;
}
