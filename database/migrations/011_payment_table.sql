--
-- PostgreSQL database dump
--

\restrict IPuVKWtehzygBD5bdoYi3c10MSfezRu4W5Iog462qAiOxBTXeRrqhbcGhFmuew6

-- Dumped from database version 17.5 (1b53132)
-- Dumped by pg_dump version 17.6

-- Started on 2025-09-15 16:10:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3436 (class 1262 OID 16391)
-- Name: neondb; Type: DATABASE; Schema: -; Owner: neondb_owner
--

CREATE DATABASE neondb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = builtin LOCALE = 'C.UTF-8' BUILTIN_LOCALE = 'C.UTF-8';


ALTER DATABASE neondb OWNER TO neondb_owner;

\unrestrict IPuVKWtehzygBD5bdoYi3c10MSfezRu4W5Iog462qAiOxBTXeRrqhbcGhFmuew6
\connect neondb
\restrict IPuVKWtehzygBD5bdoYi3c10MSfezRu4W5Iog462qAiOxBTXeRrqhbcGhFmuew6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 57345)
-- Name: address; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.address (
    address_id integer NOT NULL,
    street_line1 character varying(100) NOT NULL,
    street_line2 character varying(100),
    city character varying(50) NOT NULL,
    state character varying(50),
    postal_code character varying(20),
    country character varying(50) NOT NULL
);


ALTER TABLE public.address OWNER TO neondb_owner;

--
-- TOC entry 219 (class 1259 OID 57344)
-- Name: address_address_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.address_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.address_address_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 219
-- Name: address_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.address_address_id_seq OWNED BY public.address.address_id;


--
-- TOC entry 218 (class 1259 OID 40964)
-- Name: category; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public.category OWNER TO neondb_owner;

--
-- TOC entry 217 (class 1259 OID 40963)
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_category_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 217
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- TOC entry 222 (class 1259 OID 57370)
-- Name: customer; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    phone_num character varying(15) NOT NULL,
    last_login date,
    fk_ship_address_id integer,
    fk_bill_address_id integer
);


ALTER TABLE public.customer OWNER TO neondb_owner;

--
-- TOC entry 221 (class 1259 OID 57369)
-- Name: customer_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.customer_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customer_customer_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 221
-- Name: customer_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customer.customer_id;


--
-- TOC entry 224 (class 1259 OID 57387)
-- Name: guest; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.guest (
    guest_id integer NOT NULL,
    email character varying(30) NOT NULL,
    phone_num character varying(15) NOT NULL,
    fk_ship_address_id integer,
    fk_bill_address_id integer,
    CONSTRAINT guest_phone_num_check CHECK (((phone_num)::text ~ '^\+?[0-9]{10,15}$'::text))
);


ALTER TABLE public.guest OWNER TO neondb_owner;

--
-- TOC entry 223 (class 1259 OID 57386)
-- Name: guest_guest_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.guest_guest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.guest_guest_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 223
-- Name: guest_guest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.guest_guest_id_seq OWNED BY public.guest.guest_id;


--
-- TOC entry 232 (class 1259 OID 73742)
-- Name: invoice; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.invoice (
    invoice_id integer NOT NULL,
    fk_order_id integer,
    invoice_number character varying(50) NOT NULL,
    invoice_date date NOT NULL,
    total_price numeric(10,2),
    due_date date NOT NULL,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status NOT NULL
);


ALTER TABLE public.invoice OWNER TO neondb_owner;

--
-- TOC entry 231 (class 1259 OID 73741)
-- Name: invoice_invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.invoice_invoice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.invoice_invoice_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 231
-- Name: invoice_invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.invoice_invoice_id_seq OWNED BY public.invoice.invoice_id;


--
-- TOC entry 236 (class 1259 OID 73787)
-- Name: order_item; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.order_item (
    order_item_id integer NOT NULL,
    fk_order_id integer,
    fk_product_id integer,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public.order_item OWNER TO neondb_owner;

--
-- TOC entry 235 (class 1259 OID 73786)
-- Name: order_item_order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.order_item_order_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_item_order_item_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 235
-- Name: order_item_order_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.order_item_order_item_id_seq OWNED BY public.order_item.order_item_id;


--
-- TOC entry 228 (class 1259 OID 57425)
-- Name: orders; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    order_date date DEFAULT CURRENT_DATE NOT NULL,
    total_price numeric(10,2) NOT NULL,
    order_status character varying(20) NOT NULL,
    fk_ship_address_id integer,
    fk_bill_address_id integer,
    fk_customer_id integer,
    fk_guest_id integer,
    CONSTRAINT check_one_customer CHECK ((((fk_customer_id IS NOT NULL) AND (fk_guest_id IS NULL)) OR ((fk_customer_id IS NULL) AND (fk_guest_id IS NOT NULL))))
);


