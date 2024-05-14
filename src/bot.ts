import { Bot, session } from "grammy";
import { createConversation, conversations } from "@grammyjs/conversations";
import { MyContext } from "./conversations";

// import config file
import { Token } from "./config";

// create the bot instance
const bot = new Bot<MyContext>(Token);

//import menus
import { startMemu } from "./menus/startMenu";

// import converstaion
import { inputChannelName } from "./conversations/scanChannel";

bot.use(
  session({
    initial() {
      return {};
    },
  })
);

bot.use(conversations());
bot.use(createConversation(inputChannelName));

bot.use(startMemu);

bot.command("start", async (ctx) => {
  await ctx.reply("😊 Please select option you want!!!", {
    reply_markup: startMemu,
  });
});

bot.start();

export default bot;
