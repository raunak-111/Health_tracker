const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  
  bodyTemperature: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value >= 35 && value <= 41,
      message: 'Body temperature must be between 35 and 41 degrees Celsius'
    }
  },
  bloodPressure: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const [systolic, diastolic] = value.split('/');
        return systolic >= 90 && systolic <= 140 && diastolic >= 60 && diastolic <= 90;
      },
      message: 'Blood pressure must be within the normal range (90/60 - 140/90)'
    }
  },
  heartRate: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value >= 60 && value <= 100,
      message: 'Heart rate must be between 60 and 100 beats per minute'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
});

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

module.exports = HealthRecord;