ALTER TABLE public.orders OWNER TO neondb_owner;

--
-- TOC entry 227 (class 1259 OID 57424)
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- TOC entry 238 (class 1259 OID 73805)
-- Name: payment; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.payment (
    payment_id integer NOT NULL,
    fk_invoice_id integer,
    payment_method character varying(50) NOT NULL,
    payment_date date NOT NULL,
    amount_paid numeric(10,2)
);


ALTER TABLE public.payment OWNER TO neondb_owner;

--
-- TOC entry 237 (class 1259 OID 73804)
-- Name: payment_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.payment_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_payment_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 237
-- Name: payment_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.payment_payment_id_seq OWNED BY public.payment.payment_id;


--
-- TOC entry 226 (class 1259 OID 57405)
-- Name: product; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.product (
    product_id integer NOT NULL,
    product_name character varying(100) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    inventory integer NOT NULL,
    prod_image_url text,
    fk_category_id integer
);


ALTER TABLE public.product OWNER TO neondb_owner;

--
-- TOC entry 225 (class 1259 OID 57404)
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_product_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 225
-- Name: product_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product.product_id;


--
-- TOC entry 230 (class 1259 OID 65537)
-- Name: reviews; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    review_text text,
    review_date date NOT NULL,
    rating integer NOT NULL,
    fk_customer_id integer,
    fk_product_id integer,
    CONSTRAINT rating CHECK (((rating > 0) AND (rating < 6)))
);


ALTER TABLE public.reviews OWNER TO neondb_owner;

--
-- TOC entry 229 (class 1259 OID 65536)
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_review_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 229
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- TOC entry 234 (class 1259 OID 73762)
-- Name: shipping; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.shipping (
    shipping_id integer NOT NULL,
    fk_order_id integer,
    fk_shipping_address_id integer,
    tracking_num character varying(50),
    carrier character varying(50) NOT NULL,
    shipping_status public.shipping_status DEFAULT 'not yet shipped'::public.shipping_status NOT NULL
);


ALTER TABLE public.shipping OWNER TO neondb_owner;

--
-- TOC entry 233 (class 1259 OID 73761)
-- Name: shipping_shipping_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.shipping_shipping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shipping_shipping_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 233
-- Name: shipping_shipping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.shipping_shipping_id_seq OWNED BY public.shipping.shipping_id;


--
-- TOC entry 3231 (class 2604 OID 57348)
-- Name: address address_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.address ALTER COLUMN address_id SET DEFAULT nextval('public.address_address_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 40967)
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 57373)
-- Name: customer customer_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 57390)
-- Name: guest guest_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guest ALTER COLUMN guest_id SET DEFAULT nextval('public.guest_guest_id_seq'::regclass);


--
-- TOC entry 3238 (class 2604 OID 73745)
-- Name: invoice invoice_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.invoice ALTER COLUMN invoice_id SET DEFAULT nextval('public.invoice_invoice_id_seq'::regclass);


--
-- TOC entry 3242 (class 2604 OID 73790)
-- Name: order_item order_item_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_item ALTER COLUMN order_item_id SET DEFAULT nextval('public.order_item_order_item_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 57428)
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- TOC entry 3243 (class 2604 OID 73808)
-- Name: payment payment_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payment ALTER COLUMN payment_id SET DEFAULT nextval('public.payment_payment_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 57408)
-- Name: product product_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.product ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 65540)
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- TOC entry 3240 (class 2604 OID 73765)
-- Name: shipping shipping_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.shipping ALTER COLUMN shipping_id SET DEFAULT nextval('public.shipping_shipping_id_seq'::regclass);


--
-- TOC entry 3250 (class 2606 OID 57350)
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (address_id);


--
-- TOC entry 3248 (class 2606 OID 40971)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- TOC entry 3252 (class 2606 OID 57375)
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- TOC entry 3254 (class 2606 OID 57393)
-- Name: guest guest_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guest
    ADD CONSTRAINT guest_pkey PRIMARY KEY (guest_id);


--
-- TOC entry 3262 (class 2606 OID 73748)
-- Name: invoice invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (invoice_id);


--
-- TOC entry 3266 (class 2606 OID 73792)
-- Name: order_item order_item_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (order_item_id);


--
-- TOC entry 3258 (class 2606 OID 57432)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- TOC entry 3268 (class 2606 OID 73810)
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (payment_id);


--
-- TOC entry 3256 (class 2606 OID 57412)
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);


