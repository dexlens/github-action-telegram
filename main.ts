import github from 'npm:@actions/github';
import core from 'npm:@actions/core';
import { Bot } from "npm:grammy";

if (import.meta.main) {
  const context = github.context;
  // console.log(context); 
  let bot = new Bot(Deno.args[0]);
  const denoFile = Deno.readTextFileSync("../deno.json");
  const denoJSON = JSON.parse(denoFile);
  // console.log(denoJSON);
  // get the merge commit message from the payload.commits
  const filterCommitToMerge = context.payload.commits.filter((commit: any) => commit.message.includes("Merge pull request"));
  const commitMerge = filterCommitToMerge[0];
  // console.log("Commit Merge: ", commitMerge);
  const repoName = context.payload.repository?.name;
  const fullname = context.payload.repository?.full_name;
  const description = context.payload.repository?.description;
  const eventName = context.eventName; 
  const htmlURL = context.payload.repository?.html_url;
  const applicationVersion = denoJSON.version;
  const telegramChannel = Deno.args[1];
  const prNumber = commitMerge.message.split(" ")[3].replace("#", "");
  // const branchName = context.ref.split("/")[2];
  let repoLink = htmlURL;
  let prLink = `${repoLink}/pull/${prNumber}`;

  console.log("Payload: ", context.payload);

  // Merge pull request #3 from dexlens/testProjectImage
  // let branchName = commitMerge.message.split("/").pop();
  // console.log("Branch Name: ", branchName);

  let branchName = commitMerge.message.match(/from dexlens\/(.*?)\n\n/)[1];
  console.log("Branch Name: ", branchName);

  let htmlCaption = `${commitMerge.message}`;


  const videoUrls = [
    "https://github.com/dexlens/cdn/raw/refs/heads/main/1564743423408.mp4", 
    "https://github.com/dexlens/cdn/raw/refs/heads/main/legend.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/fafo-findout.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/50cent-laughing.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/nahh-nah.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/thumbs-thumbs-up-kid.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/good-morning.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/gordon.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/drops-mic.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/shaggy-scooby-doo.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/noice-nice.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/stare-awkward.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/cristiano-ronaldo-portugal.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/shia-la-beouf-fire.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/peaky-blinders-no-fighting.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/xd-programming.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/cat-computer.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/im-tired-developer-cat-gif.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/god-coding.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/programming.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/developer-client.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/front.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/bugs-video-games.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/rugged-crypto-rugged.mp4",
    "https://github.com/dexlens/cdn/raw/refs/heads/main/weekend-bugs.mp4"
  ]

  let randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

  // if repo name is not dehub 
  if (repoName !== "dehub") {
    bot.api.sendVideo(telegramChannel, randomVideoUrl, {
      caption: htmlCaption,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "View Repo", url: htmlURL as string },
          ],
          [
            { text: "View Pull Request", url: prLink as string },
          ],
          [
            { text: "View Code Changes", url: `${prLink}/files` },
          ],
        ],
      },
      parse_mode: "HTML",
    });
  } else {
    // let entryProjectData = Deno.readTextFileSync(`../${branchName}/project.json`);
    // let projectData = JSON.parse(entryProjectData);
    // let imageSrc = `https://raw.githubusercontent.com/dexlens/dehub/refs/heads/main/${branchName}/${branchName}.png - wtf`;
    // console.log("Image Src: ", imageSrc);
    // console.log("Project Data: ", projectData);

    bot.api.sendPhoto(telegramChannel, `https://raw.githubusercontent.com/dexlens/dehub/refs/heads/main/${branchName}/${branchName}.png`, {
      caption: htmlCaption,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "View Page", url: `https://github.com/dexlens/dehub/tree/main/${branchName}`
            }
          ],
          [
            { text: "View Repo", url: htmlURL as string },
          ],
          [
            { text: "View Pull Request", url: prLink as string },
          ],
        ],
      },
      parse_mode: "HTML",
    });
  }

  // bot.api.sendVideo(telegramChannel, randomVideoUrl, {
  //   caption: htmlCaption,
  //   reply_markup: {
  //     inline_keyboard: [
  //       [
  //         { text: "View Repo", url: htmlURL as string },
  //       ],
  //       [
  //         { text: "View Pull Request", url: prLink as string },
  //       ],
  //     ],
  //   },
  //   parse_mode: "HTML",
  // });

  console.log("Message sent");
}
