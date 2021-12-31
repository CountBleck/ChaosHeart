export default {
    id: "roledelete",
    description: "Deletes all possible roles in the guild",
    async* exec(guild) {
        const roles = await guild.getRESTRoles()
        const member = await guild.getRESTMember(guild._client.user.id)

        const highestPosition = roles
            .filter(role => member.roles.includes(role.id))
            .reduce((a, x) => a < x.position ? x.position : x, 0)
        
        let skipped = 0
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i]
            yield [i / roles.length, `Deleted ${i - skipped} roles out of ${roles.length}, skipped ${skipped}`]

            // @everyone and roles higher in the role hierarchy
            if (role.id === guild.id || role.position > highestPosition) {
                skipped++
                continue
            }

            try {
                await guild.deleteRole(role.id)
            } catch (error) {
                skipped++
            }
        }
    }
}