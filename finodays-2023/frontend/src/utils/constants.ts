export const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'country',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'participant',
        type: 'address',
      },
    ],
    name: 'ConfirmationReceived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'country',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'CountryAdditionProposal',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'country',
        type: 'string',
      },
    ],
    name: 'CountryRemovalProposal',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'country',
        type: 'string',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'minter',
        type: 'address',
      },
    ],
    name: 'TokenCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'country',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'allowCountry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'clearingVist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'confirmCountryAddition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'country',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string',
      },
    ],
    name: 'createToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'country',
        type: 'string',
      },
    ],
    name: 'exitCountry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentGoldPrice',
    outputs: [
      {
        internalType: 'int256',
        name: '',
        type: 'int256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'initialParticipantsWallets',
        type: 'address[]',
      },
      {
        internalType: 'string[]',
        name: 'countries',
        type: 'string[]',
      },
    ],
    name: 'setInitialParticipants',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
