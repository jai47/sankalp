const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    eventId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Event', 
      required: true 
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['present', 'absent', 'excused'], 
      required: true 
    },
    markedAt: { 
      type: Date, 
      default: Date.now 
    }
  },
  { timestamps: true }
);

// Unique attendance per user per event
attendanceSchema.index({ eventId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
