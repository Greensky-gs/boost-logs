const Discord = require('discord.js');

//You must have a Discord client (created) const client = new Discord.Client();
client.on('guildUpdate', (before, after) => {
    if (before.premiumSubscriptionCount < after.premiumSubscriptionCount) {
        const user = before.members.cache.find(member => member.premiumSince < after.member(member).premiumSince);
        if (user) {
            const boost = new Discord.MessageEmbed()
                .setTitle("Boost")
                .setThumbnail(user.user.avatarURL({dynamic: true}))
                .setFooter(user.user.username, user.user.avatarURL({dynamic: true}))
                .setTimestamp()
                .setColor('PINK')
                .setDescription(`<@${user.id}> have been boosted ${before.name} ${after.premiumSubscriptionCount - before.premiumSubscriptionCount} time(s)`)

            const params = {
                channel: 'The id of the boost logs channel', // replace this by the id
                boosterRole: 'The id of the role given to booster' // the role id
            };

            const channel = client.channels.cache.get(params.channel);
            if (channel) {
                channel.send(boost);
            };
            const role = after.roles.cache.get(params.boosterRole);
            if (role) if (!user.roles.cache.has()) {
                user.roles.add(role).catch(() => {});
            };

            const thanks = new Discord.MessageEmbed()
                .setTitle("Thanks !")
                .setDescription(`Thanks for support us by boosting ${after.name} !\n${user.roles.cache.has(role) ? `You now have the ${role.name} role` : ""}`)
                .setTimestamp()
                .setColor('PINK')
            
            user.send(thanks).catch(() => {});
        };
    };
});
