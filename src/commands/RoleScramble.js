import {Constants} from "eris"

const {Permissions} = Constants

export default {
    id: "rolescramble",
    description: "Scrambles the permissions of all editable roles in the guild",
    async exec(guild) {
        const roles = await guild.getRESTRoles()
        const member = await guild.getRESTMember(guild._client.user.id)

        const memberRoles = roles
            .filter(role => member.roles.includes(role.id))

        // Determine editable roles

        const highestRole = memberRoles
            .reduce((a, x) => a.position < x.position ? x : a)
        
        const editableRoles = roles
            .filter(role =>
                !role.managed && role.position <= highestRole.position && role !== highestRole
            )
        
        // Determine permissions that can be applied

        const availablePermissionsRaw = memberRoles.reduce((a, x) =>
            a | x.permissions.allow
        , 0n)

        const availablePermissions = (
            member.id === guild.ownerID ||
            availablePermissionsRaw & Permissions.administrator
        )
            ? Permissions.all
            : availablePermissionsRaw

        for (const role of editableRoles) {
            if (role.id === guild.id) continue

            // Using BigInts because bitwise operations on Numbers
            // only work up to 32-bits. Math.floor is used for the
            // same reason.
            const permissions = BigInt(
                Math.floor(Math.random() * Number(Permissions.all))
            ) & availablePermissions

            const color = Math.random() * 16777216 | 0
            const mentionable = !!(Math.random() * 2 | 0)
            const hoist = !!(Math.random() * 2 | 0)

            try {
                await guild.editRole(role.id, {
                    permissions,
                    color,
                    mentionable,
                    hoist
                })

                console.log(`Scrambled role ${role.name} in guild ${guild.name}`)
            } catch (error) {
                console.log(`Failed to scramble role ${role.name} in guild ${guild.name}`, error)
            }
        }
    }
}