import fastifyPlugin from "fastify-plugin";
import cors from "@fastify/cors";

export default fastifyPlugin(cors, {
	name: "cors",
});
