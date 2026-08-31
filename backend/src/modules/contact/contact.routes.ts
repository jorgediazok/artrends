// Types
import { Type } from "@sinclair/typebox";
import { Events, TextChannel } from "discord.js";
import { FastifyRequest, FastifyReply } from "fastify";
import { AppInstance } from "types/appInstance";

// Services
import Discord from "../../services/Discord";

enum Subject {
	Consulta = "Consulta",
	Comentario = "Comentario",
	Sugerencia = "Sugerencia",
}

interface ContactPayload {
	fullName: string;
	email: string;
	message: string;
	subject: Subject;
}

export default function contactRoutes(app: AppInstance) {
	return app.post(
		"/api/contact",
		{
			schema: {
				tags: ["Contact"],
				body: Type.Object({
					fullName: Type.String({}),
					email: Type.String({}),
					subject: Type.Enum(Subject),
					message: Type.String(),
				}),
			},
		},
		async (
			req: FastifyRequest<{ Body: ContactPayload }>,
			reply: FastifyReply
		) => {
			const discord = await Discord();

			discord.once(Events.ClientReady, async client => {
				if (!req.body) return;

				const channel = (await client.channels.cache.get(
					"1068357846774853643"
				)) as TextChannel;

				channel.send(`
\`\`${req.body.fullName}
${req.body.email}
${req.body.subject}
${req.body.message} \`\`
				`);
			});

			return reply.send({});
		}
	);
}
