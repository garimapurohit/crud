  });

// first we are defining schema for the user 
const userSchema = new mongoose.Schema({ 
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
  type: String,
  },
  jobTittle:{

  type: String,
  },
},
  {timestamps: true}
);

// schema bnngyaaa now w