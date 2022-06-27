module.exports = (client) => {
    console.log(`${client.getTime()} Hola bruh ${client.user.tag}!`);
    client.user.setActivity(`Musik`, {type: "STREAMING"})
    setInterval(() => {
        client.user.setActivity(`Musik`, {type: "STREAMING"})
    }, 600_00)
}