// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const port = 3000;
const secretKey = '214';
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins
// Jwt auth
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token is missing or invalid' });
    }
    
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
  
      req.user = decoded; // Store decoded user data in request object
      next(); // Move to the next middleware or route handler
    });
  };
  
  
// Connect to MongoDB
mongoose.connect('mongodb://localhost/Employee_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define User schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
      type: String,
      //required: true
    },
    email: {
      type: String,
      unique: true,
      //required: true // Make email required
    },
    password: {
      type: String,
      //required: true // Make password required
    }
  });
  
  const User = mongoose.model('User', UserSchema);

// Define the Employee Schema
const EmployeeSchema = new Schema({
    f_Id: {
        type: Number,
        //required: true,
        unique: true
    },
    f_Image: {
        type: String,
        default:null
        //required: true
    },
    f_Name: {
        type: String,
        //required: true
    },
    f_Email: {
        type: String,
        //required: true,
        unique: true
    },
    f_Mobile: {
        type: String,
        //required: true
    },
    f_Designation: {
        type: String,
        //required: true
    },
    f_gender: {
        type: String,
        default:'Male'
        // enum: ['Male', 'Female', 'Other'],
        //required: true
    },
    f_Course: {
        type: String,
        //required: true
    },
    f_Createdate: {
        type: Date,
        default: Date.now
    }
});

// Create a model using the schema
const Employee = mongoose.model('Employee', EmployeeSchema);

// Secret key used to sign the JWT (keep this secret and secure)


// User registration endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
   // Generate the JWT token for the new user
   const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '24h' });

   // Respond with success message and JWT token
   res.status(201).json({ token ,name});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});





app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '24h' });

    // Send token with status code 200 (OK)
    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).send('Login failed');
  }
});

//__________________________________________
// Routes for registering, deleting, and editing employees
app.post('/api/registerEmployee',authenticateJWT, async (req, res) => {
    try {
      const newEmployee = new Employee(req.body);
      const savedEmployee = await newEmployee.save();
      res.status(201).json(savedEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.delete('/api/deleteEmployee/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(deletedEmployee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.put('/api/editEmployee/:id',authenticateJWT, async (req, res) => {
    const { id } = req.params;
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(updatedEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Define route to get employees data
app.get('/employeeslist', authenticateJWT, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/',authenticateJWT, async(req,res)=>{
    res.send("hello")
})
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
