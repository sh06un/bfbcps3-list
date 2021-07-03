// THIS FILE IS FOR SHOWING CORRECT INFORMATION
// DO NOT CHANGE THESE VARIABLES
const goldrushMaps = {
  "Levels/MP_BeachHead_Day1": "Harvest Day",
  "Levels/MP_BeachHead_Day2": "Over and Out",
  "Levels/MP_Harbour_Day1": "Valley Run",
  "Levels/MP_Harbour_Day2": "Deconstruction",
  "Levels/MP_Ignition_Day1": "Oasis",
  "Levels/MP_Ignition_Day2": "Final Ignition",
  "Levels/MP_Monastery_Day1": "End of the Line",
  "Levels/MP_Monastery_Day2": "Ascension",
};
const conquestMaps = {
  "levels/mp_beachhead_day1": "Harvest Day",
  "levels/mp_beachhead_day2": "Crossing Over",
  "levels/mp_harbour_day1": "Par for the Course",
  "levels/mp_harbour_day2": "Ghost Town",
  "levels/mp_ignition_day1": "Oasis",
  "levels/mp_ignition_day2": "Acta Non Verba",
  "levels/mp_monastery_day1": "End of the Line",
  "levels/mp_monastery_day2": "Ascension",
};

const config = {
  availableFields: {
    rawFields: {
      location: 6,
      level_code: 10,
      name: 12,
      ip: 14,
      port: 26,
      mode: 24,
      playgroup: 44,
      player_count: 58,
      balance: 28,
      type: 16,
    },
    newFields: {
      map: (server) => {
        if (server[24] === "GOLDRUSH") {
          return goldrushMaps[server[10]];
        } else {
          // server[24] === 'CONQUEST'
          return conquestMaps[server[10]];
        }
      },
      stability: (server) => {
        if (server[6] === "na1") {
          return "UNSTABLE";
        } else {
          return "STABLE";
        }
      },
    },
  },
};

export default config;
