"use client"

import React, { useRef, useState } from "react"
import { View, Text, Vertical, Horizontal, useTheme } from "app-studio"
import {
  ChatContainerContent,
  ChatContainerRoot,
} from "../prompt-kit/chat-container"
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
} from "../prompt-kit/message"
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "../prompt-kit/prompt-input"
import { ScrollButton } from "../prompt-kit/scroll-button"
import { Button } from "../../ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "../../ui/sidebar"

import {
  ArrowUp,
  Copy,
  Globe,
  Mic,
  MoreHorizontal,
  Pencil,
  PlusIcon,
  Search,
  ThumbsDown,
  ThumbsUp,
  Trash,
  Plus
} from "lucide-react"

// Initial conversation history
const conversationHistory = [
  {
    period: "Today",
    conversations: [
      {
        id: "t1",
        title: "Project roadmap discussion",
        lastMessage:
          "Let's prioritize the authentication features for the next sprint.",
        timestamp: new Date().setHours(new Date().getHours() - 2),
      },
      {
        id: "t2",
        title: "API Documentation Review",
        lastMessage:
          "The endpoint descriptions need more detail about rate limiting.",
        timestamp: new Date().setHours(new Date().getHours() - 5),
      },
      {
        id: "t3",
        title: "Frontend Bug Analysis",
        lastMessage:
          "I found the issue - we need to handle the null state in the user profile component.",
        timestamp: new Date().setHours(new Date().getHours() - 8),
      },
    ],
  },
  {
    period: "Yesterday",
    conversations: [
      {
        id: "y1",
        title: "Database Schema Design",
        lastMessage:
          "Let's add indexes to improve query performance on these tables.",
        timestamp: new Date().setDate(new Date().getDate() - 1),
      },
      {
        id: "y2",
        title: "Performance Optimization",
        lastMessage:
          "The lazy loading implementation reduced initial load time by 40%.",
        timestamp: new Date().setDate(new Date().getDate() - 1),
      },
    ],
  },
  {
    period: "Last 7 days",
    conversations: [
      {
        id: "w1",
        title: "Authentication Flow",
        lastMessage: "We should implement the OAuth2 flow with refresh tokens.",
        timestamp: new Date().setDate(new Date().getDate() - 3),
      },
      {
        id: "w2",
        title: "Component Library",
        lastMessage:
          "These new UI components follow the design system guidelines perfectly.",
        timestamp: new Date().setDate(new Date().getDate() - 5),
      },
      {
        id: "w3",
        title: "UI/UX Feedback",
        lastMessage:
          "The navigation redesign received positive feedback from the test group.",
        timestamp: new Date().setDate(new Date().getDate() - 6),
      },
    ],
  },
  {
    period: "Last month",
    conversations: [
      {
        id: "m1",
        title: "Initial Project Setup",
        lastMessage:
          "All the development environments are now configured consistently.",
        timestamp: new Date().setDate(new Date().getDate() - 15),
      },
    ],
  },
]

// Initial chat messages
const initialMessages = [
  {
    id: 1,
    role: "user",
    content: "Hello! Can you help me with a coding question?",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "Of course! I'd be happy to help with your coding question. What would you like to know?",
  },
  {
    id: 3,
    role: "user",
    content: "How do I create a responsive layout with CSS Grid?",
  },
  {
    id: 4,
    role: "assistant",
    content:
      "Creating a responsive layout with CSS Grid is straightforward. Here's a basic example:\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n```\n\nThis creates a grid where:\n- Columns automatically fit as many as possible\n- Each column is at least 250px wide\n- Columns expand to fill available space\n- There's a 1rem gap between items\n\nWould you like me to explain more about how this works?",
  },
]

