import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
	FastifyBaseLogger,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
} from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { Server } from "http";

export type AppInstance = FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression<Server>,
	RawReplyDefaultExpression<Server>,
	FastifyBaseLogger,
	TypeBoxTypeProvider
>;
