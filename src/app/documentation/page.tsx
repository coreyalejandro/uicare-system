'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Documentation</h2>
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-foreground text-background' 
                      : 'hover:bg-foreground/10'
                  }`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('reality-filters')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'reality-filters' 
                      ? 'bg-foreground text-background' 
                      : 'hover:bg-foreground/10'
                  }`}
                >
                  Reality Filters
                </button>
                <button 
                  onClick={() => setActiveTab('ninja-presence')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'ninja-presence' 
                      ? 'bg-foreground text-background' 
                      : 'hover:bg-foreground/10'
                  }`}
                >
                  Ninja Presence
                </button>
                <button 
                  onClick={() => setActiveTab('trauma-informed')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'trauma-informed' 
                      ? 'bg-foreground text-background' 
                      : 'hover:bg-foreground/10'
                  }`}
                >
                  Trauma-Informed Design
                </button>
                <button 
                  onClick={() => setActiveTab('customization')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'customization' 
                      ? 'bg-foreground text-background' 
                      : 'hover:bg-foreground/10'
                  }`}
                >
                  Customization
                </button>
                <div className="pt-4 mt-4 border-t border-foreground/20">
                  <Link 
                    href="/"
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl font-bold mb-6">UICare: Enhancing User Interfaces with Wellness in Mind</h1>
                
                <p className="text-lg mb-6">
                  UICare is a collection of React components designed to make web applications more accessible, 
                  intuitive, and supportive of users' mental well-being. It focuses on creating interfaces 
                  that are comfortable for neurodivergent users while enhancing the experience for everyone.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">What is UICare?</h2>
                <p>
                  UICare is a project dedicated to integrating neurodivergent-friendly features into web applications. 
                  By incorporating features like customizable reality filters and trauma-informed interactions, 
                  UICare aims to support users with different sensory preferences and cognitive styles.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Key Features</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Reality Filters:</strong> Allow users to switch between different visual modes to suit their preferences.</li>
                  <li><strong>Ninja Presence:</strong> A subtle, animated indicator that provides gentle visual feedback without causing distractions.</li>
                  <li><strong>Trauma-Informed Interactions:</strong> Components designed with sensitivity to potential triggers, ensuring a safe user experience.</li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Getting Started</h2>
                <p>
                  To use UICare in your project, you need to wrap your application with the RealityProvider 
                  component and then use the individual components as needed. Each feature can be customized 
                  to fit your specific requirements.
                </p>
                
                <div className="bg-foreground/5 p-4 rounded-md mt-4">
                  <h3 className="text-xl font-semibold mb-2">Basic Implementation</h3>
                  <pre className="bg-foreground/10 p-4 rounded-md overflow-x-auto">
                    <code>{`import { RealityProvider } from './components/RealityProvider';
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
}`}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'reality-filters' && (
              <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl font-bold mb-6">Reality Filters</h1>
                
                <p className="text-lg mb-6">
                  Reality Filters allow users to switch between different visual modes to suit their preferences and needs. 
                  This feature is particularly helpful for users with visual sensitivities or those who prefer different 
                  visual environments.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>
                <p>
                  The RealityFilter component provides a set of buttons that users can click to switch between different 
                  visual modes. Each mode applies different CSS filters to the entire application, creating a distinct 
                  visual experience.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Available Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 border border-foreground/20 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Standard</h3>
                    <p>The default visual mode with no filters applied.</p>
                  </div>
                  <div className="p-6 border border-foreground/20 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Ninja Vision</h3>
                    <p>Increases contrast and reduces brightness for a more focused view.</p>
                  </div>
                  <div className="p-6 border border-foreground/20 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Protocol</h3>
                    <p>Applies a red-tinted filter with subtle audio feedback.</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Customization</h2>
                <p>
                  You can customize the Reality Filters by modifying the CSS in the globals.css file. 
                  Each filter is defined by a CSS class that can be adjusted to create different visual effects.
                </p>
                
                <div className="bg-foreground/5 p-4 rounded-md mt-4">
                  <h3 className="text-xl font-semibold mb-2">CSS Customization</h3>
                  <pre className="bg-foreground/10 p-4 rounded-md overflow-x-auto">
                    <code>{`.reality-layer.ninja {
  filter: contrast(1.3) brightness(0.7) saturate(1.4);
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
}

