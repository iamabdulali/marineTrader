import React, { Component } from "react";
import { appErrorImage } from "../assets";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-center">
          <img className="min-w-[350px]" src={appErrorImage} />
          <a
            href="/"
            className="bg-[#0D1A8B] mt-4 block hover:bg-[#0a1dbd] text-white p-3 min-h-12 rounded-md"
          >
            Back To Homepage
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
