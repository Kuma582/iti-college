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
    
    const admin = await prisma.admin.findUnique({
      where: { email },
    });
    
    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // In a real app, generate a JWT token here
    res.status(200).json({ success: true, message: 'Login successful' });
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

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running smoothly!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
