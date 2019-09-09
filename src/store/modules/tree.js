export default {
  namespaced: true,
  state: {
    selectedNode: null,

    treeStoreAdmin: [
      {
        "text": "Introduction (NOT EDITABLE)",

        "state": {"expanded": true, "editable": false},
        "children": [
          {"text": "Who Should Read This Book?"},

          {"text": "What’s in This Book?"},
          {"text": "Have Fun!"}
        ]
      },
      {
        "text": "Part I: Fundamentals", "children": [
          {
            "text": "What Is JavaScript?", "children": [
              {"text": "Meet JavaScript"},
              {"text": "Why Learn JavaScript?"},
              {
                "text": "The Structure of a JavaScript Program", "children": [
                  {"text": "Syntax"},
                  {"text": "Comments"}
                ]
              }
            ]
          },
          {
            "text": "Data Types and Variables", "children": [
              {"text": "Numbers and Operators"},
              {
                "text": "Variables", "children": [
                  {"text": "Naming Variables"},
                  {"text": "Creating New Variables Using Math"},
                  {"text": "Incrementing and Decrementing"},
                  {"text": "+= (plus-equals) and –= (minus-equals)"}
                ]
              }
            ]
          }
        ]
      },
      {
        "text": "Part II: Advanced JavaScript", "children": [
          {
            "text": "The DOM and jQuery", "children": [
              {"text": "Selecting DOM Elements"},
              {
                "text": "Using jQuery to Work with the DOM Tree", "children": [
                  {"text": "Loading jQuery on Your HTML Page"},
                  {"text": "Replacing the Heading Text Using jQuery"}
                ]
              },
              {"text": "Creating New Elements with jQuery"},
              {"text": "Animating Elements with jQuery"},
              {"text": "Chaining jQuery Animations"},
              {"text": "What You Learned"}
            ]
          },
          {"text": "Interactive Programming"},
          {"text": "Find the Buried Treasure!"},
          {"text": "Object-Oriented Programming"}
        ]
      },
      {
        "text": "Part III: Canvas", "children": [
          {
            "text": "The canvas Element", "children": [
              {"text": "Creating a Basic Canvas"},
              {
                "text": "Drawing on the Canvas", "children": [
                  {"text": "Selecting and Saving the canvas Element"},
                  {"text": "Getting the Drawing Context"},
                  {"text": "Drawing a Square"},
                  {"text": "Drawing Multiple Squares"}
                ]
              },
              {"text": "Changing the Drawing Color"},
              {"text": "Drawing Rectangle Outlines"},
              {"text": "Drawing Lines or Paths"},
              {"text": "Filling Paths"},
              {
                "text": "Drawing Arcs and Circles", "children": [
                  {"text": "Drawing a Quarter Circle or an Arc"},
                  {"text": "Drawing a Half Circle"},
                  {"text": "Drawing a Full Circle"}
                ]
              },
              {"text": "Drawing Lots of Circles with a Function"},
              {"text": "What You Learned"},
              {
                "text": "Programming Challenges", "children": [
                  {"text": "#1: A Snowman-Drawing Function"},
                  {"text": "#2: Drawing an Array of Points"},
                  {"text": "#3: Painting with Your Mouse"},
                  {"text": "#4: Drawing the Man in Hangman"}
                ]
              }
            ]
          },
          {"text": "Making Things Move on the Canvas"}
        ]
      }
    ],
    treeStoreUser: [
      {
        "text": "Introduction (NOT EDITABLE)",

        "state": {"expanded": true, "editable": false},
        "children": [
          {"text": "Who Should Read This Book?"},

          {"text": "What’s in This Book?"},
          {"text": "Have Fun!"}
        ]
      },
      {
        "text": "Part I: Fundamentals", "children": [
          {
            "text": "What Is JavaScript?", "children": [
              {"text": "Meet JavaScript"},
              {"text": "Why Learn JavaScript?"},
              {
                "text": "The Structure of a JavaScript Program", "children": [
                  {"text": "Syntax"},
                  {"text": "Comments"}
                ]
              }
            ]
          },
          {
            "text": "Data Types and Variables", "children": [
              {"text": "Numbers and Operators"},
              {
                "text": "Variables", "children": [
                  {"text": "Naming Variables"},
                  {"text": "Creating New Variables Using Math"},
                  {"text": "Incrementing and Decrementing"},
                  {"text": "+= (plus-equals) and –= (minus-equals)"}
                ]
              }
            ]
          }
        ]
      },
      {
        "text": "Part II: Advanced JavaScript", "children": [
          {
            "text": "The DOM and jQuery", "children": [
              {"text": "Selecting DOM Elements"},
              {
                "text": "Using jQuery to Work with the DOM Tree", "children": [
                  {"text": "Loading jQuery on Your HTML Page"},
                  {"text": "Replacing the Heading Text Using jQuery"}
                ]
              },
              {"text": "Creating New Elements with jQuery"},
              {"text": "Animating Elements with jQuery"},
              {"text": "Chaining jQuery Animations"},
              {"text": "What You Learned"}
            ]
          },
          {"text": "Interactive Programming"},
          {"text": "Find the Buried Treasure!"},
          {"text": "Object-Oriented Programming"}
        ]
      },
      {
        "text": "Part III: Canvas", "children": [
          {
            "text": "The canvas Element", "children": [
              {"text": "Creating a Basic Canvas"},
              {
                "text": "Drawing on the Canvas", "children": [
                  {"text": "Selecting and Saving the canvas Element"},
                  {"text": "Getting the Drawing Context"},
                  {"text": "Drawing a Square"},
                  {"text": "Drawing Multiple Squares"}
                ]
              },
              {"text": "Changing the Drawing Color"},
              {"text": "Drawing Rectangle Outlines"},
              {"text": "Drawing Lines or Paths"},
              {"text": "Filling Paths"},
              {
                "text": "Drawing Arcs and Circles", "children": [
                  {"text": "Drawing a Quarter Circle or an Arc"},
                  {"text": "Drawing a Half Circle"},
                  {"text": "Drawing a Full Circle"}
                ]
              },
              {"text": "Drawing Lots of Circles with a Function"},
              {"text": "What You Learned"},
              {
                "text": "Programming Challenges", "children": [
                  {"text": "#1: A Snowman-Drawing Function"},
                  {"text": "#2: Drawing an Array of Points"},
                  {"text": "#3: Painting with Your Mouse"},
                  {"text": "#4: Drawing the Man in Hangman"}
                ]
              }
            ]
          },
          {"text": "Making Things Move on the Canvas"}
        ]
      }
    ],
    treeOptionsUser: {
      multiple: false,
      filter: {
        plainList: true
      }
    },
    treeOptionsAdmin: {
      multiple: false,
      filter: {
        plainList: true
      }
    },
  },
  getters: {
    get_treeUser: state => {
      return state.treeStoreUser;
    },
    get_treeOptionsUser: state => {
      return state.treeOptionsUser;
    },
    get_selectedNode: state => {
      return state.selectedNode;
    },

  },
  mutations: {
    uploadTreeStoreUser(state, payload) {
      state.treeStoreUser = payload
    },
    uploadTreeOptionsUser(state, payload) {
      state.treeOptionsUser = payload
    },
    uploadSelectedNode(state, payload) {
      state.selectedNode = payload
    },

  },
  actions: {
    updateTreeUser({commit}, payload) {
      context.commit('uploadTreeStoreUser', payload)
    },
    updateTreeOptionsUser({commit}, payload) {
      context.commit('uploadTreeOptionsUser', payload)
    },
    updateSelectedNode({commit}, payload) {
      context.commit('uploadSelectedNode', payload)
    }


  },
  computed: {}

}