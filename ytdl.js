function prompt(question) {
  return new Promise((resolve, reject) => {
    const { stdin, stdout } = process;

    stdin.resume();
    stdout.write(question);

    stdin.on('data', data => {
        resolve(data.toString().trim())
        stdin.pause()
    });
    stdin.on('error', err => reject(err));
  });
}

function create(){
    var videoInfo = {}

    prompt("Please provide a YouTube link: ")
        .then((videoLink) => {
            videoInfo.videoLink = videoLink
            return prompt("Give your clip a name: ")
        })
        .then((name) => {
            videoInfo.name = name;
            
            const fs = require('fs');
            const ytdl = require('ytdl-core');

            ytdl(videoInfo.videoLink,  { quality: "highestaudio" })
                .pipe(fs.createWriteStream("clips/" + videoInfo.name + ".mp3"));
        })
}

create()