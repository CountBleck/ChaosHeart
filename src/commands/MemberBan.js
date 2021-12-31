export default {
    id: "memberban",
    description: "Bans all members in the guild",
    async* exec(guild) {
        const members = guild.getRESTMembers()

        let skipped = 0
        for (let i = 0; i < members.length; i++) {
            yield [i / members.length, `Banned ${i - skipped} members out of ${members.length}, skipped ${skipped}`]
            try {
                await member.ban()
            } catch (error) {
                skipped++
            }
        }
    }
}