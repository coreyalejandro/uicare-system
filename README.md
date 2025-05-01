# Hackathon Project: Loop Detection and Rescue System

A smart agent system that detects when users are stuck in repetitive patterns and provides targeted assistance to help them move forward.

## Project Overview

This project consists of two AI agents working in tandem:
1. **MonitorAgent**: Continuously analyzes user interactions to detect repetitive patterns or loops
2. **RescueAgent**: Activates when loops are detected to provide clear, actionable steps for resolution

## Technical Architecture

### Components
- Node.js backend with containerized agents
- GPT-4-mini powered AI agents
- Docker containerization for easy deployment
- Kubernetes configuration for production scaling

### Agent Definitions
```yaml
- MonitorAgent: Detects user interaction loops
  Model: gpt-4o-mini
  
- RescueAgent: Provides resolution steps
  Model: gpt-4o-mini
```

## Getting Started

### Local Development
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the agents locally:
   ```bash
   docker-compose up --build
   ```
   - MonitorAgent runs on port 3001
   - RescueAgent runs on port 3002

### Production Deployment
1. Set your container registry:
   ```bash
   export REGISTRY=your-container-registry
   ```
2. Build and push images:
   ```bash
   docker build -t ${REGISTRY}/monitor-agent .
   docker build -t ${REGISTRY}/rescue-agent .
   docker push ${REGISTRY}/monitor-agent
   docker push ${REGISTRY}/rescue-agent
   ```
3. Deploy to Kubernetes:
   ```bash
   kubectl apply -f deployment.yaml
   ```

## Project Structure
```
.
├── agent-definition.yaml    # Agent configurations
├── deployment.yaml         # Kubernetes deployment config
├── Dockerfile             # Container build definition
├── docker-compose.yml     # Local development setup
├── aiService.js          # Main agent service logic
└── package.json          # Project dependencies
```

## Features
- Real-time loop detection in user interactions
- AI-powered pattern analysis
- Contextual resolution suggestions
- Containerized deployment
- Scalable architecture

## Future Enhancements
- Add more specialized rescue strategies
- Implement user feedback loop
- Expand pattern recognition capabilities
- Add monitoring dashboard

## Team
- Project built for hackathon
- Focus on improving user experience through AI assistance

## License
MIT License - See LICENSE file for details