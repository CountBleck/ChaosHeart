export default {
    id: "memberkick",
    description: "Kicks all members in the guild",
    async exec(guild) {
        const members = await guild.getRESTMembers()

        for (const member of members) {
            await member.kick()
        }
    }
}