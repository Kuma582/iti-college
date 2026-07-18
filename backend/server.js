const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// 1. Submit Admission Form
app.post('/api/admissions', async (req, res) => {
  try {
    const { fullName, mobile, email, dob, trade } = req.body;
    
    const admission = await prisma.admission.create({
      data: {
        fullName,
        mobile,
        email,
        dob: new Date(dob),
        trade,
      },
    });
    
    res.status(201).json({ success: true, message: 'Admission submitted successfully', admission });
  } catch (error) {
    console.error('Error submitting admission:', error);
    res.status(500).json({ success: false, message: 'Failed to submit admission' });
  }
});

// 2. Submit Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });
    
    res.status(201).json({ success: true, message: 'Message sent successfully', contact });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// 3. Fetch Notices
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { date: 'desc' },
    });
    res.status(200).json({ success: true, notices });
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notices' });
  }
});

// 4. MIS Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if the user is a registered student
    const student = await prisma.student.findUnique({
      where: { email },
    });
    
    if (student && student.password === password) {
      return res.status(200).json({ success: true, message: 'Student login successful', role: 'student' });
    }
    
    const admin = await prisma.admin.findUnique({
      where: { email },
    });
    
    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // In a real app, generate a JWT token here
    res.status(200).json({ success: true, message: 'Admin login successful', role: 'admin' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// 5. Admin Dashboard: Get all admissions
app.get('/api/admissions', async (req, res) => {
  try {
    const admissions = await prisma.admission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ success: true, admissions });
  } catch (error) {
    console.error('Error fetching admissions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch admissions' });
  }
});

// 6. Admin Dashboard: Get all contacts
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
});

// 6.1 Admin Dashboard: Mark contact as resolved
app.put('/api/contact/:id/resolve', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: { status: 'Resolved' },
    });
    res.status(200).json({ success: true, message: 'Marked as resolved', contact });
  } catch (error) {
    console.error('Error resolving contact:', error);
    res.status(500).json({ success: false, message: 'Failed to resolve contact' });
  }
});

// 7. Admin Dashboard: Get summary stats
app.get('/api/dashboard-stats', async (req, res) => {
  try {
    const totalAdmissions = await prisma.admission.count();
    const totalContacts = await prisma.contact.count();
    const totalNotices = await prisma.notice.count();
    
    // Get recent admissions for the mini-table
    const recentAdmissions = await prisma.admission.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ 
      success: true, 
      stats: { totalAdmissions, totalContacts, totalNotices },
      recentAdmissions 
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

// 8. Admin: Create Notice
app.post('/api/notices', async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const notice = await prisma.notice.create({ data: { title, content, category } });
    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create notice' });
  }
});

// 9. Admin: Delete Notice
app.delete('/api/notices/:id', async (req, res) => {
  try {
    await prisma.notice.delete({ where: { id: Number(req.params.id) } });
    res.status(200).json({ success: true, message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete notice' });
  }
});

// 10. Study Materials
app.get('/api/materials', async (req, res) => {
  try {
    const materials = await prisma.studyMaterial.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, materials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch materials' });
  }
});

app.post('/api/materials', async (req, res) => {
  try {
    const { title, description, url, category } = req.body;
    const material = await prisma.studyMaterial.create({ data: { title, description, url, category } });
    res.status(201).json({ success: true, material });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create material' });
  }
});

app.delete('/api/materials/:id', async (req, res) => {
  try {
    await prisma.studyMaterial.delete({ where: { id: Number(req.params.id) } });
    res.status(200).json({ success: true, message: 'Material deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete material' });
  }
});

// 11. Student Records
app.get('/api/records/:email', async (req, res) => {
  try {
    const record = await prisma.studentRecord.findUnique({ where: { email: req.params.email } });
    res.status(200).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch record' });
  }
});

app.post('/api/records', async (req, res) => {
  try {
    const { email, attendance, feeStatus, results } = req.body;
    const record = await prisma.studentRecord.upsert({
      where: { email },
      update: { attendance: Number(attendance), feeStatus, results },
      create: { email, attendance: Number(attendance), feeStatus, results }
    });
    res.status(200).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update record' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running smoothly!' });
});

// 12. Create a Student Account
app.post('/api/students', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if email already exists
    const existingStudent = await prisma.student.findUnique({ where: { email } });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'Student with this email already exists' });
    }
    
    const student = await prisma.student.create({
      data: { name, email, password }
    });
    
    res.status(201).json({ success: true, message: 'Student account created', student });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ success: false, message: 'Failed to create student account' });
  }
});

// 13. Fetch Student Accounts
app.get('/api/students', async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, createdAt: true } // don't send passwords
    });
    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch students' });
  }
});

// Start Server (only for local development, Vercel uses serverless)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
