const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "shuffle",
    description: "Shuffles (mixes) the Queue",
    run: async (client, interaction, args, prefix) => {
        if(!interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "**Please join a Voice-Channel first!**"}).catch(() => null);
        const oldConnection = getVoiceConnection(interaction.guild.id);
        if(!oldConnection) return interaction.reply({ ephemeral: true, content: "**I'm not connected somewhere!**"}).catch(() => null);
        if(oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "**We are not in the same Voice-Channel**!"}).catch(() => null);
        
        const queue = client.queues.get(interaction.guild.id);
        if(!queue) { 
            return interaction.reply({ ephemeral: true, content: `**Nothing playing right now**`}).catch(() => null);
        }
        queue.tracks = shuffleArray(queue.tracks);
        return interaction.reply({ ephemeral: true, content: `**Successfully shuffled the Queue.**`}).catch(() => null);
    },
};

function shuffleArray(a) {
    let cI = a.length, rI;
    while(cI != 0) {
        rI = Math.floor(Math.random() * cI);
        cI --;
        [a[cI], a[rI]] = [a[rI], a[cI]];
    }
    return a;
}