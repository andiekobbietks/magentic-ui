# FARA-GRC Copilot Instructions

## Quick Start for Service-Oriented Minds (LAMP/XAMPP Background)

If you know PHP/MySQL stacks and IT L1-L2 service management:
- Think of this like **Apache (presentation) → PHP (business logic) → MySQL (data)**
- **FARA-GRC is the entire stack rolled into one smart service** that:
  - Listens to user requests (like HTTP requests)
  - Plans how to respond (generates a workflow/script)
  - Executes actions via agents (like spawning services/processes)
  - Stores decisions and states (like database transactions)
  - Asks for approval before destructive operations (like sudo prompts)
  - **Captures forensic evidence** with timestamps, hashes, and chain-of-custody metadata

**Key difference from LAMP**: Instead of synchronous request-response, this is async state machine with human checkpoints and **court-admissible audit trails**.

---

## Project Overview

**FARA-GRC** (Forensic AI-Reasoned Automation for Governance, Risk & Compliance) is an AI-native compliance platform built on AutoGen that automates M365 auditing with forensic-grade evidence capture. It combines web browsing, code execution, and file analysis with built-in human oversight to reimagine compliance auditing from first principles.

### What It Actually Does (Three Ways to Understand)

**Option A - LAMP/Service Layer Perspective:**
```
User Request Layer    → FastAPI Web Service (frontend/API)
Planning Layer        → Orchestrator (decides what steps)  
Execution Layer       → Agents (FaraWebSurfer/Coder/FileSurfer)
Data Persistence      → PostgreSQL + SQLModel ORM
Safety/Approval Layer → ApprovalGuard (like firewall rules)
Forensic Layer        → Evidence capture with metadata/timestamps
```

**Option B - IT Service Management Perspective:**
- **Incident**: User submits audit task
- **Diagnosis**: Orchestrator plans audit steps
- **Resolution**: Agents execute (with approvals as needed)
- **Documentation**: Message history + forensic evidence stored (audit trail)
- **Escalation**: Human approval for sensitive operations
- **Evidence**: Court-admissible screenshots with metadata

