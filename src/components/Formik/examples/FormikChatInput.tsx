import React from 'react';
import { Formik } from 'formik';
import { Button, Vertical, Text } from 'app-studio';
import { FormikChatInput } from '../Formik.ChatInput';
import { FormikForm } from '../Formik.Form';

export const FormikChatInputExample = () => {
  const initialValues = {
    message: '',
    chatHistory: [] as string[],
  };

  const mentionData = [
    { id: '1', name: 'John Doe', avatar: '', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', avatar: '', email: 'jane@example.com' },
    { id: '3', name: 'Bob Johnson', avatar: '', email: 'bob@example.com' },
  ];

  const promptExamples = [
    { id: '1', text: 'Hello, how can I help you today?' },
    { id: '2', text: 'What would you like to know about our product?' },
    { id: '3', text: 'Can you tell me more about your requirements?' },
  ];

  const handleSubmit = (values: any, { setFieldValue }: any) => {
    console.log('Form submitted with values:', values);

    // Add message to chat history
    if (values.message.trim()) {
      const newHistory = [...values.chatHistory, values.message];
      setFieldValue('chatHistory', newHistory);
      setFieldValue('message', ''); // Clear the input after submit
    }
  };

  const handleChatSubmit = (message: string, options?: any) => {
    console.log('Chat message submitted:', message, options);
    // This will be handled by the form's onSubmit
  };

  return (
    <Vertical gap={16} padding={16}>
      <Text fontSize="lg" fontWeight="bold">
        Formik ChatInput Example
      </Text>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formikProps: any) => (
          <FormikForm
            onChange={() => {
              console.log('FormikChatInput onChange', formikProps.values);
            }}
          >
            <Vertical gap={16}>
              {/* Display chat history */}
              {formikProps.values.chatHistory.length > 0 && (
                <Vertical gap={8}>
                  <Text fontSize="md" fontWeight="semibold">
                    Chat History:
                  </Text>
                  {formikProps.values.chatHistory.map(
                    (msg: string, index: number) => (
                      <Text
                        key={index}
                        padding={8}
                        backgroundColor="color.gray.100"
                        borderRadius={8}
                      >
                        {msg}
                      </Text>
                    )
                  )}
                </Vertical>
              )}

              {/* ChatInput with Formik integration */}
              <FormikChatInput
                name="message"
                placeholder="Type your message here... Use @ to mention someone"
                onSubmit={handleChatSubmit}
                mentionData={mentionData}
                mentionTrigger="@"
                promptExamples={promptExamples}
                autoFocus={true}
                hideAttachments={false}
                onMentionSelect={(mention) => {
                  console.log('Mention selected:', mention);
                }}
              />

              <Button
                type="submit"
                onClick={formikProps.handleSubmit}
                disabled={!formikProps.values.message?.trim()}
              >
                Send Message
              </Button>
            </Vertical>
          </FormikForm>
        )}
      </Formik>
    </Vertical>
  );
};

export const FormikChatInputSimpleExample = () => {
  const initialValues = {
    feedback: '',
  };

  return (
    <Vertical gap={16} padding={16}>
      <Text fontSize="lg" fontWeight="bold">
        Simple Formik ChatInput Example
      </Text>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log('Simple form submitted:', values)}
      >
        {(props: any) => (
          <FormikForm>
            <Vertical gap={16}>
              <FormikChatInput
                name="feedback"
                placeholder="Share your feedback..."
                hideAttachments={true}
                size="sm"
                shape="rounded"
              />

              <Button type="submit" onClick={props.handleSubmit}>
                Submit Feedback
              </Button>
            </Vertical>
          </FormikForm>
        )}
      </Formik>
    </Vertical>
  );
};
