import {randomBytes} from "crypto"

export default {
    id: "channelspam",
    description: "Creates channels with random names",
    async* exec(guild) {
        const currentSize = (await guild.getRESTChannels()).length
        let prevCategoryId

        for (let i = currentSize; i <= 500; i++) {
            const name = randomBytes(64).toString()
            // Types are 0 (text), 2 (voice), and 4 (category).
            const type = Math.random() * 6 & 0b110

            try {
                const options = type !== 4
                    ? {parentID: prevCategoryId}
                    : undefined

                const channel = await guild.createChannel(name, type, options)
                console.log(`Created channel in guild ${guild.name}`)

                if (type === 4) {
                    prevCategoryId = channel.id
                }
            } catch (error) {
                console.log(`Stopping channel creation in guild ${guild.name}:`, error)
                break
            }
        }
    }
}