function ChatSidebar() {
  const themeContext = useTheme();
  const primaryColor = themeContext.theme.primary || themeContext.colors?.main?.primary || 'blue';

  return (
    <Sidebar>
      <SidebarHeader>
        <Horizontal alignItems="center" justifyContent="space-between" gap={8} padding="0 8px">
          <Horizontal alignItems="center" gap={8} padding="0 8px">
            <View width="32px" height="32px" borderRadius="6px" backgroundColor={primaryColor} opacity={0.1} />
            <Text fontSize="16px" fontWeight="medium" color={primaryColor} letterSpacing="-0.025em">
              zola.chat
            </Text>
          </Horizontal>
          <Button variant="ghost" size="icon">
            <Search size={16} />
          </Button>
        </Horizontal>
      </SidebarHeader>
      <SidebarContent paddingTop="16px">
        <View padding="0 16px">
          <Button
            variant="outline"
            style={{ marginBottom: '16px', width: '100%', justifyContent: 'flex-start' }}
          >
            <PlusIcon size={16} />
            <Text>New Chat</Text>
          </Button>
        </View>
        {conversationHistory.map((group) => (
          <SidebarGroup key={group.period}>
            <SidebarGroupLabel>{group.period}</SidebarGroupLabel>
            <SidebarMenu>
              {group.conversations.map((conversation) => (
                <SidebarMenuButton key={conversation.id}>
                  <Text>{conversation.title}</Text>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

function ChatContent() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState(initialMessages)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const themeContext = useTheme();
  const borderColor = themeContext.colors?.palette?.gray?.[200] || '#e2e8f0';

  const handleSubmit = () => {
    if (!prompt.trim()) return

    setPrompt("")
    setIsLoading(true)

    // Add user message immediately
    const newUserMessage = {
      id: chatMessages.length + 1,
      role: "user",
      content: prompt.trim(),
    }

    setChatMessages([...chatMessages, newUserMessage])

    // Simulate API response
    setTimeout(() => {
      const assistantResponse = {
        id: chatMessages.length + 2,
        role: "assistant",
        content: `This is a response to: "${prompt.trim()}"`,
      }

      setChatMessages((prev) => [...prev, assistantResponse])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Vertical height="100vh" overflow="hidden">
      <Horizontal
        height="64px"
        width="100%"
        alignItems="center"
        gap={8}
        borderBottom={`1px solid ${borderColor}`}
        padding="0 16px"
        backgroundColor="white"
        zIndex={10}
      >
        <SidebarTrigger style={{ marginLeft: '-4px' }} />
        <Text color={themeContext.theme.primary}>Project roadmap discussion</Text>
      </Horizontal>

      <View ref={chatContainerRef} flex={1} overflowY="auto" position="relative">
        <ChatContainerRoot>
          <ChatContainerContent>
            {chatMessages.map((message, index) => {
              const isAssistant = message.role === "assistant"
              // const isLastMessage = index === chatMessages.length - 1

              return (
                <Message
                  key={message.id}
                  style={{
                    margin: '0 auto',
                    width: '100%',
                    maxWidth: '800px', // max-w-3xl
                    flexDirection: 'column',
                    padding: '0 24px',
                    alignItems: isAssistant ? 'flex-start' : 'flex-end',
                    gap: '8px'
                  }}
                >
                  {isAssistant ? (
                    <Vertical width="100%" gap={0}>
                      <MessageContent
                        markdown
                        style={{
                            flex: 1,
                            borderRadius: '8px',
                            backgroundColor: 'transparent',
                            padding: 0
                        }}
                      >
                        {message.content}
                      </MessageContent>
                      <MessageActions>
                        <MessageAction tooltip="Copy">
                          <Button
                            variant="ghost"
                            size="icon"
                            style={{ borderRadius: '50%' }}
                          >
                            <Copy />
                          </Button>
                        </MessageAction>
                        <MessageAction tooltip="Upvote">
                          <Button
                            variant="ghost"
                            size="icon"
                            style={{ borderRadius: '50%' }}
                          >
                            <ThumbsUp />
                          </Button>
                        </MessageAction>
                        <MessageAction tooltip="Downvote">
                          <Button
                            variant="ghost"
                            size="icon"
                            style={{ borderRadius: '50%' }}
                          >
                            <ThumbsDown />
                          </Button>
                        </MessageAction>
                      </MessageActions>
                    </Vertical>
                  ) : (
                    <Vertical alignItems="flex-end" gap={4}>
                      <MessageContent
                        className="bg-muted" // Marker for custom styling in MessageContent
                        style={{
                            maxWidth: '85%', // sm:max-w-[75%]
                            borderRadius: '24px',
                            padding: '10px 20px',
                            backgroundColor: themeContext.colors?.palette?.gray?.[100] || '#f1f5f9',
                            color: themeContext.theme.primary || '#000'
                        }}
                      >
                        {message.content}
                      </MessageContent>
                      <MessageActions>
                        <MessageAction tooltip="Edit">
                          <Button
                            variant="ghost"
                            size="icon"
                            style={{ borderRadius: '50%' }}
                          >
                            <Pencil />
                          </Button>
                        </MessageAction>
                        <MessageAction tooltip="Delete">
                          <Button
                            variant="ghost"
                            size="icon"
                            style={{ borderRadius: '50%' }}
                          >
                            <Trash />
                          </Button>
                        </MessageAction>
                        <MessageAction tooltip="Copy">
                          <Button
                            variant="ghost"
                            size="icon"
                            style={{ borderRadius: '50%' }}
                          >
                            <Copy />
                          </Button>
                        </MessageAction>
                      </MessageActions>
                    </Vertical>
                  )}
                </Message>
              )
            })}
          </ChatContainerContent>
          <View
            position="absolute"
            bottom="16px"
            left="50%"
            width="100%"
            maxWidth="800px"
            style={{ transform: 'translateX(-50%)' }}
            display="flex"
            justifyContent="flex-end"
            padding="0 20px"
          >
            <ScrollButton />
          </View>
        </ChatContainerRoot>
      </View>

      <View backgroundColor="white" zIndex={10} padding="0 12px 12px 12px">
        <View margin="0 auto" maxWidth="800px">
          <PromptInput
            isLoading={isLoading}
            value={prompt}
            onValueChange={setPrompt}
            onSubmit={handleSubmit}
            style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                borderRadius: '24px',
                border: `1px solid ${borderColor}`,
                padding: '4px',
                backgroundColor: 'white', // bg-popover
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}
          >
            <Vertical>
              <PromptInputTextarea
                placeholder="Ask anything"
                style={{
                    minHeight: '44px',
                    paddingTop: '12px',
                    paddingLeft: '16px',
                    fontSize: '16px',
                    lineHeight: '1.3'
                }}
              />

              <PromptInputActions style={{ marginTop: '20px', width: '100%', justifyContent: 'space-between', padding: '0 12px 12px 12px' }}>
                <Horizontal alignItems="center" gap={8}>
                  <PromptInputAction tooltip="Add a new action">
                    <Button
                      variant="outline"
                      size="icon"
                      style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                    >
                      <Plus size={18} />
                    </Button>
                  </PromptInputAction>

                  <PromptInputAction tooltip="Search">
                    <Button variant="outline" style={{ borderRadius: '9999px' }}>
                      <Globe size={18} />
                      <Text marginLeft="8px">Search</Text>
                    </Button>
                  </PromptInputAction>

                  <PromptInputAction tooltip="More actions">
                    <Button
                      variant="outline"
                      size="icon"
                      style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                    >
                      <MoreHorizontal size={18} />
                    </Button>
                  </PromptInputAction>
                </Horizontal>
                <Horizontal alignItems="center" gap={8}>
                  <PromptInputAction tooltip="Voice input">
                    <Button
                      variant="outline"
                      size="icon"
                      style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                    >
                      <Mic size={18} />
                    </Button>
                  </PromptInputAction>

                  <Button
                    size="icon"
                    disabled={!prompt.trim() || isLoading}
                    onClick={handleSubmit}
                    style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                  >
                    {!isLoading ? (
                      <ArrowUp size={18} />
                    ) : (
                      <View width="12px" height="12px" borderRadius="2px" backgroundColor="white" />
                    )}
                  </Button>
                </Horizontal>
              </PromptInputActions>
            </Vertical>
          </PromptInput>
        </View>
      </View>
    </Vertical>
  )
}

function FullChatApp() {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <SidebarInset>
        <ChatContent />
      </SidebarInset>
    </SidebarProvider>
  )
}

export { FullChatApp }
