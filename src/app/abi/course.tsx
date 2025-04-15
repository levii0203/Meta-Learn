
export const CourseContractAddress = "0xf1BBe781413acA0d9e7bb8C2716Ec9570B04B217"

export const CourseContractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        }
      ],
      "name": "Bought",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "educator",
          "type": "address"
        }
      ],
      "name": "CourseAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "educator",
          "type": "address"
        }
      ],
      "name": "CourseDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address payable",
          "name": "buyer",
          "type": "address"
        }
      ],
      "name": "Withdrew",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        },
        {
          "internalType": "uint64",
          "name": "price",
          "type": "uint64"
        }
      ],
      "name": "addCourse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        }
      ],
      "name": "buyCourse",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "student",
          "type": "address"
        }
      ],
      "name": "checkCompletions",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        }
      ],
      "name": "completeCourse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        }
      ],
      "name": "deleteCourse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "student",
          "type": "address"
        }
      ],
      "name": "isStudentEnrolled",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        }
      ],
      "name": "viewEducator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "courseId",
          "type": "uint256"
        }
      ],
      "name": "withdrawCourse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]