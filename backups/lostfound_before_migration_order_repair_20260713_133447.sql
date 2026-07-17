--
-- PostgreSQL database dump
--

\restrict 5Qku29E7bGerAIgk0oOg1xFAaIPe4E2ZarvZe9A9G2wUCdOM1J6Y5U25DMMNjt2

-- Dumped from database version 16.14 (Debian 16.14-1.pgdg12+1)
-- Dumped by pg_dump version 16.14 (Debian 16.14-1.pgdg12+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: lostfound
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO lostfound;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: lostfound
--

COMMENT ON SCHEMA public IS '';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: EXTENSION vector; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION vector IS 'vector data type and ivfflat and hnsw access methods';


--
-- Name: AlertStatus; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."AlertStatus" AS ENUM (
    'PENDING',
    'QUEUED',
    'SENT',
    'FAILED'
);


ALTER TYPE public."AlertStatus" OWNER TO lostfound;

--
-- Name: ClaimStatus; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."ClaimStatus" AS ENUM (
    'PENDING',
    'VERIFICATION_REQUIRED',
    'APPROVED',
    'REJECTED',
    'CANCELLED',
    'HANDED_OVER',
    'RECOVERY_CONFIRMED'
);


ALTER TYPE public."ClaimStatus" OWNER TO lostfound;

--
-- Name: ConversationStatus; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."ConversationStatus" AS ENUM (
    'OPEN',
    'CLOSED',
    'FLAGGED'
);


ALTER TYPE public."ConversationStatus" OWNER TO lostfound;

--
-- Name: CustodyStatus; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."CustodyStatus" AS ENUM (
    'WITH_FINDER',
    'SUBMITTED_TO_SECURITY',
    'SUBMITTED_TO_OFFICE',
    'SECURED_BY_AUTHORITY',
    'HANDED_OVER'
);


ALTER TYPE public."CustodyStatus" OWNER TO lostfound;

--
-- Name: DevicePlatform; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."DevicePlatform" AS ENUM (
    'IOS',
    'ANDROID',
    'WEB'
);


ALTER TYPE public."DevicePlatform" OWNER TO lostfound;

--
-- Name: ItemKind; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."ItemKind" AS ENUM (
    'LOST',
    'FOUND'
);


ALTER TYPE public."ItemKind" OWNER TO lostfound;

--
-- Name: ItemStatus; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."ItemStatus" AS ENUM (
    'ACTIVE',
    'MATCHED',
    'CLAIMED',
    'RECOVERED',
    'CLOSED',
    'REMOVED'
);


ALTER TYPE public."ItemStatus" OWNER TO lostfound;

--
-- Name: LedgerEntryReason; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."LedgerEntryReason" AS ENUM (
    'TOPUP',
    'ALERT_PURCHASE',
    'REFUND',
    'ADMIN_ADJUSTMENT'
);


ALTER TYPE public."LedgerEntryReason" OWNER TO lostfound;

--
-- Name: LedgerEntryStatus; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."LedgerEntryStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'FAILED',
    'REVERSED'
);


ALTER TYPE public."LedgerEntryStatus" OWNER TO lostfound;

--
-- Name: LedgerEntryType; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."LedgerEntryType" AS ENUM (
    'CREDIT',
    'DEBIT'
);


ALTER TYPE public."LedgerEntryType" OWNER TO lostfound;

--
-- Name: MatchStatus; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."MatchStatus" AS ENUM (
    'PENDING',
    'CONFIRMED_STALE',
    'DISMISSED',
    'ACTIVE'
);


ALTER TYPE public."MatchStatus" OWNER TO lostfound;

--
-- Name: MatchTier; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."MatchTier" AS ENUM (
    'HIGHLY_LIKELY',
    'POSSIBLE',
    'WEAK'
);


ALTER TYPE public."MatchTier" OWNER TO lostfound;

--
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."NotificationType" AS ENUM (
    'POSSIBLE_MATCH',
    'HIGH_CONFIDENCE_MATCH',
    'CLAIM_RECEIVED',
    'CLAIM_UPDATED',
    'VERIFICATION_REQUIRED',
    'NEW_CHAT_MESSAGE',
    'ITEM_RECOVERED',
    'UNIVERSITY_LOST_ITEM_ALERT'
);


ALTER TYPE public."NotificationType" OWNER TO lostfound;

--
-- Name: OtpPurpose; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."OtpPurpose" AS ENUM (
    'REGISTRATION',
    'LOGIN',
    'EMAIL_CHANGE'
);


