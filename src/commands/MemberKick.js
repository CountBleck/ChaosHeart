export default {
    id: "memberkick",
    description: "Kicks all members in the guild",
    async* exec(guild) {
        const members = await guild.getRESTMembers()

        let skipped = 0
        for (let i = 0; i < members.length; i++) {
            yield [i / members.length, `Kicked ${i - skipped} members out of ${members.length}, skipped ${skipped}`]
            try {
                await member.kick()
            } catch (error) {
                skipped++
            }
        }
    }
}