--
-- PostgreSQL database dump
--

\restrict d2mDhnjjd9g31T4IjildxdgvfbQWP8AMKXAwHnPsyK6R0UnfHCIhY4TGVwEhaXJ

-- Dumped from database version 17.5 (1b53132)
-- Dumped by pg_dump version 17.6

-- Started on 2025-09-14 12:59:16

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
-- TOC entry 3359 (class 1262 OID 16391)
-- Name: neondb; Type: DATABASE; Schema: -; Owner: neondb_owner
--

CREATE DATABASE neondb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = builtin LOCALE = 'C.UTF-8' BUILTIN_LOCALE = 'C.UTF-8';


ALTER DATABASE neondb OWNER TO neondb_owner;

\unrestrict d2mDhnjjd9g31T4IjildxdgvfbQWP8AMKXAwHnPsyK6R0UnfHCIhY4TGVwEhaXJ
\connect neondb
\restrict d2mDhnjjd9g31T4IjildxdgvfbQWP8AMKXAwHnPsyK6R0UnfHCIhY4TGVwEhaXJ

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
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 219
-- Name: address_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.address_address_id_seq OWNED BY public.address.address_id;


--
-- TOC entry 3206 (class 2604 OID 57348)
-- Name: address address_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.address ALTER COLUMN address_id SET DEFAULT nextval('public.address_address_id_seq'::regclass);


--
-- TOC entry 3208 (class 2606 OID 57350)
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (address_id);


--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 3359
-- Name: DATABASE neondb; Type: ACL; Schema: -; Owner: neondb_owner
--

GRANT ALL ON DATABASE neondb TO neon_superuser;


-- Completed on 2025-09-14 12:59:20

--
-- PostgreSQL database dump complete
--

\unrestrict d2mDhnjjd9g31T4IjildxdgvfbQWP8AMKXAwHnPsyK6R0UnfHCIhY4TGVwEhaXJ

