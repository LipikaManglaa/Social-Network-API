const { Schema, model ,Types} = require('mongoose');
const dayjs = require('dayjs')

//schema to create reaction model
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        getDay:dayjs().format('DD MMMM YYYY, hh:mm:ss A')
      },
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 15,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema],

    },
    {
        toJSON: {
            virtuals: true,
            getters:true
        },
        id: false,
    }
);


thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    })

// Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;