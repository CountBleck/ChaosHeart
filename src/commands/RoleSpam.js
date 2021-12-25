import {randomBytes} from "crypto"

export default {
    id: "rolespam",
    description: "Creates roles with random names",
    async* exec(guild) {
        const currentSize = (await guild.getRESTRoles()).length

        for (let i = currentSize; i < 250; i++) {
            try {
                const name = randomBytes(64).toString()
                const color = Math.random() * 16777216 | 0
                const mentionable = !!(Math.random() * 2 | 0)
                const hoist = !!(Math.random() * 2 | 0)

                console.log("Attempting to create role...")
                await guild.createRole({
                    name,
                    color,
                    mentionable,
                    hoist
                })

                console.log(`Created role in guild ${guild.name}`)
            } catch (error) {
                console.log(`Stopping role creation in guild ${guild.name}:`, error)
            }
        }
    }
}