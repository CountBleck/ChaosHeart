export default {
    id: "roledelete",
    description: "Deletes all possible roles in the guild",
    async exec(guild) {
        const roles = await guild.getRESTRoles()
        const member = await guild.getRESTMember(guild._client.user.id)

        const highestPosition = roles
            .filter(role => member.roles.includes(role.id))
            .reduce((a, x) => a < x.position ? x.position : x, 0)

        for (const role of roles) {
            // @everyone and roles higher in the role hierarchy
            if (role.id === guild.id || role.position > highestPosition) continue

            try {
                await guild.deleteRole(role.id)
                console.log(`Deleted role ${role.name} from guild ${guild.name}`)
            } catch (error) {
                console.error(`Error in deleting role ${role.name} from guild ${guild.name}:`, error)
            }
        }
    }
}