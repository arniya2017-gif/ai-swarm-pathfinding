const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

  projectName: {
    type: String,
    required: true,
  },

  grid: {
    type: Array,
    required: true,
  },

  thumbnail: {
  type: String,
  default: "",
},

  path: {
    type: Array,
    default: [],
  },

  explanation: {
    type: String,
    default: "",
  },

  start: {
    type: Array,
    default: [],
  },

  end: {
    type: Array,
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);

