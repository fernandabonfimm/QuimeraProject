const mongoose = require('mongoose');

const ExperimentSchema = new mongoose.Schema({
  pin: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  // O atributo liberateRoom é utilizado para liberar a sala de experimento
  liberateRoom:{
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ExperimentSchema.statics.findByPin = async function(pin) {
  const experiment = await this.findOne({ pin });
  return experiment;
};

const Experiment = mongoose.model('Experiment', ExperimentSchema);

module.exports = Experiment;

