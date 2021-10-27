# bit-buster-bot
Discord bot written in Node.js/TypeScript.

## Debugging Locally
- Clone repo and install package dependencies: `npm i`
- Create a `.env` file in the root folder and populate for your bot/Philips Hue setup using linked resources:
```
NODE_ENV=development
BOT_TOKEN=?
PHUE_USERNAME=?
PHUE_BRIDGE_IP=?
```
[Discord.js Bot Token Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token)  
[Philips Hue Developer Getting Started Guide](https://developers.meethue.com/develop/get-started-2/)
- Run the `debug` launch configuration in VS Code
