import { Component, type ReactNode } from "react";
import { AdminDashboard } from "@/pages/AdminDashboard";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div role="alert" className="p-8">
          <h2 className="text-lg font-semibold text-red-600">Something went wrong:</h2>
          <pre className="mt-4 text-sm text-red-800">{this.state.error.message}</pre>
          <pre className="mt-2 text-xs text-gray-600 overflow-auto max-h-96">
            {this.state.error.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  console.log("App component rendering");
  try {
    return (
      <ErrorBoundary>
        <AdminDashboard />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("Error in App render:", error);
    return <div>Error: {String(error)}</div>;
  }
}
