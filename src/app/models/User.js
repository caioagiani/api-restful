const { Schema, model } = require('mongoose');
const { hashSync } = require('bcryptjs');

const UserSchema = new Schema(
  {
    nome: {
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
    senha: {
      type: String,
      required: true,
      select: false
    },
    data_ultima_atualizacao: {
      type: Date,
      default: Date.now()
    },
    token: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' }
  }
);

UserSchema.pre('save', function () {
  this.senha = hashSync(this.senha, 1);
});

UserSchema.pre('updateOne', async function () {
  const pass = this.getUpdate().senha;

  if (pass) this.getUpdate().senha = hashSync(pass, 10);
});

module.exports = model('User', UserSchema);
