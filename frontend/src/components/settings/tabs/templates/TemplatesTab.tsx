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
  Tooltip,
  Badge,
  Alert,
  Row,
  Col,
  Statistic,
  theme,
  Popconfirm,
} from "antd";
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  CodeOutlined, 
  SearchOutlined,
  SafetyCertificateOutlined,
  LockOutlined,
  CloudServerOutlined,
  TeamOutlined,
  MailOutlined,
  FileProtectOutlined,
  PlayCircleOutlined,
  GlobalOutlined,
  KeyOutlined,
  ReloadOutlined
} from "@ant-design/icons";
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
  const { token } = theme.useToken();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  // Helper to get icon based on template tags/name
  const getTemplateIcon = (template: Template) => {
    const text = (template.name + template.tags.join(" ")).toLowerCase();
    if (text.includes("mfa") || text.includes("authentication")) return <SafetyCertificateOutlined style={{ color: token.colorSuccess, fontSize: '24px' }} />;
    if (text.includes("conditional") || text.includes("access")) return <LockOutlined style={{ color: token.colorPrimary, fontSize: '24px' }} />;
    if (text.includes("pim") || text.includes("privileged")) return <KeyOutlined style={{ color: token.colorWarning, fontSize: '24px' }} />;
    if (text.includes("dlp") || text.includes("data")) return <FileProtectOutlined style={{ color: token.colorError, fontSize: '24px' }} />;
    if (text.includes("exchange") || text.includes("mail")) return <MailOutlined style={{ color: '#722ed1', fontSize: '24px' }} />;
    if (text.includes("sharepoint") || text.includes("onedrive")) return <CloudServerOutlined style={{ color: '#13c2c2', fontSize: '24px' }} />;
    if (text.includes("teams")) return <TeamOutlined style={{ color: '#6959CD', fontSize: '24px' }} />;
    return <GlobalOutlined style={{ color: token.colorTextSecondary, fontSize: '24px' }} />;
  };

  const getDefaultTemplates = (): Template[] => [
        {
          id: 'mfa-audit',
          name: 'MFA Posture Check',
          description: 'Comprehensive audit of MFA settings across Azure AD Conditional Access policies. Verifies Global Admin MFA enforcement, legacy auth blocking, and emergency access account configuration.',
          version: '1.0.0',
          author: 'FARA-GRC Team',
          tags: ['mfa', 'authentication', 'azure-ad', 'critical'],
          content: `# MFA Posture Check Template
name: "MFA Posture Check"
description: "Comprehensive audit of MFA settings across Azure AD Conditional Access policies"
version: "1.0.0"
author: "FARA-GRC Team"
tags: ["mfa", "authentication", "azure-ad", "compliance"]

audit_scope:
  tenant_id: "\${TENANT_ID}"
  portals:
    - "Azure AD Admin Center"
    - "Microsoft 365 Admin Center"
  checks:
    - name: "Global Admin MFA Enforcement"
      type: "conditional_access_policy"
      portal: "Azure AD"
      path: "/conditional-access/policies"
      criteria:
        users: "Global Administrators"
        controls: "Require MFA"
      expected: true
      severity: "critical"

    - name: "Legacy Authentication Disabled"
      type: "authentication_methods"
      portal: "Azure AD"
      path: "/authentication-methods"
      criteria:
        legacy_protocols: "disabled"
      expected: true
      severity: "high"

    - name: "Emergency Access Accounts MFA"
      type: "user_accounts"
      portal: "Azure AD"
      path: "/users/emergency-access"
      criteria:
        mfa_enabled: true
      expected: true
      severity: "critical"

execution:
  approval_policy: "auto-conservative"
  max_iterations: 50
  timeout_minutes: 30
  output_format: "forensic_bundle"

evidence:
  screenshots: true
  api_responses: true
  chain_of_thought: true
  timestamps: true
`
        },
        {
          id: 'conditional-access-audit',
          name: 'Conditional Access Policy Audit',
          description: 'Full audit of Conditional Access policies including coverage gaps, break glass exclusions, location-based policies, device compliance, and sign-in/user risk policies.',
          version: '1.0.0',
          author: 'FARA-GRC Team',
          tags: ['conditional-access', 'azure-ad', 'zero-trust', 'compliance'],
          content: `# Conditional Access Policy Audit
name: "Conditional Access Policy Audit"
description: "Full audit of CA policies including coverage gaps and risky configurations"
version: "1.0.0"
author: "FARA-GRC Team"
tags: ["conditional-access", "azure-ad", "zero-trust"]

audit_scope:
  tenant_id: "\${TENANT_ID}"
  portals:
    - "Entra ID Admin Center"
  checks:
    - name: "Policy Coverage Analysis"
      type: "conditional_access_policy"
      criteria:
        coverage: "all_users"
        apps: "all_cloud_apps"
      severity: "high"

    - name: "Break Glass Account Exclusions"
      type: "conditional_access_policy"
      criteria:
        excluded_users: "emergency_access_accounts"
      severity: "critical"

    - name: "Sign-in Risk Policy"
      type: "conditional_access_policy"
      criteria:
        conditions: "sign_in_risk"
        risk_levels: ["high", "medium"]
      severity: "high"

    - name: "User Risk Policy"
      type: "conditional_access_policy"
      criteria:
        conditions: "user_risk"
        grant_controls: "require_password_change"
      severity: "critical"

execution:
  approval_policy: "auto-conservative"
  max_iterations: 75
  output_format: "forensic_bundle"
`
        },
        {
          id: 'pim-audit',
          name: 'Privileged Identity Management Audit',
          description: 'Audit of Azure AD PIM configurations, eligible vs active assignments, just-in-time access controls, activation requirements, and access reviews.',
          version: '1.0.0',
          author: 'FARA-GRC Team',
          tags: ['pim', 'privileged-access', 'jit', 'least-privilege'],
          content: `# Privileged Identity Management Audit
name: "Privileged Identity Management Audit"
description: "Audit of PIM configurations and just-in-time access controls"
version: "1.0.0"
author: "FARA-GRC Team"
tags: ["pim", "privileged-access", "jit"]

audit_scope:
  tenant_id: "\${TENANT_ID}"
  portals:
    - "Entra ID Admin Center"
    - "Azure Portal (PIM blade)"
  checks:
    - name: "Global Admin Eligible vs Active"
      type: "pim_role_assignment"
      criteria:
        role: "Global Administrator"
        assignment_type: "eligible"
      severity: "critical"
      description: "Global Admin should use JIT assignments, not permanent"

    - name: "PIM Activation Requires MFA"
      type: "pim_settings"
      criteria:
        activation_requirements: "require_mfa"
      severity: "critical"

    - name: "Maximum Activation Duration"
      type: "pim_settings"
      criteria:
        max_activation_hours: 8
      severity: "medium"

    - name: "Access Reviews Enabled"
      type: "access_reviews"
      criteria:
        privileged_roles_reviewed: true
        review_frequency: "quarterly"
      severity: "high"

execution:
  approval_policy: "auto-conservative"
  max_iterations: 60
  output_format: "forensic_bundle"
`
        },
        {
          id: 'dlp-audit',
          name: 'Data Loss Prevention Audit',
          description: 'Comprehensive audit of DLP policies across Exchange, SharePoint, Teams, and OneDrive. Checks for sensitive information type detection (credit cards, SSN) and policy enforcement.',
          version: '1.0.0',
          author: 'FARA-GRC Team',
          tags: ['dlp', 'data-protection', 'compliance', 'sensitive-data'],
          content: `# Data Loss Prevention Audit
name: "Data Loss Prevention Audit"
description: "Audit of DLP policies for sensitive data protection"
version: "1.0.0"
author: "FARA-GRC Team"
tags: ["dlp", "data-protection", "compliance"]

audit_scope:
  tenant_id: "\${TENANT_ID}"
  portals:
    - "Microsoft Purview Compliance Portal"
  checks:
    - name: "DLP Policies Exist"
      type: "dlp_policy"
      criteria:
        policies_configured: true
        min_policies: 1
      severity: "critical"

    - name: "Credit Card Detection Enabled"
      type: "dlp_policy"
      criteria:
        sensitive_info_type: "Credit Card Number"
        policy_mode: "enforce"
      severity: "high"

    - name: "Email DLP Coverage"
      type: "dlp_policy"
      criteria:
        locations: "Exchange"
        policy_enabled: true
      severity: "high"

    - name: "Teams DLP Coverage"
      type: "dlp_policy"
      criteria:
        locations: "Teams"
        policy_enabled: true
      severity: "high"

execution:
  approval_policy: "auto-conservative"
  max_iterations: 80
  output_format: "forensic_bundle"

reporting:
  compliance_mapping:
    - "GDPR Article 32"
    - "HIPAA 164.312"
    - "PCI DSS 3.4"
`
        },
        {
          id: 'mailbox-security-audit',
          name: 'Mailbox Security Audit',
          description: 'Exchange Online security audit including external forwarding rules, suspicious inbox rules (BEC indicators), DKIM/DMARC/SPF, and Defender for Office 365 policies.',
          version: '1.0.0',
          author: 'FARA-GRC Team',
          tags: ['exchange', 'email', 'mailbox-security', 'bec-prevention'],
          content: `# Mailbox Security Audit
name: "Mailbox Security Audit"
description: "Audit of email security, forwarding rules, and authentication"
version: "1.0.0"
author: "FARA-GRC Team"
tags: ["exchange", "email", "mailbox-security"]

audit_scope:
  tenant_id: "\${TENANT_ID}"
  portals:
    - "Exchange Admin Center"
    - "Microsoft 365 Defender"
  checks:
    - name: "External Forwarding Blocked"
      type: "transport_rule"
      criteria:
        external_forwarding: "blocked"
      severity: "critical"
      description: "Automatic forwarding to external domains should be blocked"

    - name: "No Suspicious Inbox Rules"
      type: "mailbox_rule"
      criteria:
        forward_to_external: false
        delete_and_forward: false
      severity: "critical"
      description: "Check for BEC-style inbox rules"

    - name: "DMARC Policy Published"
      type: "email_authentication"
      criteria:
        dmarc_record: true
        policy: ["quarantine", "reject"]
      severity: "high"

    - name: "Safe Attachments Enabled"
      type: "defender_policy"
      criteria:
        safe_attachments_enabled: true
      severity: "high"

execution:
  approval_policy: "auto-conservative"
  max_iterations: 70
  output_format: "forensic_bundle"
`
        },
        {
          id: 'sharepoint-security-audit',
          name: 'SharePoint Security Audit',
          description: 'Audit of SharePoint and OneDrive sharing policies, external access controls, anonymous link restrictions, and unmanaged device access.',
          version: '1.0.0',
          author: 'FARA-GRC Team',
          tags: ['sharepoint', 'onedrive', 'sharing', 'external-access'],
          content: `# SharePoint Security Audit
name: "SharePoint Security Audit"
description: "Audit of sharing policies and external access controls"
version: "1.0.0"
author: "FARA-GRC Team"
tags: ["sharepoint", "onedrive", "sharing"]

audit_scope:
  tenant_id: "\${TENANT_ID}"
  portals:
    - "SharePoint Admin Center"
  checks:
    - name: "Anyone Links Disabled"
      type: "sharing_policy"
      criteria:
        anyone_links: false
      severity: "critical"
      description: "Anonymous 'Anyone' links should be disabled"

    - name: "Guest Link Expiration"
      type: "sharing_policy"
      criteria:
        guest_link_expiration: true
        max_days: 30
      severity: "high"

    - name: "Unmanaged Device Access"
      type: "access_control"
      criteria:
        unmanaged_device_access: ["limited", "blocked"]
      severity: "high"

    - name: "Legacy Authentication Blocked"
      type: "access_control"
      criteria:
        legacy_auth_blocked: true
      severity: "high"

execution:
  approval_policy: "auto-conservative"
  max_iterations: 70
  output_format: "forensic_bundle"
`
        },
        {
          id: 'teams-security-audit',
          name: 'Microsoft Teams Security Audit',
          description: 'Audit of Teams guest access, external federation, meeting policies (lobby, recording), and third-party app permissions.',
          version: '1.0.0',
          author: 'FARA-GRC Team',
          tags: ['teams', 'collaboration', 'guest-access', 'meetings'],
          content: `# Microsoft Teams Security Audit
name: "Microsoft Teams Security Audit"
description: "Audit of Teams security settings and policies"
version: "1.0.0"
author: "FARA-GRC Team"
tags: ["teams", "collaboration", "guest-access"]

audit_scope:
  tenant_id: "\${TENANT_ID}"
  portals:
    - "Teams Admin Center"
  checks:
    - name: "External Access Restricted"
      type: "external_access"
      criteria:
        external_access: "allowed_domains_only"
      severity: "high"
      description: "Federation should be restricted to specific domains"

    - name: "Meeting Lobby Settings"
      type: "meeting_policy"
      criteria:
        auto_admit: "people_in_org"
        anonymous_users_in_lobby: true
      severity: "medium"

    - name: "Third-Party App Permissions"
      type: "app_policy"
      criteria:
        third_party_apps: "allow_specific"
      severity: "high"
      description: "Third-party apps should be explicitly approved"

    - name: "Team Creation Policy"
      type: "teams_policy"
      criteria:
        team_creation: "specific_groups"
      severity: "medium"
      description: "Team creation should be governed"

execution:
  approval_policy: "auto-conservative"
  max_iterations: 65
  output_format: "forensic_bundle"
`
        }
      ];

  // Load templates from backend or local storage
  useEffect(() => {
    // For now, load from localStorage or initialize with examples
    const savedTemplates = localStorage.getItem('fara-templates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    } else {
      const defaults = getDefaultTemplates();
      setTemplates(defaults);
      localStorage.setItem('fara-templates', JSON.stringify(defaults));
    }
  }, []);

  const handleResetTemplates = () => {
    const defaults = getDefaultTemplates();
    setTemplates(defaults);
    localStorage.setItem('fara-templates', JSON.stringify(defaults));
    message.success('Templates reset to defaults');
  };

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

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchText.toLowerCase()) || 
    t.description.toLowerCase().includes(searchText.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>Audit Templates</Typography.Title>
        <Space>
          <Input 
            placeholder="Search templates..." 
            prefix={<SearchOutlined />} 
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          <Popconfirm
            title="Reset Templates?"
            description="This will restore the default templates and delete any custom ones."
            onConfirm={handleResetTemplates}
            okText="Yes, Reset"
            cancelText="Cancel"
          >
            <Button icon={<ReloadOutlined />}>Reset</Button>
          </Popconfirm>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateTemplate}
          >
            Create New
          </Button>
        </Space>
      </div>
      
      <Alert
        message={
          <Space>
            <SafetyCertificateOutlined style={{ color: token.colorSuccess }} />
            <span style={{ fontWeight: 600 }}>MVP Phase: Template Marketplace Preview</span>
          </Space>
        }
        description={
          <div style={{ marginTop: 12 }}>
            <Row gutter={[24, 16]}>
              <Col xs={24} md={16}>
                <Typography.Paragraph style={{ marginBottom: 16 }}>
                  <strong>How Templates Work:</strong> Templates are YAML-defined audit workflows that instruct FARA-GRC agents 
                  on checks, navigation paths, and evidence requirements. The Orchestrator translates these into 
                  step-by-step forensic actions.
                </Typography.Paragraph>
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic 
                      title="Available Templates" 
                      value={templates.length} 
                      prefix={<FileProtectOutlined />} 
                      valueStyle={{ fontSize: 20, fontWeight: 500 }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic 
                      title="Security Checks" 
                      value={templates.reduce((acc, t) => acc + (t.content.match(/- name:/g) || []).length, 0)} 
                      prefix={<SafetyCertificateOutlined />} 
                      valueStyle={{ fontSize: 20, fontWeight: 500 }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ 
                  borderLeft: `1px solid ${token.colorBorderSecondary}`, 
                  paddingLeft: 24, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <Typography.Text strong style={{ marginBottom: 8, display: 'block' }}>Capabilities:</Typography.Text>
                  <Space direction="vertical" size={4}>
                    <Badge status="processing" text="Declarative checks" />
                    <Badge status="processing" text="Forensic evidence" />
                    <Badge status="processing" text="Approval workflows" />
                  </Space>
                  <div style={{ marginTop: 16 }}>
                    <Tag color="blue">Coming Soon</Tag>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      Import/Export, Marketplace
                    </Typography.Text>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        }
        type="success"
        showIcon={false}
        style={{ marginBottom: 24, border: `1px solid ${token.colorSuccessBorder}` }}
      />

      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
        dataSource={filteredTemplates}
        renderItem={(template) => (
          <List.Item>
            <Card
              hoverable
              actions={[
                <Tooltip title="Run this audit (Demo)">
                  <Button type="text" icon={<PlayCircleOutlined />} onClick={() => message.info(`Starting audit: ${template.name}`)}>Run</Button>
                </Tooltip>,
                <Tooltip title="Edit Template">
                  <Button type="text" icon={<EditOutlined />} onClick={() => handleEditTemplate(template)}>Edit</Button>
                </Tooltip>,
                <Tooltip title="Delete Template">
                  <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteTemplate(template.id)}>Delete</Button>
                </Tooltip>
              ]}
            >
              <Card.Meta
                avatar={getTemplateIcon(template)}
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ whiteSpace: 'normal' }}>{template.name}</span>
                  </div>
                }
                description={
                  <div style={{ height: 100, display: 'flex', flexDirection: 'column' }}>
                    <Typography.Paragraph 
                      ellipsis={{ rows: 2 }} 
                      style={{ marginBottom: 8, flex: 1 }}
                    >
                      {template.description}
                    </Typography.Paragraph>
                    <div style={{ marginTop: 'auto' }}>
                      <Space size={[0, 8]} wrap>
                        <Tag color="blue">v{template.version}</Tag>
                        {template.tags.slice(0, 3).map(tag => (
                          <Tag key={tag} color={tag === 'critical' ? 'red' : 'orange'}>{tag}</Tag>
                        ))}
                        {template.tags.length > 3 && <Tag>+{template.tags.length - 3}</Tag>}
                      </Space>
                    </div>
                  </div>
                }
              />
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