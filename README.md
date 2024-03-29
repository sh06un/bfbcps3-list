# bfbcps3-list

A node.js wrapper for the ealist program written by Luigi Auriemma, that acts as a Battlefield: Bad Company PS3 server viewer.

## Prerequisites

You will need Windows in order to run this program, as this is a wrapper for the ealist program as it comes from Luigi Auriemma's website, which is a Windows build.

I'm using `node v14.17.0`, so the current LTS version, at the time of writing (3rd July 2021), should work.

## How to use

1. You'll need to download `ealist` from Luigi Auriemma's site in order to use this, as it's a wrapper for the executable file. For safety purposes, I won't be supplying this file. However, for full transparency, he also supplies the source code for the file alongside the exe file.

> As a side note, I tried to get a Mac build going but it seems to require an outdated version of the OpenSSL, which I wasn't too keen on finding or running.

2. Once you've downloaded the file, drop it in the root of the `bfbcps3-list` directory. It should be alongside the `index.js` file.

> Normally, next you would need to 'create an account' (not really an account; it seems to just be registering a username and password to use for accessing the servers) using `ealist.exe`. The program doesn't seem to work to create these credentials anymore, so for the next step you can use my credentials that I've had set up for use with this for a long while. For both `UNAME` and `PWORD`, you can use `sh06un1`.

> I am not sure if having a ton of people using the same credentials will negatively affect the usability of the program. That is something that we'll probably just have to deal with, unfortunately.

> For anyone curious, the command that you would have had to run was `.\ealist.exe -a NEWUSER NEWPASS mohair-pc -A` on the `ealist.exe` file, where `NEWUSER` and `NEWPASS` are the username and password that you would like to use respectively.

3. Create a `.env` file on the root of the directory (again, alongside the `ealist.exe` and `index.js` files) and include your created username and password under `UNAME` for the username, and `PWORD` for password.

> Each line should be in the format `ENV_VARIABLE=value`. For example, `UNAME=sh06un1`. Also make sure that you have file extensions turned on, so you can make sure the file is not saved as `.env.txt`, it needs to be just `.env`.

> Another note, `USER` and `USERNAME` are already set as environment variables on certain OSs, so I used `UNAME` to avoid collisions. Password becoming `PWORD` was just to keep things a bit consistent.

4. Once you've done this, you're good to go! Run `npm i` to initialise the repository, and then `npm start` to run the program. From here, you'll have to choose a command to run, which are listed in the next section. There are also customisation options detailed below, but you should be able to run the program with the defaults that are already set up.

## Commands

- servers - This will query the servers once, and return the data it receives. Just be aware that the queries seem fail a lot. It's as if they're throttling requests, so if you choose to use this command, be ready to use it a fair bit.
- watch - This will run queries to the server continuously. This is probably the command to use, as (again) you'll probably see a ton of queries that fail, and this will allow you to just sit back and, more or less, monitor the servers. You will need to terminate the program to get out of this, though, using `ctrl+c`.
- exit - This command will exit the program gracefully with `process.exit(0)`.

## Customisation

There are customisation options that you can set in order to change how the information is displayed.

Within the `userSettings.js` are the following settings:

- `chosenFields` - This is an array of the fields that are to be shown in the output. These fields will also be shown in the order that you have them in this array. The fields that are available to use are as follows:
  - `location` - A location code.
  - `level_code` - A code for the map. It seems to be a filepath.
  - `name` - Seems to be the name of the machine that is running that particular server.
  - `ip` - The IP address of the server.
  - `port` - The port the server is running on.
  - `mode` - The game mode (i.e `CONQUEST` or `GOLDRUSH`).
  - `playgroup` - This will tell you if you can join the server with a squad or not.
  - `player_count` - The amount of players currently in the server.
  - `balance` - Whether or not the teams are balanced (I'm not too sure what their definition of 'balance' is, though).
  - `type` - Whether the server is open (`O`) or closed (`C`).
  - `map` - Maps the info from `level_code` to the current map. Useful as a replacement for `level_code` as it's no longer esoteric.
  - `stability` - Tells you whether or not the server is stable. This is an extension of the `location` field, as PSNProfiles user woggly4 determined that if a server has a location of `na1`, it is very likely to fail soon after startup, as also confirmed by myself. Useful alongside or as a replacement to the `location` field, as it's no longer esoteric.

  > A note on the `stability` field - I have seen `na1` servers that ended up being stable, but I've only seen it happen once and I'm not sure of the cause. It would be, and has always been, totally safe to assume that all `na1` servers will crash soon after spawning.

- `filters` - These are a few filters that I found to be useful when trying to only display servers that I wanted to see. Both of these filters are turned on (set to `true`) by default. These filters are as follows:

  - `rankedOnly` - This filter will weed out the unranked servers, and only show you ranked servers. I'm not sure if anyone plays unranked matches anymore, so they will probably always be empty. It's also common knowledge that you need to play on ranked matches to earn trophies, so if you're a trophy hunter you'll want this enabled.
  - `openServersOnly` - This will weed out any closed servers. Useful if you don't want to display servers that you can't join anyway.

- `sortBy` - This is a simple 'sort by a field' object. You can omit this object completely, and by default it will sort the servers by the `player_count` field, in ascending order:
  - `field` - The field you want to sort by.
  - `order` - The order you want to sort (i.e. `asc` or `desc`).

## Credits and Special Thanks

sh06un - I wrote this code lel.

woggly4 - This guy did a ton of research using ealist and came up with a lot of the info that went towards me also being able to use ealist, and earlier versions of this program, to help boosting groups find stable (and sometimes unstable) servers to use. Even got a code snippet from this guy that I used as a starting point for this whole thing. Thanks for sharing that info, and giving us all hope that this game could be finished as far out from release as 2020-2021.

Luigi Auriemma - Without ealist, this wouldn't be possible. This wrapper is using his program. This whole thing is pretty much all this guy's work. Thanks for creating something that has ended up being so useful. https://aluigi.altervista.org/

## Licence

MIT License: http://adampritchard.mit-license.org/ or see the [`LICENSE` file](https://github.com/sh06un/bfbcps3-list/blob/master/LICENSE).
