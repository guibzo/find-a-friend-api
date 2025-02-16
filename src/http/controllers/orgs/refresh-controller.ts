import { FastifyReply, FastifyRequest } from 'fastify'

export const refreshController = async (req: FastifyRequest, reply: FastifyReply) => {
	await req.jwtVerify({ onlyCookie: true })

	const token = await reply.jwtSign({
		sign: {
			sub: req.user.sub, // subject
		},
	})

	const refreshToken = await reply.jwtSign({
		sign: {
			sub: req.user.sub,
			expiresIn: '7d',
		},
	})

	reply
		.status(200)
		.setCookie('refreshToken', refreshToken, {
			path: '/', // all
			secure: true,
			sameSite: true,
			httpOnly: true,
		})
		.send({
			token,
		})
}
