const Discord = require("discord.js");
const bot = new Discord.Client();
const PREFIX = '-r'
const fs = require("fs")
const request = require("request")
const YTDL = require('ytdl-core')
const getYouTubeID = require("get-youtube-id")
const fetchvideoinfo = require("youtube-info") 

var config = JSON.parse(fs.readFileSync("./settings.json", "utf-8"));

const yt_api_key = config.yt_api_key
  let blue = "#00AAFF";
  let yellow = "#ECFF00";
  let red = "#FF0000";
  let purple = "#B900FF";
  let green = "#27FF00";
  var guilds = {};
  bot.on('message', (message) => {
    const member = message.member
      if (message.author.equals(bot.user)) return;
      if (!message.content.startsWith(PREFIX)) return;
    var args = message.content.substring(PREFIX.length).split(" ")
    i = 1
    if (!guilds[message.guild.id]) {
      guilds[message.guild.id] = {
      isplaying: false,
      queue: [],
      queuenames: [],
      dispatcher: null,
      voiceChannel: null,
      skipreq: 0,
      skippers: []
    }
  }
     switch (args[0].toLowerCase()) {
        case 'komutlar':
        var komutembed = new Discord.RichEmbed()
        .setDescription(":regional_indicator_k: :regional_indicator_o: :regional_indicator_m: :regional_indicator_u: :regional_indicator_t: :regional_indicator_l: :regional_indicator_a: :regional_indicator_r:")
        .addField("-rRainbow:", "Renklenmen İçin 🌈")
        .addField("-rBilgi:", "Bot Hakkında Bilgi al "+ ":thinking:")
        .addField("-rPing:","Pingini Öğren "+":ping_pong:")
        .addField("-rMüzik:","Müzik Komutları "+":headphones:")
        .addField("Bu Bot Türkçedir",":flag_tr::flag_tr::flag_tr::flag_tr:")
        message.channel.sendEmbed(komutembed);
        break;
        case 'ping':
        var pingembed = new Discord.RichEmbed()
        .setDescription(":ping_pong: "+`${message.author.username}`+" Tamam Senin Pingin")
        .addField(`${bot.ping}`+"ms","Başka Bir Şey Öğrenmek İstiyorsan /Komutlar Yaz ve Komutlara Bak")
        message.channel.sendEmbed(pingembed)
        break;
        case "rainbow":
if(!message.member.roles.some(r=>["YonetimEkibi", "gökkuşağı", "ŁøŔƊ |👑", "ΛÐ௱ɪЛ", "ƘƦƛԼƖ̇çЄM", "Ertunga ve Can ve Polat!", "🔱Ölümsüz Admin🔱"].includes(r.name)) ) {
  return message.reply("Yetkin Yok");
}
message.react("🌈")
message.channel.sendMessage('Rainbowlandın')
let color = message.member.displayHexColor;
var i = 0;
for(i;i <=500;i++) {
if (message.content == "-rrainbow")
{
message.member.colorRole.setColor(blue);
message.member.colorRole.setColor(yellow);
message.member.colorRole.setColor(red);
message.member.colorRole.setColor(purple);
message.member.colorRole.setColor(green);
}
if (i == 500)
{
message.member.colorRole.setColor(color)
}
} 
break;
case 'play':
if (member.voiceChannel || voiceConnection != null) {
if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isplaying) {
  getID(args, function (id){
  add_to_queue(id, message)
  fetchvideoinfo(id,function (err, videoInfo){
  if (err) throw new Error(err)
  message.reply("Sıraya Eklendi "+videoInfo.title)
  guilds[message.guild.id].queuenames.push(videoInfo.title)
  });
  });
}else {
  isplaying=true;
  getID(args, function(id){
  guilds[message.guild.id].queue.push(id);
  playMusic(id, message);
  fetchvideoinfo(id, function (err, videoInfo){
    if (err) throw new Error(err);
    message.delete()
    message.reply("Oynatılıyor "+videoInfo.title+ " :microphone:")
  });
  });
}
     } else {
       message.reply("Bir Ses Kanalına Girmelisin")
     }
break;
case 'skip':
if (guilds[message.guild.id].skippers.indexOf(message.author.id)=== -1) {
  guilds[message.guild.id].skippers.push(message.author.id);
  guilds[message.guild.id].skipreq++;
  if (guilds[message.guild.id].skipreq >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
    skip(message);
    message.delete()
    message.reply("Şarkı Geçiliyor :arrow_forward:")
  } else {
    message.reply("Geçilemedi" + Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) - skipreq+ "Daha Oya İhtiyacın Var")
  } 
} else {
  message.reply("Zaten Geçmek İçin Oy Verdin")
}
break;
case 'stop':

break;
case 'müzik':
var musicembed = new Discord.RichEmbed()
        .setDescription(":regional_indicator_m: :regional_indicator_u: :regional_indicator_z: :regional_indicator_i: :regional_indicator_k: :headphones:")
        .addField("-rPlay(link):", "Linki Oynatır :microphone:")
        .addField("-rSkip:", "Müziği Geçer :arrow_forward:")
        .addField("-rStop:", "Müziği Durdurur :no_entry:")
message.channel.sendEmbed(musicembed)
break;
case 'sil':
var fetched = message.channel.fetchMessages()
    if(args[1] > fetched) {
      message.channel.bulkDelete(fetched.size)
      message.channel.send(`Successfully purged ${fetched.size}`);
      console.log('Deletion of messages successful. Total messages deleted: ' + fetched.size)
      setInterval(function() {
      message.channel.bulkDelete(1)
      }, 5000)
       clearInterval()
    } else { 
      if(fetched > args[1]) {
        message.channel.bulkDelete(args[1] + 1);
        message.channel.send(`Silindi ${args[1]}.`);
        console.log(args[1]+"Mesaj"+" Başarıyla Silindi")
        setInterval(function() {
        message.channel.bulkDelete(1) 
      }, 10000)
        clearInterval()
    }
  } 
break;
        case 'bilgi':
        message.channel.sendMessage("DM'ye Bak")
        message.author.sendMessage("Adım: RainbowBot :rainbow:" + "\n" + "Amacım: Dünyayı Ele Geçirmek Şaka Şaka Rolünü Gökkuşağı Yapmak"+ "\n" +"Yapımcım: İlyas Karagel" + "\n" + "Versiyonum: 1.0.0")
        break;
}
});

  function skip(message) {
    dispatcher.end();
  }

  function playMusic(id, message) {
    guilds[message.guild.id].voiceChannel = message.member.voiceChannel;
    guilds[message.guild.id].voiceChannel.join().then(function (connection) {
      stream = YTDL("https://www.youtube.com/watch?v=" + id,{
        filter: "audioonly"
      });
      skipreq = 0;
      skippers = [0];

      dispatcher = connection.playStream(stream);
      dispatcher.on("end", function () {  
        guilds[message.guild.id].skipreq = 0
        guilds[message.guild.id].skippers = []
        guilds[message.guild.id].queue.shift();
        guilds[message.guild.id].queuenames.shift();
        if (guilds[message.guild.id].queue.length === 0) {
          guilds[message.guild.id].queue = [];
          guilds[message.guild.id].isplaying = false;
        }  else {
          setTimeout(function () {
          playMusic(queue[0], message);
        }, 500);
        }
      });
    });
  }

  function getID(str, cb) {
    if (isYoutube(str)) {
      cb(getYouTubeID(str));
    }else {
      search_video(str,function(id){
          cb(id);
      });
    }
  }
  function add_to_queue(strID, message) {
    if (isYoutube(strID)) {
      guilds[message.guild.id].queue.push(getYouTubeID(strID));
    }else {
      guilds[message.guild.id].queue.push(strID);
    }
  }
   
  function search_video(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" +encodeURIComponent(query)+"&key="+yt_api_key,function(error,response,body){
    var json =JSON.parse(body)
    if (!json.items[0]) callback("3_-a9nVZYjk");
    else {
    callback(json.items[0].id.videoId);
    }
      });
  }
  function isYoutube(str) {
    return str.toString().toLowerCase().indexOf("youtube.com") > -1;
  }
  bot.on("ready", () => {
    bot.user.setActivity(`-rKomutlar`, {type: "LISTENING"});
  });
  bot.on("guildMemberAdd", (member) => {
    member.sendMessage(`${member.user.username} Hoşgeldin Kardeşim`, {
      file: "https://i.imgur.com/3a3NE4j.gif"
 });
  });
   
bot.login('NDgzMDAwMDk5NTE4MjgzNzc3.DmiDkg.jOJlUQimNA_es5M_L7WaqQmjJmg') 