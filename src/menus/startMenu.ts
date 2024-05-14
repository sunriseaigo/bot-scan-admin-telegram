import { Menu } from "@grammyjs/menu";
import { MyContext } from "../conversations";

export const startMemu = new Menu<MyContext>("start-menu")
  .text("Scan Admins from specific channel", (ctx: MyContext) => {
    return ctx.conversation.enter("inputChannelName");
  })
  .row();
