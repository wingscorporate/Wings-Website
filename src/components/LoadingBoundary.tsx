import React, { Component, type ReactNode } from 'react';

/** A failed optional chunk leaves the current page usable and offers a retry. */
export class LoadingBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  declare props: { children: ReactNode };
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return (
      <div role="alert" className="fixed inset-x-4 top-24 z-[80] mx-auto max-w-md rounded-2xl border border-white/20 bg-[#0A1024] p-6 text-white">
        <p>This content could not load. Check your connection and reload to try again.</p>
        <button className="mt-4 rounded-full bg-[#4F7CFF] px-5 py-2" onClick={() => location.reload()}>Reload</button>
      </div>
    );
    return this.props.children;
  }
}
