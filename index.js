import { execSync } from 'child_process';
import promptSync from 'prompt-sync';
// wanted to add a feature that would save output to a file or files for logging times servers were most active
// import fs from 'fs';

import { formatOutput } from './utils/utils.js'

// wanted to add a feature that would call the correct function from the command line so you could skip the prompt loop
// const cmd = process.argv[2];

const prompt = promptSync();

const username = process.env.UNAME;
const password = process.env.PWORD;
const gamecode = "bfbc-ps3";

function servers() {
  if (username && password) {
    const output = _queryServer();

    if (output) {
      const formattedOutput = formatOutput(output);

      console.table(formattedOutput);
      console.log(new Date().toString(), "\n");
    }
  } else {
    console.log("Please supply a username and password", "\n");
  }
}

function _queryServer() {
  let output;

  try {
    output = execSync(
      `.\\ealist.exe -a ${username} ${password} ${gamecode} -n ${gamecode} -X none`,
      { stdio: "pipe" }
    );
  } catch (error) {
    console.log(
      "Error: there has been an error during the connection with the server",
      "\n"
    );
  }

  return output;
}

function enterPromptLoop() {
  let command;

  while (true) {
    command = prompt("Command-> ");
    console.log();

    _determineFunction(command);
  }
}

function _determineFunction(command) {
  switch (command) {
    case "servers":
      servers();
      break;
    case "watch":
      while(true) servers();
    case "exit":
      process.exit(0);
    default:
      console.log("servers|watch|exit", "\n");
  }
}

enterPromptLoop();
