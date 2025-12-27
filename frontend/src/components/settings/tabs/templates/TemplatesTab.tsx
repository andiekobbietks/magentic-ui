import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  List,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  message,
  Typography,
  Divider,
  Space,
  Tag,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, CodeOutlined } from "@ant-design/icons";
import { useSettingsStore } from "../../../store";

const { TextArea } = Input;
const { Option } = Select;

interface Template {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  tags: string[];
  content: string; // YAML content
}

interface TemplatesTabProps {
  config: any;
  handleUpdateConfig: (newConfig: any) => void;
}

const TemplatesTab: React.FC<TemplatesTabProps> = ({ config, handleUpdateConfig }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [form] = Form.useForm();

  // Load templates from backend or local storage
  useEffect(() => {
    // For now, load from localStorage or initialize with examples
    const savedTemplates = localStorage.getItem('fara-templates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    } else {
      // Initialize with example templates
      const exampleTemplates: Template[] = [
        {
          id: 'mfa-audit',
          name: 'MFA Posture Check',
          description: 'Comprehensive audit of MFA settings across Azure AD',
          version: '1.0.0',
          author: 'FARA-GRC Team',
          tags: ['mfa', 'authentication', 'azure-ad'],
          content: `# MFA Posture Check Template
name: "MFA Posture Check"
description: "Comprehensive audit of MFA settings across Azure AD Conditional Access policies"
version: "1.0.0"
author: "FARA-GRC Team"
tags: ["mfa", "authentication", "azure-ad", "compliance"]

# Model configurations and audit scope here...
`
        }
      ];
      setTemplates(exampleTemplates);
      localStorage.setItem('fara-templates', JSON.stringify(exampleTemplates));
    }
  }, []);

  const saveTemplates = (newTemplates: Template[]) => {
    setTemplates(newTemplates);
    localStorage.setItem('fara-templates', JSON.stringify(newTemplates));
  };

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setIsAdvancedMode(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setIsAdvancedMode(false);
    form.setFieldsValue({
      name: template.name,
      description: template.description,
      version: template.version,
      author: template.author,
      tags: template.tags,
      content: template.content,
    });
    setIsModalVisible(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const newTemplates = templates.filter(t => t.id !== templateId);
    saveTemplates(newTemplates);
    message.success('Template deleted successfully');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const templateData: Template = {
        id: editingTemplate?.id || `template-${Date.now()}`,
        name: values.name,
        description: values.description,
        version: values.version || '1.0.0',
        author: values.author || 'Anonymous',
        tags: values.tags || [],
        content: values.content,
      };

      let newTemplates;
      if (editingTemplate) {
        newTemplates = templates.map(t => t.id === editingTemplate.id ? templateData : t);
      } else {
        newTemplates = [...templates, templateData];
      }

      saveTemplates(newTemplates);
      setIsModalVisible(false);
      message.success(`Template ${editingTemplate ? 'updated' : 'created'} successfully`);
    });
  };

  const toggleAdvancedMode = () => {
    setIsAdvancedMode(!isAdvancedMode);
  };

  return (
    <div>
      <Typography.Title level={4}>Audit Templates</Typography.Title>
      <Typography.Paragraph>
        Create and manage reusable audit templates. Templates define audit workflows,
        checks, and evidence requirements that can be executed across multiple tenants.
      </Typography.Paragraph>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreateTemplate}
        style={{ marginBottom: 16 }}
      >
        Create New Template
      </Button>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={templates}
        renderItem={(template) => (
          <List.Item>
            <Card
              title={template.name}
              extra={
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEditTemplate(template)}
                  >
                    Edit
                  </Button>
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    Delete
                  </Button>
                </Space>
              }
            >
              <Typography.Paragraph>{template.description}</Typography.Paragraph>
              <Space wrap>
                <Tag color="blue">v{template.version}</Tag>
                <Tag color="green">{template.author}</Tag>
                {template.tags.map(tag => (
                  <Tag key={tag} color="orange">{tag}</Tag>
                ))}
              </Space>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title={editingTemplate ? "Edit Template" : "Create New Template"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={[
          <Button key="advanced" icon={<CodeOutlined />} onClick={toggleAdvancedMode}>
            {isAdvancedMode ? 'Simple Editor' : 'Advanced YAML Editor'}
          </Button>,
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            {editingTemplate ? 'Update' : 'Create'}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          {!isAdvancedMode ? (
            <>
              <Form.Item
                name="name"
                label="Template Name"
                rules={[{ required: true, message: 'Please enter a template name' }]}
              >
                <Input placeholder="e.g., MFA Posture Check" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter a description' }]}
              >
                <TextArea
                  placeholder="Describe what this template audits..."
                  rows={3}
                />
              </Form.Item>

              <Form.Item name="version" label="Version">
                <Input placeholder="1.0.0" />
              </Form.Item>

              <Form.Item name="author" label="Author">
                <Input placeholder="Your name or organization" />
              </Form.Item>

              <Form.Item name="tags" label="Tags">
                <Select mode="tags" placeholder="Add tags (e.g., mfa, compliance)">
                  <Option value="mfa">mfa</Option>
                  <Option value="compliance">compliance</Option>
                  <Option value="azure-ad">azure-ad</Option>
                  <Option value="gdpr">gdpr</Option>
                  <Option value="iso27001">iso27001</Option>
                </Select>
              </Form.Item>

              <Divider>Template Content</Divider>
              <Typography.Paragraph type="secondary">
                Use the Advanced YAML Editor to define the full template structure,
                including model configurations, audit checks, and execution settings.
              </Typography.Paragraph>
            </>
          ) : (
            <Form.Item
              name="content"
              label="YAML Template Content"
              rules={[{ required: true, message: 'Please enter YAML content' }]}
            >
              <TextArea
                placeholder="Paste or edit YAML template content here..."
                rows={20}
                style={{ fontFamily: 'monospace' }}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default TemplatesTab;