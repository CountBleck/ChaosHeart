import CommandRegistry from "./CommandRegistry"

export default class CommandManager {
    status = new Map()
    onTaskChange = () => {}

    constructor(client) {
        this.client = client
    }

    initializeGuild(guild) {
        const status = new Map()

        for (const {id, description} of CommandRegistry) {
            status.set(id, {
                id,
                description,
                running: false,
                aborting: false,
                percent: 0,
                message: "",
            })
        }

        this.status.set(guild.id, status)
    }

    getCommandFromId(id) {
        return CommandRegistry.find(command => command.id === id)
    }

    getGuildStatus(guild) {
        if (!this.status.has(guild.id))
            this.initializeGuild(guild)
        
        return this.status.get(guild.id)
    }

    getCommandStatus(guild, id) {
        return this.getGuildStatus(guild).get(id)
    }

    async execute(guild, id) {
        const status = this.getCommandStatus(guild, id)

        if (status.running) return

        status.percent = 0
        status.message = "Running..."
        status.running = true
        this.onTaskChange()

        const iterator = this.getCommandFromId(id).exec(guild)

        for await (const [percent, message] of iterator) {
            status.percent = isNaN(percent) ? 1 : Math.min(Math.max(percent, 0), 1)

            if (message)
                status.message = message

            const aborting = status.aborting

            if (aborting)
                status.aborting = false

            this.onTaskChange()

            if (aborting)
                break
        }
    }

    abort(guild, id) {
        const status = this.getCommandStatus(guild, id)
        status.aborted = true
        this.onTaskChange()
    }
}