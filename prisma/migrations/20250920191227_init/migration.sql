-- CreateEnum
CREATE TYPE "public"."payment_status" AS ENUM ('pending', 'paid', 'overdue', 'partially paid', 'cancelled', 'refunded');

-- CreateEnum
CREATE TYPE "public"."shipping_status" AS ENUM ('delivered', 'shipped', 'not yet shipped');

-- CreateTable
CREATE TABLE "public"."address" (
    "address_id" SERIAL NOT NULL,
    "street_line1" VARCHAR(100) NOT NULL,
    "street_line2" VARCHAR(100),
    "city" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50),
    "postal_code" VARCHAR(20),
    "country" VARCHAR(50) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "public"."category" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "public"."customer" (
    "customer_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "phone_num" VARCHAR(15) NOT NULL,
    "last_login" DATE,
    "fk_ship_address_id" INTEGER,
    "fk_bill_address_id" INTEGER,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "public"."guest" (
    "guest_id" SERIAL NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "phone_num" VARCHAR(15) NOT NULL,
    "fk_ship_address_id" INTEGER,
    "fk_bill_address_id" INTEGER,

    CONSTRAINT "guest_pkey" PRIMARY KEY ("guest_id")
);

-- CreateTable
CREATE TABLE "public"."inventory" (
    "item_id" SERIAL NOT NULL,
    "name" TEXT,
    "category" TEXT,
    "tags" TEXT[],
    "price" DECIMAL(10,2),

    CONSTRAINT "inventory2_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "public"."invoice" (
    "invoice_id" SERIAL NOT NULL,
    "fk_order_id" INTEGER,
    "invoice_number" VARCHAR(50) NOT NULL,
    "invoice_date" DATE NOT NULL,
    "total_price" DECIMAL(10,2),
    "due_date" DATE NOT NULL,
    "payment_status" "public"."payment_status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("invoice_id")
);

-- CreateTable
CREATE TABLE "public"."order_item" (
    "order_item_id" SERIAL NOT NULL,
    "fk_order_id" INTEGER,
    "fk_product_id" INTEGER,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("order_item_id")
);

-- CreateTable
CREATE TABLE "public"."orders" (
    "order_id" SERIAL NOT NULL,
    "order_date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "total_price" DECIMAL(10,2) NOT NULL,
    "order_status" VARCHAR(20) NOT NULL,
    "fk_ship_address_id" INTEGER,
    "fk_bill_address_id" INTEGER,
    "fk_customer_id" INTEGER,
    "fk_guest_id" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "public"."payment" (
    "payment_id" SERIAL NOT NULL,
    "fk_invoice_id" INTEGER,
    "payment_method" VARCHAR(50) NOT NULL,
    "payment_date" DATE NOT NULL,
    "amount_paid" DECIMAL(10,2),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "public"."product" (
    "product_id" SERIAL NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "inventory" INTEGER NOT NULL,
    "prod_image_url" VARCHAR(500),
    "fk_category_id" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "review_id" SERIAL NOT NULL,
    "review_text" TEXT,
    "review_date" DATE NOT NULL,
    "rating" INTEGER NOT NULL,
    "fk_customer_id" INTEGER,
    "fk_product_id" INTEGER,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "public"."shipping" (
    "shipping_id" SERIAL NOT NULL,
    "fk_order_id" INTEGER,
    "fk_shipping_address_id" INTEGER,
    "tracking_num" VARCHAR(50),
    "carrier" VARCHAR(50) NOT NULL,
    "shipping_status" "public"."shipping_status" NOT NULL DEFAULT 'not yet shipped',

    CONSTRAINT "shipping_pkey" PRIMARY KEY ("shipping_id")
);

-- AddForeignKey
ALTER TABLE "public"."customer" ADD CONSTRAINT "fk_bill_address_id" FOREIGN KEY ("fk_ship_address_id") REFERENCES "public"."address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."guest" ADD CONSTRAINT "fk_bill_address_id" FOREIGN KEY ("fk_ship_address_id") REFERENCES "public"."address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."invoice" ADD CONSTRAINT "fk_order_id" FOREIGN KEY ("fk_order_id") REFERENCES "public"."orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."order_item" ADD CONSTRAINT "fk_order_id" FOREIGN KEY ("fk_order_id") REFERENCES "public"."orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."order_item" ADD CONSTRAINT "fk_product_id" FOREIGN KEY ("fk_product_id") REFERENCES "public"."product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "fk_bill_address_id" FOREIGN KEY ("fk_ship_address_id") REFERENCES "public"."address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "fk_customer_id" FOREIGN KEY ("fk_customer_id") REFERENCES "public"."customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "fk_guest_id" FOREIGN KEY ("fk_guest_id") REFERENCES "public"."guest"("guest_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "fk_invoice_id" FOREIGN KEY ("fk_invoice_id") REFERENCES "public"."invoice"("invoice_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "fk_category_id" FOREIGN KEY ("fk_category_id") REFERENCES "public"."category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "fk_customer_id" FOREIGN KEY ("fk_customer_id") REFERENCES "public"."customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "fk_product_id" FOREIGN KEY ("fk_product_id") REFERENCES "public"."product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."shipping" ADD CONSTRAINT "fk_order_id" FOREIGN KEY ("fk_order_id") REFERENCES "public"."orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."shipping" ADD CONSTRAINT "fk_shipping_address_id" FOREIGN KEY ("fk_shipping_address_id") REFERENCES "public"."address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
