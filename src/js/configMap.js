export const userPosition = {
  oceania: {
    name: 'oceania',
    nearestStorage: ['singapore', 'germany', 'east-usa', 'west-usa'],
    top: '520px',
    left: '1040px',
    devices: {
      laptop: { top: '40px', left: '60px' },
      smartphone: { top: '40px', left: '-40px' },
      phone: { top: '40px', left: '10px' },
      latencyDisplay: { top: '0px', left: '80px' },
    },
    latency: {
      germany: {
        laptop: 255,
        smartphone: 215,
        phone: 253,
      },
      westUsa: {
        laptop: 179,
        smartphone: 212,
        phone: 190,
      },
      eastUsa: {
        laptop: 208,
        smartphone: 260,
        phone: 219,
      },

      singapore: {
        laptop: 92,
        smartphone: 119,
        phone: 82,
      },
    },
  },
  europe: {
    name: 'europe',
    nearestStorage: ['germany', 'east-usa', 'west-usa', 'singapore'],
    top: '250px',
    left: '640px',
    devices: {
      laptop: { top: '25px', left: '25px' },
      smartphone: { top: '60px', left: '-65px' },
      phone: { top: '-10px', left: '100px' },
      latencyDisplay: { top: '80px', left: '-20px' },
    },
    latency: {
      germany: {
        laptop: 20,
        smartphone: 32,
        phone: 41,
      },
      westUsa: {
        laptop: 170,
        smartphone: 141,
        phone: 183,
      },
      eastUsa: {
        laptop: 97,
        smartphone: 82,
        phone: 119,
      },

      singapore: {
        laptop: 182,
        smartphone: 251,
        phone: 178,
      },
    },
  },
  asia: {
    name: 'asia',
    nearestStorage: ['singapore', 'germany', 'east-usa', 'west-usa'],
    top: '340px',
    left: '925px',
    devices: {
      laptop: { top: '20px', left: '50px' },
      smartphone: { top: '40px', left: '-70px' },
      phone: { top: '-50px', left: '100px' },
      latencyDisplay: { top: '40px', left: '120px' },
    },
    latency: {
      germany: {
        laptop: 182,
        smartphone: 157,
        phone: 296,
      },
      westUsa: {
        laptop: 227,
        smartphone: 256,
        phone: 143,
      },
      eastUsa: {
        laptop: 295,
        smartphone: 327,
        phone: 233,
      },

      singapore: {
        laptop: 51,
        smartphone: 65,
        phone: 71,
      },
    },
  },
  northAmerica: {
    name: 'north-america',
    nearestStorage: ['east-usa', 'west-usa', 'germany', 'singapore'],
    top: '260px',
    left: '260px',
    devices: {
      laptop: { top: '20px', left: '50px' },
      smartphone: { top: '50px', left: '-5px' },
      phone: { top: '20px', left: '-55px' },
      latencyDisplay: { top: '100px', left: '10px' },
    },
    latency: {
      germany: {
        laptop: 102,
        smartphone: 123,
        phone: 132,
      },
      westUsa: {
        laptop: 52,
        smartphone: 33,
        phone: 16,
      },
      eastUsa: {
        laptop: 21,
        smartphone: 48,
        phone: 54,
      },

      singapore: {
        laptop: 227,
        smartphone: 204,
        phone: 188,
      },
    },
  },
  southAmerica: {
    name: 'south-america',
    nearestStorage: ['west-usa', 'east-usa', 'germany', 'singapore'],
    top: '480px',
    left: '390px',
    devices: {
      laptop: { top: '25px', left: '35px' },
      smartphone: { top: '90px', left: '5px' },
      phone: { top: '0px', left: '-30px' },
      latencyDisplay: { top: '-50px', left: '-100px' },
    },
    latency: {
      germany: {
        laptop: 175,
        smartphone: 250,
        phone: 169,
      },
      westUsa: {
        laptop: 182,
        smartphone: 212,
        phone: 107,
      },
      eastUsa: {
        laptop: 140,
        smartphone: 165,
        phone: 88,
      },

      singapore: {
        laptop: 368,
        smartphone: 407,
        phone: 337,
      },
    },
  },
};

export const storagePosition = {
  westUsa: {
    name: 'west-usa',
    top: '310px',
    left: '165px',
  },
  eastUsa: {
    name: 'east-usa',
    top: '300px',
    left: '360px',
  },
  germany: {
    name: 'germany',
    top: '270px',
    left: '615px',
  },
  singapore: {
    name: 'singapore',
    top: '485px',
    left: '960px',
  },
};

export const latency = {};

// // nearestStorage: ['singapore', 'germany', 'west-usa', 'east-usa'],
// nearestStorage: ['germany', 'east-usa', 'singapore', 'west-usa'],
