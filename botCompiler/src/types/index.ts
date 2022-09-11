import discord from 'discord.js'
import { Bot } from '../handler/runner';
export interface ExtendedInteraction extends discord.CommandInteraction {
    member: discord.GuildMember;
}
export interface RunOptions {
    client: Bot;
    interaction: ExtendedInteraction;
    args: discord.CommandInteractionOptionResolver;
}
export type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: discord.PermissionResolvable[];
    run: RunFunction;
} & discord.ChatInputApplicationCommandData;
export type RegisterCommandsOptionsType = {
    commands:discord.ApplicationCommandDataResolvable[]
}
export interface ExtendedInteraction extends discord.CommandInteraction {
    member: discord.GuildMember;
}
export interface RunOptions {
    client: Bot;
    interaction: ExtendedInteraction;
    args: discord.CommandInteractionOptionResolver;
}
export type CustmIdFunctionOptions = {
    client: Bot;
    interaction: discord.Interaction<any> ;
}
export type CustmIdFunction = (commandOptions: CustmIdFunctionOptions) => any
export type Custom_idType = {
    id:string,
    run:CustmIdFunction
}
export type DB_Users = {
    username:string
    email:string
}