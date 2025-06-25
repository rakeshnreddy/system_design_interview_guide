import React, { useEffect, useState } from 'react';
import { Typography, Container, Paper, TextField, Button as MuiButton, Box, CircularProgress, Alert } from '@mui/material';
import { setMetaTag, removeMetaTag } from '../utils/metaUtils'; // Assuming metaUtils is one level up

const ContactPage = () => {
  const pageTitle = "Contact Us | System Design Guide";
  const pageDescription = "Get in touch with the System Design Guide team. We'd love to hear your feedback or answer your questions.";

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' }); // 'success' or 'error'

  useEffect(() => {
    const originalTitle = document.title;
    document.title = pageTitle;

    const metaTags = [
      { name: 'description', content: pageDescription },
      { name: 'og:title', content: pageTitle, isProperty: true },
      { name: 'og:description', content: pageDescription, isProperty: true },
    ];

    metaTags.forEach(tag => setMetaTag(tag.name, tag.content, tag.isProperty));

    return () => {
      document.title = originalTitle;
      metaTags.forEach(tag => removeMetaTag(tag.name, tag.isProperty));
    };
  }, [pageTitle, pageDescription]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Replace with actual form submission logic
    console.log("Form data submitted:", formData);
    // Example: try { await api.submitForm(formData); setSubmitStatus({type: 'success', message: 'Your message has been sent!'}); } catch { setSubmitStatus({type: 'error', message: 'Failed to send message.'}) }

    setSubmitStatus({ type: 'success', message: 'Your message has been sent successfully! (This is a demo)' });
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <Paper elevation={0} sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 } }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
        Have questions, feedback, or suggestions? We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
      </Typography>

      {submitStatus.message && (
        <Alert severity={submitStatus.type} sx={{ mb: 3 }}>
          {submitStatus.message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { mb: 2 } }}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <TextField
          label="Email Address"
          variant="outlined"
          type="email"
          fullWidth
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={6}
          fullWidth
          required
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <Box sx={{ textAlign: 'right', mt: 1 }}>
          <MuiButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </MuiButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ContactPage;
