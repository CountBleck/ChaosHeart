export default {
    id: "channeldelete",
    description: "Deletes all channels",
    async exec(guild) {
        const channels = await guild.getRESTChannels()

        for (const channel of channels) {
            try {
                await channel.delete()
            } catch (error) {
                console.error(`Error in deleting channel ${channel.name} from guild ${guild.name}:`, error)
            }
        }
    }
}