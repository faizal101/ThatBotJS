const { Command } = require("discord.js-commando");
const { MessageEmbed } = require('discord.js');
const Danbooru = require("danbooru");

module.exports = class DanCommand extends Command {
  constructor(client) {
    super(client, {
      name: "danbooru",
      group: "search",
      memberName: "danbooru",
      description: "search for anime pics on danbooru",
      examples: ["danbooru kantoku"],
      args: [
        {
          key: 'search',
          prompt: 'Input a tag to search',
          type: 'string'
        }
      ]
      });
  }
  async run (msg, {search}) {
    const embed = new MessageEmbed();
    const booru = new Danbooru();
    const posts = await booru.posts({ tags: search, limit: 10, random:true });
    const post = posts[0];
    console.log(post.file_url)
    console.log(post.large_file_url);
    embed
      .setAuthor('Danbooru', 'https://qt-anime-grils.is-serious.business/555270.png')
      .setColor('#ec40df')
      .setTitle('Click here to view in your browser')
      .setURL(`https://danbooru.donmai.us/posts/${post.id}`)
      .setImage(post.large_file_url)
      .addField('Score:', post.score, true)
      .addField('Rating:', (post.rating === 's' ? 'safe' : post.score === 'q' ? 'questionable' : 'explicit'), true)
      .addField('Artist:', `[${post.tag_string_artist}](https://danbooru.donmai.us/posts/?tags=${post.tag_string_artist})`, true)
      .addField('File Fromat:', post.file_ext, true)
      .setFooter(`Post ID: ${post.id}`, this.client.user.displayAvatarURL())
    return msg.embed(embed);
  }
};