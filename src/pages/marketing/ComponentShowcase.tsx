import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CreditCard,
  Layers,
  Plus,
  Sparkles,
} from 'lucide-react';
import { Button } from 'src/components/Button/Button';
import { Switch } from 'src/components/Form/Switch/Switch';
import { Checkbox } from 'src/components/Form/Checkbox/Checkbox';
import { TextField } from 'src/components/Form/TextField/TextField';
import { Tabs } from 'src/components/Tabs/Tabs';
import { HighlightedCode } from 'src/pages/code/HighlightedCode';

export function ComponentShowcase() {
  const [notifications, setNotifications] = useState(true);
  const [selected, setSelected] = useState(true);
  const [project, setProject] = useState('My next big idea');
  const [created, setCreated] = useState(false);
  return (
    <div className="m-showcase" aria-label="Interactive component examples">
      <div className="m-canvas-label m-mono">
        <span className="m-status-dot" /> REAL COMPONENTS. GO AHEAD, TRY THEM.
      </div>
      <div className="m-showcase-grid">
        <div className="m-demo-card m-project-card">
          <div className="m-demo-icon">
            <Layers size={23} />
          </div>
          <span className="m-demo-tag">COMPONENT PREVIEW</span>
          <h3>
            Compose your
            <br />
            next interface.
          </h3>
          <p>Controlled inputs. Typed callbacks. Shared styling.</p>
          <TextField
            label="Project name"
            value={project}
            onChange={(value) => {
              setProject(value);
              setCreated(false);
            }}
            placeholder="Give your idea a name"
          />
          <Button
            backgroundColor="#111827"
            textColor="#fff"
            borderRadius={8}
            isDisabled={!project.trim()}
            onClick={() => setCreated(true)}
            rightIcon={created ? <Check size={16} /> : <Plus size={16} />}
          >
            {created ? 'Project created' : 'Create a project'}
          </Button>
          <span className="m-demo-feedback" role="status">
            {created
              ? `“${project.trim()}” is ready. Demo only — nothing is saved.`
              : 'A real TextField and Button. No mockup.'}
          </span>
        </div>
        <div className="m-demo-card m-controls-card">
          <span className="m-card-caption">CONTROLLED COMPONENTS</span>
          <h3>Inputs and controls.</h3>
          <div className="m-control-row">
            <div>
              <strong>Stay in the loop</strong>
              <small>Only the updates that matter.</small>
            </div>
            <Switch
              aria-label="Enable notifications"
              isChecked={notifications}
              onChange={setNotifications}
              views={{
                slider: {
                  backgroundColor: notifications ? '#1e3a8a' : '#d2d7e0',
                },
              }}
            />
          </div>
          <div className="m-control-row">
            <Checkbox
              label="Include the good stuff"
              isChecked={selected}
              onChange={setSelected}
            />
          </div>
          <div className="m-mini-tags">
            <span>
              <span className="m-status-dot" /> All systems go
            </span>
            <span>⌘ K</span>
            <span className="m-green-tag">New release</span>
          </div>
        </div>
        <div className="m-demo-card m-tabs-card">
          <div className="m-tabs-heading">
            <CreditCard size={18} />
            <span>One component. Your style.</span>
          </div>
          <Tabs
            defaultValue="preview"
            tabs={[
              {
                title: 'Preview',
                value: 'preview',
                content: (
                  <div className="m-button-samples">
                    <Button
                      backgroundColor="#1e3a8a"
                      textColor="#fff"
                      size="sm"
                      rightIcon={<ArrowRight size={14} />}
                    >
                      Continue
                    </Button>
                    <Button variant="outline" color="#1e3a8a" size="sm">
                      Outline
                    </Button>
                    <Button variant="ghost" color="#1e3a8a" size="sm">
                      <Sparkles size={15} /> Ghost
                    </Button>
                  </div>
                ),
              },
              {
                title: 'Code',
                value: 'code',
                content: (
                  <pre className="m-mini-code">
                    <HighlightedCode
                      code={
                        '<Button variant="outline">\n  Make it yours\n</Button>'
                      }
                    />
                  </pre>
                ),
              },
            ]}
          />
        </div>
      </div>
      <div className="m-showcase-caption">
        <span>Not a screenshot. Your future building blocks.</span>
        <a href="/button">
          Explore Button <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}
