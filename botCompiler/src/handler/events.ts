import discord from 'discord.js'
export class Event<Key extends keyof discord.ClientEvents> {
    constructor(
        public event: Key,
        public run: (...args: discord.ClientEvents[Key]) => any
    ) {}
}