ALTER TYPE public."OtpPurpose" OWNER TO lostfound;

--
-- Name: PushTokenStatus; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."PushTokenStatus" AS ENUM (
    'ACTIVE',
    'EXPIRED',
    'INVALID',
    'REVOKED'
);


ALTER TYPE public."PushTokenStatus" OWNER TO lostfound;

--
-- Name: ReportTargetType; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."ReportTargetType" AS ENUM (
    'LOST_ITEM',
    'FOUND_ITEM',
    'USER',
    'CHAT_MESSAGE'
);


ALTER TYPE public."ReportTargetType" OWNER TO lostfound;

--
-- Name: TenantStatus; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."TenantStatus" AS ENUM (
    'ACTIVE',
    'SUSPENDED',
    'ONBOARDING'
);


ALTER TYPE public."TenantStatus" OWNER TO lostfound;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: lostfound
--

CREATE TYPE public."UserRole" AS ENUM (
    'STUDENT',
    'STAFF',
    'CAMPUS_AUTHORITY',
    'UNIVERSITY_ADMIN',
    'PLATFORM_SUPER_ADMIN'
);


ALTER TYPE public."UserRole" OWNER TO lostfound;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO lostfound;

--
-- Name: approved_email_domains; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.approved_email_domains (
    id text NOT NULL,
    "universityId" text NOT NULL,
    domain text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.approved_email_domains OWNER TO lostfound;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.audit_logs (
    id text NOT NULL,
    "universityId" text,
    "actorUserId" text,
    action text NOT NULL,
    "targetType" text,
    "targetId" text,
    "requestId" text,
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO lostfound;

--
-- Name: buildings; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.buildings (
    id text NOT NULL,
    "campusId" text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.buildings OWNER TO lostfound;

--
-- Name: campuses; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.campuses (
    id text NOT NULL,
    "universityId" text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.campuses OWNER TO lostfound;

--
-- Name: chat_messages; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.chat_messages (
    id text NOT NULL,
    "conversationId" text NOT NULL,
    "senderId" text NOT NULL,
    body text NOT NULL,
    "readBy" jsonb DEFAULT '[]'::jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.chat_messages OWNER TO lostfound;

--
-- Name: claim_verification_questions; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.claim_verification_questions (
    id text NOT NULL,
    "claimId" text NOT NULL,
    question text NOT NULL,
    answer text,
    "answeredAt" timestamp(3) without time zone,
    "isCorrect" boolean,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.claim_verification_questions OWNER TO lostfound;

--
-- Name: claims; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.claims (
    id text NOT NULL,
    "foundItemId" text NOT NULL,
    "lostItemId" text,
    "claimantId" text NOT NULL,
    status public."ClaimStatus" DEFAULT 'PENDING'::public."ClaimStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "decidedAt" timestamp(3) without time zone
);


ALTER TABLE public.claims OWNER TO lostfound;

--
-- Name: content_reports; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.content_reports (
    id text NOT NULL,
    "reporterId" text NOT NULL,
    "reportedUserId" text,
    "targetType" public."ReportTargetType" NOT NULL,
    "targetId" text NOT NULL,
    reason text NOT NULL,
    resolved boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.content_reports OWNER TO lostfound;

--
-- Name: conversation_participants; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.conversation_participants (
    id text NOT NULL,
    "conversationId" text NOT NULL,
    "userId" text NOT NULL,
    "joinedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.conversation_participants OWNER TO lostfound;

--
-- Name: conversations; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.conversations (
    id text NOT NULL,
    "claimId" text,
    status public."ConversationStatus" DEFAULT 'OPEN'::public."ConversationStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.conversations OWNER TO lostfound;

--
-- Name: devices; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.devices (
    id text NOT NULL,
    "userId" text NOT NULL,
    "universityId" text NOT NULL,
    platform public."DevicePlatform" NOT NULL,
    "pushToken" text NOT NULL,
    "tokenStatus" public."PushTokenStatus" DEFAULT 'ACTIVE'::public."PushTokenStatus" NOT NULL,
    "lastSeenAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.devices OWNER TO lostfound;

--
-- Name: found_items; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.found_items (
    id text NOT NULL,
    "universityId" text NOT NULL,
    "finderId" text NOT NULL,
    "campusId" text,
    "buildingId" text,
    "categoryId" text,
    title text NOT NULL,
    description text NOT NULL,
    brand text,
    model text,
    "primaryColor" text,
    "secondaryColor" text,
    "distinctiveMarks" text,
    "floorOrZone" text,
    "nearbyLandmark" text,
    "foundDate" timestamp(3) without time zone NOT NULL,
    "foundTimeApprox" text,
    "custodyStatus" public."CustodyStatus" DEFAULT 'WITH_FINDER'::public."CustodyStatus" NOT NULL,
    "authorityOffice" text,
    "storageLocation" text,
    "recoveryRefNumber" text,
    status public."ItemStatus" DEFAULT 'ACTIVE'::public."ItemStatus" NOT NULL,
    revision integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.found_items OWNER TO lostfound;

--
-- Name: image_embeddings; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.image_embeddings (
    id text NOT NULL,
    "itemImageId" text NOT NULL,
    vector public.vector(512) NOT NULL,
    "modelName" text NOT NULL,
    "processingVersion" integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.image_embeddings OWNER TO lostfound;

--
-- Name: item_categories; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.item_categories (
    id text NOT NULL,
    "universityId" text,
    name text NOT NULL,
    "isGlobal" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.item_categories OWNER TO lostfound;

--
-- Name: item_images; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.item_images (
    id text NOT NULL,
    "lostItemId" text,
    "foundItemId" text,
    "storageKey" text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    width integer,
    height integer,
    "exifStripped" boolean DEFAULT false NOT NULL,
    "ocrText" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.item_images OWNER TO lostfound;

--
-- Name: item_matches; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.item_matches (
    id text NOT NULL,
    "universityId" text NOT NULL,
    "lostItemId" text NOT NULL,
    "foundItemId" text NOT NULL,
    "lostItemRevision" integer NOT NULL,
    "foundItemRevision" integer NOT NULL,
    "processingVersion" integer NOT NULL,
    tier public."MatchTier" NOT NULL,
    status public."MatchStatus" DEFAULT 'ACTIVE'::public."MatchStatus" NOT NULL,
    "visualScore" double precision,
    "textScore" double precision,
    "attributeScore" double precision,
    "ocrScore" double precision,
    "locationScore" double precision,
    "timeScore" double precision,
    "compositeScore" double precision NOT NULL,
    "notifiedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.item_matches OWNER TO lostfound;

--
-- Name: lost_items; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.lost_items (
    id text NOT NULL,
    "universityId" text NOT NULL,
    "ownerId" text NOT NULL,
    "campusId" text,
    "buildingId" text,
    "categoryId" text,
    title text NOT NULL,
    description text NOT NULL,
    brand text,
    model text,
    "primaryColor" text,
    "secondaryColor" text,
    "distinctiveMarks" text,
    "floorOrZone" text,
    "nearbyLandmark" text,
    "lostDate" timestamp(3) without time zone NOT NULL,
    "lostTimeApprox" text,
    "privateDetails" jsonb,
    status public."ItemStatus" DEFAULT 'ACTIVE'::public."ItemStatus" NOT NULL,
    revision integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.lost_items OWNER TO lostfound;

--
-- Name: notification_preferences; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.notification_preferences (
    id text NOT NULL,
    "userId" text NOT NULL,
    "matchAlertsEnabled" boolean DEFAULT true NOT NULL,
    "chatAlertsEnabled" boolean DEFAULT true NOT NULL,
    "universityAlertsEnabled" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.notification_preferences OWNER TO lostfound;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.notifications (
    id text NOT NULL,
    "userId" text NOT NULL,
    type public."NotificationType" NOT NULL,
    title text NOT NULL,
    body text NOT NULL,
    data jsonb,
    "dedupeKey" text,
    "readAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.notifications OWNER TO lostfound;

--
-- Name: otp_challenges; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.otp_challenges (
    id text NOT NULL,
    email text NOT NULL,
    "universityId" text NOT NULL,
    "codeHash" text NOT NULL,
    purpose public."OtpPurpose" DEFAULT 'REGISTRATION'::public."OtpPurpose" NOT NULL,
    "attemptsMade" integer DEFAULT 0 NOT NULL,
    "maxAttempts" integer DEFAULT 5 NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "consumedAt" timestamp(3) without time zone,
    "requestIp" text,
    "resendCount" integer DEFAULT 0 NOT NULL,
    "lastSentAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text
);


ALTER TABLE public.otp_challenges OWNER TO lostfound;

--
-- Name: razorpay_webhook_events; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.razorpay_webhook_events (
    id text NOT NULL,
    "eventId" text NOT NULL,
    "eventType" text NOT NULL,
    "rawPayload" jsonb NOT NULL,
    "processedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.razorpay_webhook_events OWNER TO lostfound;

--
-- Name: text_embeddings; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.text_embeddings (
    id text NOT NULL,
    "itemType" public."ItemKind" NOT NULL,
    "itemId" text NOT NULL,
    "itemRevision" integer NOT NULL,
    vector public.vector(384) NOT NULL,
    "modelName" text NOT NULL,
    "processingVersion" integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.text_embeddings OWNER TO lostfound;

--
-- Name: universities; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.universities (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    status public."TenantStatus" DEFAULT 'ACTIVE'::public."TenantStatus" NOT NULL,
    plan text DEFAULT 'STANDARD'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.universities OWNER TO lostfound;

--
-- Name: university_alerts; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.university_alerts (
    id text NOT NULL,
    "universityId" text NOT NULL,
    "lostItemId" text NOT NULL,
    "purchasedById" text NOT NULL,
    "priceInPaise" integer DEFAULT 2900 NOT NULL,
    "ledgerEntryId" text NOT NULL,
    "idempotencyKey" text NOT NULL,
    status public."AlertStatus" DEFAULT 'PENDING'::public."AlertStatus" NOT NULL,
    "messagePreview" text NOT NULL,
    "eligibleDeviceCount" integer,
    "sentCount" integer,
    "failedCount" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "sentAt" timestamp(3) without time zone
);


ALTER TABLE public.university_alerts OWNER TO lostfound;

--
-- Name: users; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.users (
    id text NOT NULL,
    "universityId" text NOT NULL,
    "institutionalEmail" text NOT NULL,
    "displayName" text NOT NULL,
    role public."UserRole" DEFAULT 'STUDENT'::public."UserRole" NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO lostfound;

--
-- Name: wallet_ledger_entries; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.wallet_ledger_entries (
    id text NOT NULL,
    "walletId" text NOT NULL,
    type public."LedgerEntryType" NOT NULL,
    reason public."LedgerEntryReason" NOT NULL,
    "amountPaise" integer NOT NULL,
    status public."LedgerEntryStatus" DEFAULT 'PENDING'::public."LedgerEntryStatus" NOT NULL,
    "idempotencyKey" text NOT NULL,
    "paymentReference" text,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.wallet_ledger_entries OWNER TO lostfound;

--
-- Name: wallets; Type: TABLE; Schema: public; Owner: lostfound
--

CREATE TABLE public.wallets (
    id text NOT NULL,
    "userId" text NOT NULL,
    "universityId" text NOT NULL,
    "cachedBalance" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.wallets OWNER TO lostfound;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
15c4c6bb-1472-4735-ba6f-889a34c5cd6a	0d8a2b80c8af2aae9d27bd086631b9a005844030aefef2e8c7cd266827bf5642	2026-07-12 14:30:42.343295+00	20260712_initial	\N	\N	2026-07-12 14:30:42.275955+00	1
a5ecf496-1ffa-4cf3-bf87-0adde54d9a63	122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec	2026-07-12 14:34:40.127675+00	20260712143439_fix_clip_vector_dimension	\N	\N	2026-07-12 14:34:40.124897+00	1
d3bfa023-29cd-4d21-bb38-ca640186fae6	b72a8b9642c45b559ada8430a7a27ad127a27064ab5bde203380165f8da2097f	2026-07-12 16:24:00.758148+00	20260712_clip_vector_512	\N	\N	2026-07-12 16:24:00.734205+00	1
\.


--
-- Data for Name: approved_email_domains; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.approved_email_domains (id, "universityId", domain, "createdAt") FROM stdin;
9b0aa159-affa-4b6f-8a0d-f40ae4ce083e	5370ebc6-f3c5-49bf-a865-e26ea9cc215e	demo-university.edu	2026-07-13 03:59:29.853
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.audit_logs (id, "universityId", "actorUserId", action, "targetType", "targetId", "requestId", metadata, "createdAt") FROM stdin;
\.


--
-- Data for Name: buildings; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.buildings (id, "campusId", name, "createdAt") FROM stdin;
seed-engineering-block	seed-main-campus	Engineering Block	2026-07-13 03:59:29.856
\.


--
-- Data for Name: campuses; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.campuses (id, "universityId", name, "createdAt") FROM stdin;
seed-main-campus	5370ebc6-f3c5-49bf-a865-e26ea9cc215e	Main Campus	2026-07-13 03:59:29.855
\.


--
-- Data for Name: chat_messages; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.chat_messages (id, "conversationId", "senderId", body, "readBy", "createdAt") FROM stdin;
\.


--
-- Data for Name: claim_verification_questions; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.claim_verification_questions (id, "claimId", question, answer, "answeredAt", "isCorrect", "createdAt") FROM stdin;
\.


--
-- Data for Name: claims; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.claims (id, "foundItemId", "lostItemId", "claimantId", status, "createdAt", "updatedAt", "decidedAt") FROM stdin;
\.


--
-- Data for Name: content_reports; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.content_reports (id, "reporterId", "reportedUserId", "targetType", "targetId", reason, resolved, "createdAt") FROM stdin;
\.


--
-- Data for Name: conversation_participants; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.conversation_participants (id, "conversationId", "userId", "joinedAt") FROM stdin;
\.


--
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.conversations (id, "claimId", status, "createdAt") FROM stdin;
\.


--
-- Data for Name: devices; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.devices (id, "userId", "universityId", platform, "pushToken", "tokenStatus", "lastSeenAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: found_items; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.found_items (id, "universityId", "finderId", "campusId", "buildingId", "categoryId", title, description, brand, model, "primaryColor", "secondaryColor", "distinctiveMarks", "floorOrZone", "nearbyLandmark", "foundDate", "foundTimeApprox", "custodyStatus", "authorityOffice", "storageLocation", "recoveryRefNumber", status, revision, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: image_embeddings; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.image_embeddings (id, "itemImageId", vector, "modelName", "processingVersion", "createdAt") FROM stdin;
\.


--
-- Data for Name: item_categories; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.item_categories (id, "universityId", name, "isGlobal") FROM stdin;
seed-category-Electronics	\N	Electronics	t
seed-category-Keys	\N	Keys	t
seed-category-Wallet/ID	\N	Wallet/ID	t
seed-category-Bags	\N	Bags	t
seed-category-Documents	\N	Documents	t
seed-category-Bottles	\N	Bottles	t
seed-category-Accessories	\N	Accessories	t
seed-category-Other	\N	Other	t
\.


--
-- Data for Name: item_images; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.item_images (id, "lostItemId", "foundItemId", "storageKey", "order", width, height, "exifStripped", "ocrText", "createdAt") FROM stdin;
\.


--
-- Data for Name: item_matches; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.item_matches (id, "universityId", "lostItemId", "foundItemId", "lostItemRevision", "foundItemRevision", "processingVersion", tier, status, "visualScore", "textScore", "attributeScore", "ocrScore", "locationScore", "timeScore", "compositeScore", "notifiedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: lost_items; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.lost_items (id, "universityId", "ownerId", "campusId", "buildingId", "categoryId", title, description, brand, model, "primaryColor", "secondaryColor", "distinctiveMarks", "floorOrZone", "nearbyLandmark", "lostDate", "lostTimeApprox", "privateDetails", status, revision, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: notification_preferences; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.notification_preferences (id, "userId", "matchAlertsEnabled", "chatAlertsEnabled", "universityAlertsEnabled") FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.notifications (id, "userId", type, title, body, data, "dedupeKey", "readAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: otp_challenges; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.otp_challenges (id, email, "universityId", "codeHash", purpose, "attemptsMade", "maxAttempts", "expiresAt", "consumedAt", "requestIp", "resendCount", "lastSentAt", "createdAt", "userId") FROM stdin;
\.


--
-- Data for Name: razorpay_webhook_events; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.razorpay_webhook_events (id, "eventId", "eventType", "rawPayload", "processedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: text_embeddings; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.text_embeddings (id, "itemType", "itemId", "itemRevision", vector, "modelName", "processingVersion", "createdAt") FROM stdin;
\.


--
-- Data for Name: universities; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.universities (id, name, slug, status, plan, "createdAt", "updatedAt") FROM stdin;
5370ebc6-f3c5-49bf-a865-e26ea9cc215e	Demo University	demo-university	ACTIVE	STANDARD	2026-07-13 03:59:29.847	2026-07-13 03:59:29.847
\.


--
-- Data for Name: university_alerts; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.university_alerts (id, "universityId", "lostItemId", "purchasedById", "priceInPaise", "ledgerEntryId", "idempotencyKey", status, "messagePreview", "eligibleDeviceCount", "sentCount", "failedCount", "createdAt", "sentAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.users (id, "universityId", "institutionalEmail", "displayName", role, "isActive", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: wallet_ledger_entries; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.wallet_ledger_entries (id, "walletId", type, reason, "amountPaise", status, "idempotencyKey", "paymentReference", description, "createdAt") FROM stdin;
\.


--
-- Data for Name: wallets; Type: TABLE DATA; Schema: public; Owner: lostfound
--

COPY public.wallets (id, "userId", "universityId", "cachedBalance", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: approved_email_domains approved_email_domains_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.approved_email_domains
    ADD CONSTRAINT approved_email_domains_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: buildings buildings_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.buildings
    ADD CONSTRAINT buildings_pkey PRIMARY KEY (id);


--
-- Name: campuses campuses_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.campuses
    ADD CONSTRAINT campuses_pkey PRIMARY KEY (id);


--
-- Name: chat_messages chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (id);


--
-- Name: claim_verification_questions claim_verification_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.claim_verification_questions
    ADD CONSTRAINT claim_verification_questions_pkey PRIMARY KEY (id);


--
-- Name: claims claims_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.claims
    ADD CONSTRAINT claims_pkey PRIMARY KEY (id);


--
-- Name: content_reports content_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.content_reports
    ADD CONSTRAINT content_reports_pkey PRIMARY KEY (id);


--
-- Name: conversation_participants conversation_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.conversation_participants
    ADD CONSTRAINT conversation_participants_pkey PRIMARY KEY (id);


--
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- Name: devices devices_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);


--
-- Name: found_items found_items_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.found_items
    ADD CONSTRAINT found_items_pkey PRIMARY KEY (id);


--
-- Name: image_embeddings image_embeddings_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.image_embeddings
    ADD CONSTRAINT image_embeddings_pkey PRIMARY KEY (id);


--
-- Name: item_categories item_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.item_categories
    ADD CONSTRAINT item_categories_pkey PRIMARY KEY (id);


--
-- Name: item_images item_images_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.item_images
    ADD CONSTRAINT item_images_pkey PRIMARY KEY (id);


--
-- Name: item_matches item_matches_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.item_matches
    ADD CONSTRAINT item_matches_pkey PRIMARY KEY (id);


--
-- Name: lost_items lost_items_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.lost_items
    ADD CONSTRAINT lost_items_pkey PRIMARY KEY (id);


--
-- Name: notification_preferences notification_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.notification_preferences
    ADD CONSTRAINT notification_preferences_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: otp_challenges otp_challenges_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.otp_challenges
    ADD CONSTRAINT otp_challenges_pkey PRIMARY KEY (id);


--
-- Name: razorpay_webhook_events razorpay_webhook_events_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.razorpay_webhook_events
    ADD CONSTRAINT razorpay_webhook_events_pkey PRIMARY KEY (id);


--
-- Name: text_embeddings text_embeddings_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.text_embeddings
    ADD CONSTRAINT text_embeddings_pkey PRIMARY KEY (id);


--
-- Name: universities universities_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.universities
    ADD CONSTRAINT universities_pkey PRIMARY KEY (id);


--
-- Name: university_alerts university_alerts_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.university_alerts
    ADD CONSTRAINT university_alerts_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: wallet_ledger_entries wallet_ledger_entries_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.wallet_ledger_entries
    ADD CONSTRAINT wallet_ledger_entries_pkey PRIMARY KEY (id);


--
-- Name: wallets wallets_pkey; Type: CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallets_pkey PRIMARY KEY (id);


--
-- Name: approved_email_domains_domain_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX approved_email_domains_domain_idx ON public.approved_email_domains USING btree (domain);


--
-- Name: approved_email_domains_universityId_domain_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "approved_email_domains_universityId_domain_key" ON public.approved_email_domains USING btree ("universityId", domain);


--
-- Name: audit_logs_universityId_createdAt_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "audit_logs_universityId_createdAt_idx" ON public.audit_logs USING btree ("universityId", "createdAt");


--
-- Name: buildings_campusId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "buildings_campusId_idx" ON public.buildings USING btree ("campusId");


--
-- Name: campuses_universityId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "campuses_universityId_idx" ON public.campuses USING btree ("universityId");


--
-- Name: chat_messages_conversationId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "chat_messages_conversationId_idx" ON public.chat_messages USING btree ("conversationId");


--
-- Name: claims_claimantId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "claims_claimantId_idx" ON public.claims USING btree ("claimantId");


--
-- Name: claims_foundItemId_status_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "claims_foundItemId_status_idx" ON public.claims USING btree ("foundItemId", status);


--
-- Name: conversation_participants_conversationId_userId_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "conversation_participants_conversationId_userId_key" ON public.conversation_participants USING btree ("conversationId", "userId");


--
-- Name: conversations_claimId_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "conversations_claimId_key" ON public.conversations USING btree ("claimId");


--
-- Name: devices_pushToken_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "devices_pushToken_key" ON public.devices USING btree ("pushToken");


--
-- Name: devices_universityId_tokenStatus_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "devices_universityId_tokenStatus_idx" ON public.devices USING btree ("universityId", "tokenStatus");


--
-- Name: found_items_universityId_categoryId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "found_items_universityId_categoryId_idx" ON public.found_items USING btree ("universityId", "categoryId");


--
-- Name: found_items_universityId_status_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "found_items_universityId_status_idx" ON public.found_items USING btree ("universityId", status);


--
-- Name: image_embeddings_itemImageId_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "image_embeddings_itemImageId_key" ON public.image_embeddings USING btree ("itemImageId");


--
-- Name: item_categories_universityId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "item_categories_universityId_idx" ON public.item_categories USING btree ("universityId");


--
-- Name: item_images_foundItemId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "item_images_foundItemId_idx" ON public.item_images USING btree ("foundItemId");


--
-- Name: item_images_lostItemId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "item_images_lostItemId_idx" ON public.item_images USING btree ("lostItemId");


--
-- Name: item_matches_lostItemId_foundItemId_lostItemRevision_foundI_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "item_matches_lostItemId_foundItemId_lostItemRevision_foundI_key" ON public.item_matches USING btree ("lostItemId", "foundItemId", "lostItemRevision", "foundItemRevision");


--
-- Name: item_matches_universityId_status_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "item_matches_universityId_status_idx" ON public.item_matches USING btree ("universityId", status);


--
-- Name: lost_items_universityId_categoryId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "lost_items_universityId_categoryId_idx" ON public.lost_items USING btree ("universityId", "categoryId");


--
-- Name: lost_items_universityId_status_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "lost_items_universityId_status_idx" ON public.lost_items USING btree ("universityId", status);


--
-- Name: notification_preferences_userId_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "notification_preferences_userId_key" ON public.notification_preferences USING btree ("userId");


--
-- Name: notifications_userId_dedupeKey_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "notifications_userId_dedupeKey_key" ON public.notifications USING btree ("userId", "dedupeKey");


--
-- Name: notifications_userId_readAt_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "notifications_userId_readAt_idx" ON public.notifications USING btree ("userId", "readAt");


--
-- Name: otp_challenges_email_universityId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "otp_challenges_email_universityId_idx" ON public.otp_challenges USING btree (email, "universityId");


--
-- Name: razorpay_webhook_events_eventId_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "razorpay_webhook_events_eventId_key" ON public.razorpay_webhook_events USING btree ("eventId");


--
-- Name: text_embeddings_itemType_itemId_itemRevision_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "text_embeddings_itemType_itemId_itemRevision_key" ON public.text_embeddings USING btree ("itemType", "itemId", "itemRevision");


--
-- Name: universities_slug_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX universities_slug_key ON public.universities USING btree (slug);


--
-- Name: university_alerts_idempotencyKey_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "university_alerts_idempotencyKey_key" ON public.university_alerts USING btree ("idempotencyKey");


--
-- Name: university_alerts_ledgerEntryId_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "university_alerts_ledgerEntryId_key" ON public.university_alerts USING btree ("ledgerEntryId");


--
-- Name: university_alerts_lostItemId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "university_alerts_lostItemId_idx" ON public.university_alerts USING btree ("lostItemId");


--
-- Name: university_alerts_universityId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "university_alerts_universityId_idx" ON public.university_alerts USING btree ("universityId");


--
-- Name: users_institutionalEmail_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "users_institutionalEmail_key" ON public.users USING btree ("institutionalEmail");


--
-- Name: users_universityId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "users_universityId_idx" ON public.users USING btree ("universityId");


--
-- Name: wallet_ledger_entries_idempotencyKey_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "wallet_ledger_entries_idempotencyKey_key" ON public.wallet_ledger_entries USING btree ("idempotencyKey");


--
-- Name: wallet_ledger_entries_walletId_idx; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE INDEX "wallet_ledger_entries_walletId_idx" ON public.wallet_ledger_entries USING btree ("walletId");


--
-- Name: wallets_userId_key; Type: INDEX; Schema: public; Owner: lostfound
--

CREATE UNIQUE INDEX "wallets_userId_key" ON public.wallets USING btree ("userId");


--
-- Name: approved_email_domains approved_email_domains_universityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.approved_email_domains
    ADD CONSTRAINT "approved_email_domains_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES public.universities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: audit_logs audit_logs_actorUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT "audit_logs_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: audit_logs audit_logs_universityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT "audit_logs_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES public.universities(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: buildings buildings_campusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.buildings
    ADD CONSTRAINT "buildings_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES public.campuses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: campuses campuses_universityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.campuses
    ADD CONSTRAINT "campuses_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES public.universities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chat_messages chat_messages_conversationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT "chat_messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public.conversations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chat_messages chat_messages_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT "chat_messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: claim_verification_questions claim_verification_questions_claimId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.claim_verification_questions
    ADD CONSTRAINT "claim_verification_questions_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES public.claims(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: claims claims_claimantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.claims
    ADD CONSTRAINT "claims_claimantId_fkey" FOREIGN KEY ("claimantId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: claims claims_foundItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.claims
    ADD CONSTRAINT "claims_foundItemId_fkey" FOREIGN KEY ("foundItemId") REFERENCES public.found_items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: claims claims_lostItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.claims
    ADD CONSTRAINT "claims_lostItemId_fkey" FOREIGN KEY ("lostItemId") REFERENCES public.lost_items(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: content_reports content_reports_reportedUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.content_reports
    ADD CONSTRAINT "content_reports_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: content_reports content_reports_reporterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.content_reports
    ADD CONSTRAINT "content_reports_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: conversation_participants conversation_participants_conversationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.conversation_participants
    ADD CONSTRAINT "conversation_participants_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES public.conversations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: conversation_participants conversation_participants_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.conversation_participants
    ADD CONSTRAINT "conversation_participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: conversations conversations_claimId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT "conversations_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES public.claims(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: devices devices_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT "devices_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: found_items found_items_campusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.found_items
    ADD CONSTRAINT "found_items_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES public.campuses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: found_items found_items_finderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.found_items
    ADD CONSTRAINT "found_items_finderId_fkey" FOREIGN KEY ("finderId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: found_items found_items_universityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.found_items
    ADD CONSTRAINT "found_items_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES public.universities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: image_embeddings image_embeddings_itemImageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.image_embeddings
    ADD CONSTRAINT "image_embeddings_itemImageId_fkey" FOREIGN KEY ("itemImageId") REFERENCES public.item_images(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: item_categories item_categories_universityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.item_categories
    ADD CONSTRAINT "item_categories_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES public.universities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: item_images item_images_foundItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.item_images
    ADD CONSTRAINT "item_images_foundItemId_fkey" FOREIGN KEY ("foundItemId") REFERENCES public.found_items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: item_images item_images_lostItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.item_images
    ADD CONSTRAINT "item_images_lostItemId_fkey" FOREIGN KEY ("lostItemId") REFERENCES public.lost_items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: item_matches item_matches_foundItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.item_matches
    ADD CONSTRAINT "item_matches_foundItemId_fkey" FOREIGN KEY ("foundItemId") REFERENCES public.found_items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: item_matches item_matches_lostItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.item_matches
    ADD CONSTRAINT "item_matches_lostItemId_fkey" FOREIGN KEY ("lostItemId") REFERENCES public.lost_items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lost_items lost_items_campusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.lost_items
    ADD CONSTRAINT "lost_items_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES public.campuses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: lost_items lost_items_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.lost_items
    ADD CONSTRAINT "lost_items_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: lost_items lost_items_universityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.lost_items
    ADD CONSTRAINT "lost_items_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES public.universities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: notification_preferences notification_preferences_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.notification_preferences
    ADD CONSTRAINT "notification_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: notifications notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: otp_challenges otp_challenges_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.otp_challenges
    ADD CONSTRAINT "otp_challenges_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: university_alerts university_alerts_lostItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.university_alerts
    ADD CONSTRAINT "university_alerts_lostItemId_fkey" FOREIGN KEY ("lostItemId") REFERENCES public.lost_items(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: university_alerts university_alerts_purchasedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.university_alerts
    ADD CONSTRAINT "university_alerts_purchasedById_fkey" FOREIGN KEY ("purchasedById") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: university_alerts university_alerts_universityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.university_alerts
    ADD CONSTRAINT "university_alerts_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES public.universities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_universityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES public.universities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: wallet_ledger_entries wallet_ledger_entries_walletId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.wallet_ledger_entries
    ADD CONSTRAINT "wallet_ledger_entries_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES public.wallets(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: wallets wallets_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lostfound
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: lostfound
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict 5Qku29E7bGerAIgk0oOg1xFAaIPe4E2ZarvZe9A9G2wUCdOM1J6Y5U25DMMNjt2

