import {randomBytes} from "crypto"

export default {
    id: "rolespam",
    description: "Creates roles with random names",
    async* exec(guild) {
        const currentSize = (await guild.getRESTRoles()).length
        const amount = 250 - currentSize

        for (let i = 0; i < amount; i++) {
            yield [i / currentSize, `Created ${i} roles out of ${amount}`]
            try {
                const name = randomBytes(64).toString()
                const color = Math.random() * 16777216 | 0
                const mentionable = !!(Math.random() * 2 | 0)
                const hoist = !!(Math.random() * 2 | 0)

                await guild.createRole({
                    name,
                    color,
                    mentionable,
                    hoist
                })

            } catch (error) {
                break
            }
        }
    }
}