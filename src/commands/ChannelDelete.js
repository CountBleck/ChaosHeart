export default {
    id: "channeldelete",
    description: "Deletes all channels in the guild",
    async* exec(guild) {
        const channels = await guild.getRESTChannels()

        for (const channel of channels) {
            try {
                await channel.delete()
                console.log(`Deleted channel ${channel.name} from guild ${guild.name}`)
            } catch (error) {
                console.error(`Error in deleting channel ${channel.name} from guild ${guild.name}:`, error)
            }
        }
    }
}