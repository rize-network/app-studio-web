# Creating a Simple Form

This tutorial will guide you through creating a simple form using the App Studio Web Component Library.

## Introduction

Forms are a fundamental part of web applications. In this tutorial, we'll create a simple contact form with validation using the App Studio Web Component Library components.

## Prerequisites

- Basic knowledge of React
- App Studio Web Component Library installed
- Formik and Yup for form handling and validation (optional)

## Step 1: Set Up the Basic Form Structure

First, let's create a basic form structure using the `View` and `Vertical` components:

```jsx
import React from 'react';
import { View, Vertical } from 'app-studio';
import { Text, Button } from '@app-studio/web';

function ContactForm() {
  return (
    <View padding={20} maxWidth={500} margin="0 auto">
      <Vertical gap={20}>
        <Text fontSize={24} fontWeight="bold">Contact Us</Text>
        
        {/* Form fields will go here */}
        
        <Button>Submit</Button>
      </Vertical>
    </View>
  );
}

export default ContactForm;
```

## Step 2: Add Form Fields

Now, let's add form fields using the `TextField` and `TextArea` components:

```jsx
import React, { useState } from 'react';
import { View, Vertical } from 'app-studio';
import { Text, Button, TextField, TextArea } from '@app-studio/web';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <View padding={20} maxWidth={500} margin="0 auto">
      <Vertical gap={20}>
        <Text fontSize={24} fontWeight="bold">Contact Us</Text>
        
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        
        <TextArea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message"
          rows={5}
        />
        
        <Button>Submit</Button>
      </Vertical>
    </View>
  );
}

export default ContactForm;
```

## Step 3: Add Form Submission Logic

Let's add form submission logic:

```jsx
import React, { useState } from 'react';
import { View, Vertical } from 'app-studio';
import { Text, Button, TextField, TextArea, Alert } from '@app-studio/web';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1000);
  };

  return (
    <View padding={20} maxWidth={500} margin="0 auto">
      <Vertical gap={20}>
        <Text fontSize={24} fontWeight="bold">Contact Us</Text>
        
        {submitStatus === 'success' && (
          <Alert
            variant="success"
            title="Success"
            description="Your message has been sent successfully!"
          />
        )}
        
        <form onSubmit={handleSubmit}>
          <Vertical gap={20}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              isRequired
            />
            
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              isRequired
            />
            
            <TextArea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows={5}
              isRequired
            />
            
            <Button type="submit" isLoading={isSubmitting}>
              Submit
            </Button>
          </Vertical>
        </form>
      </Vertical>
    </View>
  );
}

export default ContactForm;
```

## Step 4: Add Form Validation

Let's add basic form validation:

```jsx
import React, { useState } from 'react';
import { View, Vertical } from 'app-studio';
import { Text, Button, TextField, TextArea, Alert } from '@app-studio/web';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1000);
  };

  return (
    <View padding={20} maxWidth={500} margin="0 auto">
      <Vertical gap={20}>
        <Text fontSize={24} fontWeight="bold">Contact Us</Text>
        
        {submitStatus === 'success' && (
          <Alert
            variant="success"
            title="Success"
            description="Your message has been sent successfully!"
          />
        )}
        
        <form onSubmit={handleSubmit}>
          <Vertical gap={20}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              isRequired
              error={errors.name}
            />
            
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              isRequired
              error={errors.email}
            />
            
            <TextArea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows={5}
              isRequired
              error={errors.message}
            />
            
            <Button type="submit" isLoading={isSubmitting}>
              Submit
            </Button>
          </Vertical>
        </form>
      </Vertical>
    </View>
  );
}

export default ContactForm;
```

## Step 5 (Optional): Using Formik and Yup

For more advanced form handling, you can use Formik and Yup with the App Studio Web Component Library's Formik components:

```jsx
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { View, Vertical } from 'app-studio';
import { 
  Text, 
  Button, 
  Alert,
  FormikTextField,
  FormikTextArea
} from '@app-studio/web';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  message: Yup.string().required('Message is required')
});

function ContactForm() {
  const handleSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setStatus({ success: true });
      resetForm();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }, 1000);
  };

  return (
    <View padding={20} maxWidth={500} margin="0 auto">
      <Vertical gap={20}>
        <Text fontSize={24} fontWeight="bold">Contact Us</Text>
        
        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <Vertical gap={20}>
                {status?.success && (
                  <Alert
                    variant="success"
                    title="Success"
                    description="Your message has been sent successfully!"
                  />
                )}
                
                <FormikTextField
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  isRequired
                />
                
                <FormikTextField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  isRequired
                />
                
                <FormikTextArea
                  name="message"
                  label="Message"
                  placeholder="Enter your message"
                  rows={5}
                  isRequired
                />
                
                <Button type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>
              </Vertical>
            </Form>
          )}
        </Formik>
      </Vertical>
    </View>
  );
}

export default ContactForm;
```

## Complete Example

Here's the complete example using Formik and Yup:

```jsx
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { View, Vertical } from 'app-studio';
import { 
  Text, 
  Button, 
  Alert,
  FormikTextField,
  FormikTextArea
} from '@app-studio/web';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  message: Yup.string().required('Message is required')
});

function ContactForm() {
  const handleSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    // Simulate API call
    setTimeout(() => {
      console.log('Form values:', values);
      setSubmitting(false);
      setStatus({ success: true });
      resetForm();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }, 1000);
  };

  return (
    <View padding={20} maxWidth={500} margin="0 auto" backgroundColor="color.white" borderRadius={8} boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)">
      <Vertical gap={20}>
        <Text fontSize={24} fontWeight="bold" color="theme.primary">Contact Us</Text>
        
        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <Vertical gap={20}>
                {status?.success && (
                  <Alert
                    variant="success"
                    title="Success"
                    description="Your message has been sent successfully!"
                  />
                )}
                
                <FormikTextField
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  isRequired
                />
                
                <FormikTextField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  isRequired
                />
                
                <FormikTextArea
                  name="message"
                  label="Message"
                  placeholder="Enter your message"
                  rows={5}
                  isRequired
                />
                
                <Button type="submit" isLoading={isSubmitting} isFilled>
                  Submit
                </Button>
              </Vertical>
            </Form>
          )}
        </Formik>
      </Vertical>
    </View>
  );
}

export default ContactForm;
```

## Next Steps

Now that you've created a simple form, you can:

- Add more form fields like `Select`, `Checkbox`, or `Radio`
- Implement more complex validation rules
- Connect the form to a real API endpoint
- Add form field groups and sections for more complex forms
- Explore the [Form Validation with Formik](../intermediate/form-validation-with-formik.md) tutorial for more advanced form handling
