export default {
    id: "channeldelete",
    description: "Deletes all channels in the guild",
    async* exec(guild) {
        const channels = await guild.getRESTChannels()

        let skipped = 0
        for (let i = 0; i < channels.length; i++) {
            const channel = channels[i]
            yield [i / channels.length, `Deleted ${i - skipped} channels out of ${channels.length}, skipped ${skipped}`]
            try {
                await channel.delete()
            } catch (error) {
                skipped++
            }
        }
    }
}