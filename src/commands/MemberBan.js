export default {
    id: "memberban",
    description: "Bans all members in the guild",
    async* exec(guild) {
        const members = guild.getRESTMembers()

        for (const member of members) {
            await member.ban()
        }
    }
}