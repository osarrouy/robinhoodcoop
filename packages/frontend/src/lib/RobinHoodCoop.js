module.exports = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Burnt',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'firstname',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'lastname',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
    ],
    name: 'CreatedMember',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
    ],
    name: 'DeletedMember',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
    ],
    name: 'GrantedAdmin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Minted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
    ],
    name: 'RevokedAdmin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'Unpaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'firstname',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'lastname',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
    ],
    name: 'UpdatedMember',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'UpdatedValue',
    type: 'event',
  },
  {
    inputs: [],
    name: 'share',
    outputs: [
      {
        internalType: 'contract RobinHoodShare',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'value',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'updateValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'grantAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'revokeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_member',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_firstname',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_lastname',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_email',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256',
      },
    ],
    name: 'createMemberWithShares',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_member',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_firstname',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_lastname',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_email',
        type: 'string',
      },
    ],
    name: 'createMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_member',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_firstname',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_lastname',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_email',
        type: 'string',
      },
    ],
    name: 'updateMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_member',
        type: 'address',
      },
    ],
    name: 'deleteMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_member',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_member',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'isAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_member',
        type: 'address',
      },
    ],
    name: 'isMember',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_member',
        type: 'address',
      },
    ],
    name: 'member',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'firstname',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'lastname',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'email',
            type: 'string',
          },
        ],
        internalType: 'struct RobinHoodCoop.Member',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
