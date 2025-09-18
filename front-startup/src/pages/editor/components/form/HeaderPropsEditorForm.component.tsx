import React, { useState } from 'react';
import { Button, Input, Modal } from '@app-studio/web';
import {
  HeaderMenuItem,
  HeaderMenuLink,
} from '../../../page/shared/components/Header.component';

interface HeaderPropsEditorFormProps {
  value: HeaderMenuItem[];
  onChange: (items: HeaderMenuItem[]) => void;
}

export const HeaderPropsEditorForm: React.FC<HeaderPropsEditorFormProps> = ({
  value,
  onChange,
}) => {
  const [items, setItems] = useState<HeaderMenuItem[]>(value);
  const [editing, setEditing] = useState<HeaderMenuItem | null>(null);
  const [isOpen, setOpen] = useState(false);

  const openModal = (item?: HeaderMenuItem) => {
    setEditing(
      item || {
        id: Date.now().toString(),
        title: '',
        href: '',
        dropdown: [],
      }
    );
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  const saveItem = () => {
    if (!editing) return;
    const exists = items.find((i) => i.id === editing.id);
    let next: HeaderMenuItem[];
    if (exists) {
      next = items.map((i) => (i.id === editing.id ? editing : i));
    } else {
      next = [...items, editing];
    }
    setItems(next);
    onChange(next);
    closeModal();
  };

  const removeItem = (id: string) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    onChange(next);
  };

  const addDropdownLink = () => {
    if (!editing) return;
    const updated: HeaderMenuItem = {
      ...editing,
      dropdown: [
        ...(editing.dropdown || []),
        { id: Date.now().toString(), label: '', href: '' },
      ],
    };
    setEditing(updated);
  };

  const updateDropdownLink = (link: HeaderMenuLink) => {
    if (!editing) return;
    setEditing({
      ...editing,
      dropdown: (editing.dropdown || []).map((d) =>
        d.id === link.id ? link : d
      ),
    });
  };

  const removeDropdownLink = (id: string) => {
    if (!editing) return;
    setEditing({
      ...editing,
      dropdown: (editing.dropdown || []).filter((d) => d.id !== id),
    });
  };

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
          >
            <span>{item.title}</span>
            <Button size="sm" onClick={() => openModal(item)}>
              Edit
            </Button>
            <Button size="sm" onClick={() => removeItem(item.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <Button onClick={() => openModal()}>Add Menu</Button>

      {isOpen && editing && (
        <Modal.Overlay isOpen={isOpen} onClose={closeModal} blur={2}>
          <Modal.Container>
            <Modal.Header onClose={closeModal}>Menu Item</Modal.Header>
            <Modal.Body>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <Input
                  label="Title"
                  value={editing.title}
                  onChange={(e: any) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                />
                <Input
                  label="Link"
                  value={editing.href || ''}
                  onChange={(e: any) =>
                    setEditing({ ...editing, href: e.target.value })
                  }
                />
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                >
                  {(editing.dropdown || []).map((d) => (
                    <div
                      key={d.id}
                      style={{
                        display: 'flex',
                        gap: '4px',
                        alignItems: 'center',
                      }}
                    >
                      <Input
                        placeholder="Label"
                        value={d.label}
                        onChange={(e: any) =>
                          updateDropdownLink({ ...d, label: e.target.value })
                        }
                      />
                      <Input
                        placeholder="URL"
                        value={d.href}
                        onChange={(e: any) =>
                          updateDropdownLink({ ...d, href: e.target.value })
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() => removeDropdownLink(d.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" onClick={addDropdownLink}>
                    Add link
                  </Button>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={saveItem}>Save</Button>
            </Modal.Footer>
          </Modal.Container>
        </Modal.Overlay>
      )}
    </div>
  );
};

export default HeaderPropsEditorForm;
