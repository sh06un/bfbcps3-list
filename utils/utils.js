import config from '../config.js';
import userSettings from '../userSettings.js';

const _sortOutput = (field = "player_count", order = "asc", output) => {
  // sort by specified field in config
  
  // if empty array or undefined, return undefined
  if (!output || !output.length) return undefined;
  
  // check if field is valid for user's chosenFields array (what they have selected to see)
  // return original output, if it isn't
  if (!output[0][field]) {
    console.log(
      "NOTICE: Please check that your chosen sortBy field is within your chosenFields array."
    );

    return output;
  }

  switch (order) {
    case "desc":
      return output.sort((a, b) => b[field] - a[field]);
    case "asc":
      return output.sort((a, b) => a[field] - b[field]);
    default:
      return output;
  }
};

const _filterOutput = (server) => {
  // filter output based on filters set in userSettings
  if (
    (userSettings.filters.rankedOnly && server[42] !== "RANKED") ||
    (userSettings.filters.openServersOnly && server[16] !== "O")
  ) {
    return true;
  }
  return false;
};

const _constructServerObject = (server) => {
  let filteredServerOutput = {};

  userSettings.chosenFields.forEach((field) => {
    if (Object.keys(config.availableFields.rawFields).includes(field)) {
      filteredServerOutput[field] =
        server[config.availableFields.rawFields[field]];
      return;
    }

    if (Object.keys(config.availableFields.newFields).includes(field)) {
      const newField = config.availableFields.newFields[field];
      filteredServerOutput[field] = newField(server);
      return;
    }

    console.log(
      `NOTICE: '${field}' does not appear to be an available field.\nPlease ensure that your chosen fields match those in the available fields.`
    );
    return;
  });

  return filteredServerOutput;
};

export const formatOutput = (output) => {
  const servers = output.toString().split("\r\n");
  let serversArray = [];

  servers.forEach((server) => {
    const s = server.split("\\");

    if (s.length === 59 && !_filterOutput(s)) {
      serversArray.push(_constructServerObject(s));
    }
  }).filter(Boolean);

  return _sortOutput(
    userSettings.sortBy?.field,
    userSettings.sortBy?.order,
    serversArray
  );
};
