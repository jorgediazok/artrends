import { describe, expect, it, vi } from "vitest";
import Fastify from "fastify";
import contactRoutes from "./contact.routes";
import type { AppInstance } from "../../types/appInstance";

// contact.routes.ts talks to a real Discord bot via services/Discord.ts.
// We replace that module so the test never opens a real Discord connection.
vi.mock("../../services/Discord", () => ({
	default: vi.fn(),
}));

import Discord from "../../services/Discord";

function buildApp(): AppInstance {
	const app = Fastify();
	contactRoutes(app);
	return app as unknown as AppInstance;
}

const validPayload = {
	fullName: "Ada Lovelace",
	email: "ada@example.com",
	subject: "Consulta",
	message: "Hola, tengo una pregunta.",
};

describe("POST /api/contact", () => {
	it("forwards the message to the Discord channel and replies 200", async () => {
		const send = vi.fn();
		const channel = { send };
		const client = {
			channels: { cache: { get: vi.fn().mockReturnValue(channel) } },
		};
		vi.mocked(Discord).mockResolvedValue(client as never);

		const app = buildApp();
		const response = await app.inject({
			method: "POST",
			url: "/api/contact",
			payload: validPayload,
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({});
		expect(send).toHaveBeenCalledWith(
			expect.stringContaining("Ada Lovelace")
		);
	});

	it("rejects a payload with a subject outside the allowed list, before touching Discord", async () => {
		vi.mocked(Discord).mockClear();
		const app = buildApp();

		const response = await app.inject({
			method: "POST",
			url: "/api/contact",
			payload: { ...validPayload, subject: "Reclamo" },
		});

		expect(response.statusCode).toBe(400);
		expect(Discord).not.toHaveBeenCalled();
	});

	it("rejects a payload missing required fields", async () => {
		const app = buildApp();

		const response = await app.inject({
			method: "POST",
			url: "/api/contact",
			payload: { fullName: "Ada Lovelace" },
		});

		expect(response.statusCode).toBe(400);
	});
});
