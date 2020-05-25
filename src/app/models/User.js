const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    telefones: [
      {
        numero: String,
        ddd: String
      }
    ],
    password: {
      type: String,
      required: true,
      select: false
    },
    lastLoginAt: {
      type: Date,
      default: Date.now()
    },
    token: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', async function () {
  this.password = await bcryptjs.hash(this.password, 1);
});

UserSchema.pre('updateOne', async function () {
  const pass = this.getUpdate().password;

  if (pass) this.getUpdate().password = bcryptjs.hashSync(pass, 10);
});

module.exports = model('User', UserSchema);
