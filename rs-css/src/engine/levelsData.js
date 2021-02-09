const levelsData = [
    {
        name: 'A',
        quest: 'Select water',
        answer: 'water',
        index: 0,
        count: 2,
        display: [
            {
                element: 'water',
                animation: true
            },
            {
                element: 'water',
                animation: true
            }
        ],
    },

    {   
        name: 'B',
        quest: 'Select fire',
        answer: 'fire',
        index: 1,
        count: 2,
        display: [
            {
                element: 'fire',
                animation: true
            },
            {
                element: 'water'
            },
            {
                element: 'fire',
                animation: true
            }
        ]
    },

    {
        name: '#id',
        quest: 'Select the frozen water',
        answer: '#frozen',
        index: 2,
        count: 1,
        display: [
            {
                element: 'water'
            },
            {
                element: 'water',
                animation: true,
                id: 'frozen'
            },
            {
                element: 'frost'
            }
        ]
    },

    {
        name: '.class',
        quest: 'Select the small frost',
        answer: '.small',
        index: 3,
        count: 2,
        display: [
            {
                element: 'frost',
                class: 'small',
                animation: true
            },
            {
                element: 'fire'
            },
            {
                element: 'frost',
                class: 'small',
                animation: true
            },
            {
                element: 'frost'
            }
        ]
    },

    {
        name: '*',
        quest: 'Select everything',
        answer: '*',
        index: 4,
        count: 3,
        display: [
            {
                element: 'water',
                animation: true
            },
            {
                element: 'fire',
                animation: true
            },
            {
                element: 'frost',
                animation: true
            }
        ]
    },

    {   
        name: 'A B',
        quest: 'Select the fire on the wood',
        answer: 'wood fire',
        index: 5,
        count: 1,
        display: [
            {
                element: 'wood'
            },
            {
                element: 'fire'
            },
            {
                element: 'wood',
                children: [
                    {
                        element: 'fire',
                        animation: true
                    }
                ]
            }
        ]
    },

    {   
        name: 'A, B',
        quest: 'Select the water and the lightning',
        answer: 'water, lightning',
        index: 6,
        count: 2,
        display: [
            {
                element: 'fire'
            },
            {
                element: 'water',
                animation: true
            },
            {
                element: 'lightning',
                animation: true
            },
            {
                element: 'frost'
            }
        ]
    },

    {   
        name: 'get rid of jars!',
        quest: 'Select elements inside jars',
        answer: 'jar wind, jar life',
        index: 7,
        count: 3,
        display: [
            {
                element: 'jar',
                children: [
                    {
                        element: 'wind',
                        animation: true
                    }
                ]
            },
            {
                element: 'jar',
                children: [
                    {
                        element: 'life',
                        animation: true
                    }
                ]
            },
            {
                element: 'jar',
                children: [
                    {
                        element: 'wind',
                        animation: true
                    }
                ]
            }
        ]
    },

    {   
        name: 'life',
        quest: 'Select water and earth to create life',
        answer: 'water, earth',
        index: 8,
        count: 2,
        display: [
            {
                element: 'water',
                animation: true
            },
            {
                element: 'life'
            },
            {
                element: 'earth',
                animation: true
            }
        ]
    },

    {   
        name: 'melt',
        quest: 'Melt the frozen water with fire',
        answer: '#frozen, fire',
        index: 9,
        count: 2,
        display: [
            {
                element: 'water',
                id: 'frozen',
                animation: true
            },
            {
                element: 'water'
            },
            {
                element: 'fire',
                animation: true
            }
        ]
    },

    {   
        name: 'A ~ B',
        quest: 'Select water beside the frost',
        answer: 'frost ~ water',
        index: 10,
        count: 2,
        display: [
            {
                element: 'water'
            },
            {
                element: 'frost'
            },
            {
                element: 'water',
                animation: true,
                id: 'frozen'
            },
            {
                element: 'water',
                animation: true
            }
        ]
    },

    {
        name: ':not()',
        quest: 'Select the big frost',
        answer: 'frost:not(.small)',
        index: 11,
        count: 2,
        display: [
            {
                element: 'frost',
                animation: true
            },
            {
                element: 'frost',
                class: 'small'
            },
            {
                element: 'frost',
                animation: true
            }
        ]
    },

    {   
        name: 'freeze',
        quest: 'Freeze the water with frost',
        answer: 'water:not(#frozen), frost',
        index: 12,
        count: 2,
        display: [
            {
                element: 'water',
                animation: true
            },
            {
                element: 'water',
                id: 'frozen'
            },
            {
                element: 'frost',
                animation: true
            }
        ]
    },

    {
        name: ':empty',
        quest: 'Select the empty wood',
        answer: 'wood:empty',
        index: 13,
        count: 1,
        display: [
            {
                element: 'wood',
                children: [
                    {
                        element: 'fire'
                    }
                ]
            },
            {
                element: 'fire'
            },
            {
                element: 'wood',
                animation: true
            }
        ]
    },

    {
        name: 'choke and ignite',
        quest: 'Choke burning fire with water and ignite the wood with fire',
        answer: 'wood fire, water, wood:empty, fire',
        index: 14,
        count: 4,
        display: [
            {
                element: 'wood',
                children: [
                    {
                        element: 'fire',
                        animation: true
                    }
                ]
            },
            {
                element: 'water',
                animation: true
            },
            {
                element: 'fire',
                animation: true
            },
            {
                element: 'wood',
                animation: true
            }
        ]
    },


    {
        name: ':first-child',
        quest: 'Select the first fire',
        answer: 'fire:first-child',
        index: 15,
        count: 1,
        display: [
            {
                element: 'fire',
                animation: true
            },
            {
                element: 'fire'
            },
            {
                element: 'fire'
            }
        ],
    },

    {
        name: ':last-child',
        quest: 'Select the last wind',
        answer: 'wind:last-child',
        index: 16,
        count: 1,
        display: [
            {
                element: 'wind'
            },
            {
                element: 'wind'
            },
            {
                element: 'wind',
                animation: true
            }
        ],
    },

    {
        name: ':nth-child()',
        quest: 'Select the 3rd water',
        answer: 'water:nth-child(3)',
        index: 17,
        count: 1,
        display: [
            {
                element: 'water'
            },
            {
                element: 'water'
            },
            {
                element: 'water',
                animation: true
            },
            {
                element: 'water',
                id: 'frozen'
            }
        ],
    },

    {
        name: ':first-of-type',
        quest: 'Select first water',
        answer: 'water:first-of-type',
        index: 18,
        count: 1,
        display: [
            {
                element: 'fire'
            },
            {
                element: 'water',
                animation: true
            },
            {
                element: 'water'
            },
            {
                element: 'water',
                id: 'frozen'
            }
        ],
    },

    {
        name: ':last-of-type',
        quest: 'Select last lightning and wind',
        answer: 'lightning:last-of-type, wind:last-of-type',
        index: 19,
        count: 2,
        display: [
            {
                element: 'lightning'
            },
            {
                element: 'lightning',
                animation: true
            },
            {
                element: 'wind'
            },
            {
                element: 'wind',
                animation: true
            }
        ],
    },

    {
        name: ':nth-of-type(A)',
        quest: 'Select all even water',
        answer: 'water:nth-of-type(even)',
        index: 20,
        count: 3,
        display: [
            {
                element: 'water'
            },
            {
                element: 'water',
                animation: true
            },
            {
                element: 'water',
                id: 'frozen'
            },
            {
                element: 'water',
                animation: true,
                id: 'frozen'
            },
            {
                element: 'water'
            },
            {
                element: 'water',
                animation: true
            }
        ],
    },

    {
        name: ':nth-of-type(An + B)',
        quest: 'Select every 2nd water, starting from the 3rd',
        answer: 'water:nth-of-type(2n + 3)',
        index: 21,
        count: 2,
        display: [
            {
                element: 'water'
            },
            {
                element: 'water'
            },
            {
                element: 'water',
                id: 'frozen',
                animation: true
            },
            {
                element: 'water',
                id: 'frozen'
            },
            {
                element: 'water',
                animation: true
            },
            {
                element: 'water'
            }
        ],
    }
];

export default levelsData;