**Option C - Technical Deep Dive:**
Built on AutoGen (Microsoft's multi-agent framework), it routes audit tasks to specialized agents (FaraWebSurfer for M365 portal navigation, Coder for evidence processing, FileSurfer for analysis) with an orchestrator making decisions step-by-step. **Forensic evidence** includes timestamps, UI element metadata, and chain-of-custody tracking.

## Architecture & Data Flow

### Layer 1: The Service Stack (LAMP Equivalent)

| Layer | LAMP Equivalent | FARA-GRC Component | Purpose | Key Files |
|-------|-----------------|----------------------|---------|-----------|
| **Presentation** | Apache/Nginx | FastAPI Web Service | Receives requests, serves UI | `src/magentic_ui/backend/web/` |
| **Business Logic** | PHP/Python App | Orchestrator | Decision-making, planning, routing | `src/magentic_ui/teams/orchestrator/` |
| **Execution** | System calls/processes | Agents (WebSurfer, Coder, FileSurfer) | Performs actual work | `src/magentic_ui/agents/` |
| **Data Storage** | MySQL/PostgreSQL | PostgreSQL + SQLModel | Stores sessions, history, state | `src/magentic_ui/backend/database/` |
| **Security** | Firewall/sudo rules | ApprovalGuard | Enforces policies, blocks dangerous ops | `src/magentic_ui/approval_guard.py` |

### Layer 2: Request-to-Response Flow (Like PHP Script Execution)

```
1. HTTP Request comes in (User task)
   └─> Web Service receives it
   
2. PHP Script decides approach (Orchestrator generates plan)
   ├─> Talks to model client (LLM thinks)
   └─> Creates step-by-step plan
   
3. Script executes plan (Step-by-step execution)
   ├─> Call Apache module A (Call WebSurfer)
   ├─> Call Apache module B (Call Coder)
   └─> Approval system checks: "Is this safe?" (ApprovalGuard)
   
4. Database transactions (Message history saved)
   └─> Audit trail maintained
   
5. Response sent back (Final answer with explanation)
```

### Layer 3: Core Components (Detailed Breakdown)

**Orchestrator** (`src/magentic_ui/teams/orchestrator/_orchestrator.py`)
- **What it is**: The "PHP application logic" - makes decisions.
- **What it does**:
  - **Outer Loop**: Generates a strategic plan and maintains the **Task Ledger** (Facts, Guesses, Plan).
  - **Inner Loop**: Executes steps, monitors the **Progress Ledger**, and routes to agents.
  - **Stall Counter**: Detects loops or lack of progress and triggers re-planning.
  - **Final Answer**: Generates the final response based on the full audit trail.
- **Key state machine**: Planning mode → Execution mode → Final answer mode

**Agents** (The "worker processes")
- **FaraWebSurfer** (`src/magentic_ui/agents/web_surfer/fara/`): Forensic web browsing for M365 portals with evidence capture
- **Coder** (`src/magentic_ui/agents/_coder.py`): Executes Python in Docker (like exec() with sandbox)
- **FileSurfer** (from autogen-ext): Reads files and directories
- **MCP Agents**: Custom agents via Model Context Protocol

**ApprovalGuard** (`src/magentic_ui/approval_guard.py`)
- **What it is**: "sudo" for AI operations - enforces approval policies
- **Policies available**:
  - `"never"`: No approvals (risky, for testing)
  - `"always"`: All actions require human OK
  - `"auto-conservative"`: LLM guesses if reversible; asks only for non-reversible
  - `"auto-permissive"`: Lenient approach
- **Key insight**: Prevents data loss/corruption like database transactions
- **Forensic aspect**: All approvals logged with timestamps for audit trails

**Backend Services** (`src/magentic_ui/backend/`)
- FastAPI server (like Apache handling requests)
- WebSocket for real-time updates (like HTTP but bidirectional)
- Database models for persistence (like MySQL schemas)
- CLI interface for command-line usage

### Layer 4: Data & Message Flow (Information Theory - Redundancy for Reliability)

**Why redundancy matters** (Information Theory concept):
- In communication, redundancy prevents message loss
- This code uses **multiple encoding layers** to ensure info isn't lost:

```
Message Encoding Layers (Redundancy = Fault Tolerance):

Layer 1: TextMessage/MultiModalMessage
  └─> Human-readable plus images

Layer 2: OrchestratorState.message_history
  └─> Maintained in memory during session

Layer 3: PostgreSQL database
  └─> Persisted for audit/replay

Layer 4: Files written to disk
  └─> Long-term storage

Result: Message can be recovered from any layer if others fail
(Like RAID storage or blockchain with multiple validators)
```

**Message Types Used**:
- `TextMessage`: Pure text (task descriptions, plans)
- `MultiModalMessage`: Text + images (browser screenshots with forensic metadata)
- `SystemMessage`: Internal orchestrator instructions
- All stored in `message_history` for context window

**Token Limits** (Storage concept):
- Default: 110,000 tokens (like memory cache size)
- Enforced by `TokenLimitedChatCompletionContext`
- Prevents LLM context explosion (like preventing infinite loops)

**Forensic Evidence Storage**:
- Screenshots captured with timestamps, UI element coordinates, and hash values
- Chain-of-custody metadata for court-admissible evidence
- Audit trails linking actions to approvals and user decisions

### Layer 5: Configuration Hierarchy (Redundant Specification)

Three ways to specify the same config (redundancy principle):

```python
# Way 1: Python code (most specific, overrides others)
MagenticUIConfig(
    model_client_configs=ModelClientConfigs(
        orchestrator={"provider": "AzureChatCompletionClient", ...}
    )
)

# Way 2: YAML file (more portable)
model_client_configs:
  orchestrator:
    provider: AzureChatCompletionClient
    
# Way 3: Environment variables (system-level defaults)
export OPENAI_API_KEY="..."
```

Each level overrides the one below (like system → application → user settings in IT config management).

## Key Patterns & Conventions

### Pattern 1: Approval Guard (Multi-Redundant Safety)

**Three Ways to Understand Approval Guard:**

**IT L1/L2 View**: Approval guard is like `sudo` - it intercepts operations and asks "Are you sure?" before allowing them.

**LAMP Stack View**: Like database transaction rollback - checks if operation is reversible before committing:
```
DELETE FROM users WHERE id=1;  ← Approval guard asks: "Is this reversible?"
                                   If NOT: Requires human confirmation
                                   If YES: Can be auto-approved
```

**Technical View**:
```python
approval_policy = "auto-conservative"  # LLM decides what's risky
approval_guard = ApprovalGuard(
    input_func=get_user_input,  # How to ask user for permission
    model_client=llm_client,    # LLM to evaluate if action is reversible
    config=ApprovalConfig(approval_policy=approval_policy)
)
```

**Tool Metadata Declaration** (`src/magentic_ui/tools/tool_metadata.py`):
Each tool declares its approval requirement:
- `requires_approval: "always"` → Always ask (file deletion, data modification)
- `requires_approval: "maybe"` → LLM decides (click button, navigate page)
- `requires_approval: "never"` → Auto-approve (read file, screenshot)

### Pattern 2: Model Client Configuration (Redundant Specification)

**Why multiple clients?** Each agent may need different models:
- **Orchestrator**: Needs strategic planning (GPT-4.1 default)
- **WebSurfer**: Needs visual understanding (can use same as orchestrator)
- **Coder**: Needs code generation (can use same as orchestrator)
- **ActionGuard**: Needs quick judgment (can use faster/cheaper model)

```python
# Example: Different models for different agents
config = MagenticUIConfig(
    model_client_configs=ModelClientConfigs(
        orchestrator=GPT_4_1_CONFIG,          # Strategic
        web_surfer=None,                      # Falls back to default
        coder=AZURE_CONFIG,                   # Custom provider
        action_guard=GPT_4_MINI_CONFIG        # Cheaper/faster
    )
)
```

**Fallback mechanism** (redundancy):
1. Try component-specific config first
2. Fall back to default config
3. If still None, use hardcoded default (GPT-4.1)

### Pattern 3: Message Flow & History (Audit Trail)

**Three layers of message tracking** (redundancy for debugging):

**Layer 1 - In-Memory History**:
```python
orchestrator_state.message_history  # List of all messages
├─ User messages (what user asked)
├─ Plan messages (what orchestrator planned)
├─ Agent responses (what agents did)
└─ Internal messages (orchestrator thinking)
```

**Layer 2 - Database Storage**:
```sql
-- Persisted in PostgreSQL
SELECT * FROM messages 
WHERE session_id = '...' 
ORDER BY created_at;
```

**Layer 3 - Multimodal Content**:
- Text messages stored as strings
- Images stored as PIL Images within MultiModalMessage
- Allows "replay" of session with visuals

**Key for debugging**: If in-memory state lost, recover from database. If database lost, screenshots in files prove what happened.

### Pattern 4: Plan Structure (Recursive Redundancy)

**Simple Plans**:
```python
plan = [
    Step(title="Search Google", details="Use web surfer to search..."),
    Step(title="Extract info", details="Parse the results..."),
]
```

**Advanced Plans** (Sentinel Steps for long-running tasks):
```python
plan = [
    SentinelPlanStep(
        title="Monitor stock price",
        details="Check every 5 minutes until > $100",
        agent="web_surfer",
        sleep_duration=300,  # Check every 5 min
        condition="price > $100",
        max_iterations=1000
    )
]
```

**Redundant execution** for sentinel steps:
- Save agent state before each check
- Can restore if something fails
- Log every iteration for audit
- Allows "pausing" long-running tasks

### Pattern 5: Cooperative vs Autonomous (Graceful Degradation)

**Three execution modes** (choose based on trust level):

```
Cooperative (default for compliance):
  Step 1: Generate audit plan
  ├─> User reviews and approves plan
  Step 2: Orchestrator executes audit steps
  ├─> Each step requires user confirmation before approval
  ├─> User can pause/modify audit steps
  └─> Final audit report requires user acceptance

Autonomous (for trusted environments):
  Step 1: Generate audit plan (user doesn't see it)
  Step 2: Execute audit steps without stopping
  ├─> Approval guard still enforces policies
  └─> Final audit report generated without user OK

Hybrid (configurable):
  ├─> Trust the planning (skip user approval of audit plan)
  └─> But require approval for sensitive M365 operations
```

Configuration:
```python
MagenticUIConfig(
    cooperative_planning=True,        # Show audit plan to user first
    autonomous_execution=False,       # Ask user before sensitive operations
    approval_policy="auto-conservative"  # Smart guard decisions
)
```

## M365-Specific Patterns & Conventions

### Forensic Evidence Capture Pattern

**Why it matters**: FARA-GRC produces court-admissible evidence, not just screenshots.

**Key components**:
```python
# Evidence metadata captured with every screenshot
evidence = {
    "timestamp": datetime.utcnow().isoformat(),
    "url": current_url,
    "viewport_coords": (x, y, width, height),
    "ui_element_hash": hash_of_element,
    "chain_of_custody": user_session_id,
    "action_performed": "clicked_mfa_toggle"
}
```

**Evidence storage layers**:
1. **In-memory**: MultiModalMessage with PIL Image + metadata
2. **Database**: PostgreSQL with foreign keys to sessions
3. **Files**: Timestamped PNG files with EXIF metadata
4. **Audit trail**: JSON logs linking actions to approvals

### M365 Portal Navigation Patterns

**Admin Center routing** (FaraWebSurfer specialization):
```python
# Pattern: Navigate to specific M365 admin portals
await web_surfer.navigate_to_admin_center("security")
await web_surfer.navigate_to_admin_center("exchange") 
await web_surfer.navigate_to_admin_center("teams")
```

**Policy verification workflow**:
1. Navigate to admin center
2. Search for policy name
3. Extract current settings
4. Compare against requirements
5. Capture evidence screenshot
6. Generate compliance report

### Template Marketplace Pattern

**Reusable audit templates** (future feature):
```yaml
# MFA Audit Template
name: "M365 MFA Compliance Check"
steps:
  - navigate: "https://security.microsoft.com"
  - search: "Conditional Access"
  - extract: "MFA policies"
  - verify: "All users require MFA"
  - evidence: "Screenshot with timestamp"
```

**Template execution**:
- User selects template from marketplace
- Orchestrator adapts template to tenant specifics
- Agents execute with forensic capture
- Results stored in compliance database

### Running & Testing

**Three verification levels** (like security clearance levels):

```bash
# Level 1: Format & Basic Lint (entry level - required for PRs)
poe fmt          # Auto-fix formatting with ruff
poe lint         # Check code style

# Level 2: Type Checking (intermediate - catches logical errors)
poe pyright      # Strict type checking (most thorough)
poe mypy         # Alternative type checker

# Level 3: Full CI Suite (comprehensive - production-ready)
poe check        # Runs: fmt, lint, pyright, test
poe test         # Unit tests with coverage
```

**What each does** (LAMP equivalent):
- `fmt`: Like "mysql> OPTIMIZE TABLE" - cleans up formatting
- `lint`: Like "code review" - checks for obvious problems
- `pyright`/`mypy`: Like "database schema validation" - checks types match
- `test`: Like "backup verification" - ensures code actually works

### Running Magentic-UI

**Web Interface** (HTTP server mode):
```bash
# Start web UI on port 8081
magentic-ui --port 8081

# Then open: http://localhost:8081
```

**Command Line Interface** (Bash mode):
```bash
# Store results in /tmp/data
magentic-cli --work-dir /tmp/data

# (Useful for: automation, scheduled tasks, CI/CD)
```

**Limited Mode** (No Docker, no code execution):
```bash
# If Docker unavailable, still browse web:
magentic-ui --run-without-docker --port 8081
```

### Docker Setup (Service Architecture)

**Three Docker containers** (like LAMP: Apache + PHP + MySQL):

```
┌─────────────────────────────────────────┐
│ Your Machine (Host)                     │
├─────────────────────────────────────────┤
│  ┌─ Container 1: Browser ──────────────┐ │
│  │ - Ubuntu OS                          │ │
│  │ - Playwright (web automation)        │ │
│  │ - VNC (for screenshots)              │ │
│  └──────────────────────────────────────┘ │
│                                           │
│  ┌─ Container 2: Python Executor ───────┐ │
│  │ - Python 3.x environment             │ │
│  │ - Code execution sandbox             │ │
│  │ - Package dependencies                │ │
│  └──────────────────────────────────────┘ │
│                                           │
│  ┌─ Host (FastAPI + DB) ────────────────┐ │
│  │ - Web service (port 8081)            │ │
│  │ - Database (SQLModel/PostgreSQL)     │ │
│  │ - Message queue (WebSocket)          │ │
│  └──────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Check if Docker is working**:
```bash
# See running containers
docker ps

# See available images
docker images | grep magentic

# Build manually if needed
docker/build-all.sh
```

**Containers used**:
- **Browser container**: `/docker/magentic-ui-browser-docker/`
- **Python container**: `/docker/magentic-ui-python-env/`

### Testing Strategy (Redundant Verification)

**Test Locations**:
```
tests/
├── test_playwright_*.py    # Browser interaction tests
├── test_approval_*.py       # Safety/approval tests
├── test_mcp_*.py            # MCP integration tests
└── test_orchestrator_*.py   # Orchestration logic tests
```

**Running subsets**:
```bash
# All tests except ones needing npx
poe test

# Just orchestrator tests
pytest tests/test_orchestrator_*.py -v

# With coverage report
pytest --cov=src tests/

# Stop on first failure (debugging)
pytest -x tests/
```

**Test configuration** (`pytest.ini`):
- Asyncio support enabled (functions run in async event loop)
- Tests marked with `@pytest.mark.npx` skipped by default (require npm)

### Type Checking & Linting (Three Levels)

**Ruff** (Fastest - style/format):
```bash
poe fmt    # Auto-fix formatting
poe lint   # Check for errors
```

**Mypy** (Medium - strict Python typing):
```bash
poe mypy   # Strict mode on src/
```

**Pyright** (Comprehensive - Microsoft's type checker):
```bash
poe pyright  # Strict mode on src/tests/samples
```

**Coverage in checking**:
| Tool | Speed | Coverage | Best For |
|------|-------|----------|----------|
| Ruff | Instant | Format + obvious bugs | CI/CD gates |
| Mypy | Seconds | Type compatibility | Logic errors |
| Pyright | Seconds | Precise types | Pre-commit hooks |

**Always run before committing**:
```bash
poe check  # Runs all three
```

## Important Files & Directories

### Navigation Map (Directory Guide)

```
src/magentic_ui/
├── teams/orchestrator/              ← ORCHESTRATION LOGIC (the "PHP app")
│   ├── _orchestrator.py             ├─ State machine & agent routing
│   ├── orchestrator_config.py       ├─ Configuration for planner
│   ├── _prompts.py                  ├─ Instructions LLM receives
│   └── _group_chat.py               ├─ Message routing logic
│
├── agents/                          ← EXECUTION LAYER (the "workers")
│   ├── _coder.py                    ├─ Code execution via Docker
│   ├── web_surfer/                  ├─ Web browsing via Playwright
│   ├── file_surfer/                 ├─ File reading (autogen-ext)
│   ├── mcp/                         ├─ Model Context Protocol agents
│   └── _user_proxy.py               ├─ User interaction point
│
├── tools/                           ← ACTION TOOLBOX
│   ├── tool_metadata.py             ├─ Declares which tools need approval
│   ├── playwright/                  ├─ Browser control
│   │   ├── browser.py               ├─ Playwright setup
│   │   └── playwright_controller.py ├─ Browser automation API
│   └── bing_search.py               ├─ Web search capability
│
├── backend/                         ← WEB SERVICE LAYER (like Apache/nginx)
│   ├── web/                         ├─ FastAPI routes & REST API
│   ├── database/                    ├─ SQLModel schemas & migrations
│   ├── datamodel/                   ├─ Message/Session types
│   └── cli.py                       ├─ Command-line interface
│
├── approval_guard.py                ← SAFETY LAYER (like "sudo")
├── guarded_action.py                ├─ Approval request/response
├── magentic_ui_config.py            ├─ Master configuration
├── task_team.py                     ├─ Team assembly
└── _cli.py                          ├─ CLI entry point

frontend/                            ← WEB UI (React/Gatsby)
├── src/components/                  ├─ React components
├── src/pages/                       ├─ Pages (index, 404)
└── src/hooks/                       ├─ Custom React hooks

docker/                              ← CONTAINERIZATION
├── magentic-ui-browser-docker/      ├─ Browser container Dockerfile
├── magentic-ui-python-env/          ├─ Python executor container
└── build-all.sh                     ├─ Build script

samples/                             ← EXAMPLES
├── sample_azure_agent.py            ├─ Azure OpenAI integration
├── sample_coder.py                  ├─ Standalone coder agent
├── sample_web_surfer.py             ├─ Standalone web surfer
└── README.md                        ├─ How to run examples

tests/                               ← TEST SUITE
├── test_approval_*.py               ├─ Safety/guard tests
├── test_orchestrator_*.py           ├─ Orchestration tests
└── test_playwright_*.py             ├─ Browser tests
```

### Key Files by Use Case

**"I need to understand agent coordination"**:
- [src/magentic_ui/teams/orchestrator/_orchestrator.py](https://github.com/andiekobbietks/fara-grc-magentic-ui/blob/main/src/magentic_ui/teams/orchestrator/_orchestrator.py) - Master orchestrator logic
- [src/magentic_ui/task_team.py](https://github.com/andiekobbietks/fara-grc-magentic-ui/blob/main/src/magentic_ui/task_team.py) - How agents are assembled

**"I need to add approval/safety logic"**:
- [src/magentic_ui/approval_guard.py](https://github.com/andiekobbietks/fara-grc-magentic-ui/blob/main/src/magentic_ui/approval_guard.py) - Approval policies
- [src/magentic_ui/tools/tool_metadata.py](https://github.com/andiekobbietks/fara-grc-magentic-ui/blob/main/src/magentic_ui/tools/tool_metadata.py) - Tool safety declarations

**"I need to modify agent behavior"**:
- [src/magentic_ui/agents/_coder.py](https://github.com/andiekobbietks/fara-grc-magentic-ui/blob/main/src/magentic_ui/agents/_coder.py) - Code execution
- [src/magentic_ui/agents/web_surfer/fara/_fara_web_surfer.py](https://github.com/andiekobbietks/fara-grc-magentic-ui/blob/main/src/magentic_ui/agents/web_surfer/fara/_fara_web_surfer.py) - Forensic web browsing for M365

**"I need to change the UI or API"**:
- [src/magentic_ui/backend/web/](https://github.com/andiekobbietks/fara-grc-magentic-ui/tree/main/src/magentic_ui/backend/web) - FastAPI routes
- [frontend/src/components/](https://github.com/andiekobbietks/fara-grc-magentic-ui/tree/main/frontend/src/components) - React components

**"I need to understand configuration"**:
- [src/magentic_ui/magentic_ui_config.py](https://github.com/andiekobbietks/fara-grc-magentic-ui/blob/main/src/magentic_ui/magentic_ui_config.py) - Configuration schema
- [src/magentic_ui/teams/orchestrator/orchestrator_config.py](https://github.com/andiekobbietks/fara-grc-magentic-ui/blob/main/src/magentic_ui/teams/orchestrator/orchestrator_config.py) - Orchestrator settings

## Type Checking & Linting
- **Mypy**: Strict mode on `src/` (disallows implicit optionals, untyped defs)
- **Pyright**: Strict mode on `src/tests/samples` (excludes large third-party code in eval/)
- **Ruff**: Formatting and linting throughout

Always run `poe pyright` and `poe mypy` before committing.

## Common Tasks for Contributors

### Adding a New Agent
```python
# 1. Subclass BaseChatAgent (from autogen_agentchat)
from autogen_agentchat.agents import BaseChatAgent

class MyAgent(BaseChatAgent):
    async def on_request(self, message, cancellation_token):
        # Process request and return Response
        return Response(...)
```
- Register in [src/magentic_ui/task_team.py](https://github.com/andiekobbietks/fara-grc-magentic-ui/blob/main/src/magentic_ui/task_team.py)
- Configure in MagenticUIConfig.mcp_agent_configs if using MCP

### Custom Approval Logic
```python
# 1. Create custom BaseApprovalGuard
class MyApprovalGuard(BaseApprovalGuard):
    async def requires_approval(self, baseline, llm_guess, context):
        # Return True/False for approval needed
        return needs_approval
```
- Pass to ApprovalGuardContext.populate_context()
- Reference in config as approval_policy

### Adding MCP Tools
```python
# 1. Create McpAgentConfig
mcp_config = McpAgentConfig(
    name="my-mcp-server",
    type="command",
    command="python -m my_mcp_server"
)
```
- Add to MagenticUIConfig.mcp_agent_configs
- MCP tools automatically registered

### Modifying Orchestrator Behavior
**Key methods** in [src/magentic_ui/teams/orchestrator/_orchestrator.py](https://github.com/andiekobbietks/fara-grc-magentic-ui/blob/main/src/magentic_ui/teams/orchestrator/_orchestrator.py):
- `_orchestrate_step_planning()` - Generate/approve plan
- `_orchestrate_step_execution()` - Execute step
- `_replan()` - Replan if stuck
- `_prepare_final_answer()` - Generate response
- `handle_agent_response()` - Process agent output
- `_request_next_speaker()` - Route to agent

### Web UI Changes
- Modify React components in [frontend/src/components/](https://github.com/andiekobbietks/fara-grc-magentic-ui/tree/main/frontend/src/components)
- Update pages in [frontend/src/pages/](https://github.com/andiekobbietks/fara-grc-magentic-ui/tree/main/frontend/src/pages)
- Rebuild with `npm run build` (see frontend/README.md)

## Debugging Tips

### Enable Verbose Logging
```bash
# Set event logging
export EVENT_LOGGER_NAME="autogen"

# Run with debug flag
magentic-cli --debug
```

### Inspect Message History
```python
# In-memory: During execution
orchestrator_state.message_history  # All messages so far

# In database: After execution
SELECT * FROM messages WHERE session_id='...' ORDER BY created_at
```

### Replay Sessions
```bash
# Load from database
magentic-cli --session-id <UUID> --replay

# View with context
magentic-cli --session-id <UUID> --show-context
```

### Check Browser State
```python
# Get page content
page_title, page_url = await web_surfer.get_page_title_url()

# Get screenshot
screenshot = await web_surfer.get_page_screenshot()
```

### Verify Docker Setup
```bash
# Check browser container
docker exec -it magentic-ui-browser bash

# Check python executor
docker exec -it magentic-ui-python python --version

# View logs
docker logs magentic-ui-browser
docker logs magentic-ui-python
```

## Information Architecture (Redundancy Principles)

This project uses **Shannon Entropy** principles to ensure resilience:

| Concept | Implementation | Benefit |
|---------|---|---|
| **Message Redundancy** | Messages stored in 4 layers (memory→DB→files→disk) | Recovery if any layer fails |
| **Configuration Hierarchy** | 3 specification methods (code→YAML→env vars) | Works with any deployment style |
| **Agent Redundancy** | Multiple agents can handle same task type | Fault tolerance, fallback |
| **State Machine** | Multiple entry/exit points, pausable | Can resume after failure |
| **Approval Layers** | Tool-level + Policy-level + User-level checks | Defense in depth |
| **Documentation** | Multiple explanations (IT/Technical/LAMP) | Works for different backgrounds |
| **Testing** | 3-tier verification (format→type→execution) | Catches errors at every stage |

**Why this matters**: Like the biblical tradition storing knowledge across multiple manuscripts and interpretations, this system stores logic in multiple forms (code, config, prompts, DB schema). If one fails, others provide recovery path.

## When to Use This Project

✅ **Good fit for**:
- Automating repetitive M365 admin portal tasks (policy checks, configuration audits)
- Code execution with human oversight for compliance verification
- Long-running monitoring tasks ("Alert me when MFA settings change")
- Learning multi-agent AI architectures for enterprise automation
- Building approval workflows for sensitive IT operations
- Scenarios requiring court-admissible audit evidence with chain-of-custody

❌ **Not ideal for**:
- Real-time performance-critical tasks (LLM latency inevitable)
- Tasks requiring instant human response (human loop takes time)
- Fully offline scenarios (needs web access for M365 portals)
- Simple chatbots (overkill architecture)
- Non-M365 web automation (though possible, not the primary focus)

---

## Summary for Each Background

### If you're from LAMP/XAMPP:
- **Orchestrator** ≈ PHP app logic
- **Agents** ≈ function libraries (FaraWebSurfer function, Coder function)
- **ApprovalGuard** ≈ sudo permissions system
- **Database** ≈ session/transaction storage
- **Frontend** ≈ Gatsby-built React (not PHP templates)

### If you're from AWS/DevOps:
- **Configuration** ≈ Infrastructure as Code (IaC)
- **Agents** ≈ Lambda functions with roles/policies
- **Approval** ≈ IAM policy enforcement
- **Docker** ≈ containerized microservices
- **Database** ≈ RDS instance with schemas

### If you're from IT Service Management (L1/L2):
- **User Request** ≈ Incident ticket
- **Orchestrator** ≈ Ticket routing system
- **Agents** ≈ Service teams (Network, Systems, Applications)
- **Approval** ≈ Change advisory board (CAB)
- **Message History** ≈ Audit trail/documentation
- **Final Answer** ≈ Resolution & customer communication
- **Forensic Evidence** ≈ Court-admissible documentation with timestamps/hashes