.reality-layer.red {
  filter: sepia(1) hue-rotate(320deg) saturate(2.5);
  background: linear-gradient(rgba(255, 0, 0, 0.05), rgba(255, 0, 0, 0.05));
}`}</code>
                  </pre>
                </div>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Adding Custom Filters</h2>
                <p>
                  To add a custom filter, you need to:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Add a new option to the filter array in the RealityFilter component</li>
                  <li>Define the corresponding CSS class in globals.css</li>
                  <li>Update the RealityFilter type in the RealityProvider component</li>
                </ol>
              </div>
            )}

            {activeTab === 'ninja-presence' && (
              <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl font-bold mb-6">Ninja Presence</h1>
                
                <p className="text-lg mb-6">
                  Ninja Presence is a subtle, animated indicator that provides gentle visual feedback without causing distractions. 
                  It's designed to be unobtrusive while still being noticeable when needed.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>
                <p>
                  The NinjaPresence component displays a small, circular indicator in the bottom-right corner of the screen. 
                  When clicked, it toggles between active and inactive states, with visual feedback to indicate the current state.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Features</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Subtle Design:</strong> Semi-transparent background with a backdrop blur effect</li>
                  <li><strong>Visual Feedback:</strong> Scales up slightly when active</li>
                  <li><strong>Accessibility:</strong> Provides clear visual indication of state</li>
                  <li><strong>Customizable:</strong> Can be styled to match your application's design</li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Customization</h2>
                <p>
                  You can customize the NinjaPresence component by modifying its CSS classes or extending its functionality.
                </p>
                
                <div className="bg-foreground/5 p-4 rounded-md mt-4">
                  <h3 className="text-xl font-semibold mb-2">CSS Customization</h3>
                  <pre className="bg-foreground/10 p-4 rounded-md overflow-x-auto">
                    <code>{`<div 
  className={\`fixed bottom-4 right-4 w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-sm cursor-pointer transition-all duration-300 flex items-center justify-center \${
    isActive ? 'scale-110 bg-foreground/20' : 'hover:bg-foreground/15'
  }\`}
  onClick={() => {
    setIsActive(!isActive);
    alert('👁 Ninja Mode ' + (isActive ? 'Deactivated' : 'Activated'));
  }}
>
  <span className={\`text-2xl transition-transform duration-300 \${isActive ? 'scale-110' : ''}\`}>
    👁
  </span>
</div>`}</code>
                  </pre>
                </div>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Extending Functionality</h2>
                <p>
                  You can extend the NinjaPresence component to perform additional actions when activated, 
                  such as enabling specific features or changing the application's behavior.
                </p>
              </div>
            )}

            {activeTab === 'trauma-informed' && (
              <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl font-bold mb-6">Trauma-Informed Design</h1>
                
                <p className="text-lg mb-6">
                  Trauma-Informed Design is an approach to creating interfaces that are sensitive to potential triggers 
                  and provide a safe, comfortable experience for all users, especially those who may have experienced trauma.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Principles</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Safety:</strong> Creating an environment where users feel secure</li>
                  <li><strong>Trustworthiness:</strong> Being transparent and consistent</li>
                  <li><strong>Choice:</strong> Giving users control over their experience</li>
                  <li><strong>Collaboration:</strong> Working with users to meet their needs</li>
                  <li><strong>Empowerment:</strong> Supporting users in making their own decisions</li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Implementation in UICare</h2>
                <p>
                  UICare implements trauma-informed design principles through:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Reality Filters:</strong> Allowing users to adjust the visual environment to their comfort</li>
                  <li><strong>Ninja Presence:</strong> Providing subtle, non-threatening visual feedback</li>
                  <li><strong>Consistent Design:</strong> Maintaining predictable patterns and behaviors</li>
                  <li><strong>User Control:</strong> Giving users the ability to customize their experience</li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Best Practices</h2>
                <p>
                  When implementing trauma-informed design in your application:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Avoid sudden, unexpected changes or animations</li>
                  <li>Provide clear warnings before potentially triggering content</li>
                  <li>Allow users to skip or modify content that may be distressing</li>
                  <li>Use calming colors and visual elements</li>
                  <li>Ensure all interactions are predictable and controllable</li>
                </ol>
              </div>
            )}

            {activeTab === 'customization' && (
              <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl font-bold mb-6">Customization</h1>
                
                <p className="text-lg mb-6">
                  UICare is designed to be highly customizable, allowing you to adapt it to your specific needs and preferences. 
                  This section provides guidance on how to customize various aspects of UICare.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Theme Customization</h2>
                <p>
                  UICare uses CSS variables for theming, which can be customized in the globals.css file:
                </p>
                
                <div className="bg-foreground/5 p-4 rounded-md mt-4">
                  <pre className="bg-foreground/10 p-4 rounded-md overflow-x-auto">
                    <code>{`:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}`}</code>
                  </pre>
                </div>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Component Customization</h2>
                <p>
                  Each component can be customized by modifying its CSS classes or extending its functionality:
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">RealityFilter</h3>
                <p>
                  Customize the appearance and behavior of the RealityFilter component:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify the button styles in the RealityFilter component</li>
                  <li>Add or remove filter options</li>
                  <li>Change the filter effects in globals.css</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3">NinjaPresence</h3>
                <p>
                  Customize the appearance and behavior of the NinjaPresence component:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Change the position, size, and appearance</li>
                  <li>Modify the animation effects</li>
                  <li>Add additional functionality when activated</li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Advanced Customization</h2>
                <p>
                  For more advanced customization, you can:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create custom components that extend UICare's functionality</li>
                  <li>Modify the RealityProvider to add new features</li>
                  <li>Integrate UICare with other accessibility tools and libraries</li>
                </ul>
                
                <div className="bg-foreground/5 p-4 rounded-md mt-4">
                  <h3 className="text-xl font-semibold mb-2">Example: Custom Filter</h3>
                  <pre className="bg-foreground/10 p-4 rounded-md overflow-x-auto">
                    <code>{`// In RealityProvider.tsx
type RealityFilter = 'default' | 'ninja' | 'red' | 'custom';

// In RealityFilter.tsx
{ id: 'custom' as const, label: 'Custom', icon: '🎨' }

// In globals.css
.reality-layer.custom {
  filter: brightness(1.2) contrast(0.9) saturate(1.1);
  background: linear-gradient(rgba(0, 128, 255, 0.05), rgba(0, 128, 255, 0.05));
}`}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 