--
-- TOC entry 3260 (class 2606 OID 65545)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- TOC entry 3264 (class 2606 OID 73768)
-- Name: shipping shipping_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.shipping
    ADD CONSTRAINT shipping_pkey PRIMARY KEY (shipping_id);


--
-- TOC entry 3269 (class 2606 OID 57381)
-- Name: customer fk_bill_address_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT fk_bill_address_id FOREIGN KEY (fk_ship_address_id) REFERENCES public.address(address_id);


--
-- TOC entry 3271 (class 2606 OID 57399)
-- Name: guest fk_bill_address_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guest
    ADD CONSTRAINT fk_bill_address_id FOREIGN KEY (fk_ship_address_id) REFERENCES public.address(address_id);


--
-- TOC entry 3274 (class 2606 OID 57438)
-- Name: orders fk_bill_address_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_bill_address_id FOREIGN KEY (fk_ship_address_id) REFERENCES public.address(address_id);


--
-- TOC entry 3273 (class 2606 OID 57413)
-- Name: product fk_category_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_category_id FOREIGN KEY (fk_category_id) REFERENCES public.category(category_id);


--
-- TOC entry 3275 (class 2606 OID 57443)
-- Name: orders fk_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_customer_id FOREIGN KEY (fk_customer_id) REFERENCES public.customer(customer_id);


--
-- TOC entry 3278 (class 2606 OID 65546)
-- Name: reviews fk_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_customer_id FOREIGN KEY (fk_customer_id) REFERENCES public.customer(customer_id);


--
-- TOC entry 3276 (class 2606 OID 57448)
-- Name: orders fk_guest_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_guest_id FOREIGN KEY (fk_guest_id) REFERENCES public.guest(guest_id);


--
-- TOC entry 3285 (class 2606 OID 73811)
-- Name: payment fk_invoice_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT fk_invoice_id FOREIGN KEY (fk_invoice_id) REFERENCES public.invoice(invoice_id);


--
-- TOC entry 3280 (class 2606 OID 73749)
-- Name: invoice fk_order_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT fk_order_id FOREIGN KEY (fk_order_id) REFERENCES public.orders(order_id);


--
-- TOC entry 3281 (class 2606 OID 73769)
-- Name: shipping fk_order_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.shipping
    ADD CONSTRAINT fk_order_id FOREIGN KEY (fk_order_id) REFERENCES public.orders(order_id);


--
-- TOC entry 3283 (class 2606 OID 73793)
-- Name: order_item fk_order_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT fk_order_id FOREIGN KEY (fk_order_id) REFERENCES public.orders(order_id);


--
-- TOC entry 3279 (class 2606 OID 65551)
-- Name: reviews fk_product_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_product_id FOREIGN KEY (fk_product_id) REFERENCES public.product(product_id);


--
-- TOC entry 3284 (class 2606 OID 73798)
-- Name: order_item fk_product_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT fk_product_id FOREIGN KEY (fk_product_id) REFERENCES public.product(product_id);


--
-- TOC entry 3270 (class 2606 OID 57376)
-- Name: customer fk_ship_address_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT fk_ship_address_id FOREIGN KEY (fk_ship_address_id) REFERENCES public.address(address_id);


--
-- TOC entry 3272 (class 2606 OID 57394)
-- Name: guest fk_ship_address_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guest
    ADD CONSTRAINT fk_ship_address_id FOREIGN KEY (fk_ship_address_id) REFERENCES public.address(address_id);


--
-- TOC entry 3277 (class 2606 OID 57433)
-- Name: orders fk_ship_address_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_ship_address_id FOREIGN KEY (fk_ship_address_id) REFERENCES public.address(address_id);


--
-- TOC entry 3282 (class 2606 OID 73774)
-- Name: shipping fk_shipping_address_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.shipping
    ADD CONSTRAINT fk_shipping_address_id FOREIGN KEY (fk_shipping_address_id) REFERENCES public.address(address_id);


--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 3436
-- Name: DATABASE neondb; Type: ACL; Schema: -; Owner: neondb_owner
--

GRANT ALL ON DATABASE neondb TO neon_superuser;


-- Completed on 2025-09-15 16:10:34

--
-- PostgreSQL database dump complete
--

\unrestrict IPuVKWtehzygBD5bdoYi3c10MSfezRu4W5Iog462qAiOxBTXeRrqhbcGhFmuew6

