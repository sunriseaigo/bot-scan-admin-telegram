import { MyContext, MyConversation } from "./index";

import bot from "../bot";
import { InlineKeyboard } from "grammy";

export const inputChannelName = async (
  conversation: MyConversation,
  ctx: MyContext
) => {
  await ctx.reply("Please input the channel name you wanna scan for admins.");
  const { message } = await conversation.wait();

  let channelName = "";
  if (message?.text?.startsWith("@")) {
    channelName = message?.text;
  } else {
    channelName = "@" + message?.text;
  }

  try {
    const administrators = await bot.api.getChatAdministrators(channelName);

    let adminList = new InlineKeyboard();

    administrators.map((admin, index) => {
      if (index % 2 === 1) {
        adminList
          .url(
            `${admin.user.username} : ${admin.status}`,
            `https://t.me/${admin.user.username}`
          )
          .row();
      } else {
        adminList.url(
          `${admin.user.username} : ${admin.status}`,
          `https://t.me/${admin.user.username}`
        );
      }
    });
    await ctx.reply(`🚀 This is the admin list of ${channelName} 🚀`, {
      reply_markup: adminList,
    });
  } catch (e) {
    await ctx.reply("Please input the channel name correctly.");
    return;
  }
};
