// Types
import { Type } from "@sinclair/typebox";
import { TextChannel } from "discord.js";
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

			if (req.body) {
				const channel = discord.channels.cache.get(
					"1544481070311940118"
				) as TextChannel;

				channel.send(`
\`\`${req.body.fullName}
${req.body.email}
${req.body.subject}
${req.body.message} \`\`
				`);
			}

			return reply.send({});
		}
	);
}
