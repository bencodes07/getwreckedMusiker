const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "queueloop",
    description: "Toggles the Queue-Loop",
    run: async (client, interaction, args, prefix) => {
        if(!interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "**Please join a Voice-Channel first!**"}).catch(() => null);
        const oldConnection = getVoiceConnection(interaction.guild.id);
        if(!oldConnection) return interaction.reply({ ephemeral: true, content: "**I'm not connected somewhere!**"}).catch(() => null);
        if(oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "**We are not in the same Voice-Channel**!"}).catch(() => null);
        
        const queue = client.queues.get(interaction.guild.id);
        if(!queue) { 
            return interaction.reply({ ephemeral: true, content: `**Nothing playing right now**`}).catch(() => null);
        }
        if(queue.trackloop) queue.trackloop = false
        queue.queueloop = !queue.queueloop
        return interaction.reply({ ephemeral: false, content: `**Queue-Loop is now \`${queue.queueloop ? "Enabled" : "Disabled"}\`**`}).catch(() => null);
    },
};