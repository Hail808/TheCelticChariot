--
-- PostgreSQL database dump
--

\restrict azqgFjF6fdGvEOSha08ubK4kcoyUfdxUsOoEQtXUUo6tcntjIblx2XBmRRcJCes

-- Dumped from database version 17.5 (1b53132)
-- Dumped by pg_dump version 17.6

-- Started on 2025-09-14 13:01:31

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

DROP DATABASE neondb;
--
-- TOC entry 3370 (class 1262 OID 16391)
-- Name: neondb; Type: DATABASE; Schema: -; Owner: neondb_owner
--

CREATE DATABASE neondb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = builtin LOCALE = 'C.UTF-8' BUILTIN_LOCALE = 'C.UTF-8';


ALTER DATABASE neondb OWNER TO neondb_owner;

\unrestrict azqgFjF6fdGvEOSha08ubK4kcoyUfdxUsOoEQtXUUo6tcntjIblx2XBmRRcJCes
\connect neondb
\restrict azqgFjF6fdGvEOSha08ubK4kcoyUfdxUsOoEQtXUUo6tcntjIblx2XBmRRcJCes

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
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 219
-- Name: address_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.address_address_id_seq OWNED BY public.address.address_id;


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
-- TOC entry 3373 (class 0 OID 0)
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
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 223
-- Name: guest_guest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.guest_guest_id_seq OWNED BY public.guest.guest_id;


--
-- TOC entry 3206 (class 2604 OID 57348)
-- Name: address address_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.address ALTER COLUMN address_id SET DEFAULT nextval('public.address_address_id_seq'::regclass);


--
-- TOC entry 3207 (class 2604 OID 57373)
-- Name: customer customer_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);


--
-- TOC entry 3208 (class 2604 OID 57390)
-- Name: guest guest_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guest ALTER COLUMN guest_id SET DEFAULT nextval('public.guest_guest_id_seq'::regclass);


--
-- TOC entry 3211 (class 2606 OID 57350)
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (address_id);


--
-- TOC entry 3213 (class 2606 OID 57375)
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);


--
-- TOC entry 3215 (class 2606 OID 57393)
-- Name: guest guest_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guest
    ADD CONSTRAINT guest_pkey PRIMARY KEY (guest_id);


--
-- TOC entry 3216 (class 2606 OID 57381)
-- Name: customer fk_bill_address_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT fk_bill_address_id FOREIGN KEY (fk_ship_address_id) REFERENCES public.address(address_id);


--
-- TOC entry 3218 (class 2606 OID 57399)
-- Name: guest fk_bill_address_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guest
    ADD CONSTRAINT fk_bill_address_id FOREIGN KEY (fk_ship_address_id) REFERENCES public.address(address_id);


--
-- TOC entry 3217 (class 2606 OID 57376)
-- Name: customer fk_ship_address_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT fk_ship_address_id FOREIGN KEY (fk_ship_address_id) REFERENCES public.address(address_id);


--
-- TOC entry 3219 (class 2606 OID 57394)
-- Name: guest fk_ship_address_id; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.guest
    ADD CONSTRAINT fk_ship_address_id FOREIGN KEY (fk_ship_address_id) REFERENCES public.address(address_id);


--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 3370
-- Name: DATABASE neondb; Type: ACL; Schema: -; Owner: neondb_owner
--

GRANT ALL ON DATABASE neondb TO neon_superuser;


-- Completed on 2025-09-14 13:01:35

--
-- PostgreSQL database dump complete
--

\unrestrict azqgFjF6fdGvEOSha08ubK4kcoyUfdxUsOoEQtXUUo6tcntjIblx2XBmRRcJCes

