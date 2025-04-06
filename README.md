# UICare

UICare is a collection of React components designed to make web applications more accessible, intuitive, and supportive of users' mental well-being. It focuses on creating interfaces that are comfortable for neurodivergent users while enhancing the experience for everyone.

## Features

- **Reality Filters**: Allow users to switch between different visual modes to suit their preferences.
- **Ninja Presence**: A subtle, animated indicator that provides gentle visual feedback without causing distractions.
- **Trauma-Informed Interactions**: Components designed with sensitivity to potential triggers, ensuring a safe user experience.

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/uicare.git
   cd uicare
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Basic Implementation

```jsx
import { RealityProvider } from './components/RealityProvider';
import { RealityFilter } from './components/RealityFilter';
import { NinjaPresence } from './components/NinjaPresence';

function App() {
  return (
    <RealityProvider>
      <RealityFilter />
      <NinjaPresence />
      {/* Your application components */}
    </RealityProvider>
  );
}
```

### Reality Filters

Reality Filters allow users to switch between different visual modes:

```jsx
<RealityFilter />
```

Available filters:
- **Standard**: The default visual mode with no filters applied.
- **Ninja Vision**: Increases contrast and reduces brightness for a more focused view.
- **Protocol**: Applies a red-tinted filter with subtle audio feedback.

### Ninja Presence

Ninja Presence is a subtle indicator that provides gentle visual feedback:

```jsx
<NinjaPresence />
```

## Customization

UICare is designed to be highly customizable. You can modify the appearance and behavior of components by:

1. Adjusting CSS variables in `globals.css`
2. Modifying component styles
3. Extending component functionality

For detailed customization instructions, see the [Documentation](/documentation).

## Documentation

For comprehensive documentation, including detailed explanations, usage examples, and customization guides, visit the [Documentation](/documentation) page.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the need for more accessible and user-friendly web interfaces
- Special thanks to the neurodivergent community for their insights and feedback
