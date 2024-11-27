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
  let repoLink = htmlURL;
  let prLink = `${repoLink}/pull/${prNumber}`;

  // bot.api.sendPhoto(telegramChannel, `https://banners.beyondco.de/${description}.png?theme=dark&packageManager=npm+install&packageName=@${fullname}&pattern=charlieBrown&style=style_1&description=&md=1&showWatermark=0&fontSize=150px&images=code`, {
  //   caption: commitMerge.message,
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
  // });

  const videoUrls = [
    "https://github.com/dexlens/cdn/raw/refs/heads/main/1564743423408.mp4", 
    "https://github.com/dexlens/cdn/raw/refs/heads/main/legend.mp4",
    // "https://github.com/dexlens/cdn/raw/refs/heads/main/lepers-julien.mp4"
  ]

  let randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

  bot.api.sendVideo(telegramChannel, randomVideoUrl, {
    caption: commitMerge.message,
    reply_markup: {
      inline_keyboard: [
        [
          { text: "View Repo", url: htmlURL as string },
        ],
        [
          { text: "View Pull Request", url: prLink as string },
        ],
      ],
    },
  });
  console.log("Message sent");
}
