import {Constants} from "eris"

const {Permissions} = Constants

export default {
    id: "permissionscramble",
    description: "Scrambles the permissions in the guild",
    async* exec(guild) {
        const roles = await guild.getRESTRoles()
        const channels = await guild.getRESTChannels()
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

        const numRoles = editableRoles.length
        const numChannels = channels.length
        // roles * channels + roles
        const totalOperations = numRoles * (numChannels + 1)

        for (let i = 0; i < numRoles; i++) {
            const role = editableRoles[i]
            for (let j = 0; j < numChannels; j++) {
                yield [
                    (i * numChannels + j) / totalOperations,
                    `Scrambling overwrite of channel ${j + 1} of ${numChannels}, role ${i + 1} of ${numRoles}`
                ]
                const channel = channels[j] 
                const allow = BigInt(
                    Math.floor(Math.random() * Number(Permissions.all))
                ) & availablePermissions

                const deny = BigInt(
                    Math.floor(Math.random() * Number(Permissions.all))
                ) & availablePermissions

                try {
                    await channel.editPermission(role.id, allow, deny, 0)
                } catch (error) {}
            }
        }

        for (let i = 0; i < numRoles; i++) {
            yield [
                (numRoles * numChannels + i) / totalOperations,
                `Scrambling permissions of role ${i + 1} of ${numRoles}`
            ]
            const role = editableRoles[i]
            if (role.id === guild.id) continue

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
            } catch (error) {}
        }
    }
}